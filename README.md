# Mental Math Journey

Mental Math Journey is a kid-friendly mental math web app for elementary students. It builds addition and subtraction fluency through short 1-minute practice sessions, clear chapter progression, and adaptive review.

The app is designed around this structure:

```text
Journey -> Chapter -> Lesson -> Practice
```

Students move through 6 chapters and 25 lessons. Each lesson focuses on one mental math idea. A 1-minute practice session checks whether the student is ready to continue. Earlier facts come back as quick review when needed, so separate chapter-practice and cumulative-review lessons are no longer needed.

## What changed in the rebuilt version

- Uses Chapters and Lessons instead of stages, levels, stops, or sprints.
- Uses Practice for timed quiz sessions.
- Removes separate chapter-practice and cumulative-review lessons.
- Expands number ranges gradually instead of starting with one large 0-20 pool.
- Chapter 1 focuses on numbers 0-10, with small stretches to 11 or 12 when the lesson requires it.
- Later chapters expand toward 20, then into two-digit mental math.
- Older facts return as Quick Review when useful, but current lesson facts remain the main focus.
- Student-facing wording is shorter and simpler.
- Teacher/debug-style information has been removed from the student flow.
- Mobile practice layout hides extra page elements and keeps the keypad usable.
- Chapter and lesson completion confetti is included.
- Favicons and Apple touch icons are linked in the page head.

## Chapter plan

| Chapter | Name | Lessons | Main focus |
|---:|---|---:|---|
| 1 | Starter Island | 5 | Anchor facts with numbers 0-10 |
| 2 | Counting Trail | 3 | Count on, count back, and count up within 20 |
| 3 | Doubles Forest | 4 | Doubles, halves, and near doubles |
| 4 | Bridge Town | 3 | Make 10 and bridge through 10 |
| 5 | Family Village | 3 | Fact families and missing parts |
| 6 | Big Number Mountain | 7 | Two-digit mental math methods |

Total: 25 lessons.

## Lesson list

### Chapter 1: Starter Island

1. Same Number Facts
2. One More and One Less
3. Two More and Two Less
4. Make 10 Pairs
5. Subtract from 10

### Chapter 2: Counting Trail

6. Count On to Add
7. Count Back to Subtract
8. Count Up to Subtract

### Chapter 3: Doubles Forest

9. Doubles
10. Half Facts
11. Near Doubles: One Apart
12. Near Doubles: Two Apart

### Chapter 4: Bridge Town

13. Make 10 to Add
14. Bridge Back to Subtract
15. Missing Part to 10

### Chapter 5: Family Village

16. Fact Families to 10
17. Fact Families to 20
18. Missing Addend Thinking

### Chapter 6: Big Number Mountain

19. Add and Subtract Tens
20. Add Ones to Two-Digit Numbers
21. Subtract Ones from Two-Digit Numbers
22. Bridge Ones in Two-Digit Numbers
23. Add Two-Digit Numbers by Place Value
24. Subtract Two-Digit Numbers by Place Value
25. Compensation

## Practice sessions

Each lesson uses a 1-minute practice session. The default speed target is adjustable in Settings.

A lesson is passed when the student reaches a reasonable practice sample, including:

- enough correct answers for the selected speed target
- at least 80% accuracy
- enough facts seen from the lesson
- not too many facts needing extra support

The app does not require every possible fact in the lesson pool to become fully mastered before the next lesson unlocks.

## Review behavior

Current lesson facts are the main practice pool. Older facts come back as Quick Review when the app has evidence they need attention, such as recent mistakes, timeouts, or repeated slow answers.

This keeps practice moving forward while still protecting earlier learning. Because this review happens automatically, there are no separate chapter-practice or cumulative-review lessons.

## Storage

Progress is stored locally in the browser using `localStorage`.

Main key:

```text
mental_math_journey_progress
```

There is no custom backend and no database requirement.

## Deployment

The built app is static. Deploy the root files from the package:

```text
index.html
assets/
favicon files, if used
```

The source code is in the `source/` folder.

To build from source:

```bash
cd source
npm install
npm run build
```

Then copy `source/dist/index.html` and `source/dist/assets/` to the deploy root.

## Favicons

The page includes links for these files:

```text
favicon-16x16.png
favicon-32x32.png
favicon-48x48.png
apple-touch-icon.png
apple-touch-icon-152x152.png
apple-touch-icon-167x167.png
```

Keep those files beside `index.html` when deploying.

## Testing checklist

After changes, test:

- starting a new practice session
- 3, 2, 1, Go countdown
- mobile keypad layout
- mobile keyboard suppression
- correct answers, wrong answers, and timeouts
- passing a lesson
- unlocking the next lesson
- completing a chapter
- confetti on lesson and chapter completion
- Journey Map display on mobile
- Lesson Guide display
- Settings and reset progress

## License

MIT
