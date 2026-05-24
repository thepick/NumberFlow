import { MathQuestion } from "./strategies";

export type FactStatus = "empty" | "learning" | "near-ready" | "review" | "fluent" | "struggling";

export interface FactAttempt {
  isCorrect: boolean;
  responseMs: number;
  timeout: boolean;
  ts: number;
}

export interface FactStats {
  shown: number;
  correct: number;
  incorrect: number;
  timeouts: number;
  avgMs: number;
  lastSeenTs: number;
  recent: FactAttempt[];
  confidence: number;
  mastery: number;
  fastStreak: number;
  slowOrWrongCount: number;
  lastStatus: FactStatus;
}

export type FactStatsMap = { [factId: string]: FactStats };

export interface PracticeStatusSummary {
  needsPractice: number;
  reviewSoon: number;
  almostThere: number;
  fluent: number;
  unseen: number;
  total: number;
}

export interface StrategyMasterySummary extends PracticeStatusSummary {
  seen: number;
  fluentOrReview: number;
  struggling: number;
  roundAccuracy: number;
  speedPassed: boolean;
  isMastered: boolean;
}

const MAX_RECENT_ATTEMPTS = 12;

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function getEmptyStats(): FactStats {
  return {
    shown: 0,
    correct: 0,
    incorrect: 0,
    timeouts: 0,
    avgMs: 0,
    lastSeenTs: 0,
    recent: [],
    confidence: 0,
    mastery: 0,
    fastStreak: 0,
    slowOrWrongCount: 0,
    lastStatus: "empty",
  };
}

export function getFluentMs(speedTarget: number): number {
  const safeTarget = Math.max(1, speedTarget || 20);
  return Math.round(60000 / safeTarget);
}

function calculateConfidence(stats: FactStats, isCorrect: boolean, responseMs: number, timeout: boolean, speedTarget: number): number {
  const fluentMs = getFluentMs(speedTarget);
  const speedRatio = responseMs / fluentMs;
  let delta = 0;

  if (timeout) delta = -14;
  else if (!isCorrect) delta = -10;
  else if (speedRatio <= 0.85) delta = 18;
  else if (speedRatio <= 1) delta = 14;
  else if (speedRatio <= 1.5) delta = 8;
  else if (speedRatio <= 2.2) delta = 3;
  else delta = 1;

  const recentWeak = stats.recent
    .slice(-5)
    .filter((attempt) => !attempt.isCorrect || attempt.timeout || attempt.responseMs > fluentMs * 2.2)
    .length;

  let nextConfidence = stats.confidence + delta;
  if (recentWeak >= 2) nextConfidence = Math.min(nextConfidence, 74);
  if (recentWeak >= 3) nextConfidence = Math.min(nextConfidence, 60);

  return clamp(Math.round(nextConfidence), 0, 100);
}

export function getFactStatus(stats?: FactStats): FactStatus {
  if (!stats || stats.shown === 0) return "empty";

  const recent = stats.recent.slice(-5);
  const recentWeak = recent.filter((attempt) => !attempt.isCorrect || attempt.timeout).length;

  if (recentWeak >= 2 || stats.confidence < 35) return "struggling";
  if (stats.confidence >= 80 && recentWeak === 0) return "fluent";
  if (stats.confidence >= 65) return "review";
  if (stats.confidence >= 45) return "near-ready";
  return "learning";
}

export function updateFactStats(
  factStats: FactStatsMap,
  fact: MathQuestion,
  isCorrect: boolean,
  responseMs: number,
  timeout: boolean,
  speedTarget: number
): FactStatsMap {
  const previous = factStats[fact.id] || getEmptyStats();
  const now = Date.now();
  const safeResponseMs = Math.max(1, Math.round(responseMs));
  const fluentMs = getFluentMs(speedTarget);
  const wasSlow = safeResponseMs > fluentMs * 2.2;

  const attempt: FactAttempt = {
    isCorrect,
    responseMs: safeResponseMs,
    timeout,
    ts: now,
  };

  const shown = previous.shown + 1;
  const correct = previous.correct + (isCorrect ? 1 : 0);
  const incorrect = previous.incorrect + (!isCorrect ? 1 : 0);
  const timeouts = previous.timeouts + (timeout ? 1 : 0);
  const avgMs = previous.avgMs > 0
    ? Math.round((previous.avgMs * previous.shown + safeResponseMs) / shown)
    : safeResponseMs;
  const recent = [...previous.recent, attempt].slice(-MAX_RECENT_ATTEMPTS);
  const fastStreak = isCorrect && safeResponseMs <= fluentMs ? previous.fastStreak + 1 : 0;
  const slowOrWrongCount = !isCorrect || timeout || wasSlow
    ? previous.slowOrWrongCount + 1
    : Math.max(0, previous.slowOrWrongCount - 1);

  const provisional: FactStats = {
    ...previous,
    shown,
    correct,
    incorrect,
    timeouts,
    avgMs,
    lastSeenTs: now,
    recent,
    fastStreak,
    slowOrWrongCount,
  };

  const confidence = calculateConfidence(provisional, isCorrect, safeResponseMs, timeout, speedTarget);
  const accuracy = shown > 0 ? correct / shown : 0;
  const mastery = clamp((confidence / 100) * 0.75 + accuracy * 0.25, 0, 1);
  const nextStats: FactStats = {
    ...provisional,
    confidence,
    mastery,
    lastStatus: getFactStatus({ ...provisional, confidence, mastery }),
  };

  return {
    ...factStats,
    [fact.id]: nextStats,
  };
}

export function getFactWeight(fact: MathQuestion, stats: FactStats | undefined, speedTarget: number, now: number = Date.now()): number {
  if (!stats || stats.shown === 0) return 4 + (fact.difficulty || 1) * 0.3;

  const fluentMs = getFluentMs(speedTarget);
  const accuracy = stats.shown > 0 ? stats.correct / stats.shown : 0;
  const recent = stats.recent.slice(-5);
  const recentWeak = recent.filter((attempt) => !attempt.isCorrect || attempt.timeout || attempt.responseMs > fluentMs * 2.2).length;
  const overdueHours = stats.lastSeenTs > 0 ? (now - stats.lastSeenTs) / 3600000 : 0;
  const status = getFactStatus(stats);

  let weight = 1;
  weight += (1 - stats.mastery) * 3;
  weight += (1 - accuracy) * 2;
  weight += recentWeak * 1.5;
  weight += stats.slowOrWrongCount * 0.4;
  weight += Math.min(2, overdueHours / 24);

  if (stats.avgMs > fluentMs * 2.2) weight += 1.5;
  if (status === "struggling") weight += 3;
  if (status === "learning") weight += 2;
  if (status === "near-ready") weight += 1;
  if (status === "review") weight += 0.5;
  if (status === "fluent") weight -= 0.7;

  return clamp(weight, 0.4, 12);
}

export function chooseNextFact(
  pool: MathQuestion[],
  factStats: FactStatsMap,
  speedTarget: number,
  previousId?: string
): MathQuestion | null {
  if (pool.length === 0) return null;

  const choices = pool.filter((fact) => fact.id !== previousId);
  const usableChoices = choices.length > 0 ? choices : pool;
  const weighted = usableChoices.map((fact) => ({
    fact,
    weight: getFactWeight(fact, factStats[fact.id], speedTarget),
  }));

  const total = weighted.reduce((sum, item) => sum + item.weight, 0);
  let pick = Math.random() * total;

  for (const item of weighted) {
    pick -= item.weight;
    if (pick <= 0) return item.fact;
  }

  return weighted[weighted.length - 1].fact;
}

export function getPriorityReviewQuestions(
  pool: MathQuestion[],
  factStats: FactStatsMap,
  speedTarget: number,
  limit: number = 30
): MathQuestion[] {
  return pool
    .filter((fact) => {
      const status = getFactStatus(factStats[fact.id]);
      return status === "struggling" || status === "learning" || status === "near-ready";
    })
    .sort((a, b) => getFactWeight(b, factStats[b.id], speedTarget) - getFactWeight(a, factStats[a.id], speedTarget))
    .slice(0, limit);
}

export function mergeUniqueQuestions(...groups: MathQuestion[][]): MathQuestion[] {
  const seen: { [key: string]: boolean } = {};
  const merged: MathQuestion[] = [];

  groups.forEach((group) => {
    group.forEach((fact) => {
      if (!seen[fact.id]) {
        seen[fact.id] = true;
        merged.push(fact);
      }
    });
  });

  return merged;
}

export function getPracticeStatusSummary(pool: MathQuestion[], factStats: FactStatsMap): PracticeStatusSummary {
  const summary: PracticeStatusSummary = {
    needsPractice: 0,
    reviewSoon: 0,
    almostThere: 0,
    fluent: 0,
    unseen: 0,
    total: pool.length,
  };

  pool.forEach((fact) => {
    const status = getFactStatus(factStats[fact.id]);
    if (status === "empty") summary.unseen += 1;
    else if (status === "fluent") summary.fluent += 1;
    else if (status === "review") summary.reviewSoon += 1;
    else if (status === "near-ready") summary.almostThere += 1;
    else summary.needsPractice += 1;
  });

  return summary;
}

export function getStrategyAdaptiveMastery(
  pool: MathQuestion[],
  factStats: FactStatsMap,
  speedTarget: number,
  roundCorrect: number,
  roundAttempts: number,
  bronzeMilestone: number
): StrategyMasterySummary {
  const summary = getPracticeStatusSummary(pool, factStats);
  const seen = pool.filter((fact) => (factStats[fact.id]?.shown || 0) > 0).length;
  const fluentOrReview = pool.filter((fact) => {
    const status = getFactStatus(factStats[fact.id]);
    return status === "fluent" || status === "review";
  }).length;
  const struggling = pool.filter((fact) => getFactStatus(factStats[fact.id]) === "struggling").length;
  const total = Math.max(1, pool.length);
  const roundAccuracy = roundAttempts > 0 ? roundCorrect / roundAttempts : 0;
  const speedPassed = roundCorrect >= bronzeMilestone;
  const enoughCoverage = seen / total >= 0.35;
  const enoughFluentOrReview = fluentOrReview / total >= 0.7;
  const notTooManyStruggling = struggling / total <= 0.15;

  return {
    ...summary,
    seen,
    fluentOrReview,
    struggling,
    roundAccuracy,
    speedPassed,
    isMastered: speedPassed && roundAccuracy >= 0.8 && enoughCoverage && enoughFluentOrReview && notTooManyStruggling,
  };
}
