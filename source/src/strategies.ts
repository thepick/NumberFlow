export enum StageId {
  StarterIsland = 1,
  CountingTrail = 2,
  DoublesForest = 3,
  BridgeTown = 4,
  FamilyVillage = 5,
  BigNumberMountain = 6,
}

export interface Stage {
  id: StageId;
  name: string;
  emoji: string;
  color: string;
  bgColor: string;
  accentColor: string;
  description: string;
}

export interface Strategy {
  id: number;
  stageId: StageId;
  code: string;
  name: string;
  reason: string;
  explanation: string;
  example: string;
  thinkSteps: string[];
}

export interface MathQuestion {
  id: string;
  strategyCode: string;
  question: string;
  answer: number;
  hint: string;
  type: string; // "input" or "multiple-choice" or "fill-blank"
  family?: string;
  difficulty?: number;
  stageId?: StageId;
  options?: string[];
}

export const STAGES: Stage[] = [
  {
    id: StageId.StarterIsland,
    name: "Starter Island",
    emoji: "🏝️",
    color: "from-emerald-400 to-teal-500",
    bgColor: "bg-teal-50/75",
    accentColor: "teal",
    description: "Anchor Facts - Meet the numbers 0 to 10!",
  },
  {
    id: StageId.CountingTrail,
    name: "Counting Trail",
    emoji: "🍂",
    color: "from-amber-400 to-orange-500",
    bgColor: "bg-orange-50/75",
    accentColor: "orange",
    description: "Counting Strategies - Jumps on the number line!",
  },
  {
    id: StageId.DoublesForest,
    name: "Doubles Forest",
    emoji: "🌲",
    color: "from-green-400 to-emerald-600",
    bgColor: "bg-emerald-50/75",
    accentColor: "emerald",
    description: "Doubles and Near Doubles - Twin power!",
  },
  {
    id: StageId.BridgeTown,
    name: "Bridge Town",
    emoji: "🌉",
    color: "from-sky-400 to-blue-500",
    bgColor: "bg-blue-50/75",
    accentColor: "blue",
    description: "Make 10 and Bridge - Bridge across 10 for speed!",
  },
  {
    id: StageId.FamilyVillage,
    name: "Family Village",
    emoji: "🏡",
    color: "from-indigo-400 to-violet-500",
    bgColor: "bg-violet-50/75",
    accentColor: "violet",
    description: "Fact Families - Relatives of calculation!",
  },
  {
    id: StageId.BigNumberMountain,
    name: "Big Number Mountain",
    emoji: "🏔️",
    color: "from-rose-400 to-pink-500",
    bgColor: "bg-pink-55/75",
    accentColor: "pink",
    description: "Two-Digit Methods - Ultimate mountain methods!",
  },
];

export const STRATEGIES: Strategy[] = [
  // Stage 1: Starter Island (Stops 1-6)
  {
    id: 1,
    stageId: StageId.StarterIsland,
    code: "same-number",
    name: "Same Number Facts",
    reason: "You reached a new stop on your math journey!",
    explanation: "Adding or subtracting zero doesn't change anything!",
    example: "7+0, 7-0",
    thinkSteps: [
      "Adding 0 means nothing is added.",
      "Taking away 0 means nothing is removed.",
      "The number stays 7."
    ]
  },
  {
    id: 2,
    stageId: StageId.StarterIsland,
    code: "one-more-less",
    name: "One More and One Less",
    reason: "You unlocked a new strategy!",
    explanation: "Double check by going up or down by just one step.",
    example: "6+1, 6-1",
    thinkSteps: [
      "Start at 6. Next number is 7.",
      "Number before is 5."
    ]
  },
  {
    id: 3,
    stageId: StageId.StarterIsland,
    code: "two-more-less",
    name: "Two More and Two Less",
    reason: "Look! You unlocked a new stop!",
    explanation: "Take two quick counting jumps in your head!",
    example: "5+2, 8-2",
    thinkSteps: [
      "Count forward two jumps: 6,7 → 7.",
      "Count back two jumps: 7,6 → 6."
    ]
  },
  {
    id: 4,
    stageId: StageId.StarterIsland,
    code: "bond-10",
    name: "Make 10 Pairs",
    reason: "You earned a star!",
    explanation: "Match up friendly partners that add up to make 10.",
    example: "4+6",
    thinkSteps: [
      "4 and 6 are partners that make 10.",
      "Other pairs: 1+9, 2+8, 3+7, 5+5."
    ]
  },
  {
    id: 5,
    stageId: StageId.StarterIsland,
    code: "subtract-from-10",
    name: "Subtract from 10",
    reason: "You completed Starter Island's standard learning!",
    explanation: "Use your 10-friends to subtract from 10 quickly.",
    example: "10-6",
    thinkSteps: [
      "6 and 4 make 10, so 10-6=4."
    ]
  },
  {
    id: 6,
    stageId: StageId.StarterIsland,
    code: "stage-1-cumulative",
    name: "Starter Island Cumulative Quiz",
    reason: "Prove your mastery of Starter Island!",
    explanation: "Mix and solve All concepts from Stage 1: zero facts, ±1, ±2, and Bridge-to-10!",
    example: "Mixed Stage 1 Facts",
    thinkSteps: [
      "Use same-number strategy for zero facts.",
      "Count on or back 1 or 2 for ±1 or ±2.",
      "Remember 10-bonds to quickly make or subtract from 10."
    ]
  },
  // Stage 2: Counting Trail (Stops 7-11)
  {
    id: 7,
    stageId: StageId.CountingTrail,
    code: "count-on",
    name: "Count On to Add",
    reason: "Welcome to the Counting Trail!",
    explanation: "Pick the bigger number first, then count forward.",
    example: "3+8",
    thinkSteps: [
      "Start with 8.",
      "Count on 3 jumps: 9,10,11."
    ]
  },
  {
    id: 8,
    stageId: StageId.CountingTrail,
    code: "count-back",
    name: "Count Back to Subtract",
    reason: "You unlocked a new strategy!",
    explanation: "Count backwards when taking away a small amount.",
    example: "13-4",
    thinkSteps: [
      "Start at 13.",
      "Count back 4 jumps: 12,11,10,9."
    ]
  },
  {
    id: 9,
    stageId: StageId.CountingTrail,
    code: "count-up",
    name: "Count Up to Subtract",
    reason: "You earned a new star!",
    explanation: "Count up from the number you are taking away.",
    example: "14-9",
    thinkSteps: [
      "Start at 9.",
      "Count up to 14: 10,11,12,13,14 → 5 jumps."
    ]
  },
  {
    id: 10,
    stageId: StageId.CountingTrail,
    code: "stage-2-cumulative",
    name: "Counting Trail Cumulative Quiz",
    reason: "A challenge covering all Counting Trails!",
    explanation: "Show off your counting jumps! Mixes count-on, count-back, and count-up facts.",
    example: "Mixed Stage 2 Facts",
    thinkSteps: [
      "Start with the larger number and count on to add.",
      "Count back for subtraction of small amounts.",
      "Count up from the subtrahend when they are close."
    ]
  },
  {
    id: 11,
    stageId: StageId.CountingTrail,
    code: "all-before-2",
    name: "Mega Review (Stages 1-2)",
    reason: "Conquer everything from Starter Island and Counting Trail!",
    explanation: "An ultimate challenge that randomly quizzes you on ALL topics in Stages 1 and 2!",
    example: "All Stage 1 & 2 Facts",
    thinkSteps: [
      "Check the operation symbol carefully (+ or -).",
      "Switch between zero rules, 10-friends, and counting jumps instantly!",
      "Aim for the highest speed indicator."
    ]
  },
  // Stage 3: Doubles Forest (Stops 12-16)
  {
    id: 12,
    stageId: StageId.DoublesForest,
    code: "doubles",
    name: "Doubles and Half Facts",
    reason: "Deep into the Doubles Forest you go!",
    explanation: "Twins are easy to add, and halves are double back!",
    example: "6+6=12, 12-6=6",
    thinkSteps: [
      "Double 6 is 12.",
      "12 is double 6, half is 6."
    ]
  },
  {
    id: 13,
    stageId: StageId.DoublesForest,
    code: "near-double",
    name: "Near Doubles to Add",
    reason: "You unlocked a new stop!",
    explanation: "Look for numbers that are almost twins, then adjust.",
    example: "6+7",
    thinkSteps: [
      "6+6=12.",
      "7 is one more, so 12+1=13."
    ]
  },
  {
    id: 14,
    stageId: StageId.DoublesForest,
    code: "near-double-sub",
    name: "Near Doubles Backwards",
    reason: "You unlocked doubles backwards!",
    explanation: "Think of near doubles to solve tricky subtractions.",
    example: "13-6",
    thinkSteps: [
      "6+7=13, so 13-6=7."
    ]
  },
  {
    id: 15,
    stageId: StageId.DoublesForest,
    code: "stage-3-cumulative",
    name: "Doubles Forest Cumulative Quiz",
    reason: "Master all twin and near-twin methods!",
    explanation: "Unleash combined twin power! Quizzes doubles, near-doubles, and subtraction twins together.",
    example: "Mixed Stage 3 Facts",
    thinkSteps: [
      "Spot precise doubles for instant twin addition.",
      "Double smaller plus one for near-doubles.",
      "Think twin addition backwards for quick subtractions."
    ]
  },
  {
    id: 16,
    stageId: StageId.DoublesForest,
    code: "all-before-3",
    name: "Mega Review (Stages 1-3)",
    reason: "Show ultimate agility over Stages 1, 2, and 3!",
    explanation: "A massive speed sprint covering anchor facts, counting lines, and forest double-twins!",
    example: "All Stage 1, 2 & 3 Facts",
    thinkSteps: [
      "Let subtraction family facts assist.",
      "Use double power when numbers are near each other.",
      "Tap answer quickly once identified."
    ]
  },
  // Stage 4: Bridge Town (Stops 17-20)
  {
    id: 17,
    stageId: StageId.BridgeTown,
    code: "make-10-add",
    name: "Make 10 Addition",
    reason: "Crossing the water to Bridge Town!",
    explanation: "Fill up to 10 first, then add the leftovers.",
    example: "8+5",
    thinkSteps: [
      "8 needs 2 to make 10. Split 5 into 2+3.",
      "8+2=10, 10+3=13."
    ]
  },
  {
    id: 18,
    stageId: StageId.BridgeTown,
    code: "bridge-back",
    name: "Bridge Back Subtraction",
    reason: "You unlocked a bridge strategy!",
    explanation: "Jump back to 10 first, then subtract the rest.",
    example: "13-5",
    thinkSteps: [
      "13 needs to go back 3 to reach 10. Split 5 into 3+2.",
      "13-3=10, 10-2=8."
    ]
  },
  {
    id: 19,
    stageId: StageId.BridgeTown,
    code: "stage-4-cumulative",
    name: "Bridge Town Cumulative Review",
    reason: "Cross the physical bridges with confidence!",
    explanation: "Mix and solve combined make-10 addition and bridge-back subtraction!",
    example: "Mixed Stage 4 Facts",
    thinkSteps: [
      "For addition, bridge up to 10 then add details.",
      "For subtraction, jump back to 10 first, then subtract leftovers."
    ]
  },
  {
    id: 20,
    stageId: StageId.BridgeTown,
    code: "all-before-4",
    name: "Mega Review (Stages 1-4)",
    reason: "Unstoppable math genius through Stage 4!",
    explanation: "Ultimate speed run combining all 18 stops from Starter Island to Bridge Town!",
    example: "All Stage 1, 2, 3 & 4 Facts",
    thinkSteps: [
      "Maintain concentration during rapid jumps.",
      "Spot 10-friends and doubles instantly to speed up.",
      "Remember that subtraction inverts addition."
    ]
  },
  // Stage 5: Family Village (Stops 21-23)
  {
    id: 21,
    stageId: StageId.FamilyVillage,
    code: "fact-family",
    name: "Think Inverse",
    reason: "Welcome to the Family Village!",
    explanation: "Addition and subtraction are family! Use one to solve the other.",
    example: "20-8",
    thinkSteps: [
      "8+12=20, so 20-8=12.",
      "Also show addition: 13+7 → 13 and 7 make 20."
    ]
  },
  {
    id: 22,
    stageId: StageId.FamilyVillage,
    code: "stage-5-cumulative",
    name: "Family Village Cumulative Quiz",
    reason: "Claim family legacy in the Village!",
    explanation: "Show off inverse fact-family calculations under pressure!",
    example: "Mixed Stage 5 Facts",
    thinkSteps: [
      "Think of addition and subtraction as inverse relatives.",
      "Recall your basic bonds & halves to unlock facts."
    ]
  },
  {
    id: 23,
    stageId: StageId.FamilyVillage,
    code: "all-before-5",
    name: "Mega Review (Stages 1-5)",
    reason: "Conquer absolute mastery before the Mountain!",
    explanation: "Reviewing everything across Stages 1 to 5 to prepare for the ultimate Big Mountain climb!",
    example: "All Stage 1 - 5 Facts",
    thinkSteps: [
      "Relax your shoulders and breathe.",
      "Mix anchor, double, bridging, & inverse strategies on the fly.",
      "Focus, key in, and hit Enter."
    ]
  },
  // Stage 6: Big Number Mountain (Stops 24-28)
  {
    id: 24,
    stageId: StageId.BigNumberMountain,
    code: "compensation",
    name: "Make a Friendly Number",
    reason: "You reached Big Number Mountain!",
    explanation: "Give a little, take a little to make numbers friendly!",
    example: "29+5 (addition) or 31-9 (subtraction)",
    thinkSteps: [
      "Addition: 29+1=30, 4 left → 30+4=34.",
      "Subtraction: 31-10=21, add 1 back → 22."
    ]
  },
  {
    id: 25,
    stageId: StageId.BigNumberMountain,
    code: "partitioning",
    name: "Split Tens and Ones",
    reason: "Climbing higher on the mountain!",
    explanation: "Split double-digit numbers into tens and ones.",
    example: "35+12 (addition) or 48-24 (subtraction)",
    thinkSteps: [
      "Addition: 35+10=45, +2=47.",
      "Subtraction: 48-20=28, -4=24."
    ]
  },
  {
    id: 26,
    stageId: StageId.BigNumberMountain,
    code: "bridging",
    name: "Bridge Across Tens",
    reason: "You conquered the peak of Big Mountain!",
    explanation: "Jump to the next friendly ten first when working with big numbers!",
    example: "27+15 (addition) or 51-28 (subtraction)",
    thinkSteps: [
      "Addition: 27 needs 3 to reach 30, split 15 into 3+12 → 27+3=30, 30+12=42.",
      "Subtraction: 51-20=31, then subtract 8: 31-1=30, 30-7=23."
    ]
  },
  {
    id: 27,
    stageId: StageId.BigNumberMountain,
    code: "stage-6-cumulative",
    name: "Big Mountain Cumulative Review",
    reason: "Master advanced two-digit math operations!",
    explanation: "Ultimate multi-digit challenge! Mixes friendly compensation, splitting, and bridging rules.",
    example: "Mixed Stage 6 Facts",
    thinkSteps: [
      "Use compensation to make simple tens.",
      "Split tens and ones for clean additions/subtractions.",
      "Bridge across boundaries cleanly."
    ]
  },
  {
    id: 28,
    stageId: StageId.BigNumberMountain,
    code: "all-before-6",
    name: "Mega Review (ALL STAGES 1-6)",
    reason: "You are the Ultimate Mental Math Champion!",
    explanation: "The grand master exam! Randomly selects questions from every single lesson and stage in the game!",
    example: "Ultimate Master Mixed Quiz",
    thinkSteps: [
      "Your brain possesses all strategic math powers.",
      "Switch gears instantly: from zero add-ons to big-number bridging.",
      "Show what you've achieved!"
    ]
  },
];


export const CUMULATIVE_MAPPING: { [key: string]: string[] } = {
  "stage-1-cumulative": ["same-number", "one-more-less", "two-more-less", "bond-10", "subtract-from-10"],
  "stage-2-cumulative": ["count-on", "count-back", "count-up"],
  "all-before-2": ["same-number", "one-more-less", "two-more-less", "bond-10", "subtract-from-10", "count-on", "count-back", "count-up"],
  "stage-3-cumulative": ["doubles", "near-double", "near-double-sub"],
  "all-before-3": ["same-number", "one-more-less", "two-more-less", "bond-10", "subtract-from-10", "count-on", "count-back", "count-up", "doubles", "near-double", "near-double-sub"],
  "stage-4-cumulative": ["make-10-add", "bridge-back"],
  "all-before-4": ["same-number", "one-more-less", "two-more-less", "bond-10", "subtract-from-10", "count-on", "count-back", "count-up", "doubles", "near-double", "near-double-sub", "make-10-add", "bridge-back"],
  "stage-5-cumulative": ["fact-family"],
  "all-before-5": ["same-number", "one-more-less", "two-more-less", "bond-10", "subtract-from-10", "count-on", "count-back", "count-up", "doubles", "near-double", "near-double-sub", "make-10-add", "bridge-back", "fact-family"],
  "stage-6-cumulative": ["compensation", "partitioning", "bridging"],
  "all-before-6": ["same-number", "one-more-less", "two-more-less", "bond-10", "subtract-from-10", "count-on", "count-back", "count-up", "doubles", "near-double", "near-double-sub", "make-10-add", "bridge-back", "fact-family", "compensation", "partitioning", "bridging"]
};

function normalizeIdPart(value: string): string {
  const normalized = value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  return normalized || "fact";
}

function getStageIdForStrategy(strategyCode: string): StageId | undefined {
  const strategy = STRATEGIES.find((item) => item.code === strategyCode);
  return strategy?.stageId;
}

function makeQuestion(params: {
  strategyCode: string;
  question: string;
  answer: number;
  hint: string;
  type?: string;
  family?: string;
  difficulty?: number;
  options?: string[];
}): MathQuestion {
  const family = params.family || "general";
  return {
    id: `${params.strategyCode}:${family}:${normalizeIdPart(params.question)}`,
    strategyCode: params.strategyCode,
    question: params.question,
    answer: params.answer,
    hint: params.hint,
    type: params.type || "input",
    family,
    difficulty: params.difficulty || 1,
    stageId: getStageIdForStrategy(params.strategyCode),
    options: params.options,
  };
}

function uniqueQuestions(questions: MathQuestion[]): MathQuestion[] {
  const seen: { [key: string]: boolean } = {};
  const unique: MathQuestion[] = [];
  questions.forEach((question) => {
    if (!seen[question.id]) {
      seen[question.id] = true;
      unique.push(question);
    }
  });
  return unique;
}

function range(min: number, max: number): number[] {
  const values: number[] = [];
  for (let value = min; value <= max; value++) values.push(value);
  return values;
}

function buildSingleStrategyQuestionPool(strategyCode: string): MathQuestion[] {
  const list: MathQuestion[] = [];

  switch (strategyCode) {
    case "same-number": {
      range(1, 20).forEach((x) => {
        list.push(makeQuestion({ strategyCode, question: `${x} + 0`, answer: x, hint: "Adding 0 means nothing changes, so it stays the same!", family: "zero-add", difficulty: 1 }));
        list.push(makeQuestion({ strategyCode, question: `0 + ${x}`, answer: x, hint: "Adding 0 means nothing changes, so it stays the same!", family: "zero-add", difficulty: 1 }));
        list.push(makeQuestion({ strategyCode, question: `${x} - 0`, answer: x, hint: "Subtracting 0 means nothing is taken away, so it stays the same!", family: "zero-subtract", difficulty: 1 }));
      });
      break;
    }
    case "one-more-less": {
      range(2, 20).forEach((x) => {
        list.push(makeQuestion({ strategyCode, question: `${x} + 1`, answer: x + 1, hint: `Start at ${x}. Jump up by 1. What's the next number?`, family: "one-more", difficulty: 1 }));
        list.push(makeQuestion({ strategyCode, question: `1 + ${x}`, answer: x + 1, hint: `Start at ${x}. Jump up by 1. What's the next number?`, family: "one-more", difficulty: 1 }));
        list.push(makeQuestion({ strategyCode, question: `${x} - 1`, answer: x - 1, hint: `Start at ${x}. Jump down by 1. What's the number right before?`, family: "one-less", difficulty: 1 }));
      });
      break;
    }
    case "two-more-less": {
      range(3, 18).forEach((x) => {
        list.push(makeQuestion({ strategyCode, question: `${x} + 2`, answer: x + 2, hint: `Start at ${x}. Take two jumps forward: ${x + 1}, ${x + 2}!`, family: "two-more", difficulty: 1 }));
        list.push(makeQuestion({ strategyCode, question: `2 + ${x}`, answer: x + 2, hint: `Start at ${x}. Take two jumps forward: ${x + 1}, ${x + 2}!`, family: "two-more", difficulty: 1 }));
        list.push(makeQuestion({ strategyCode, question: `${x} - 2`, answer: x - 2, hint: `Start at ${x}. Take two jumps backwards: ${x - 1}, ${x - 2}!`, family: "two-less", difficulty: 1 }));
      });
      break;
    }
    case "bond-10": {
      range(1, 9).forEach((left) => {
        const right = 10 - left;
        list.push(makeQuestion({ strategyCode, question: `? + ${right} = 10`, answer: left, hint: `${right} needs a friendly partner to make 10! Who is it?`, family: "make-10-missing", difficulty: 1 }));
        list.push(makeQuestion({ strategyCode, question: `${left} + ? = 10`, answer: right, hint: `${left} needs a friendly partner to make 10! Who is it?`, family: "make-10-missing", difficulty: 1 }));
      });
      break;
    }
    case "subtract-from-10": {
      range(1, 9).forEach((x) => {
        list.push(makeQuestion({ strategyCode, question: `10 - ${x}`, answer: 10 - x, hint: `Who is the 10-partner for ${x}? Since they make 10 together, 10 - ${x} must be that partner!`, family: "subtract-from-10", difficulty: 1 }));
      });
      break;
    }
    case "count-on": {
      range(7, 12).forEach((main) => {
        range(1, 3).forEach((extra) => {
          list.push(makeQuestion({ strategyCode, question: `${extra} + ${main}`, answer: main + extra, hint: `Start with the bigger number ${main} and count on ${extra} jumps!`, family: "count-on-add", difficulty: 2 }));
          list.push(makeQuestion({ strategyCode, question: `${main} + ${extra}`, answer: main + extra, hint: `Start with the bigger number ${main} and count on ${extra} jumps!`, family: "count-on-add", difficulty: 2 }));
        });
      });
      break;
    }
    case "count-back": {
      range(9, 15).forEach((start) => {
        range(1, 4).forEach((sub) => {
          list.push(makeQuestion({ strategyCode, question: `${start} - ${sub}`, answer: start - sub, hint: `Start at ${start} and count back ${sub} steps.`, family: "count-back-subtract", difficulty: 2 }));
        });
      });
      break;
    }
    case "count-up": {
      range(8, 14).forEach((b) => {
        range(2, 5).forEach((diff) => {
          const a = b + diff;
          list.push(makeQuestion({ strategyCode, question: `${a} - ${b}`, answer: diff, hint: `How many jumps from ${b} to get to ${a}? Let's count up!`, family: "count-up-subtract", difficulty: 2 }));
        });
      });
      break;
    }
    case "doubles": {
      range(2, 10).forEach((x) => {
        list.push(makeQuestion({ strategyCode, question: `Double ${x} (or ${x} + ${x})`, answer: x + x, hint: `Twins addition: what is twice ${x}?`, family: "double", difficulty: 2 }));
        list.push(makeQuestion({ strategyCode, question: `Half of ${x * 2} (or ${x * 2} - ${x})`, answer: x, hint: `Since double ${x} is ${x * 2}, half of ${x * 2} is back to...`, family: "half", difficulty: 2 }));
      });
      break;
    }
    case "near-double": {
      range(3, 9).forEach((x) => {
        list.push(makeQuestion({ strategyCode, question: `${x} + ${x + 1}`, answer: 2 * x + 1, hint: `Think of double ${x} (${x}+${x}=${2 * x}). Then add 1 more since we have ${x + 1}!`, family: "near-double-add", difficulty: 2 }));
        list.push(makeQuestion({ strategyCode, question: `${x + 1} + ${x}`, answer: 2 * x + 1, hint: `Think of double ${x} (${x}+${x}=${2 * x}). Then add 1 more since we have ${x + 1}!`, family: "near-double-add", difficulty: 2 }));
      });
      break;
    }
    case "near-double-sub": {
      range(4, 9).forEach((x) => {
        const sum = 2 * x + 1;
        list.push(makeQuestion({ strategyCode, question: `${sum} - ${x}`, answer: sum - x, hint: `We know near double: ${x} + ${x + 1} = ${sum}. So taking away ${x} leaves...`, family: "near-double-subtract", difficulty: 2 }));
        list.push(makeQuestion({ strategyCode, question: `${sum} - ${x + 1}`, answer: sum - (x + 1), hint: `We know near double: ${x} + ${x + 1} = ${sum}. So taking away ${x + 1} leaves...`, family: "near-double-subtract", difficulty: 2 }));
      });
      break;
    }
    case "make-10-add": {
      range(7, 9).forEach((x) => {
        range(4, 8).forEach((y) => {
          list.push(makeQuestion({ strategyCode, question: `${x} + ${y}`, answer: x + y, hint: `${x} needs ${10 - x} to reach 10. Split ${y} into ${10 - x} + ${y - (10 - x)}.`, family: "make-10-add", difficulty: 3 }));
          list.push(makeQuestion({ strategyCode, question: `${y} + ${x}`, answer: x + y, hint: `${x} needs ${10 - x} to reach 10. Split ${y} into ${10 - x} + ${y - (10 - x)}.`, family: "make-10-add", difficulty: 3 }));
        });
      });
      break;
    }
    case "bridge-back": {
      range(12, 15).forEach((start) => {
        range(4, 7).forEach((sub) => {
          list.push(makeQuestion({ strategyCode, question: `${start} - ${sub}`, answer: start - sub, hint: `Jump back to 10 first by taking away ${start - 10}. Then subtract the rest of ${sub}!`, family: "bridge-back-subtract", difficulty: 3 }));
        });
      });
      break;
    }
    case "fact-family": {
      range(5, 15).forEach((part) => {
        const total = 20;
        list.push(makeQuestion({ strategyCode, question: `${total} - ${part}`, answer: total - part, hint: `Think of the family: ${part} + ? = ${total}. Who joins ${part} to reach 20?`, family: "inverse-subtract", difficulty: 3 }));
      });
      range(1, 9).forEach((part) => {
        const other = 10 - part;
        list.push(makeQuestion({ strategyCode, question: `13 + ${other}`, answer: 13 + other, hint: `Since 3 and ${other} make 10, then 13 and ${other} must reach the next ten!`, family: "inverse-add", difficulty: 3 }));
      });
      break;
    }
    case "compensation": {
      range(1, 4).forEach((tens) => {
        const base = tens * 10 + 9;
        range(3, 7).forEach((add) => {
          list.push(makeQuestion({ strategyCode, question: `${base} + ${add}`, answer: base + add, hint: `Make ${base} a friendly ${base + 1} by taking 1 from ${add}. Then add ${add - 1}!`, family: "compensation-add", difficulty: 4 }));
        });
      });
      range(2, 5).forEach((tens) => {
        const base = tens * 10 + 1;
        list.push(makeQuestion({ strategyCode, question: `${base} - 9`, answer: base - 9, hint: `Subtract 10 from ${base} (which is ${base - 10}), then give 1 back!`, family: "compensation-subtract", difficulty: 4 }));
      });
      break;
    }
    case "partitioning": {
      range(2, 5).forEach((t1) => {
        range(1, 6).forEach((o1) => {
          range(1, 3).forEach((t2) => {
            range(1, 3).forEach((o2) => {
              const n1 = t1 * 10 + o1;
              const n2 = t2 * 10 + o2;
              list.push(makeQuestion({ strategyCode, question: `${n1} + ${n2}`, answer: n1 + n2, hint: `Split it: add the tens ${n2 - o2} to ${n1} first (makes ${n1 + n2 - o2}), then add the ${o2} ones!`, family: "partition-add", difficulty: 4 }));
            });
          });
        });
      });
      range(4, 7).forEach((t1) => {
        range(5, 9).forEach((o1) => {
          range(1, 3).forEach((t2) => {
            range(1, 4).forEach((o2) => {
              const n1 = t1 * 10 + o1;
              const n2 = t2 * 10 + o2;
              list.push(makeQuestion({ strategyCode, question: `${n1} - ${n2}`, answer: n1 - n2, hint: `Split it: subtract tens ${t2 * 10} from ${n1} first (makes ${n1 - t2 * 10}), then subtract the ${o2} ones!`, family: "partition-subtract", difficulty: 4 }));
            });
          });
        });
      });
      break;
    }
    case "bridging": {
      range(2, 4).forEach((t1) => {
        range(6, 8).forEach((o1) => {
          range(1, 2).forEach((t2) => {
            range(5, 7).forEach((o2) => {
              const n1 = t1 * 10 + o1;
              const n2 = t2 * 10 + o2;
              list.push(makeQuestion({ strategyCode, question: `${n1} + ${n2}`, answer: n1 + n2, hint: `${n1} needs ${10 - (n1 % 10)} to reach the next ten. Split ${n2} to bridge!`, family: "bridge-add", difficulty: 4 }));
            });
          });
        });
      });
      range(4, 6).forEach((t1) => {
        range(1, 3).forEach((o1) => {
          range(1, 2).forEach((t2) => {
            range(6, 8).forEach((o2) => {
              const n1 = t1 * 10 + o1;
              const n2 = t2 * 10 + o2;
              list.push(makeQuestion({ strategyCode, question: `${n1} - ${n2}`, answer: n1 - n2, hint: `Subtract tens ${Math.floor(n2 / 10) * 10} from ${n1} first, then subtract the ${n2 % 10} ones across the ten!`, family: "bridge-subtract", difficulty: 4 }));
            });
          });
        });
      });
      break;
    }
    default: {
      range(1, 10).forEach((a) => {
        range(1, 10).forEach((b) => {
          list.push(makeQuestion({ strategyCode, question: `${a} + ${b}`, answer: a + b, hint: "Count on your fingers if needed!", family: "fallback-add", difficulty: 1 }));
        });
      });
    }
  }

  return uniqueQuestions(list);
}

export function getStrategyCodesForPractice(strategyCode: string): string[] {
  if (CUMULATIVE_MAPPING[strategyCode]) return CUMULATIVE_MAPPING[strategyCode];
  return [strategyCode];
}

export function generateQuestionPoolForStrategy(strategyCode: string): MathQuestion[] {
  const codes = getStrategyCodesForPractice(strategyCode);
  const questions: MathQuestion[] = [];
  codes.forEach((code) => {
    questions.push(...buildSingleStrategyQuestionPool(code));
  });
  return uniqueQuestions(questions);
}

export function generateQuestionsForStrategy(strategyCode: string, count: number = 5): MathQuestion[] {
  const pool = generateQuestionPoolForStrategy(strategyCode);
  if (pool.length === 0) return [];

  const list: MathQuestion[] = [];
  for (let i = 0; i < count; i++) {
    const idx = Math.floor(Math.random() * pool.length);
    list.push(pool[idx]);
  }
  return list;
}
