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
  type: string;
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
    description: "Anchor Facts - Meet the numbers 0 to 10.",
  },
  {
    id: StageId.CountingTrail,
    name: "Counting Trail",
    emoji: "🍂",
    color: "from-amber-400 to-orange-500",
    bgColor: "bg-orange-50/75",
    accentColor: "orange",
    description: "Counting Strategies - Grow toward facts within 20.",
  },
  {
    id: StageId.DoublesForest,
    name: "Doubles Forest",
    emoji: "🌲",
    color: "from-green-400 to-emerald-600",
    bgColor: "bg-emerald-50/75",
    accentColor: "emerald",
    description: "Doubles and Near Doubles - Use twin facts to think fast.",
  },
  {
    id: StageId.BridgeTown,
    name: "Bridge Town",
    emoji: "🌉",
    color: "from-sky-400 to-blue-500",
    bgColor: "bg-blue-50/75",
    accentColor: "blue",
    description: "Make 10 and Bridge - Cross through 10 with confidence.",
  },
  {
    id: StageId.FamilyVillage,
    name: "Family Village",
    emoji: "🏡",
    color: "from-indigo-400 to-violet-500",
    bgColor: "bg-violet-50/75",
    accentColor: "violet",
    description: "Fact Families - Connect addition and subtraction.",
  },
  {
    id: StageId.BigNumberMountain,
    name: "Big Number Mountain",
    emoji: "🏔️",
    color: "from-rose-400 to-pink-500",
    bgColor: "bg-pink-50/75",
    accentColor: "pink",
    description: "Two-Digit Methods - Use mental math with bigger numbers.",
  },
];

export const STRATEGIES: Strategy[] = [
  // Chapter 1: Starter Island, lessons 1-5
  {
    id: 1,
    stageId: StageId.StarterIsland,
    code: "same-number",
    name: "Same Number Facts",
    reason: "You unlocked Lesson 1!",
    explanation: "Adding or subtracting zero keeps the number the same.",
    example: "7 + 0, 7 - 0",
    thinkSteps: [
      "Adding 0 means nothing is added.",
      "Taking away 0 means nothing is removed.",
      "The number stays the same."
    ]
  },
  {
    id: 2,
    stageId: StageId.StarterIsland,
    code: "one-more-less",
    name: "One More and One Less",
    reason: "You unlocked a new lesson!",
    explanation: "Move one step forward or one step back.",
    example: "6 + 1, 6 - 1",
    thinkSteps: [
      "For +1, say the next number.",
      "For -1, say the number before."
    ]
  },
  {
    id: 3,
    stageId: StageId.StarterIsland,
    code: "two-more-less",
    name: "Two More and Two Less",
    reason: "You unlocked a new lesson!",
    explanation: "Move two small steps forward or backward.",
    example: "5 + 2, 8 - 2",
    thinkSteps: [
      "For +2, count forward two steps.",
      "For -2, count back two steps."
    ]
  },
  {
    id: 4,
    stageId: StageId.StarterIsland,
    code: "bond-10",
    name: "Make 10 Pairs",
    reason: "You unlocked a new lesson!",
    explanation: "Find the missing partner number that makes 10.",
    example: "4 + ? = 10",
    thinkSteps: [
      "Look at the number you have.",
      "Think of the partner that fills 10.",
      "1 and 9, 2 and 8, 3 and 7, 4 and 6, 5 and 5 all make 10."
    ]
  },
  {
    id: 5,
    stageId: StageId.StarterIsland,
    code: "subtract-from-10",
    name: "Subtract from 10",
    reason: "You unlocked a new lesson!",
    explanation: "Use your make-10 partners to subtract from 10.",
    example: "10 - 6 = 4",
    thinkSteps: [
      "Ask: What number goes with 6 to make 10?",
      "That partner is the answer."
    ]
  },

  // Chapter 2: Counting Trail, lessons 6-8
  {
    id: 6,
    stageId: StageId.CountingTrail,
    code: "count-on",
    name: "Count On to Add",
    reason: "Welcome to Chapter 2!",
    explanation: "Start with the bigger number, then count on a few steps.",
    example: "8 + 3 = 11",
    thinkSteps: [
      "Start with 8.",
      "Count on 3 jumps: 9, 10, 11."
    ]
  },
  {
    id: 7,
    stageId: StageId.CountingTrail,
    code: "count-back",
    name: "Count Back to Subtract",
    reason: "You unlocked a new lesson!",
    explanation: "Count backward when taking away a small amount.",
    example: "13 - 4 = 9",
    thinkSteps: [
      "Start at 13.",
      "Count back 4 jumps: 12, 11, 10, 9."
    ]
  },
  {
    id: 8,
    stageId: StageId.CountingTrail,
    code: "count-up",
    name: "Count Up to Subtract",
    reason: "You unlocked a new lesson!",
    explanation: "Count up from the smaller number to find the difference.",
    example: "14 - 9 = 5",
    thinkSteps: [
      "Start at 9.",
      "Count up to 14.",
      "The number of jumps is the answer."
    ]
  },

  // Chapter 3: Doubles Forest, lessons 9-12
  {
    id: 9,
    stageId: StageId.DoublesForest,
    code: "doubles",
    name: "Doubles",
    reason: "Welcome to Chapter 3!",
    explanation: "Double a number by adding it to itself.",
    example: "6 + 6 = 12",
    thinkSteps: [
      "Spot the twin numbers.",
      "Use the double fact you know."
    ]
  },
  {
    id: 10,
    stageId: StageId.DoublesForest,
    code: "half-facts",
    name: "Half Facts",
    reason: "You unlocked a new lesson!",
    explanation: "Use doubles backward to find half.",
    example: "14 - 7 = 7",
    thinkSteps: [
      "Think: 7 + 7 = 14.",
      "So half of 14 is 7."
    ]
  },
  {
    id: 11,
    stageId: StageId.DoublesForest,
    code: "near-double-one",
    name: "Near Doubles: One Apart",
    reason: "You unlocked a new lesson!",
    explanation: "Use a double, then adjust by 1.",
    example: "6 + 7 = 13",
    thinkSteps: [
      "Think of 6 + 6.",
      "Add 1 more."
    ]
  },
  {
    id: 12,
    stageId: StageId.DoublesForest,
    code: "near-double-two",
    name: "Near Doubles: Two Apart",
    reason: "You unlocked a new lesson!",
    explanation: "Use a nearby double, then adjust by 2.",
    example: "6 + 8 = 14",
    thinkSteps: [
      "Think of 6 + 6.",
      "Add 2 more."
    ]
  },

  // Chapter 4: Bridge Town, lessons 13-15
  {
    id: 13,
    stageId: StageId.BridgeTown,
    code: "make-10-add",
    name: "Make 10 to Add",
    reason: "Welcome to Chapter 4!",
    explanation: "Fill up to 10 first, then add what is left.",
    example: "8 + 5 = 13",
    thinkSteps: [
      "8 needs 2 to make 10.",
      "Split 5 into 2 and 3.",
      "10 + 3 = 13."
    ]
  },
  {
    id: 14,
    stageId: StageId.BridgeTown,
    code: "bridge-back",
    name: "Bridge Back to Subtract",
    reason: "You unlocked a new lesson!",
    explanation: "Jump back to 10 first, then subtract what is left.",
    example: "14 - 6 = 8",
    thinkSteps: [
      "14 goes back 4 to reach 10.",
      "Split 6 into 4 and 2.",
      "10 - 2 = 8."
    ]
  },
  {
    id: 15,
    stageId: StageId.BridgeTown,
    code: "missing-part-10",
    name: "Missing Part to 10",
    reason: "You unlocked a new lesson!",
    explanation: "Find the missing partner that makes 10.",
    example: "7 + ? = 10",
    thinkSteps: [
      "Ask: What goes with 7 to make 10?",
      "The missing partner is 3."
    ]
  },

  // Chapter 5: Family Village, lessons 16-18
  {
    id: 16,
    stageId: StageId.FamilyVillage,
    code: "fact-family-10",
    name: "Fact Families to 10",
    reason: "Welcome to Chapter 5!",
    explanation: "Use related addition and subtraction facts with totals to 10.",
    example: "4 + 6 = 10, 10 - 4 = 6",
    thinkSteps: [
      "Think of the whole number.",
      "Use the two parts that make it.",
      "Addition and subtraction belong together."
    ]
  },
  {
    id: 17,
    stageId: StageId.FamilyVillage,
    code: "fact-family-20",
    name: "Fact Families to 20",
    reason: "You unlocked a new lesson!",
    explanation: "Use related facts with totals up to 20.",
    example: "8 + 7 = 15, 15 - 8 = 7",
    thinkSteps: [
      "Think of the addition fact.",
      "Use it backward for subtraction.",
      "The parts and whole stay connected."
    ]
  },
  {
    id: 18,
    stageId: StageId.FamilyVillage,
    code: "missing-addend",
    name: "Missing Addend Thinking",
    reason: "You unlocked a new lesson!",
    explanation: "Find the missing part by thinking about the difference.",
    example: "8 + ? = 15",
    thinkSteps: [
      "Start at 8.",
      "Count or think up to 15.",
      "The difference is the missing part."
    ]
  },

  // Chapter 6: Big Number Mountain, lessons 19-25
  {
    id: 19,
    stageId: StageId.BigNumberMountain,
    code: "add-tens",
    name: "Add and Subtract Tens",
    reason: "Welcome to Chapter 6!",
    explanation: "Use tens like friendly building blocks.",
    example: "30 + 40, 70 - 20",
    thinkSteps: [
      "Count the tens.",
      "Keep the zero at the end.",
      "Check whether you are adding or subtracting."
    ]
  },
  {
    id: 20,
    stageId: StageId.BigNumberMountain,
    code: "add-ones-two-digit",
    name: "Add Ones to Two-Digit Numbers",
    reason: "You unlocked a new lesson!",
    explanation: "Add a small number to a two-digit number without crossing the next ten.",
    example: "34 + 5 = 39",
    thinkSteps: [
      "Keep the tens the same.",
      "Add the ones.",
      "Check that you did not pass the next ten."
    ]
  },
  {
    id: 21,
    stageId: StageId.BigNumberMountain,
    code: "subtract-ones-two-digit",
    name: "Subtract Ones from Two-Digit Numbers",
    reason: "You unlocked a new lesson!",
    explanation: "Take away a small number from the ones place.",
    example: "48 - 6 = 42",
    thinkSteps: [
      "Keep the tens the same.",
      "Subtract the ones.",
      "Check whether you crossed a ten."
    ]
  },
  {
    id: 22,
    stageId: StageId.BigNumberMountain,
    code: "bridge-ones-two-digit",
    name: "Bridge Ones in Two-Digit Numbers",
    reason: "You unlocked a new lesson!",
    explanation: "Use the next or previous ten when ones cross a ten.",
    example: "38 + 7, 42 - 5",
    thinkSteps: [
      "Jump to the nearest ten first.",
      "Then finish with what is left.",
      "Use the bridge just like you did within 20."
    ]
  },
  {
    id: 23,
    stageId: StageId.BigNumberMountain,
    code: "add-two-digit-place",
    name: "Add Two-Digit Numbers by Place Value",
    reason: "You unlocked a new lesson!",
    explanation: "Add tens first, then ones.",
    example: "35 + 22 = 57",
    thinkSteps: [
      "Add the tens.",
      "Add the ones.",
      "Put the parts together."
    ]
  },
  {
    id: 24,
    stageId: StageId.BigNumberMountain,
    code: "subtract-two-digit-place",
    name: "Subtract Two-Digit Numbers by Place Value",
    reason: "You unlocked a new lesson!",
    explanation: "Subtract tens first, then ones.",
    example: "58 - 24 = 34",
    thinkSteps: [
      "Subtract the tens.",
      "Subtract the ones.",
      "Put the answer together."
    ]
  },
  {
    id: 25,
    stageId: StageId.BigNumberMountain,
    code: "compensation",
    name: "Compensation",
    reason: "You unlocked the final lesson!",
    explanation: "Make a friendly number, then adjust.",
    example: "39 + 6, 50 - 19",
    thinkSteps: [
      "Change one number to a friendly ten.",
      "Do the easier calculation.",
      "Adjust back if needed."
    ]
  },
];

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
      range(0, 10).forEach((x) => {
        list.push(makeQuestion({ strategyCode, question: `${x} + 0`, answer: x, hint: "Adding 0 keeps the number the same.", family: "zero-add", difficulty: 1 }));
        if (x !== 0) {
          list.push(makeQuestion({ strategyCode, question: `0 + ${x}`, answer: x, hint: "Adding 0 keeps the number the same.", family: "zero-add", difficulty: 1 }));
        }
        list.push(makeQuestion({ strategyCode, question: `${x} - 0`, answer: x, hint: "Subtracting 0 keeps the number the same.", family: "zero-subtract", difficulty: 1 }));
      });
      break;
    }
    case "one-more-less": {
      range(0, 10).forEach((x) => {
        list.push(makeQuestion({ strategyCode, question: `${x} + 1`, answer: x + 1, hint: `Start at ${x} and move one step forward.`, family: "one-more", difficulty: 1 }));
        if (x !== 1) {
          list.push(makeQuestion({ strategyCode, question: `1 + ${x}`, answer: x + 1, hint: `Start at ${x} and move one step forward.`, family: "one-more", difficulty: 1 }));
        }
      });
      range(1, 11).forEach((x) => {
        list.push(makeQuestion({ strategyCode, question: `${x} - 1`, answer: x - 1, hint: `Start at ${x} and move one step back.`, family: "one-less", difficulty: 1 }));
      });
      break;
    }
    case "two-more-less": {
      range(0, 10).forEach((x) => {
        list.push(makeQuestion({ strategyCode, question: `${x} + 2`, answer: x + 2, hint: `Start at ${x} and move two steps forward.`, family: "two-more", difficulty: 1 }));
        if (x !== 2) {
          list.push(makeQuestion({ strategyCode, question: `2 + ${x}`, answer: x + 2, hint: `Start at ${x} and move two steps forward.`, family: "two-more", difficulty: 1 }));
        }
      });
      range(2, 12).forEach((x) => {
        list.push(makeQuestion({ strategyCode, question: `${x} - 2`, answer: x - 2, hint: `Start at ${x} and move two steps back.`, family: "two-less", difficulty: 1 }));
      });
      break;
    }
    case "bond-10": {
      range(0, 10).forEach((part) => {
        const missing = 10 - part;
        const partnerHint = `${part} and ${missing} are partners that make 10.`;

        list.push(makeQuestion({
          strategyCode,
          question: `${part} + ? = 10`,
          answer: missing,
          hint: partnerHint,
          family: "make-10-missing-part",
          difficulty: 1
        }));

        if (part !== missing) {
          list.push(makeQuestion({
            strategyCode,
            question: `? + ${part} = 10`,
            answer: missing,
            hint: partnerHint,
            family: "make-10-missing-part",
            difficulty: 1
          }));
        }

        list.push(makeQuestion({
          strategyCode,
          question: `10 = ${part} + ?`,
          answer: missing,
          hint: partnerHint,
          family: "make-10-equation",
          difficulty: 1
        }));
      });

      range(1, 5).forEach((left) => {
        const right = 10 - left;
        list.push(makeQuestion({
          strategyCode,
          question: `${left} + ${right}`,
          answer: 10,
          hint: `${left} and ${right} are partners that make 10.`,
          family: "make-10-full-fact",
          difficulty: 1
        }));
      });
      break;
    }
    case "subtract-from-10": {
      range(0, 10).forEach((x) => {
        list.push(makeQuestion({ strategyCode, question: `10 - ${x}`, answer: 10 - x, hint: `Think of the partner that goes with ${x} to make 10.`, family: "subtract-from-10", difficulty: 1 }));
      });
      break;
    }
    case "count-on": {
      range(5, 16).forEach((main) => {
        range(1, 4).forEach((extra) => {
          if (main + extra <= 20) {
            list.push(makeQuestion({ strategyCode, question: `${main} + ${extra}`, answer: main + extra, hint: `Start with ${main} and count on ${extra} jumps.`, family: "count-on-add", difficulty: 2 }));
            list.push(makeQuestion({ strategyCode, question: `${extra} + ${main}`, answer: main + extra, hint: `Start with ${main} and count on ${extra} jumps.`, family: "count-on-add", difficulty: 2 }));
          }
        });
      });
      break;
    }
    case "count-back": {
      range(5, 20).forEach((start) => {
        range(1, 4).forEach((sub) => {
          if (start - sub >= 0) {
            list.push(makeQuestion({ strategyCode, question: `${start} - ${sub}`, answer: start - sub, hint: `Start at ${start} and count back ${sub} steps.`, family: "count-back-subtract", difficulty: 2 }));
          }
        });
      });
      break;
    }
    case "count-up": {
      range(5, 19).forEach((bottom) => {
        range(1, 5).forEach((diff) => {
          const top = bottom + diff;
          if (top <= 20) {
            list.push(makeQuestion({ strategyCode, question: `${top} - ${bottom}`, answer: diff, hint: `Count up from ${bottom} to ${top}.`, family: "count-up-subtract", difficulty: 2 }));
          }
        });
      });
      break;
    }
    case "doubles": {
      range(0, 10).forEach((x) => {
        list.push(makeQuestion({ strategyCode, question: `${x} + ${x}`, answer: x + x, hint: `Double ${x}.`, family: "double", difficulty: 2 }));
      });
      break;
    }
    case "half-facts": {
      range(1, 10).forEach((x) => {
        list.push(makeQuestion({ strategyCode, question: `${x * 2} - ${x}`, answer: x, hint: `Since ${x} + ${x} = ${x * 2}, half of ${x * 2} is ${x}.`, family: "half", difficulty: 2 }));
      });
      break;
    }
    case "near-double-one": {
      range(1, 9).forEach((x) => {
        const sum = x + x + 1;
        list.push(makeQuestion({ strategyCode, question: `${x} + ${x + 1}`, answer: sum, hint: `Use ${x} + ${x}, then add 1 more.`, family: "near-double-one", difficulty: 2 }));
        list.push(makeQuestion({ strategyCode, question: `${x + 1} + ${x}`, answer: sum, hint: `Use ${x} + ${x}, then add 1 more.`, family: "near-double-one", difficulty: 2 }));
      });
      break;
    }
    case "near-double-two": {
      range(1, 8).forEach((x) => {
        const sum = x + x + 2;
        list.push(makeQuestion({ strategyCode, question: `${x} + ${x + 2}`, answer: sum, hint: `Use ${x} + ${x}, then add 2 more.`, family: "near-double-two", difficulty: 2 }));
        list.push(makeQuestion({ strategyCode, question: `${x + 2} + ${x}`, answer: sum, hint: `Use ${x} + ${x}, then add 2 more.`, family: "near-double-two", difficulty: 2 }));
      });
      break;
    }
    case "make-10-add": {
      range(2, 9).forEach((a) => {
        range(2, 9).forEach((b) => {
          const sum = a + b;
          if (sum > 10 && sum <= 18) {
            list.push(makeQuestion({ strategyCode, question: `${a} + ${b}`, answer: sum, hint: `${a} needs ${10 - a} to make 10. Split the other number and finish from 10.`, family: "make-10-add", difficulty: 3 }));
          }
        });
      });
      break;
    }
    case "bridge-back": {
      range(11, 20).forEach((start) => {
        range(2, 9).forEach((sub) => {
          const answer = start - sub;
          if (answer >= 2 && answer < 10 && sub > start - 10) {
            list.push(makeQuestion({ strategyCode, question: `${start} - ${sub}`, answer, hint: `Jump back to 10 first, then subtract the rest.`, family: "bridge-back-subtract", difficulty: 3 }));
          }
        });
      });
      break;
    }
    case "missing-part-10": {
      range(0, 10).forEach((part) => {
        const missing = 10 - part;
        list.push(makeQuestion({ strategyCode, question: `${part} + ? = 10`, answer: missing, hint: `Find the partner that goes with ${part} to make 10.`, family: "missing-part-10", difficulty: 2 }));
        if (part !== missing) {
          list.push(makeQuestion({ strategyCode, question: `? + ${part} = 10`, answer: missing, hint: `Find the partner that goes with ${part} to make 10.`, family: "missing-part-10", difficulty: 2 }));
        }
      });
      break;
    }
    case "fact-family-10": {
      range(1, 9).forEach((a) => {
        const b = 10 - a;
        list.push(makeQuestion({ strategyCode, question: `${a} + ${b}`, answer: 10, hint: `${a}, ${b}, and 10 are in the same fact family.`, family: "family-10-add", difficulty: 2 }));
        list.push(makeQuestion({ strategyCode, question: `10 - ${a}`, answer: b, hint: `${a}, ${b}, and 10 are in the same fact family.`, family: "family-10-subtract", difficulty: 2 }));
        list.push(makeQuestion({ strategyCode, question: `10 - ${b}`, answer: a, hint: `${a}, ${b}, and 10 are in the same fact family.`, family: "family-10-subtract", difficulty: 2 }));
      });
      break;
    }
    case "fact-family-20": {
      range(11, 20).forEach((total) => {
        range(2, 9).forEach((a) => {
          const b = total - a;
          if (b >= 2 && b <= 9) {
            list.push(makeQuestion({ strategyCode, question: `${a} + ${b}`, answer: total, hint: `${a}, ${b}, and ${total} are in the same fact family.`, family: "family-20-add", difficulty: 3 }));
            list.push(makeQuestion({ strategyCode, question: `${total} - ${a}`, answer: b, hint: `Think of the related addition fact ${a} + ${b} = ${total}.`, family: "family-20-subtract", difficulty: 3 }));
            list.push(makeQuestion({ strategyCode, question: `${total} - ${b}`, answer: a, hint: `Think of the related addition fact ${a} + ${b} = ${total}.`, family: "family-20-subtract", difficulty: 3 }));
          }
        });
      });
      break;
    }
    case "missing-addend": {
      range(11, 20).forEach((total) => {
        range(2, 9).forEach((part) => {
          const missing = total - part;
          if (missing >= 2 && missing <= 9) {
            list.push(makeQuestion({ strategyCode, question: `${part} + ? = ${total}`, answer: missing, hint: `Count up from ${part} to ${total}.`, family: "missing-addend", difficulty: 3 }));
          }
        });
      });
      break;
    }
    case "add-tens": {
      range(1, 9).forEach((a) => {
        range(1, 9).forEach((b) => {
          if (a + b <= 10) {
            list.push(makeQuestion({ strategyCode, question: `${a * 10} + ${b * 10}`, answer: (a + b) * 10, hint: `Add ${a} tens and ${b} tens.`, family: "add-tens", difficulty: 3 }));
          }
          if (a > b) {
            list.push(makeQuestion({ strategyCode, question: `${a * 10} - ${b * 10}`, answer: (a - b) * 10, hint: `Subtract ${b} tens from ${a} tens.`, family: "subtract-tens", difficulty: 3 }));
          }
        });
      });
      break;
    }
    case "add-ones-two-digit": {
      [2, 3, 4, 5, 6].forEach((tens) => {
        [0, 2, 4, 6].forEach((ones) => {
          range(1, 4).forEach((add) => {
            if (ones + add <= 9) {
              const n = tens * 10 + ones;
              list.push(makeQuestion({ strategyCode, question: `${n} + ${add}`, answer: n + add, hint: `Keep the tens and add the ones: ${ones} + ${add}.`, family: "add-ones-two-digit", difficulty: 3 }));
            }
          });
        });
      });
      break;
    }
    case "subtract-ones-two-digit": {
      [2, 3, 4, 5, 6, 7, 8].forEach((tens) => {
        [3, 5, 7, 9].forEach((ones) => {
          range(1, 4).forEach((sub) => {
            if (ones - sub >= 0) {
              const n = tens * 10 + ones;
              list.push(makeQuestion({ strategyCode, question: `${n} - ${sub}`, answer: n - sub, hint: `Keep the tens and subtract the ones: ${ones} - ${sub}.`, family: "subtract-ones-two-digit", difficulty: 3 }));
            }
          });
        });
      });
      break;
    }
    case "bridge-ones-two-digit": {
      [2, 3, 4, 5, 6].forEach((tens) => {
        [7, 8, 9].forEach((ones) => {
          range(2, 5).forEach((add) => {
            if (ones + add >= 10 && ones + add <= 14) {
              const n = tens * 10 + ones;
              list.push(makeQuestion({ strategyCode, question: `${n} + ${add}`, answer: n + add, hint: `Jump from ${n} to the next ten, then add what is left.`, family: "bridge-ones-add", difficulty: 4 }));
            }
          });
        });
      });
      [2, 3, 4, 5, 6].forEach((tens) => {
        [1, 2, 3].forEach((ones) => {
          range(2, 5).forEach((sub) => {
            if (sub > ones) {
              const n = tens * 10 + ones;
              list.push(makeQuestion({ strategyCode, question: `${n} - ${sub}`, answer: n - sub, hint: `Jump from ${n} back to the previous ten, then subtract what is left.`, family: "bridge-ones-subtract", difficulty: 4 }));
            }
          });
        });
      });
      break;
    }
    case "add-two-digit-place": {
      [2, 3, 4, 5, 6].forEach((t1) => {
        [1, 3, 5, 7].forEach((o1) => {
          [1, 2].forEach((t2) => {
            [1, 2, 3, 4].forEach((o2) => {
              if (o1 + o2 <= 9) {
                const n1 = t1 * 10 + o1;
                const n2 = t2 * 10 + o2;
                if (n1 + n2 < 100) {
                  list.push(makeQuestion({ strategyCode, question: `${n1} + ${n2}`, answer: n1 + n2, hint: `Add the tens, then add the ones.`, family: "add-place-value", difficulty: 4 }));
                }
              }
            });
          });
        });
      });
      break;
    }
    case "subtract-two-digit-place": {
      [4, 5, 6, 7, 8].forEach((t1) => {
        [3, 5, 7, 9].forEach((o1) => {
          [1, 2, 3].forEach((t2) => {
            [1, 2, 3, 4].forEach((o2) => {
              if (t1 > t2 && o1 >= o2) {
                const n1 = t1 * 10 + o1;
                const n2 = t2 * 10 + o2;
                list.push(makeQuestion({ strategyCode, question: `${n1} - ${n2}`, answer: n1 - n2, hint: `Subtract the tens, then subtract the ones.`, family: "subtract-place-value", difficulty: 4 }));
              }
            });
          });
        });
      });
      break;
    }
    case "compensation": {
      [1, 2, 3, 4, 5, 6, 7, 8].forEach((tens) => {
        const nearTen = tens * 10 + 9;
        range(2, 6).forEach((add) => {
          if (nearTen + add < 100) {
            list.push(makeQuestion({ strategyCode, question: `${nearTen} + ${add}`, answer: nearTen + add, hint: `Make ${nearTen} into ${nearTen + 1}, then add the rest.`, family: "compensation-add", difficulty: 4 }));
          }
        });
      });
      [3, 4, 5, 6, 7, 8, 9].forEach((tens) => {
        const base = tens * 10;
        range(8, 15).forEach((sub) => {
          if (base - sub > 0) {
            list.push(makeQuestion({ strategyCode, question: `${base} - ${sub}`, answer: base - sub, hint: `Subtract a nearby ten first, then adjust.`, family: "compensation-subtract", difficulty: 4 }));
          }
        });
      });
      break;
    }
    default: {
      range(1, 10).forEach((a) => {
        range(1, 10).forEach((b) => {
          list.push(makeQuestion({ strategyCode, question: `${a} + ${b}`, answer: a + b, hint: "Count on if needed.", family: "fallback-add", difficulty: 1 }));
        });
      });
    }
  }

  return uniqueQuestions(list);
}

export function getStrategyCodesForPractice(strategyCode: string): string[] {
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
