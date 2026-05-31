# Mental Math Journey

Mental Math Journey is a kid-friendly mental math web app for elementary students. It builds addition and subtraction fluency through short practice sessions, clear chapter progression, and adaptive review.

The app is organized like this:

```text
Journey -> Chapter -> Lesson -> Practice
```

Students move through 6 chapters and 30 lessons. Each lesson introduces one mental math idea, then later lessons mix those ideas through Strategy Bridge practice. The goal is not just to answer facts correctly, but to build a useful path from anchor facts to flexible mental math.

## Teaching flow logic

The lesson sequence is designed around this progression:

```text
Instant anchor facts -> derived facts -> make-10 thinking -> operation relationships -> two-digit strategies -> mixed strategy fluency
```

### 1. Start with facts students can know instantly

Chapter 1 focuses on simple, high-value facts that should become automatic: zero, one more, two more, small doubles, make-10 pairs, and subtracting from 10.

These facts are not meant to be solved by slow counting. They become anchors that students can use later to solve harder facts.

### 2. Use doubles as early anchors

Doubles are introduced earlier than in the previous flow. Small doubles come first, then larger doubles, then near doubles.

This supports mental strategies such as:

```text
5 + 4 -> think 5 + 5, then subtract 1
6 + 8 -> think 7 + 7
```

Near doubles are taught after students already have doubles ready to use.

### 3. Use 10 as a major thinking tool

Make-10 pairs and subtract-from-10 facts are placed next to each other because they are inverse ideas. Later, students use that knowledge to bridge through 10.

Examples:

```text
8 + 5 -> 8 + 2 + 3 -> 13
14 - 6 -> 14 - 4 - 2 -> 8
```

The flow treats 10 as a friendly number that helps students move beyond counting.

### 4. Connect addition and subtraction

Fact families, missing addends, and count-up subtraction are grouped together because they all rely on the relationship between parts and a whole.

Examples:

```text
8 + 7 = 15
15 - 8 = 7
8 + ? = 15
```

Count-up subtraction appears here because it is really missing-addend thinking. It is not treated as an early default strategy for all addition and subtraction.

### 5. Scale the same ideas to two-digit numbers

Two-digit lessons show that the same shortcuts still work with bigger numbers. Students work with tens, ones, adding or subtracting 10, bridging across tens, place value, and compensation.

Examples:

```text
56 - 10 -> 46
38 + 7 -> 38 + 2 + 5 -> 45
39 + 6 -> 40 + 5 -> 45
```

### 6. Use Strategy Bridge lessons for flexible practice

Strategy Bridge lessons provide mixed practice after students have learned enough strategies to choose from. The app does not ask students to report which strategy they used. Students simply solve each problem using whichever strategy feels easiest or fastest.

This keeps the app focused on fluency while still giving students practice choosing efficient methods.

### 7. Keep counting as the backup plan

Counting is not removed, but it is moved later and framed carefully. Students first learn stronger mental math strategies. Counting on or counting back is taught as a backup when no shortcut appears.

## Chapter plan

| Chapter | Name | Lessons | Main focus |
|---:|---|---:|---|
| 1 | Starter Island | 6 | Instant anchor facts with numbers 0-10 |
| 2 | Doubles Forest | 3 | Doubles and near doubles |
| 3 | Bridge Town | 4 | Make 10, bridge through 10, and Strategy Bridge practice |
| 4 | Family Village | 4 | Fact families, missing parts, and count-up subtraction |
| 5 | Big Number Mountain | 8 | Two-digit mental math methods |
| 6 | The Summit | 5 | Mixed Strategy Bridge practice, speed, and backup counting |

Total: 30 lessons.

## Lesson list

### Chapter 1: Starter Island

1. Zero Rule
2. One More and One Fewer
3. Two More and Two Fewer
4. Doubles to 10
5. Make 10 Pairs
6. Subtract from 10

### Chapter 2: Doubles Forest

7. Doubles to 18
8. Near Doubles: One Apart
9. Near Doubles: Two Apart

### Chapter 3: Bridge Town

10. Make 10 to Add
11. Bridge Back to Subtract
12. Missing Part to 10
13. Strategy Bridge: Facts to 20

### Chapter 4: Family Village

14. Fact Families to 10
15. Fact Families to 20
16. Missing Addend Thinking
17. Count Up to Subtract

### Chapter 5: Big Number Mountain

18. Add and Subtract Tens
19. Add Ones to Two-Digit Numbers
20. Subtract Ones from Two-Digit Numbers
21. Add and Subtract 10
22. Bridge Ones in Two-Digit Numbers
23. Two-Digit Place Value
24. Compensation
25. Strategy Bridge: Two-Digit Mix

### Chapter 6: The Summit

26. Strategy Bridge: Fast Facts to 20
27. Strategy Bridge: Missing Parts
28. Strategy Bridge: Two-Digit Review
29. Speed Challenge
30. The Backup Plan

## Practice and review

Each lesson uses a 1-minute practice session. The default speed target is adjustable in Settings.

Current lesson facts are the main practice pool. Older facts return as Quick Review when the app has evidence they need attention, such as recent mistakes, timeouts, or repeated slow answers.

This keeps students moving forward while still protecting earlier learning.


## Adaptive review engine

Mental Math Journey includes an adaptive review engine that tracks each practiced fact over time, not just the final score from a round. For every fact, the app stores how often it has appeared, how often it was answered correctly or incorrectly, whether it timed out, the average response time, a short history of recent attempts, a confidence score, a mastery score, fast-streak progress, slow-or-wrong history, and a current status.

The speed target is used to decide what counts as fluent. Internally, the app converts the target facts-per-minute setting into a fluent response time. Fast correct answers raise confidence more strongly, slower correct answers raise it less, and wrong answers or timeouts lower confidence. Recent mistakes, timeouts, and very slow responses can also prevent a fact from being treated as fully fluent too quickly.

Each fact is classified into one of several review states:

```text
empty -> learning -> near-ready -> review -> fluent
                         \-> needs-support
```

When the app chooses facts for practice, it uses weighted selection rather than simple random selection. Facts are more likely to return when they have low mastery, low accuracy, recent weak attempts, timeouts, slow response history, or a status such as `learning` or `needs-support`. Facts that are fluent are shown less often, but they are not permanently removed. This keeps strong facts fresh while giving weaker facts more practice.

Older facts can return through Quick Review. The review engine looks across previously practiced facts, prioritizes facts that need attention, and mixes them into current lesson practice in a controlled way. This helps students keep moving forward through the journey while still revisiting facts that are not yet fast and accurate.

## Progress storage

Progress is stored locally in the browser using `localStorage`.

Main key:

```text
mental_math_journey_progress
```

There is no custom backend and no database requirement.

## Build from source

The built app is static. The source code is in the `source/` folder.

To build from source:

```bash
cd source
npm install
npm run build
```

Then copy the generated `source/dist/index.html` and `source/dist/assets/` into the deploy root.

## License

MIT
