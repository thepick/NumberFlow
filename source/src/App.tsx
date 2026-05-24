import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Trophy, 
  BookOpen, 
  Star, 
  ArrowRight, 
  Lightbulb, 
  Play, 
  ArrowLeft, 
  X, 
  Sparkles, 
  Check, 
  ChevronRight, 
  HelpCircle, 
  Clock,
  Compass,
  ArrowRightCircle,
  TrendingUp,
  Award,
  Unlock,
  RefreshCw,
  Settings
} from "lucide-react";
import { 
  STAGES, 
  STRATEGIES, 
  StageId, 
  Stage, 
  Strategy, 
  MathQuestion,
  generateQuestionPoolForStrategy 
} from "./strategies";
import {
  FactStatsMap,
  chooseNextFact,
  getFactStatus,
  getPracticeStatusSummary,
  getPriorityReviewQuestions,
  getStrategyAdaptiveMastery,
  mergeUniqueQuestions,
  updateFactStats,
} from "./adaptiveEngine";

interface SavedProgress {
  viewedStrategyIds: number[];
  masteredStrategyIds: number[];
  stars: number;
  speedTarget?: number;
  bestStreaks?: { [key: number]: number };
  bestSpeeds?: { [key: number]: number };
  factStats?: FactStatsMap;
}

function printCertificate(
  stageNum: number, 
  stageName: string, 
  emoji: string, 
  description: string, 
  starsCount: number, 
  userName: string
) {
  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    alert("Please allow popups to save or print certificates!");
    return;
  }
  
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>Certificate - Stage ${stageNum}: ${stageName}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,800;1,400&family=Inter:wght@400;600;800&family=JetBrains+Mono:wght@700&display=swap');
          
          @page {
            size: A4 landscape;
            margin: 0;
          }
          
          body {
            margin: 0;
            padding: 0;
            background: #f1f5f9;
            font-family: 'Inter', sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          
          .certificate {
            width: 297mm;
            height: 210mm;
            box-sizing: border-box;
            background: #ffffff;
            border: 22px solid #1e3a8a;
            padding: 24px;
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            text-align: center;
            box-shadow: 0 10px 40px rgba(0,0,0,0.12);
            overflow: hidden;
          }

          .certificate-inner {
            border: 4px solid #d97706;
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            padding: 24px 36px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            background: radial-gradient(circle, rgba(254,243,199,0.12) 0%, rgba(255,255,255,1) 85%);
          }

          .header {
            margin-top: 5px;
          }
          
          .org {
            font-size: 11px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 4px;
            color: #475569;
          }
          
          .guild-seal {
            margin-top: 8px;
            font-size: 42px;
            line-height: 1;
            filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1));
          }
          
          .main-title {
            font-family: 'Playfair Display', serif;
            font-size: 34px;
            font-weight: 800;
            color: #1e3a8a;
            margin: 8px 0 3px 0;
            letter-spacing: 0.5px;
            text-transform: uppercase;
          }
          
          .award-line {
            font-size: 14px;
            font-style: italic;
            color: #64748b;
            margin-bottom: 12px;
          }
          
          .recipient {
            font-family: 'Playfair Display', serif;
            font-size: 38px;
            font-weight: 800;
            color: #d97706;
            border-bottom: 2.5px solid #cbd5e1;
            padding-bottom: 4px;
            width: 75%;
            margin: 0 auto;
            text-transform: capitalize;
            letter-spacing: 0.5px;
          }
          
          .descr {
            font-size: 13px;
            line-height: 1.5;
            color: #334155;
            max-w: 80%;
            margin: 12px auto;
            font-weight: 500;
          }
          
          .meta-info {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            margin-top: 15px;
          }
          
          .signature-box {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 180px;
          }
          
          .signature-line {
            width: 100%;
            border-bottom: 1.5px solid #cbd5e1;
            margin-bottom: 4px;
            padding-bottom: 2px;
            color: #1e3a8a;
            font-weight: bold;
          }

          .sig-text {
            font-size: 9px;
            font-weight: 800;
            color: #475569;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          
          .badge-box {
            background: #fffbeb;
            border: 2.5px solid #f59e0b;
            padding: 8px 16px;
            border-radius: 16px;
          }

          .badge-large {
            font-size: 14px;
            font-weight: 800;
            color: #1e3a8a;
            display: flex;
            align-items: center;
            gap: 5px;
            letter-spacing: 1px;
          }
          
          .print-btn-container {
            position: fixed;
            top: 16px;
            right: 16px;
            z-index: 1000;
          }
          
          .print-btn {
            background: #2563eb;
            color: white;
            border: none;
            padding: 10px 20px;
            font-size: 13px;
            font-weight: bold;
            border-radius: 24px;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(37,99,235,0.35);
            transition: all 0.15s ease;
            font-family: 'Inter', sans-serif;
          }
          
          .print-btn:hover {
            background: #1d4ed8;
            transform: translateY(-1.5px);
          }

          @media print {
            .print-btn-container {
              display: none !important;
            }
            body {
              background: #ffffff;
            }
            .certificate {
              box-shadow: none;
              width: 297mm;
              height: 210mm;
              page-break-inside: avoid;
            }
          }
        </style>
      </head>
      <body>
        <div class="print-btn-container">
          <button class="print-btn" onclick="window.print()">🖨️ Print Diploma (Save PDF)</button>
        </div>
        
        <div class="certificate">
          <div class="certificate-inner">
            <div class="header">
              <div class="org">🏆 Mental Math Journey Master Guild 🏆</div>
              <div class="guild-seal">${emoji}</div>
            </div>
            
            <div>
              <h1 class="main-title" style="white-space: nowrap;">${stageName.toUpperCase().includes("GRAND") || stageName.toUpperCase().includes("JOURNEY") ? "GRANDMASTER CERTIFICATE" : "STAGE MASTER CERTIFICATE"}</h1>
              <div class="award-line" style="white-space: nowrap;">This official math achievement diploma is proudly awarded to:</div>
              
              <div class="recipient" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 90%;">${userName || "Elite Math Scholar"}</div>
              
              <p class="descr" style="line-height: 1.6; max-width: 850px; margin: 15px auto;">
                Who has successfully trained their brain, unlocked automaticity, and demonstrated outstanding mathematical fluency in<br>
                <span style="display: inline-block; white-space: nowrap; font-weight: 800; color: #1e3a8a; font-size: 15px; background: rgba(30,58,138,0.06); padding: 2px 10px; border-radius: 6px; margin: 4px 0;">Stage ${stageNum}: ${stageName}</span>.<br>
                Approved by the Mental Math Masters of calculations!
              </p>
            </div>
            
            <div class="meta-info">
              <div class="signature-box" style="white-space: nowrap;">
                <div class="signature-line" style="font-family:'Playfair Display', serif; font-size:14px; font-style:italic; white-space: nowrap;">
                  Mental Math Journey
                </div>
                <div class="sig-text" style="white-space: nowrap;">Primary Guild Registrar</div>
              </div>
              
              <div class="badge-box" style="white-space: nowrap;">
                <div class="badge-large" style="white-space: nowrap;">
                  <span>✨</span>
                  <span style="white-space: nowrap;">STAGE ${stageNum} COMPLETED</span>
                  <span>✨</span>
                </div>
              </div>
              
              <div class="signature-box" style="white-space: nowrap;">
                <div class="signature-line" style="font-family:'JetBrains Mono', monospace; font-size:10px; color:#475569; white-space: nowrap;">
                  ID-SEC-${starsCount * 9 + 42}-${stageNum}
                </div>
                <div class="sig-text" style="white-space: nowrap;">Verification Security Stamp</div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
  
  printWindow.document.write(htmlContent);
  printWindow.document.close();
}

export default function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const factStatsRef = useRef<FactStatsMap>({});
  const currentQuestionRef = useRef<MathQuestion | null>(null);
  const questionStartedAtRef = useRef<number>(Date.now());
  const answerLockedRef = useRef<boolean>(false);
  const roundCompletedRef = useRef<boolean>(false);
  const countdownTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const roundAttemptsRef = useRef<number>(0);
  const roundCorrectAttemptsRef = useRef<number>(0);
  const roundWrongAttemptsRef = useRef<number>(0);
  const currentStrategyFactsRef = useRef<MathQuestion[]>([]);
  const questionPoolRef = useRef<MathQuestion[]>([]);
  // State elements
  const [currentStageId, setCurrentStageId] = useState<StageId>(StageId.StarterIsland);
  const [activeStrategyRound, setActiveStrategyRound] = useState<Strategy | null>(null);
  const [activeModalStrategy, setActiveModalStrategy] = useState<Strategy | null>(null);
  const [activeModalReason, setActiveModalReason] = useState<string>("You unlocked a new stop on your math journey!");
  
  // Game progression
  const [viewedStrategyIds, setViewedStrategyIds] = useState<number[]>([1]);
  const [masteredStrategyIds, setMasteredStrategyIds] = useState<number[]>([]);
  const [stars, setStars] = useState<number>(0);
  const [studentName, setStudentName] = useState<string>("Elite Math Explorer");
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);

  // Settings
  const [speedTarget, setSpeedTarget] = useState<number>(20);
  const [bestStreaks, setBestStreaks] = useState<{ [key: number]: number }>({});
  const [bestSpeeds, setBestSpeeds] = useState<{ [key: number]: number }>({});
  
  // Math Round State
  const [roundQuestions, setRoundQuestions] = useState<MathQuestion[]>([]);
  const [currentStrategyFacts, setCurrentStrategyFacts] = useState<MathQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<MathQuestion | null>(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [questionStartedAt, setQuestionStartedAt] = useState<number>(Date.now());
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [roundCompleted, setRoundCompleted] = useState<boolean>(false);
  const [roundScore, setRoundScore] = useState<number>(0);
  const [roundAttempts, setRoundAttempts] = useState<number>(0);
  const [roundCorrectAttempts, setRoundCorrectAttempts] = useState<number>(0);
  const [roundWrongAttempts, setRoundWrongAttempts] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [factStats, setFactStats] = useState<FactStatsMap>({});

  // Stats in the round
  const [isRoundActive, setIsRoundActive] = useState<boolean>(false);
  const [countdownValue, setCountdownValue] = useState<string | null>(null);
  const [countdownLabel, setCountdownLabel] = useState<string>("Get ready");
  const [currentStreak, setCurrentStreak] = useState<number>(0);
  const [bestStreakRound, setBestStreakRound] = useState<number>(0);
  
  // Visual feedbacks
  const [isAnimatingCorrect, setIsAnimatingCorrect] = useState<boolean>(false);
  const [isAnimatingIncorrect, setIsAnimatingIncorrect] = useState<boolean>(false);
  const [sparklesList, setSparklesList] = useState<{ id: number; x: number; y: number }[]>([]);
  const [avatar, setAvatar] = useState<string>("🦊");
  const [encouragingText, setEncouragingText] = useState<string>("Let's go!");
  const [lockTip, setLockTip] = useState<string | null>(null);
  
  // Timed quiz state variables
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [consecutiveErrors, setConsecutiveErrors] = useState<number>(0);
  const [spamWarning, setSpamWarning] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState<boolean>(false);
  
  // Tab control: "map" or "encyclopedia"
  const [activeTab, setActiveTab] = useState<"map" | "encyclopedia" | "practice">("map");
  const isTimedQuizInProgress = activeTab === "practice" && !!activeStrategyRound && !roundCompleted && (isRoundActive || countdownValue !== null);

  const getLearnerStatusLabel = (status: ReturnType<typeof getFactStatus>) => {
    switch (status) {
      case "fluent":
        return "Ready";
      case "review":
        return "Review soon";
      case "near-ready":
        return "Almost ready";
      case "learning":
        return "Building";
      case "needs-support":
        return "Needs extra practice";
      default:
        return "Not started yet";
    }
  };

  // Load progress from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("mental_math_journey_progress");
      if (saved) {
        const parsed: SavedProgress = JSON.parse(saved);
        if (parsed.viewedStrategyIds) setViewedStrategyIds(parsed.viewedStrategyIds);
        if (parsed.masteredStrategyIds) setMasteredStrategyIds(parsed.masteredStrategyIds);
        if (typeof parsed.stars === "number") setStars(parsed.stars);
        if (typeof parsed.speedTarget === "number") setSpeedTarget(parsed.speedTarget);
        if (parsed.bestStreaks) setBestStreaks(parsed.bestStreaks);
        if (parsed.bestSpeeds) setBestSpeeds(parsed.bestSpeeds);
        if (parsed.factStats) {
          setFactStats(parsed.factStats);
          factStatsRef.current = parsed.factStats;
        }
      }
    } catch (e) {
      console.warn("Failed to load local storage progress", e);
    }
  }, []);

  useEffect(() => {
    factStatsRef.current = factStats;
  }, [factStats]);

  useEffect(() => {
    return () => {
      countdownTimersRef.current.forEach((timerId) => clearTimeout(timerId));
      document.body.classList.remove("timed-quiz-active");
      document.documentElement.classList.remove("timed-quiz-active");
    };
  }, []);

  // Save progress
  const saveProgress = (
    viewed: number[], 
    mastered: number[], 
    newStars: number,
    tgt: number = speedTarget,
    streaks: { [key: number]: number } = bestStreaks,
    speeds: { [key: number]: number } = bestSpeeds,
    stats: FactStatsMap = factStatsRef.current
  ) => {
    try {
      const data: SavedProgress = {
        viewedStrategyIds: viewed,
        masteredStrategyIds: mastered,
        stars: newStars,
        speedTarget: tgt,
        bestStreaks: streaks,
        bestSpeeds: speeds,
        factStats: stats,
      };
      localStorage.setItem("mental_math_journey_progress", JSON.stringify(data));
    } catch (e) {
      console.error("Failed to save progress", e);
    }
  };

  // Trigger strategy break modal
  const handleOpenStrategySlide = (strategy: Strategy, reasonOverride?: string) => {
    const reasons = [
      "You unlocked a new strategy!",
      "You arrived at a fresh path stop!",
      "Helpful guide discovered!",
      "Sparkling math power unlocked!",
      "You earned a new star!",
      "You reached a new stop on your math journey!"
    ];
    // Use the predefined reason if specific, otherwise random child-friendly celebration
    const reasonValue = reasonOverride || strategy.reason || reasons[Math.floor(Math.random() * reasons.length)];
    setActiveModalReason(reasonValue);
    setActiveModalStrategy(strategy);
    
    // Unlock this strategy in progress
    if (!viewedStrategyIds.includes(strategy.id)) {
      const nextViewed = [...viewedStrategyIds, strategy.id];
      setViewedStrategyIds(nextViewed);
      saveProgress(nextViewed, masteredStrategyIds, stars);
    }
  };

  const buildAdaptivePracticePool = (strategy: Strategy) => {
    const currentFacts = generateQuestionPoolForStrategy(strategy.code);
    const earlierStrategies = STRATEGIES.filter((item) =>
      item.id < strategy.id && (viewedStrategyIds.includes(item.id) || masteredStrategyIds.includes(item.id))
    );
    const previousFacts = mergeUniqueQuestions(
      ...earlierStrategies.map((item) => generateQuestionPoolForStrategy(item.code))
    );
    const reviewLimit = Math.max(2, Math.min(8, Math.round(currentFacts.length * 0.12)));
    const priorityReview = getPriorityReviewQuestions(previousFacts, factStatsRef.current, speedTarget, reviewLimit);
    return {
      currentFacts,
      practicePool: mergeUniqueQuestions(currentFacts, priorityReview),
    };
  };

  const getReviewFactsForActiveRound = () => {
    const currentFactIds = new Set(currentStrategyFactsRef.current.map((fact) => fact.id));
    return questionPoolRef.current.filter((fact) => !currentFactIds.has(fact.id));
  };

  const chooseNextRoundFact = (statsSnapshot: FactStatsMap, previousId?: string): MathQuestion | null => {
    const currentPool = currentStrategyFactsRef.current.length > 0
      ? currentStrategyFactsRef.current
      : questionPoolRef.current;
    const reviewPool = getReviewFactsForActiveRound();
    const shouldUseQuickReview = reviewPool.length > 0 && roundAttemptsRef.current > 0 && roundAttemptsRef.current % 6 === 0;
    const preferredPool = shouldUseQuickReview ? reviewPool : currentPool;

    return (
      chooseNextFact(preferredPool, statsSnapshot, speedTarget, previousId) ||
      chooseNextFact(questionPoolRef.current, statsSnapshot, speedTarget, previousId)
    );
  };

  const activateQuestion = (question: MathQuestion | null) => {
    currentQuestionRef.current = question;
    setCurrentQuestion(question);
    const now = Date.now();
    questionStartedAtRef.current = now;
    setQuestionStartedAt(now);
  };

  const recordFactAttempt = (isCorrect: boolean, timeout: boolean = false): FactStatsMap => {
    const fact = currentQuestionRef.current;
    if (!fact) return factStatsRef.current;

    const responseMs = Date.now() - questionStartedAtRef.current;
    const updatedStats = updateFactStats(
      factStatsRef.current,
      fact,
      isCorrect,
      Math.max(1, responseMs),
      timeout,
      speedTarget
    );

    factStatsRef.current = updatedStats;
    setFactStats(updatedStats);
    saveProgress(viewedStrategyIds, masteredStrategyIds, stars, speedTarget, bestStreaks, bestSpeeds, updatedStats);

    roundAttemptsRef.current += 1;
    setRoundAttempts(roundAttemptsRef.current);
    if (isCorrect) {
      roundCorrectAttemptsRef.current += 1;
      setRoundCorrectAttempts(roundCorrectAttemptsRef.current);
    } else {
      roundWrongAttemptsRef.current += 1;
      setRoundWrongAttempts(roundWrongAttemptsRef.current);
    }

    return updatedStats;
  };

  const advanceToNextQuestion = (statsSnapshot: FactStatsMap = factStatsRef.current) => {
    const previousId = currentQuestionRef.current?.id;
    const nextQuestion = chooseNextRoundFact(statsSnapshot, previousId);
    activateQuestion(nextQuestion);
    setCurrentQuestionIdx((prev) => prev + 1);
  };

  const finishRound = () => {
    if (roundCompletedRef.current) return;
    roundCompletedRef.current = true;
    if (currentQuestionRef.current && !answerLockedRef.current) {
      recordFactAttempt(false, true);
    }
    setRoundCompleted(true);
  };

  const clearRoundCountdown = () => {
    countdownTimersRef.current.forEach((timerId) => clearTimeout(timerId));
    countdownTimersRef.current = [];
    setCountdownValue(null);
    setCountdownLabel("Get ready");
  };

  const resetTimedRoundCounters = () => {
    roundCompletedRef.current = false;
    answerLockedRef.current = false;
    const now = Date.now();
    questionStartedAtRef.current = now;
    setQuestionStartedAt(now);
    setTimeLeft(60);
    setRoundScore(0);
    setRoundAttempts(0);
    setRoundCorrectAttempts(0);
    setRoundWrongAttempts(0);
    roundAttemptsRef.current = 0;
    roundCorrectAttemptsRef.current = 0;
    roundWrongAttemptsRef.current = 0;
    setCurrentQuestionIdx(0);
    setUserAnswer("");
    setRoundCompleted(false);
    setCurrentStreak(0);
    setBestStreakRound(0);
    setConsecutiveErrors(0);
    setSpamWarning(null);
    setShowHint(false);
  };

  const beginTimedRoundNow = () => {
    clearRoundCountdown();
    resetTimedRoundCounters();
    setIsRoundActive(true);
    window.setTimeout(() => {
      const activeElement = document.activeElement as HTMLElement | null;
      if (activeElement && typeof activeElement.blur === "function") {
        activeElement.blur();
      }
    }, 0);
  };

  const startTimedRoundCountdown = () => {
    if (isRoundActive || countdownValue !== null) return;
    resetTimedRoundCounters();
    setIsRoundActive(false);
    setCountdownLabel("Get ready");
    setCountdownValue("3");
    setEncouragingText("Get ready... 🚀");

    const steps: Array<{ delay: number; value: string | null; label: string; done?: boolean }> = [
      { delay: 1000, value: "2", label: "Get ready" },
      { delay: 2000, value: "1", label: "Get ready" },
      { delay: 3000, value: "Go!", label: "Start" },
      { delay: 3700, value: null, label: "Start", done: true },
    ];

    countdownTimersRef.current = steps.map((step) => window.setTimeout(() => {
      if (step.done) {
        beginTimedRoundNow();
        return;
      }
      setCountdownLabel(step.label);
      setCountdownValue(step.value);
    }, step.delay));
  };

  // Launch practice session
  const handleStartPracticeRound = (strategy: Strategy) => {
    clearRoundCountdown();
    setActiveModalStrategy(null); // Close modal
    setActiveStrategyRound(strategy);

    const { currentFacts, practicePool } = buildAdaptivePracticePool(strategy);
    currentStrategyFactsRef.current = currentFacts;
    questionPoolRef.current = practicePool;
    setCurrentStrategyFacts(currentFacts);
    setRoundQuestions(practicePool);

    const firstQuestion = chooseNextFact(currentFacts, factStatsRef.current, speedTarget);
    activateQuestion(firstQuestion);

    setCurrentQuestionIdx(0);
    setUserAnswer("");
    setShowHint(false);
    setRoundCompleted(false);
    roundCompletedRef.current = false;
    answerLockedRef.current = false;
    setRoundScore(0);
    setRoundAttempts(0);
    setRoundCorrectAttempts(0);
    setRoundWrongAttempts(0);
    roundAttemptsRef.current = 0;
    roundCorrectAttemptsRef.current = 0;
    roundWrongAttemptsRef.current = 0;
    setTimeLeft(60); // Reset timer to 1 minute (60 seconds)
    setConsecutiveErrors(0);
    setSpamWarning(null);
    setEncouragingText("Type fast and stay focused! Let's go! 🚀");
    
    // Reset round states
    setCurrentStreak(0);
    setBestStreakRound(0);
    setIsRoundActive(false);

    setActiveTab("practice");
  };

  // Timer countdown mechanism
  useEffect(() => {
    let intervalId: any = null;
    if (activeTab === "practice" && activeStrategyRound && isRoundActive && !roundCompleted) {
      intervalId = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalId);
            finishRound();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [activeTab, activeStrategyRound, isRoundActive, roundCompleted]);

  // Core save progression and rewards calculation once round ends
  useEffect(() => {
    if (roundCompleted && activeStrategyRound) {
      const finalScore = roundScore;
      
      const goldMilestone = speedTarget;
      const silverMilestone = Math.max(6, Math.round(speedTarget * 0.6));
      const bronzeMilestone = Math.max(3, Math.round(speedTarget * 0.3));

      let starsGained = 0;
      if (finalScore >= goldMilestone) starsGained = 3;
      else if (finalScore >= silverMilestone) starsGained = 2;
      else if (finalScore >= bronzeMilestone) starsGained = 1;

      const newTotalStars = stars + starsGained;
      setStars(newTotalStars);

      const id = activeStrategyRound.id;
      const masterySummary = getStrategyAdaptiveMastery(
        currentStrategyFactsRef.current,
        factStatsRef.current,
        speedTarget,
        roundCorrectAttemptsRef.current,
        roundAttemptsRef.current,
        bronzeMilestone
      );
      const isPassed = masterySummary.isMastered;
      
      let currentMastered = [...masteredStrategyIds];
      let currentViewed = [...viewedStrategyIds];
      
      if (isPassed) {
        if (!currentMastered.includes(id)) {
          currentMastered.push(id);
        }
        const nextSlideId = id + 1;
        if (nextSlideId <= STRATEGIES.length && !currentViewed.includes(nextSlideId)) {
          currentViewed.push(nextSlideId);
        }
      }

      setMasteredStrategyIds(currentMastered);
      setViewedStrategyIds(currentViewed);

      // Save best speeds and streaks
      const activeId = activeStrategyRound.id;
      const currentSpeed = finalScore; // 60 seconds round score is the items/min
      
      const bestStrEver = Math.max(bestStreaks[activeId] || 0, bestStreakRound);
      const bestSpdEver = Math.max(bestSpeeds[activeId] || 0, currentSpeed);

      const updatedStreaks = { ...bestStreaks, [activeId]: bestStrEver };
      const updatedSpeeds = { ...bestSpeeds, [activeId]: bestSpdEver };

      setBestStreaks(updatedStreaks);
      setBestSpeeds(updatedSpeeds);

      saveProgress(currentViewed, currentMastered, newTotalStars, speedTarget, updatedStreaks, updatedSpeeds, factStatsRef.current);
    }
  }, [roundCompleted]);

  // Number Pad Click support
  const handleNumClick = (val: string) => {
    if (!isRoundActive) return; // Do not allow typing before round starts
    if (val === "DELETE") {
      setUserAnswer((prev) => prev.slice(0, -1));
    } else if (val === "CLEAR") {
      setUserAnswer("");
    } else {
      if (userAnswer.length < 8) {
        setUserAnswer((prev) => prev + val);
      }
    }
  };

  const handleCorrectAnswer = () => {
    if (answerLockedRef.current || roundCompletedRef.current) return;
    answerLockedRef.current = true;
    const updatedStats = recordFactAttempt(true);

    setIsAnimatingCorrect(true);
    setRoundScore((prev) => prev + 1);
    
    // Update streaks
    const nextStreak = currentStreak + 1;
    setCurrentStreak(nextStreak);
    if (nextStreak > bestStreakRound) {
      setBestStreakRound(nextStreak);
    }

    setConsecutiveErrors(0);
    setSpamWarning(null);
    
    const praises = ["Woohoo!", "Phenomenal!", "Correct!", "Super Star!", "Wow!", "High Five!", "Fantastic!"];
    const randomPraise = praises[Math.floor(Math.random() * praises.length)];
    setEncouragingText(`${randomPraise} 🦊`);

    const list = Array.from({ length: 12 }).map(() => ({
      id: Math.random(),
      x: (Math.random() - 0.5) * 160,
      y: (Math.random() - 0.5) * 160,
    }));
    setSparklesList(list);

    setTimeout(() => {
      setIsAnimatingCorrect(false);
      setSparklesList([]);
      setUserAnswer("");
      setShowHint(false);
      advanceToNextQuestion(updatedStats);
      answerLockedRef.current = false;
    }, 450);
  };

  const handleIncorrectAnswer = () => {
    if (answerLockedRef.current || roundCompletedRef.current) return;
    answerLockedRef.current = true;
    recordFactAttempt(false);

    setIsAnimatingIncorrect(true);
    setIsShaking(true);
    
    // Reset streak on error
    setCurrentStreak(0);
    
    setConsecutiveErrors((prev) => {
      const nextVal = prev + 1;
      if (nextVal >= 3) {
        setSpamWarning("🐢 Slow down and think! Look closely at the numbers. This fact will come back for extra practice.");
      }
      return nextVal;
    });

    setTimeout(() => {
      setIsAnimatingIncorrect(false);
      setIsShaking(false);
      setUserAnswer(""); // Clear error immediately
      questionStartedAtRef.current = Date.now();
      setQuestionStartedAt(questionStartedAtRef.current);
      answerLockedRef.current = false;
    }, 400);
  };

  // Keep mobile keyboards hidden during timed quizzes. Hardware keyboard input is handled below.
  useEffect(() => {
    if (!isTimedQuizInProgress) {
      document.body.classList.remove("timed-quiz-active");
      document.documentElement.classList.remove("timed-quiz-active");
      return;
    }

    document.body.classList.add("timed-quiz-active");
    document.documentElement.classList.add("timed-quiz-active");

    const blurFocusedInput = () => {
      const activeElement = document.activeElement as HTMLElement | null;
      if (activeElement && typeof activeElement.blur === "function") {
        activeElement.blur();
      }
      inputRef.current?.blur();
    };

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    blurFocusedInput();
    const blurTimer = window.setTimeout(blurFocusedInput, 75);

    return () => {
      window.clearTimeout(blurTimer);
      document.body.classList.remove("timed-quiz-active");
      document.documentElement.classList.remove("timed-quiz-active");
    };
  }, [isTimedQuizInProgress, currentQuestionIdx]);

  // Hardware keyboard support without focusing a mobile text input
  useEffect(() => {
    if (!isTimedQuizInProgress || !isRoundActive) return;

    const handleHardwareKey = (event: KeyboardEvent) => {
      if (/^[0-9]$/.test(event.key)) {
        event.preventDefault();
        handleNumClick(event.key);
        return;
      }
      if (event.key === "Backspace" || event.key === "Delete") {
        event.preventDefault();
        handleNumClick("DELETE");
        return;
      }
      if (event.key === "Enter") {
        event.preventDefault();
        handleSubmitAnswer();
      }
    };

    window.addEventListener("keydown", handleHardwareKey);
    return () => window.removeEventListener("keydown", handleHardwareKey);
  }, [isTimedQuizInProgress, isRoundActive, userAnswer, currentQuestion]);

  // Typing listener for correct answer matching
  useEffect(() => {
    if (activeTab === "practice" && activeStrategyRound && isRoundActive && !roundCompleted) {
      const currentQ = currentQuestion;
      if (currentQ) {
        const cleaned = userAnswer.trim();
        if (cleaned !== "") {
          const parsed = parseInt(cleaned, 10);
          const correctAns = currentQ.answer;
          
          if (parsed === correctAns) {
            handleCorrectAnswer();
          } else {
            const correctLen = String(correctAns).length;
            if (cleaned.length >= correctLen) {
              handleIncorrectAnswer();
            }
          }
        }
      }
    }
  }, [userAnswer, currentQuestion, activeTab, activeStrategyRound, isRoundActive, roundCompleted]);

  // Check manual entry
  const handleSubmitAnswer = () => {
    if (!userAnswer.trim()) return;
    
    const parsedAns = parseInt(userAnswer, 10);
    const currentQ = currentQuestion;
    
    if (currentQ) {
      if (parsedAns === currentQ.answer) {
        handleCorrectAnswer();
      } else {
        handleIncorrectAnswer();
      }
    }
  };

  const currentLevelProgressPercent = Math.round((masteredStrategyIds.length / STRATEGIES.length) * 100);

  // Dynamic stage unlocking logic
  const isStageUnlocked = (stageId: number) => {
    if (stageId === 1) return true;
    const prevStageId = stageId - 1;
    const prevStageStrategies = STRATEGIES.filter(s => s.stageId === prevStageId);
    const prevStageMasteredCount = prevStageStrategies.filter(s => masteredStrategyIds.includes(s.id)).length;
    return prevStageMasteredCount === prevStageStrategies.length;
  };

  // Helper arrays for Stages filter
  const activeStage = STAGES.find(s => s.id === currentStageId) || STAGES[0];
  const activeStrategies = STRATEGIES.filter(s => s.stageId === currentStageId);
  const practiceStatusSummary = getPracticeStatusSummary(currentStrategyFacts, factStats);
  const currentQuestionStatus = currentQuestion ? getFactStatus(factStats[currentQuestion.id]) : "empty";
  const currentLessonFactIds = new Set(currentStrategyFacts.map((fact) => fact.id));
  const isQuickReviewFact = !!currentQuestion && currentLessonFactIds.size > 0 && !currentLessonFactIds.has(currentQuestion.id);
  const roundAccuracyPercent = roundAttempts > 0 ? Math.round((roundCorrectAttempts / roundAttempts) * 100) : 100;
  const bronzeMilestoneForMastery = Math.max(3, Math.round(speedTarget * 0.3));
  const currentMasterySummary = getStrategyAdaptiveMastery(
    currentStrategyFacts,
    factStats,
    speedTarget,
    roundCorrectAttempts,
    roundAttempts,
    bronzeMilestoneForMastery
  );
  const activeStrategyPassed = !!activeStrategyRound && (
    currentMasterySummary.isMastered || masteredStrategyIds.includes(activeStrategyRound.id)
  );
  const nextStrategyAfterRound = activeStrategyRound
    ? STRATEGIES.find((strategy) => strategy.id === activeStrategyRound.id + 1)
    : undefined;
  const roundPassTarget = Math.max(bronzeMilestoneForMastery, Math.max(6, Math.round(speedTarget * 0.6)));

  // Quick reset progress helper (for teachers/testing)
  const handleResetProgress = () => {
    if (window.confirm("Do you want to reset your stars and math journey path?")) {
      clearRoundCountdown();
      setViewedStrategyIds([1]);
      setMasteredStrategyIds([]);
      setStars(0);
      setBestSpeeds({});
      setBestStreaks({});
      setFactStats({});
      factStatsRef.current = {};
      setSpeedTarget(20);
      localStorage.removeItem("mental_math_journey_progress");
      setCurrentStageId(StageId.StarterIsland);
      setActiveTab("map");
    }
  };

  return (
    <div className="min-h-screen bg-[#E0F2FE] text-slate-900 font-sans flex flex-col selection:bg-yellow-400 selection:text-blue-900 relative">
      
      {/* Dynamic friendly glowing background circles */}
      <div className="absolute top-0 left-0 w-full h-full opacity-35 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-10 left-[8%] w-48 h-48 bg-yellow-300 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-24 right-[5%] w-72 h-72 bg-emerald-300 rounded-full blur-3xl"></div>
        <div className="absolute top-[40%] left-[15%] w-56 h-56 bg-pink-300 rounded-full blur-3xl"></div>
      </div>

      {/* HEADER HUD */}
      {!isTimedQuizInProgress && (
      <header className="border-b-[4px] border-blue-200 bg-white/90 backdrop-blur-md px-4 py-3 shadow-md">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          
          <div className="flex items-center justify-center sm:justify-start gap-2.5 w-full sm:w-auto text-center sm:text-left">
            <span className="text-4xl animate-bounce-slow">🎒</span>
            <div>
              <h1 className="text-2xl md:text-3xl font-display font-black text-blue-950 tracking-tight flex items-center gap-1.5 leading-none justify-center sm:justify-start">
                Mental Math Journey
              </h1>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-2.5 sm:gap-6 w-full sm:w-auto">
            {/* Stars Meter */}
            <div className="flex shrink-0 items-center gap-2.5 sm:gap-3.5 bg-[#fdfbe7] px-4 sm:px-5 py-1.5 rounded-full border-[3px] border-[#fbcf22] shadow-xs select-none">
              <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500 fill-yellow-400 stroke-[2.5]" />
              <div className="flex flex-col text-right leading-none">
                <span className="font-mono text-xl sm:text-2xl font-black text-blue-950">{stars}</span>
                <span className="text-[8px] sm:text-[9px] font-black tracking-wider text-blue-700 uppercase mt-0.5 whitespace-nowrap">Stars Earned</span>
              </div>
            </div>

            {/* Overall Journey Tracker */}
            <div className="flex min-w-0 flex-1 sm:flex-none flex-col max-w-[10rem] sm:w-36">
              <div className="flex justify-between items-end gap-2 text-[8px] sm:text-[10px] uppercase tracking-wider text-blue-800 font-black mb-1">
                <span className="truncate">Journey Path</span>
                <span className="font-mono font-black text-blue-900 whitespace-nowrap">{currentLevelProgressPercent}%<span className="hidden sm:inline"> Done</span></span>
              </div>
              <div className="w-full bg-blue-100 rounded-full h-2.5 sm:h-3 overflow-hidden border-2 border-blue-200 shadow-inner">
                <div 
                  className="bg-yellow-400 h-full rounded-full transition-all duration-700"
                  style={{ width: `${currentLevelProgressPercent}%` }}
                />
              </div>
            </div>

            {/* Settings Gear Button */}
            <button
              id="settings-gear-btn"
              onClick={() => setShowSettingsModal(true)}
              className="shrink-0 bg-white hover:bg-slate-50 text-slate-700 p-2.5 rounded-full border-2 border-blue-200 hover:border-blue-300 transition-all cursor-pointer active:translate-y-0.5"
              title="Adventure Settings"
            >
              <Settings className="w-5 h-5 text-blue-900 animate-hover-spin" />
            </button>
          </div>

        </div>
      </header>
      )}

      {/* SUB MENU NAVIGATION */}
      {!isTimedQuizInProgress && (
      <div className="bg-blue-900/10 border-b-[4px] border-blue-200/80 py-3 px-4">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-2">
          <button
            id="tab-map"
            onClick={() => setActiveTab("map")}
            className={`px-4 py-2.5 rounded-2xl text-xs md:text-sm font-black transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "map" 
                ? "bg-blue-600 text-white shadow-[0_4px_0px_0px_#1E40AF] border-2 border-blue-700"
                : "bg-white hover:bg-blue-50 text-blue-950 border-2 border-blue-200 hover:border-blue-300"
            }`}
          >
            <Compass className="w-4 h-4" />
            Adventure Map Stages
          </button>
          
          <button
            id="tab-encyclopedia"
            onClick={() => setActiveTab("encyclopedia")}
            className={`px-4 py-2.5 rounded-2xl text-xs md:text-sm font-black transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "encyclopedia" 
                ? "bg-blue-600 text-white shadow-[0_4px_0px_0px_#1E40AF] border-2 border-blue-700"
                : "bg-white hover:bg-blue-50 text-blue-950 border-2 border-blue-200 hover:border-blue-300"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            All {STRATEGIES.length} Math Lessons ({viewedStrategyIds.length}/{STRATEGIES.length})
          </button>

        </div>
      </div>
      )}

      {/* CORE DISPLAY WINDOW */}
      <main className={`flex-1 max-w-6xl w-full mx-auto ${isTimedQuizInProgress ? "timed-quiz-main p-0 sm:p-4 md:p-6" : "p-4 md:p-6"}`}>
        
        {/* TAB 1: ADVENTURE MAP STAGES */}
        {activeTab === "map" && (
          <div className="space-y-8">
            
            {/* GRAND EXPLORATION CELEBRATION HEADER CARD */}
            {masteredStrategyIds.length >= STRATEGIES.length && (
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                className="bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-100 border-[8px] border-yellow-400 p-8 md:p-12 rounded-[48px] shadow-[0_24px_0px_0px_#EAB308] text-center space-y-6 relative overflow-hidden text-slate-900 mb-8"
              >
                {/* Visual sparkles confetti background deco */}
                <div className="absolute top-0 left-0 w-full h-[8px] bg-gradient-to-r from-yellow-400 via-red-400 to-emerald-400" />
                <div className="absolute -top-10 -right-10 w-44 h-44 bg-yellow-300/20 rounded-full blur-2xl animate-pulse" />
                <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-green-300/20 rounded-full blur-2xl animate-pulse" />

                <div className="relative z-10 space-y-4">
                  <div className="inline-block relative">
                    <span className="text-8xl md:text-9xl animate-bounce-slow block drop-shadow-md">👑</span>
                    <span className="text-4xl absolute -top-2 -right-2 animate-spin-slow">✨</span>
                    <span className="text-4xl absolute -bottom-2 -left-2 animate-pulse">🌟</span>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-mono uppercase bg-yellow-400 text-amber-950 font-black px-4 py-1.5 rounded-full border-2 border-amber-500 tracking-widest inline-block animate-pulse">
                      Journey Completed! 🏆
                    </span>
                    <h2 className="text-3xl md:text-5xl font-display font-black text-amber-950 tracking-tight leading-tight">
                      Mental Math Champion!
                    </h2>
                    <p className="text-sm md:text-lg text-amber-900 font-extrabold max-w-2xl mx-auto leading-relaxed">
                      Amazing job, Explorer! You have conquered all <strong>{STRATEGIES.length} kingdoms of strategic mental arithmetic</strong> with rapid speed and automaticity.
                    </p>
                  </div>

                  {/* GRAND CHAMPION DIPLOMA FRAME */}
                  <div className="max-w-xl mx-auto bg-white/95 border-4 border-dashed border-amber-400 p-6 md:p-8 rounded-[32px] shadow-inner space-y-4 relative">
                    <div className="absolute top-3 right-3 text-3xl">🏅</div>
                    <div className="absolute bottom-3 left-3 text-3xl">🌱</div>
                    
                    <span className="text-[10px] font-mono tracking-widest font-black uppercase text-slate-400 block">Mental Arithmetic Guild</span>
                    <h3 className="text-2xl font-black text-blue-950 tracking-tight">EXPLORER GRANDMASTER CERTIFICATE</h3>
                    <p className="text-xs font-bold text-slate-600 max-w-md mx-auto">
                      Passed with high achievements in Anchor Facts, Number Line Jumps, Twin Power Doubles, Make-Ten Bridge structures, and Double-Digit Partitioning.
                    </p>

                    <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
                      {/* Custom styled Stars Earned badge matching attached image guidelines */}
                      <div className="flex items-center gap-3.5 bg-amber-50 border-[3px] border-amber-400 px-5 py-2 rounded-full shadow-xs select-none">
                        <Star className="w-6 h-6 text-yellow-500 fill-yellow-400 stroke-[2]" />
                        <div className="flex flex-col text-left leading-none">
                          <span className="font-mono text-xl font-black text-blue-950">{stars}</span>
                          <span className="text-[8px] font-black tracking-wider text-blue-700 uppercase mt-0.5 whitespace-nowrap">Stars Earned</span>
                        </div>
                      </div>

                      {/* Custom styled Lessons Mastered badge */}
                      <div className="flex items-center gap-3.5 bg-emerald-50 border-[3px] border-emerald-400 px-5 py-2 rounded-full shadow-xs select-none">
                        <Award className="w-6 h-6 text-emerald-500 fill-emerald-300/[0.15] stroke-[2]" />
                        <div className="flex flex-col text-left leading-none">
                          <span className="font-mono text-xl font-black text-blue-950">{masteredStrategyIds.length} / {STRATEGIES.length}</span>
                          <span className="text-[8px] font-black tracking-wider text-emerald-800 uppercase mt-0.5 whitespace-nowrap">Lessons Mastered</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <p className="text-[11px] font-mono text-slate-400 font-black">
                        Date: {new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })} • Verified Grandmaster status
                      </p>
                    </div>

                    {/* Student Name Input for grandmaster */}
                    <div className="border-t-[3px] border-amber-300 pt-4 mt-4 space-y-2">
                      <label className="text-[10px] font-mono tracking-wider font-black uppercase text-amber-800 block text-center">
                        Customize Student Name for Graduation Diploma:
                      </label>
                      <div className="flex flex-col sm:flex-row gap-2 max-w-sm mx-auto">
                        <input
                          type="text"
                          placeholder="Your Explorer Name"
                          value={studentName}
                          onChange={(e) => setStudentName(e.target.value)}
                          className="flex-1 px-4 py-2 bg-yellow-50 border-2 border-yellow-300 rounded-xl font-bold text-xs focus:ring-2 focus:ring-yellow-400 focus:outline-hidden text-center text-slate-900"
                        />
                        <button
                          onClick={() => printCertificate(6, "Ultimate Mental Math Journey", "👑", "Explorer Grandmaster Course Completed", stars, studentName)}
                          className="bg-amber-500 hover:bg-amber-600 border-2 border-amber-600 text-white font-black px-4 py-2 rounded-xl text-xs transition shadow-xs active:translate-y-0.5 whitespace-nowrap cursor-pointer flex items-center justify-center gap-1"
                        >
                          🖨️ Save/Print Diploma
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Action row */}
                  <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                    <button
                      onClick={() => {
                        if (confirm("Would you like to restart your adventure to beat your previous scores and improve your countdown records? (This keeps your Lessons visible!)")) {
                          setMasteredStrategyIds([]);
                          setStars(0);
                          // Back to initial Stop 1
                          setViewedStrategyIds([1]);
                          saveProgress([1], [], 0);
                        }
                      }}
                      className="bg-[#FF4757] hover:bg-[#FF6B81] text-white font-black py-4 px-8 rounded-2xl text-sm transition border-2 border-[#D63031] shadow-[0_4px_0px_0px_#D63031] active:translate-y-0.5 active:shadow-none cursor-pointer flex items-center justify-center gap-2"
                    >
                      <RefreshCw className="w-4 h-4 text-white" />
                      Restart math adventure challenge
                    </button>

                    <button
                      onClick={() => setActiveTab("encyclopedia")}
                      className="bg-white hover:bg-slate-50 text-slate-700 font-black py-4 px-8 rounded-2xl text-xs transition border-2 border-slate-200 cursor-pointer active:translate-y-0.5"
                    >
                      Browse lessons index
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* World Selector Nodes - The Journey Path */}
            <div>
              <div className="text-center max-w-xl mx-auto mb-6">
                <span className="text-4xl">🧭</span>
                <h2 className="text-2xl md:text-3xl font-display font-black text-blue-950 mt-2">Select Your Exploration Stop</h2>
                <p className="text-sm text-blue-850 font-extrabold mt-1">
                  Each region unlocks fantastic, smart tricks to make math super fast in your brain. 
                  Click a stop below to see what math powers lie inside!
                </p>
              </div>

              {lockTip && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="max-w-xl mx-auto mb-6 bg-red-50 border-2 border-red-300 rounded-2xl p-4 text-center text-sm font-extrabold text-red-650 flex items-center justify-center gap-2 shadow-sm"
                >
                  <span className="text-xl">⚠️</span> {lockTip}
                </motion.div>
              )}

              {/* Path Grid representation */}
              <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
                {STAGES.map((world, idx) => {
                  const isCurrent = currentStageId === world.id;
                  const isUnlockedStage = isStageUnlocked(world.id);
                  
                  // Count total and mastered strategies in this stage
                  const stageStrategies = STRATEGIES.filter(s => s.stageId === world.id);
                  const stageMastered = stageStrategies.filter(s => masteredStrategyIds.includes(s.id)).length;
                  const stageTotal = stageStrategies.length;

                  return (
                    <button
                      key={world.id}
                      onClick={() => {
                        if (isUnlockedStage) {
                          setCurrentStageId(world.id);
                          setLockTip(null);
                        } else {
                          const prevStage = STAGES.find(s => s.id === world.id - 1);
                          setLockTip(`🔒 To travel to ${world.name}, first master all mental math stops in Stage ${world.id - 1} (${prevStage?.name || ""})! 🚀`);
                        }
                      }}
                      className={`relative text-left p-4 rounded-2xl border-4 transition-all cursor-pointer flex flex-col justify-between overflow-hidden group ${
                        isCurrent 
                          ? "bg-white border-yellow-400 shadow-[0_6px_0px_0px_#F59E0B] scale-102"
                          : isUnlockedStage
                          ? "bg-white border-blue-200 hover:border-blue-300 shadow-[0_6px_0px_0px_#DBEAFE]"
                          : "bg-slate-100/70 border-slate-200 shadow-none opacity-75 cursor-not-allowed"
                      }`}
                    >
                      {/* background color indicator */}
                      <div className={`absolute top-0 right-0 w-24 h-24 rounded-full -mr-8 -mt-8 opacity-15 bg-gradient-to-br ${world.color}`} />
                      
                      <div>
                        {/* Stage Number badge */}
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-mono tracking-wider text-blue-500 uppercase font-black">
                            Stage {world.id}
                          </span>
                          {!isUnlockedStage ? (
                            <span className="text-[10px] bg-slate-200 text-slate-600 border border-slate-300 px-1.5 py-0.5 rounded-full font-black uppercase flex items-center gap-1">
                              🔒 Locked
                            </span>
                          ) : stageMastered === stageTotal && stageTotal > 0 ? (
                            <span className="text-[10px] bg-green-100 text-green-700 border border-green-300 px-1.5 py-0.5 rounded-full font-black uppercase">
                              🏰 Pass
                            </span>
                          ) : null}
                        </div>

                        {/* Large Emoji & Name */}
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-3xl">{isUnlockedStage ? world.emoji : "🔒"}</span>
                          <h3 className="font-display font-black text-xs md:text-sm text-blue-950 group-hover:text-blue-600 transition-colors leading-tight">
                            {world.name}
                          </h3>
                        </div>

                        <p className="text-[11px] text-gray-500 font-bold leading-tight line-clamp-2 mt-1">
                          {isUnlockedStage ? world.description : `Master all of Stage ${world.id - 1} first!`}
                        </p>
                      </div>

                      {/* Score Indicator */}
                      <div className="mt-4 pt-2.5 border-t-2 border-slate-100 flex items-center justify-between w-full">
                        <div className="flex items-center gap-1 text-[11px] font-black text-blue-850">
                          <Trophy className="w-3.5 h-3.5 text-yellow-500" />
                          <span className="font-mono">{stageMastered}/{stageTotal}</span>
                          <span className="text-[10px] text-gray-400">Stars</span>
                        </div>
                        <div className="w-10 bg-blue-100 rounded-full h-1.5 overflow-hidden">
                          <div 
                            className={`h-full rounded-full bg-gradient-to-r ${world.color}`}
                            style={{ width: `${(stageMastered / stageTotal) * 100}%` }}
                          />
                        </div>
                      </div>

                      {/* Active glowing indicator */}
                      {isCurrent && (
                        <div className="absolute top-0 left-0 w-full h-[4px] bg-yellow-400" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t-2 border-slate-200/50 my-6" />

            {/* Current Selected Stage strategies deck */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-yellow-50 p-6 rounded-[32px] border-4 border-yellow-300 shadow-[0_4px_0px_0px_#FDE047]">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{activeStage.emoji}</span>
                  <div>
                    <h3 className="text-lg md:text-xl font-display font-black text-blue-950 flex items-center gap-2">
                      Stage {activeStage.id}: {activeStage.name}
                    </h3>
                    <p className="text-xs md:text-sm text-blue-800 font-bold">{activeStage.description}</p>
                  </div>
                </div>
                <div className="text-right text-xs text-blue-900 bg-white border-2 border-yellow-300 px-3.5 py-2 rounded-2xl font-black">
                  Contains <strong className="text-blue-600 font-mono font-black">{activeStrategies.length} strategy stops</strong>
                </div>
              </div>

              {/* STAGE COMPLETED CERTIFICATE BANNER */}
              {(() => {
                const activeStageMasteredCount = activeStrategies.filter(s => masteredStrategyIds.includes(s.id)).length;
                const isStageFullyMastered = activeStageMasteredCount === activeStrategies.length && activeStrategies.length > 0;
                
                if (!isStageFullyMastered) return null;

                return (
                  <motion.div 
                    initial={{ scale: 0.98, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-gradient-to-r from-blue-50 to-indigo-50 border-4 border-indigo-300 p-6 rounded-[32px] shadow-[0_6px_0px_0px_#C7D2FE] flex flex-col md:flex-row items-center justify-between gap-4 mt-2"
                  >
                    <div className="flex items-center gap-3.5 text-center md:text-left flex-wrap md:flex-nowrap justify-center md:justify-start">
                      <span className="text-4xl animate-pulse">📜</span>
                      <div>
                        <h4 className="font-display font-black text-indigo-950 text-base md:text-lg">
                          🎉 Stage Completed! You have unlocked your Custom Diploma!
                        </h4>
                        <p className="text-xs text-indigo-800 font-bold">
                          Type your name below to print your custom <strong>Stage {activeStage.id} Diploma</strong>:
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                      <input
                        type="text"
                        placeholder="Your Explorer Name"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        className="px-4 py-2.5 bg-white border-2 border-indigo-200 rounded-xl font-bold text-xs focus:ring-2 focus:ring-indigo-400 focus:outline-hidden w-full sm:w-48 text-center text-slate-900"
                      />
                      <button
                        onClick={() => printCertificate(activeStage.id, activeStage.name, activeStage.emoji, activeStage.description, stars, studentName)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-black py-2.5 px-5 rounded-xl text-xs transition border-2 border-indigo-800 shadow-[0_3px_0px_0px_#4338CA] whitespace-nowrap active:translate-y-0.5 active:shadow-none w-full sm:w-auto cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        🖨️ Save/Print Diploma
                      </button>
                    </div>
                  </motion.div>
                );
              })()}

              {/* Strategy grid list for active level */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeStrategies.map((strategy, sIdx) => {
                  const isViewed = viewedStrategyIds.includes(strategy.id);
                  const isMastered = masteredStrategyIds.includes(strategy.id);
                  const isUnlocked = strategy.id === 1 || isViewed || isMastered;

                  return (
                    <div 
                      key={strategy.id}
                      className={`p-6 rounded-[28px] border-4 transition-all relative overflow-hidden flex flex-col justify-between ${
                        isMastered
                          ? "bg-emerald-50/90 border-emerald-400 shadow-[0_6px_0px_0px_#A7F3D0]"
                          : isUnlocked
                          ? "bg-white border-blue-200 hover:border-blue-300 shadow-[0_6px_0px_0px_#DBEAFE] hover:shadow-[0_6px_0px_0px_#93C5FD]"
                          : "bg-slate-50/60 border-slate-200 opacity-80"
                      }`}
                    >
                      <div className="space-y-2">
                        {/* Top Line badge */}
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[11px] text-blue-700 font-black bg-blue-50 px-2.5 py-0.5 rounded-lg border border-blue-100">
                            Stop {strategy.id}/{STRATEGIES.length}
                          </span>
                          
                          <div className="flex gap-1.5">
                            {isMastered ? (
                              <span className="bg-emerald-100 text-emerald-700 text-[10px] px-2.5 py-1 rounded-full border border-emerald-250 flex items-center gap-1 font-black uppercase">
                                <Check className="w-3.5 h-3.5 text-emerald-650 stroke-[3]" /> Mastered Fact
                              </span>
                            ) : isUnlocked ? (
                              <span className="bg-yellow-105 text-yellow-750 text-[10px] px-2.5 py-1 rounded-full border border-yellow-300 flex items-center gap-1 font-black uppercase">
                                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" /> Lesson Unlocked
                              </span>
                            ) : (
                              <span className="bg-slate-100 text-slate-400 text-[10px] px-2.5 py-1 rounded-full border border-slate-200 flex items-center gap-1 font-bold uppercase">
                                🔒 Locked Stop
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Title */}
                        <h4 className={`text-lg font-display font-black tracking-tight ${isUnlocked ? "text-blue-950" : "text-slate-500"}`}>
                          {!isUnlocked ? "🔒 " : ""}{strategy.name}
                        </h4>

                        <p className={`text-xs md:text-sm font-bold leading-relaxed ${isUnlocked ? "text-gray-650" : "text-slate-400"}`}>
                          {isUnlocked ? strategy.explanation : "Master the previous math kingdoms to unlock this quest!"}
                        </p>

                        {/* Example Box */}
                        <div className="bg-blue-50/30 p-2.5 rounded-xl border-2 border-slate-100 mt-2.5 flex items-center justify-between text-xs font-mono font-bold">
                          <span className={`uppercase tracking-widest text-[9px] font-black ${isUnlocked ? "text-blue-500" : "text-slate-400"}`}>Try This:</span>
                          <span className={`${isUnlocked ? "text-amber-600 font-extrabold" : "text-slate-400"}`}>{isUnlocked ? strategy.example : "???"}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="mt-5 pt-3.5 border-t-2 border-slate-100 flex items-center gap-2">
                        {/* Lesson viewer */}
                        <button
                          disabled={!isUnlocked}
                          onClick={() => handleOpenStrategySlide(strategy)}
                          className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 border-2 ${
                            isUnlocked
                              ? "bg-white hover:bg-slate-50 border-slate-200 text-slate-700 cursor-pointer active:translate-y-0.5"
                              : "bg-slate-50 border-slate-200 text-slate-300 cursor-not-allowed"
                          }`}
                        >
                          <BookOpen className={`w-3.5 h-3.5 ${isUnlocked ? "text-[#FF4757]" : "text-slate-300"}`} />
                          View Info Slide
                        </button>

                        {/* Practice Arena opener */}
                        <button
                          disabled={!isUnlocked}
                          onClick={() => handleStartPracticeRound(strategy)}
                          className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 border-2 ${
                            !isUnlocked
                              ? "bg-slate-50 border-slate-200 text-slate-300 cursor-not-allowed"
                              : isMastered
                              ? "bg-emerald-100 border-emerald-300 text-emerald-700 hover:bg-emerald-250 cursor-pointer active:translate-y-0.5"
                              : "bg-[#FF4757] hover:bg-[#FF6B81] border-[#D63031] text-white shadow-[0_3px_0px_0px_#D63031] cursor-pointer active:translate-y-0.5"
                          }`}
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          Practice Game
                        </button>
                      </div>

                      {/* Mastery Star Badge */}
                      {isMastered && (
                        <div className="absolute top-2 right-2 rotate-12 opacity-10">
                          <Star className="w-16 h-16 text-yellow-500 fill-yellow-400" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: ALL 17 LESSONS (ENCYCLOPEDIA) */}
        {activeTab === "encyclopedia" && (
          <div className="space-y-6">
            <div className="text-center max-w-lg mx-auto mb-6">
              <span className="text-4xl">📖</span>
              <h2 className="text-2xl md:text-3xl font-display font-black text-blue-950 mt-2">All {STRATEGIES.length} Math Strategy Slides</h2>
              <p className="text-sm text-blue-800 font-extrabold mt-1">
                A handy guide for students and teachers. Browse each designed slide in order below, then launch its custom test arena anytime!
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {STRATEGIES.map((strategy) => {
                const isViewed = viewedStrategyIds.includes(strategy.id);
                const isMastered = masteredStrategyIds.includes(strategy.id);
                const isUnlocked = strategy.id === 1 || isViewed || isMastered;
                const ownStageValue = STAGES.find(s => s.id === strategy.stageId) || STAGES[0];

                return (
                  <div 
                    key={strategy.id}
                    id={`slide-card-${strategy.id}`}
                    className={`rounded-[32px] border-4 p-6 md:p-8 relative overflow-hidden transition-all ${
                      isMastered
                        ? "bg-emerald-50/40 border-emerald-300 shadow-[0_6px_0px_0px_#A7F3D0]"
                        : isUnlocked
                        ? "bg-white border-blue-200 shadow-[0_6px_0px_0px_#DBEAFE] hover:border-blue-300 hover:shadow-[0_6px_0px_0px_#93C5FD]"
                        : "bg-slate-100/50 border-slate-200 opacity-75 shadow-none"
                    }`}
                  >
                    {/* Header Row with no absolute overlap in mobile */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-4 border-b border-dashed border-slate-150 pb-3">
                      {/* Badge / Stop Marker */}
                      <span className="text-xs bg-blue-50 border border-blue-200 font-mono font-black text-blue-700 px-3 py-1 rounded-full w-fit">
                        Slide {strategy.id} of {STRATEGIES.length} • Strategy Stop
                      </span>

                      {/* Stage indicator */}
                      <span className="text-xs bg-blue-50 border border-blue-200 px-3 py-1 font-black flex items-center gap-1.5 rounded-full text-blue-900 w-fit">
                        <span>{ownStageValue.emoji}</span>
                        <span>{ownStageValue.name}</span>
                      </span>
                    </div>

                    <div className="max-w-xl">

                      {/* Stage/Stop Unlocking badge */}
                      <div className="text-yellow-750 text-xs font-black mb-2 flex items-center gap-1 bg-yellow-50 border border-yellow-250 w-fit px-2.5 py-1 rounded-full">
                        <Sparkles className="w-3.5 h-3.5 text-yellow-550" />
                        {strategy.reason}
                      </div>

                      {/* Strategy Name */}
                      <h3 className={`text-xl md:text-2xl font-display font-black tracking-tight mb-2 ${isUnlocked ? "text-blue-950" : "text-slate-400"}`}>
                        {!isUnlocked ? "🔒 Stop Locked" : strategy.name}
                      </h3>

                      {/* Explanation */}
                      <p className={`text-sm font-bold pr-10 mb-5 leading-relaxed ${isUnlocked ? "text-gray-650" : "text-slate-400"}`}>
                        {isUnlocked ? strategy.explanation : "This strategy stop is locked! Pass the previous stop to unlock this math superpower!"}
                      </p>

                      {/* Split section like requested: Example and Think */}
                      {isUnlocked ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          {/* Example */}
                          <div className="bg-blue-50/50 p-4 rounded-xl border-2 border-blue-105">
                            <span className="text-[11px] font-mono uppercase tracking-widest text-[#FF4757] font-black block mb-1">
                              Example:
                            </span>
                            <span className="text-lg font-mono font-black text-blue-950">
                              {strategy.example}
                            </span>
                          </div>

                          {/* Think */}
                          <div className="bg-yellow-50/50 p-4 rounded-xl border-2 border-yellow-105">
                            <span className="text-[11px] font-mono uppercase tracking-widest text-yellow-700 font-black block mb-2">
                              Think:
                            </span>
                            <div className="space-y-1">
                              {strategy.thinkSteps.map((step, idx) => (
                                <p key={idx} className="text-xs text-blue-900 leading-snug font-black flex items-start gap-1.5">
                                  <span className="text-yellow-500 font-bold mt-0.5 inline-block">•</span>
                                  <span>{step}</span>
                                </p>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-slate-50 px-6 py-8 rounded-2xl border-2 border-dashed border-slate-200 mb-6 text-center text-xs font-black text-slate-400 flex flex-col items-center justify-center gap-1">
                          <span className="text-3xl mb-1">🔐</span>
                          <span>Complete stop {strategy.id - 1} with a passing sprint to unlock!</span>
                        </div>
                      )}

                      {/* Footer Tip & Run */}
                      <div className="flex flex-col sm:flex-row items-baseline sm:items-center justify-between gap-3 pt-3.5 border-t-2 border-slate-100 text-xs">
                        <span className="text-gray-400 font-bold">
                          {isUnlocked ? "Try this in the next round when it helps." : "Secret mental math trick hidden inside."}
                        </span>
                        
                        <div className="flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                          <button
                            disabled={!isUnlocked}
                            onClick={() => handleStartPracticeRound(strategy)}
                            className={`font-black py-2 px-4 rounded-xl flex items-center gap-1.5 transition border-2 w-full justify-center sm:w-auto ${
                              !isUnlocked
                                ? "bg-slate-100 border-slate-200 text-slate-300 cursor-not-allowed"
                                : "bg-[#FF4757] hover:bg-[#FF6B81] text-white shadow-[0_3px_0px_0px_#D63031] active:translate-y-0.5 active:shadow-none border-[#D63031] cursor-pointer"
                            }`}
                          >
                            <Play className="w-3 h-3 fill-current" />
                            Start Practice Round
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: THE PRACTICE ARENA SCREEN */}
        {activeTab === "practice" && activeStrategyRound && (
          <div className={`max-w-2xl mx-auto ${isTimedQuizInProgress ? "timed-practice-shell" : ""}`}>
            
            {/* Header back options */}
            {!isTimedQuizInProgress && (
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => {
                  clearRoundCountdown();
                  setIsRoundActive(false);
                  setActiveTab("map");
                }}
                className="text-xs text-blue-800 hover:text-blue-900 flex items-center gap-1.5 bg-white border-2 border-blue-200 px-3 py-1.5 rounded-xl font-black transition active:translate-y-0.5 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                Map
              </button>

              <span className="text-xs bg-white border-2 border-blue-200 px-3 py-1.5 rounded-xl text-blue-900 font-black">
                Lesson {activeStrategyRound.id}/{STRATEGIES.length}
              </span>
            </div>
            )}

            {/* Main practicing card */}
            <div className={`bg-white rounded-[40px] border-[6px] border-blue-400 p-6 md:p-8 relative overflow-hidden shadow-[0_20px_0px_0px_#BFDBFE] text-slate-900 ${isTimedQuizInProgress ? "timed-quiz-card" : ""}`}>
              
              {/* Outer boundary glow */}
              <div className="absolute top-0 left-0 w-full h-[6px] bg-[#FF4757]" />

              <AnimatePresence>
                {countdownValue !== null && (
                  <motion.div
                    key="timed-round-countdown"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-50 grid place-items-center bg-white/80 backdrop-blur-[2px] pointer-events-none"
                    aria-live="assertive"
                  >
                    <div className="rounded-[32px] border-4 border-blue-300 bg-white/95 px-8 py-6 text-center shadow-2xl min-w-[180px]">
                      <div className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-700 mb-2">
                        {countdownLabel}
                      </div>
                      <motion.div
                        key={countdownValue}
                        initial={{ scale: 0.72, opacity: 0, y: 12 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 1.2, opacity: 0, y: -12 }}
                        transition={{ type: "spring", stiffness: 420, damping: 18 }}
                        className="text-6xl md:text-8xl font-black font-display text-[#FF4757] leading-none"
                      >
                        {countdownValue}
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {!roundCompleted ? (
                // Active Math Quest Layout
                <div className="space-y-6">
                  
                  {/* Ready State Pre-round */}
                  {!isRoundActive ? (
                    <div className="text-center py-6 space-y-6">
                      <div className="space-y-2">
                        <span className="inline-block bg-blue-105 border-2 border-blue-200 text-blue-700 text-xs font-black px-3.5 py-1.5 rounded-full">
                          1-Minute Sprint
                        </span>
                        <h3 className="text-2xl md:text-3xl font-display font-black text-blue-950">
                          {activeStrategyRound.name}
                        </h3>
                        <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                          Answer as many as you can in 1 minute.
                        </p>
                      </div>

                      {/* Sprint goal grid */}
                      <div className="bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl max-w-md mx-auto space-y-3">
                        <span className="text-[10px] text-slate-400 font-black font-mono uppercase tracking-widest block">
                          1-Minute Sprint Goals
                        </span>
                        <div className="grid grid-cols-3 gap-2 text-center text-xs font-black">
                          <div className="p-3 bg-white border-2 border-amber-200 rounded-xl shadow-xs">
                            <span className="block text-xl">🥉</span>
                            <span className="text-amber-800 block mt-1">Bronze</span>
                            <span className="font-mono text-sm text-slate-500">{Math.max(3, Math.round(speedTarget * 0.3))} correct</span>
                          </div>
                          
                          <div className="p-3 bg-white border-2 border-slate-300 rounded-xl shadow-xs">
                            <span className="block text-xl">🥈</span>
                            <span className="text-slate-700 block mt-1">Silver</span>
                            <span className="font-mono text-sm text-slate-500">{Math.max(6, Math.round(speedTarget * 0.6))} correct</span>
                          </div>

                          <div className="p-3 bg-white border-2 border-yellow-350 rounded-xl shadow-xs">
                            <span className="block text-xl">🥇</span>
                            <span className="text-yellow-800 block mt-1">Gold Goal</span>
                            <span className="font-mono text-sm text-slate-500">{speedTarget} correct</span>
                          </div>
                        </div>
                        <p className="text-[10px] text-blue-800 font-extrabold">
                          Pass: {roundPassTarget}+ correct and 80% correct.
                        </p>
                      </div>

                      {/* Lesson slide shortcut prior to start */}
                      <button
                        onClick={() => handleOpenStrategySlide(activeStrategyRound)}
                        className="mx-auto bg-white hover:bg-slate-50 border-2 border-slate-200 text-xs text-slate-700 font-black py-3 px-6 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer active:translate-y-0.5"
                      >
                        <BookOpen className="w-4 h-4 text-[#FF4757]" />
                        Review lesson
                      </button>

                      {/* Huge Start Button */}
                      <button
                        onClick={startTimedRoundCountdown}
                        className="w-full max-w-[340px] mx-auto block bg-emerald-500 hover:bg-emerald-600 text-white font-black py-4 rounded-2xl text-lg transition border-2 border-emerald-600 shadow-[0_5px_0px_#047857] active:scale-98 active:translate-y-0.5 cursor-pointer active:shadow-none"
                      >
                        Start Sprint
                      </button>
                    </div>
                  ) : (
                    // Timed Active Sprint Playing Layout
                    <div className="timed-sprint-layout">
                      
                      {(() => {
                        const elapsed = 60 - timeLeft;
                        const realtimeSpeed = elapsed > 0 ? (roundScore / elapsed) * 60 : 0;
                        return (
                          <div className="timed-stats-grid grid grid-cols-4 gap-2 bg-slate-50/80 px-3 py-2 rounded-2xl border border-slate-100 text-center">
                            <div className="flex flex-col items-center justify-center">
                              <Clock className={`w-4 h-4 text-[#FF4757] stroke-[3.5] ${timeLeft <= 15 ? "animate-pulse" : ""}`} />
                              <span className={`font-mono text-base font-black ${timeLeft <= 15 ? "text-red-650" : "text-blue-950"}`}>{timeLeft}s</span>
                              <span className="text-[9px] font-black uppercase text-slate-500">Time</span>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                              <Trophy className="w-4 h-4 text-amber-500 stroke-[3.5]" />
                              <span className="font-mono text-base font-black text-blue-950">{roundScore}</span>
                              <span className="text-[9px] font-black uppercase text-slate-500">Solved</span>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                              <span className="text-base leading-none">🔥</span>
                              <span className="font-mono text-base font-black text-orange-600">{currentStreak}</span>
                              <span className="text-[9px] font-black uppercase text-slate-500">Streak</span>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                              <span className="text-base leading-none">🏃</span>
                              <span className="font-mono text-base font-black text-blue-950">{realtimeSpeed.toFixed(0)}</span>
                              <span className="text-[9px] font-black uppercase text-slate-500">/min</span>
                            </div>
                          </div>
                        );
                      })()}

                      {/* Math Question Arena Display */}
                      <motion.div 
                        onClick={() => inputRef.current?.blur()}
                        animate={isShaking ? { x: [-10, 10, -10, 10, -5, 5, 0] } : {}}
                        transition={{ duration: 0.3 }}
                        className={`timed-question-card text-center py-6 md:py-8 rounded-3xl border-4 transition-all duration-200 relative overflow-hidden select-none cursor-pointer ${
                          isAnimatingCorrect 
                            ? "border-emerald-500 bg-emerald-50/10" 
                            : isShaking 
                            ? "border-rose-500 bg-rose-50/10" 
                            : "bg-slate-50/50 border-slate-200 hover:border-slate-350"
                        }`}
                      >
                        <span className={`text-[10px] font-mono uppercase bg-white border font-black px-2.5 py-0.5 rounded-full inline-block mb-2 ${isQuickReviewFact ? "border-amber-200 text-amber-700" : "border-slate-250 text-slate-500"}`}>
                          {isQuickReviewFact ? "Quick Review" : activeStrategyRound.name}
                        </span>

                        {/* Centered Question Formula */}
                        <div className="relative z-10 py-2">
                          <AnimatePresence mode="wait">
                            <motion.h4 
                              key={currentQuestionIdx}
                              initial={{ opacity: 0, scale: 0.96 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 1.04 }}
                              className="text-5xl md:text-7xl font-sans font-extrabold tracking-tight text-slate-800"
                            >
                              {currentQuestion?.question}
                            </motion.h4>
                          </AnimatePresence>
                        </div>

                        {/* Active Central Blue Input Box */}
                        <div className="mt-2.5 relative z-10">
                          <div className={`border-4 bg-white rounded-2xl w-44 h-16 flex items-center justify-center mx-auto text-3xl font-extrabold font-mono transition shadow-inner select-none ${
                            isAnimatingCorrect 
                              ? "border-emerald-500 text-emerald-600 scale-102"
                              : isShaking 
                              ? "border-rose-500 text-rose-500" 
                              : "border-sky-500 text-sky-600"
                          }`}>
                            {userAnswer === "" ? (
                              <span className="text-slate-300">?</span>
                            ) : (
                              <span>{userAnswer}</span>
                            )}
                          </div>
                        </div>

                        {/* Subtle flash text messages */}
                        {isAnimatingCorrect && (
                          <div className="absolute top-2 right-4 text-xs font-black text-emerald-600 uppercase tracking-wider animate-bounce">
                            Correct! ✨
                          </div>
                        )}
                        {isShaking && (
                          <div className="absolute top-2 right-4 text-xs font-black text-rose-600 uppercase tracking-rider animate-pulse">
                            Let's try again! ☄️
                          </div>
                        )}
                      </motion.div>

                      {/* Interactive Spam Warning */}
                      {spamWarning && !isTimedQuizInProgress && (
                        <motion.div 
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-amber-100 border-2 border-amber-300 rounded-xl p-3 text-center text-xs font-extrabold text-amber-900 flex items-center justify-center gap-1.5 shadow-sm"
                        >
                          <span>⚠️</span> {spamWarning}
                        </motion.div>
                      )}

                      {/* Computer keyboard typing bridge (invisible trigger) */}
                      <input
                        ref={inputRef}
                        type="text"
                        pattern="[0-9]*"
                        inputMode="none"
                        autoComplete="off"
                        value={userAnswer}
                        onChange={(e) => {
                          const val = e.target.value.replace(/[^0-9]/g, "");
                          setUserAnswer(val);
                        }}
                        className="sr-only opacity-0 absolute pointer-events-none"
                        readOnly
                        tabIndex={-1}
                        aria-hidden="true"
                      />

                      {/* RESTORED KEYPAD EXACTLY AS PREVIOUSLY DESIGNED */}
                      <div className="timed-keypad-wrap space-y-3">
                        <div className="grid grid-cols-3 gap-2.5 max-w-[340px] mx-auto select-none">
                          {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((num) => (
                            <button
                              key={num}
                              onClick={() => handleNumClick(num)}
                              className="bg-white hover:bg-slate-50 border-[2px] border-slate-200 text-slate-800 py-3 rounded-xl text-2xl font-black flex items-center justify-center cursor-pointer transition active:scale-95 shadow-xs font-sans"
                            >
                              {num}
                            </button>
                          ))}
                          
                          {/* 0 Spanning 2 columns */}
                          <button
                            onClick={() => handleNumClick("0")}
                            className="col-span-2 bg-white hover:bg-slate-50 border-[2px] border-slate-200 text-slate-800 py-3 rounded-xl text-2xl font-black flex items-center justify-center cursor-pointer transition active:scale-95 shadow-xs font-sans"
                          >
                            0
                          </button>

                          {/* Delete key ⌫ */}
                          <button
                            onClick={() => handleNumClick("DELETE")}
                            className="bg-[#FFF5F5] hover:bg-red-50 border-[2px] border-red-100 text-rose-600 py-3 rounded-xl text-xl font-black flex items-center justify-center cursor-pointer transition active:scale-95 shadow-xs font-sans"
                            title="Backspace clear last digit"
                          >
                            ⌫
                          </button>
                        </div>
                      </div>

                      {/* Hint Slide Drawer Buttons */}
                      {!isTimedQuizInProgress && (
                      <div className="flex gap-2.5 max-w-[340px] mx-auto select-none pt-1">
                        <button
                          onClick={() => setShowHint(!showHint)}
                          className="flex-1 bg-white hover:bg-slate-50 border-2 border-slate-200 text-[11px] text-slate-700 font-bold py-2.5 px-3 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer active:translate-y-0.5"
                        >
                          <HelpCircle className="w-3.5 h-3.5 text-yellow-500" />
                          {showHint ? "Hide hint" : "Hint"}
                        </button>

                        <button
                          onClick={() => handleOpenStrategySlide(activeStrategyRound)}
                          className="flex-1 bg-white hover:bg-slate-50 border-2 border-slate-200 text-[11px] text-slate-700 font-bold py-2.5 px-3 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer active:translate-y-0.5"
                        >
                          <BookOpen className="w-3.5 h-3.5 text-red-500" />
                          Review lesson
                        </button>
                      </div>
                      )}

                      {!isTimedQuizInProgress && showHint && (
                        <div className="bg-yellow-50/50 border-2 border-yellow-200 p-4 rounded-2xl space-y-2 max-w-[340px] mx-auto text-left">
                          <div className="flex items-center gap-1.5">
                            <Lightbulb className="w-4 h-4 text-yellow-500 stroke-[2.5]" />
                            <h5 className="text-[10px] font-black text-yellow-800 uppercase tracking-wider">
                              How to solve this fast:
                            </h5>
                          </div>
                          <p className="text-xs text-slate-700 font-black italic">
                            "{currentQuestion?.hint || activeStrategyRound.example}"
                          </p>
                          <div className="space-y-1">
                            {activeStrategyRound.thinkSteps.map((step, s) => (
                              <p key={s} className="text-[11px] text-blue-900 pl-2.5 border-l-2 border-blue-400 font-semibold leading-tight">
                                {step}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}

                    </div>
                  )}

                </div>
              ) : (
                // Perfect / Completion Screen for Sprints
                <div className="text-center py-8 space-y-6">
                  
                  <div className="relative select-none">
                    <div className="text-8xl animate-bounce-slow">🏆</div>
                    {roundScore >= Math.max(3, Math.round(speedTarget * 0.3)) && (
                      <div className="absolute -top-3 right-1/4 animate-pulse">
                        <Star className="w-8 h-8 text-yellow-500 fill-yellow-400" />
                      </div>
                    )}
                    {roundScore >= Math.max(6, Math.round(speedTarget * 0.6)) && (
                      <div className="absolute -top-3 left-1/4 animate-pulse">
                        <Star className="w-8 h-8 text-sky-500 fill-sky-400" />
                      </div>
                    )}
                    {roundScore >= speedTarget && (
                      <div className="absolute -top-7 left-1/2 -translate-x-1/2 animate-bounce">
                        <Sparkles className="w-10 h-10 text-yellow-400 fill-yellow-400" />
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl md:text-3xl font-display font-black text-blue-950">
                      Sprint Complete! ⏱️
                    </h3>
                    <p className="text-sm text-slate-650 font-extrabold max-w-sm mx-auto leading-relaxed">
                      Nice work on <strong className="text-blue-600 font-black">{activeStrategyRound.name}</strong>.
                    </p>
                  </div>

                  {/* score badge summary */}
                  <div className="bg-yellow-50 p-6 rounded-[32px] border-4 border-yellow-300 inline-block shadow-[0_4px_0px_0px_#FDE047]">
                    <span className="text-xs text-[#FF4757] uppercase tracking-widest block mb-1 font-black font-semibold">Result</span>
                    <span className="text-4xl font-mono font-black text-blue-950">{roundScore} correct in 1 min</span>
                    <span className="block text-xs text-slate-500 font-black mt-1">{roundAccuracyPercent}% correct</span>
                    
                    <div className="mt-4 pt-3 border-t border-yellow-250 text-xs text-blue-950 font-black space-y-1">
                      {roundScore >= speedTarget ? (
                        <p className="text-amber-600 font-black text-sm">🏆 Gold! 3 stars earned! 🏆</p>
                      ) : roundScore >= Math.max(6, Math.round(speedTarget * 0.6)) ? (
                        <p className="text-slate-700 font-black text-sm">🥈 Silver! 2 stars earned! 🥈</p>
                      ) : roundScore >= Math.max(3, Math.round(speedTarget * 0.3)) ? (
                        <p className="text-amber-800 font-semibold">🥉 Bronze! 1 star earned! 🥉</p>
                      ) : (
                        <p className="text-slate-500 font-bold max-w-xs mx-auto leading-snug">
                          🌿 Try again for {roundPassTarget}+ correct and 80% correct.
                        </p>
                      )}
                    </div>
                  </div>

                  <div className={`border-2 p-4 rounded-2xl max-w-lg mx-auto text-center space-y-2 ${activeStrategyPassed ? "bg-emerald-50/80 border-emerald-200" : "bg-blue-50/70 border-blue-100"}`}>
                    <span className={`text-[10px] font-black font-mono uppercase tracking-widest block ${activeStrategyPassed ? "text-emerald-700" : "text-blue-700"}`}>
                      {activeStrategyPassed ? "Next stop unlocked" : "Keep practicing"}
                    </span>
                    {activeStrategyPassed ? (
                      <p className="text-sm text-emerald-800 font-black leading-relaxed">
                        You passed this stop. Keep going!
                      </p>
                    ) : (
                      <p className="text-sm text-slate-700 font-bold leading-relaxed">
                        Goal: {roundPassTarget}+ correct and 80% correct.
                      </p>
                    )}
                  </div>

                  {/* Suggest action slides */}
                  <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                    <button
                      onClick={() => {
                        setActiveTab("map");
                        setActiveStrategyRound(null);
                      }}
                      className="bg-white hover:bg-slate-50 border-2 border-slate-200 text-slate-700 font-black py-3 px-6 rounded-xl text-xs sm:text-sm transition cursor-pointer active:translate-y-0.5"
                    >
                      Map
                    </button>

                    <button
                      onClick={() => handleStartPracticeRound(activeStrategyRound)}
                      className="bg-white hover:bg-slate-50 border-2 border-slate-200 text-amber-600 font-black py-3 px-6 rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-1.5 cursor-pointer active:translate-y-0.5"
                    >
                      <RefreshCw className="w-4 h-4 text-amber-500" />
                      Try Again
                    </button>

                    {activeStrategyPassed && nextStrategyAfterRound && (
                      <button
                        onClick={() => {
                          handleOpenStrategySlide(nextStrategyAfterRound, "You unlocked a new stop on your math journey!");
                        }}
                        className="bg-[#FF4757] hover:bg-[#FF6B81] text-white font-black py-3 px-6 rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-1.5 border-2 border-[#D63031] shadow-[0_4px_0px_0px_#D63031] active:translate-y-0.5 cursor-pointer"
                      >
                        Next Lesson
                        <ChevronRight className="w-4 h-4 stroke-[3]" />
                      </button>
                    )}
                  </div>

                </div>
              )}

            </div>
          </div>
        )}

      </main>

      {/* STRATEGY BREAK MODAL OVERLAY */}
      <AnimatePresence>
        {activeModalStrategy && (
          <div className="fixed inset-0 bg-blue-950/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            
            <motion.div 
              initial={{ scale: 0.93, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.93, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="bg-white border-[6px] border-blue-400 rounded-[36px] p-6 md:p-8 max-w-lg w-full relative overflow-hidden shadow-[0_20px_0px_0px_#BFDBFE] flex flex-col gap-6"
            >
              
              {/* Cute top graphic frame */}
              <div className="absolute top-0 left-0 w-full h-[6px] bg-[#FF4757]" />
              
              {/* Close Button */}
              <button 
                onClick={() => setActiveModalStrategy(null)}
                className="absolute top-4 right-4 bg-white border-2 border-slate-200 p-1.5 rounded-full text-slate-500 hover:text-slate-805 transition cursor-pointer"
              >
                <X className="w-4 h-4 focus:outline-hidden" />
              </button>

              {/* Exact content structures requested, including spaces & "Strategy Break" header */}
              <div className="space-y-5 text-left text-slate-900">
                
                {/* 1. Header label "Strategy Break" */}
                <div className="flex items-center gap-2">
                  <span className="inline-block bg-blue-50 text-blue-700 font-mono font-black tracking-wider text-[11px] uppercase border-2 border-blue-100 px-3 py-1 rounded-full">
                    💡 Strategy Break
                  </span>
                  <span className="text-xs text-slate-400 font-bold">Stop {activeModalStrategy.id}/{STRATEGIES.length}</span>
                </div>

                {/* 2. Reason for screen */}
                <div className="text-xs md:text-sm text-[#FF4757] bg-red-50 px-3.5 py-2.5 rounded-xl border border-red-200 font-black">
                  {activeModalReason}
                </div>

                {/* 3. Strategy name */}
                <div>
                  <h3 className="text-xl md:text-2xl font-display font-black text-blue-950 tracking-tight leading-snug">
                    {activeModalStrategy.name}
                  </h3>
                </div>

                {/* 4. One short, friendly explanation */}
                <div>
                  <p className="text-sm text-gray-700 leading-relaxed md:text-base font-bold">
                    {activeModalStrategy.explanation}
                  </p>
                </div>

                {/* Clear divider step */}
                <div className="border-t-2 border-slate-100 my-1" />

                {/* 5. Example & Think Blocks */}
                <div className="space-y-4">
                  {/* Example list */}
                  <div>
                    <h5 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-black mb-1">
                      Example:
                    </h5>
                    <p className="text-base md:text-lg font-mono font-black text-blue-950 bg-blue-50/50 p-2.5 rounded-xl border-2 border-blue-105 inline-block px-5">
                      {activeModalStrategy.example}
                    </p>
                  </div>

                  {/* Think step by step */}
                  <div className="space-y-2">
                    <h5 className="text-xs font-mono uppercase tracking-widest text-[#FF4757] font-black">
                      Think:
                    </h5>
                    <div className="bg-yellow-50/50 p-4 rounded-xl border-2 border-yellow-105 space-y-1.5">
                      {activeModalStrategy.thinkSteps.map((step, idx) => (
                        <p 
                          key={idx} 
                          className="text-xs md:text-sm text-blue-900 leading-relaxed font-black flex items-start gap-2"
                        >
                          <span className="text-yellow-500 font-black mt-0.5">•</span>
                          <span>{step}</span>
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Clear divider step */}
                <div className="border-t-2 border-slate-100 my-1" />

                {/* 6. Try this statement */}
                <div>
                  <p className="text-xs text-gray-400 font-extrabold">
                    Try this in the next round when it helps.
                  </p>
                </div>

              </div>

              {/* 7. Start Next Round Button */}
              <div className="pt-2">
                <button
                  onClick={() => handleStartPracticeRound(activeModalStrategy)}
                  className="w-full bg-[#FF4757] hover:bg-[#FF6B81] text-white font-black py-4 px-6 rounded-2xl flex items-center justify-center gap-2 transition active:scale-95 text-sm md:text-base border-2 border-[#D63031] shadow-[0_4px_0px_0px_#D63031] cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-current" />
                  [Start Next Round]
                </button>
              </div>

            </motion.div>
          </div>
        )}

        {showSettingsModal && (
          <div className="fixed inset-0 bg-blue-950/45 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.93, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.93, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="bg-white border-[6px] border-blue-400 rounded-[36px] p-6 md:p-8 max-w-lg w-full relative overflow-y-auto max-h-[90dvh] shadow-[0_20px_0px_0px_#BFDBFE] flex flex-col gap-5"
            >
              {/* Cute top graphic frame */}
              <div className="absolute top-0 left-0 w-full h-[6px] bg-blue-500" />
              
              {/* Close Button */}
              <button 
                onClick={() => setShowSettingsModal(false)}
                className="absolute top-4 right-4 bg-white border-2 border-slate-200 p-1.5 rounded-full text-slate-500 hover:text-slate-800 transition cursor-pointer"
              >
                <X className="w-4 h-4 focus:outline-hidden" />
              </button>

              <div className="space-y-4 text-left text-slate-900">
                <div className="flex items-center gap-2">
                  <span className="inline-block bg-blue-50 text-blue-700 font-mono font-black tracking-wider text-[11px] uppercase border-2 border-blue-100 px-3 py-1 rounded-full">
                    ⚙️ Settings
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-display font-black text-blue-950 tracking-tight leading-snug">
                    Settings
                  </h3>
                  <p className="text-xs text-slate-500 font-bold">
                    Choose the sprint speed.
                  </p>
                </div>

                <div className="border-t-2 border-slate-100 my-1" />

                {/* 1. Goal Speed Settings */}
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-widest text-[#FF4757] font-black block">
                    ⚡ Sprint Speed
                  </label>
                  <div className="bg-blue-50/50 p-4 rounded-xl border-2 border-blue-100">
                    <select
                      value={speedTarget}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        setSpeedTarget(val);
                        saveProgress(viewedStrategyIds, masteredStrategyIds, stars, val, bestStreaks, bestSpeeds);
                      }}
                      className="w-full bg-white border-2 border-slate-200 px-3 py-2 rounded-xl text-xs font-black text-blue-900 focus:ring-2 focus:ring-blue-400 focus:outline-hidden text-slate-900"
                    >
                      <option value={10}>10 items/min (Relaxed)</option>
                      <option value={15}>15 items/min (Moderate)</option>
                      <option value={20}>20 items/min (Normal)</option>
                      <option value={30}>30 items/min (Challenger)</option>
                      <option value={40}>40 items/min (Grandmaster)</option>
                    </select>
                    <p className="text-[10px] text-gray-500 font-bold mt-2 leading-relaxed">
                      Gold means reaching this many correct answers in 1 minute.
                    </p>
                  </div>
                </div>

                <div className="border-t-2 border-slate-100 my-1" />

                <details className="bg-slate-50/60 border-2 border-slate-100 rounded-xl p-3 text-left">
                  <summary className="text-[11px] font-black text-slate-500 uppercase tracking-widest cursor-pointer select-none">
                    Teacher tools
                  </summary>

                  <div className="mt-4 space-y-4">
                    <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-3">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                        Learning data
                      </span>

                      <div className="grid grid-cols-2 gap-2 text-center text-[10px] font-black">
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-2">
                          <span className="block text-blue-900 text-sm">{activeStrategyRound ? activeStrategyRound.name : "None"}</span>
                          <span className="text-slate-500">Current lesson</span>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-2">
                          <span className="block text-blue-900 text-sm">{getLearnerStatusLabel(currentQuestionStatus)}</span>
                          <span className="text-slate-500">Fact support</span>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-2">
                          <span className="block text-blue-900 text-sm">{roundAccuracyPercent}%</span>
                          <span className="text-slate-500">Correct rate</span>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-2">
                          <span className="block text-blue-900 text-sm">{roundQuestions.length || currentStrategyFacts.length}</span>
                          <span className="text-slate-500">Pool size</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-[10px] font-black">
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-2">
                          <span className="block text-slate-700 text-sm">{practiceStatusSummary.needsPractice}</span>
                          <span className="text-slate-500">Extra help</span>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-2">
                          <span className="block text-slate-700 text-sm">{practiceStatusSummary.almostThere}</span>
                          <span className="text-slate-500">Close</span>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-2">
                          <span className="block text-slate-700 text-sm">{practiceStatusSummary.reviewSoon}</span>
                          <span className="text-slate-500">Review</span>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-2">
                          <span className="block text-slate-700 text-sm">{practiceStatusSummary.fluent}</span>
                          <span className="text-slate-500">Ready</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-red-50/50 p-3 rounded-xl border-2 border-red-100 space-y-2">
                      <span className="text-[10px] font-black text-red-700 uppercase tracking-widest block">
                        Reset
                      </span>
                      <button 
                        onClick={() => {
                          handleResetProgress();
                          setShowSettingsModal(false);
                        }}
                        className="w-full py-2.5 px-4 bg-red-100 hover:bg-red-200 text-red-700 font-black rounded-lg text-xs border-2 border-red-300 transition active:translate-y-0.5 cursor-pointer text-center"
                      >
                        Reset Progress
                      </button>
                    </div>
                  </div>
                </details>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
