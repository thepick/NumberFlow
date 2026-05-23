# NumberFlow

NumberFlow is an addition and subtraction fluency web app designed for classroom practice. It helps young learners build speed, accuracy, and confidence with mental math through short timed rounds, adaptive review, and clear progress tracking.

NumberFlow was built from the FactFlow engine, but it is adapted for early addition, subtraction, and mental math strategies rather than multiplication tables.

## What it does

NumberFlow gives students focused addition and subtraction practice while tracking how they are doing on each item. The app adjusts practice based on performance, so items that are slow, missed, timed out, not started, or not yet mastered can appear more often while mastered items gradually need less attention.

Students sign in with Google before practicing. Progress is synced through Google Drive app data storage, so students can continue their practice across supported devices when signed in with the same Google account.

NumberFlow does not require a separate database or a custom backend.

## Key features

- Google sign-in required before practice
- Timed addition and subtraction practice rounds, with a short get-ready countdown
- Adaptive item selection based on accuracy, speed, confidence, and recent performance
- Six progressive stages from anchor facts to two-digit mental math methods
- Added within-10 +3/+4 practice and near-double subtraction inverse practice
- Cluster-based unlocking so students see new groups only when they are ready
- Next Up practice queue showing current items and review items
- Stage Map showing current, locked, mastered, review, learning, and needs-practice groups
- Progress states for Mastered, Review Soon, Almost There, Learning, Needs Practice, and Not Started items
- Mastery score and progress graph with recent/all-results views
- Average speed and accuracy shown for the visible graph results
- Kid-friendly mastery logic so early facts can turn green without requiring perfection
- More stable mastered items, with Review Soon used before an item drops back down
- Streak, best streak, speed, and best-speed tracking
- Adjustable speed target: 10, 15, 20, 25, or 30 items/min
- Daily practice goal of 5 rounds
- Light mode, dark mode, and match-device appearance options
- Optional mobile haptic feedback on supported devices
- Google Drive app data sync without a separate database or a custom backend
- Sync status shown in the app header
- Sync now, sign-out, and reset-progress options
- Confetti for sub-stage unlocks and main-stage graduation
- Final completion celebration when all stages are complete

## Google sign-in and sync

NumberFlow requires students to sign in with Google before they can begin practicing in the current classroom/shared-device configuration.

Progress is synced using the student's Google Drive app data folder. This keeps the NumberFlow progress file separate from the student's normal visible Google Drive files and limits the app to its own stored progress data.

Sync is designed for classroom use:

- Students sign in with Google to start practicing.
- Progress is saved during practice.
- Before a round starts, the app can sync recent Google progress when needed.
- If Google sync is available, progress is saved to Google Drive app data storage.
- When the app is opened on another supported device, the student's saved progress can be loaded and merged.
- If sync is interrupted, the app can continue using locally cached progress during the active signed-in session.
- Sync can resume when the connection and Google session are available again.

## Designed for students

The interface is simple and classroom-friendly. Students can start a round, answer using the on-screen keypad, and see immediate feedback.

The progress tools help students and teachers quickly understand which items are mastered, which items are nearly ready, which items are still developing, and which items need more practice.

The right-side progress panel includes:

- **Next Up** - a readable list of the items the student is working on now
- **Stage Map** - a compact overview of the current stage and its locked or unlocked clusters
- **Mastery Over Time** - a progress graph for long-term growth

## Mastery and progress

NumberFlow tracks each addition, subtraction, and mental math item individually. An item can move through different progress states based on accuracy, speed, confidence, and recent performance.

The mastery system is intentionally friendly for younger learners. Early stages can turn green with fewer strong answers than later stages, but the app still watches for slow, wrong, or timed-out attempts. Mastered items are more stable, so one typo or one slow answer should not immediately erase progress. A mastered item may move to Review Soon when it shows a small weakness, but repeated weakness is needed before progress is reduced further.

The progress graph shows growth over time using saved quiz results. Started items that are not yet mastered also contribute partial progress to the mastery score, so students can see improvement while items are still developing.

## Stages and content

NumberFlow is designed to follow methods used in modern, research-backed math curricula (such as Cognitively Guided Instruction or Math Recovery) that prioritize number sense over rote memorization. Instead of grouping math facts by traditional number families (e.g., "the 1s" or "the 2s"), the app groups them sequentially by **mental math strategies**.

NumberFlow includes 326 total items across six stages:

| Stage | Name | Content | Items |
|---|---|---|---:|
| 1 | Anchor Facts | Bonds to 10, +/-0, +/-1, +/-2, subtract from 10 | 82 |
| 2 | Counting Strategies | Within-10 +3/+4 facts, related subtraction facts, count on, count back, count up | 83 |
| 3 | Doubles and Near Doubles | Double facts, half facts, near-double addition, and near-double subtraction inverses | 56 |
| 4 | Make 10 and Bridge | Make-10 addition, bridge-back subtraction | 42 |
| 5 | Fact Families | Complements to 20, inverse thinking | 28 |
| 6 | Two-Digit Methods | Compensation, partitioning, flexible bridging | 35 |

### Progression Logic: Mixed vs. Separated Operations

The flow from one level to the next is carefully structured to manage a young learner's cognitive load:

- **Mixed early operations:** In early anchor clusters, addition and subtraction are mixed together when the relationship is simple and transparent, such as `+0/-0`, `+1/-1`, and `+2/-2`. This helps students see addition and subtraction as inverse operations while still practicing careful attention to the operation sign.
- **Within-10 gap coverage:** Stage 2 now begins with missing within-10 `+3` and `+4` facts and their related subtraction facts. This gives students more practice with basic facts such as `5 + 3`, `6 + 3`, `8 - 5`, and `9 - 6` before they move into larger within-20 counting strategies.
- **Strategy-based counting practice:** Stage 2 then extends into count-on addition, count-back subtraction, and count-up subtraction within 20. Count-up subtraction is especially useful because it encourages students to think about the distance between two numbers instead of counting backward many times.
- **Near-double inverse practice:** Stage 3 includes doubles, half facts, near-double addition, and near-double subtraction inverses. This helps students connect facts such as `7 + 8 = 15` with related subtraction facts such as `15 - 7 = 8` and `15 - 8 = 7`.
- **Separated advanced operations:** As strategies become more complex, such as Make 10 and Bridge in Stage 4, addition and subtraction are separated into distinct clusters. Bridging requires holding multiple steps in working memory, such as `8 + 5 -> 8 + 2 + 3 -> 13`, so the app gives students space to build the addition strategy before practicing the more demanding bridge-back subtraction strategy.


## Privacy and storage

NumberFlow requires students to sign in with Google before practicing in the current configuration.

Progress is stored for the signed-in Google user and synced through the student's Google Drive app data folder. The sync file is used for NumberFlow progress data and is not meant to appear in the student's normal Google Drive files.

NumberFlow does not require a separate database or a custom server.

NumberFlow does not store class lists or other unnecessary classroom records in the progress data. The app uses Google sign-in to connect the practice data to the student's own Google account.

If a student signs out, clears browser data, changes devices, loses internet access, or loses access to Google sync, locally cached progress on that device may not remain available. Synced progress can be restored when the student signs in again and sync is available.

## Best use case

NumberFlow works well for daily addition and subtraction fluency practice in early elementary classrooms, intervention groups, math centers, homework stations, or independent review.

It is especially useful when students need quick, repeated practice sessions with clear feedback, manageable goals, visible progress, and progress syncing across supported devices.

## How practice, progress, and mastery work

This section explains what a student experiences from their very first round to full completion, and how the app decides what to show them and when.

---

### The big picture

NumberFlow tracks every practice item individually across the six stages. Each item has its own progress state based on how accurately and how quickly the student has answered it across multiple attempts. The app uses this information to decide which items to show more often and which items are ready to take a back seat.

Progress moves in one direction by default - forward - but the app watches for signs of weakness and will bring an item back for review if needed.

---

### Starting out

A new student begins in Stage 1, Anchor Facts. The app starts with the first unlocked cluster and opens more clusters inside the stage as the student shows readiness. Items from later clusters and stages are shown as not started or locked and do not appear in practice yet.

When an item appears for the very first time, a **"New fact!"** label is shown. Very slow correct answers on new items receive smaller confidence gains, but they are not treated the same as wrong answers. Wrong answers and timeouts still count as weak attempts.

---

### What happens during a round

Each round is timed. The default round length is 60 seconds. Pressing Start begins a short get-ready countdown before the first item appears.

The student answers as many items as they can before time runs out. The app chooses which item to show next based on a weighted selection. Items that are Not Started, Learning, Almost There, Needs Practice, overdue for review, or recently answered incorrectly are more likely to appear. Items that are already Mastered and recently answered correctly are less likely to appear, giving room for weaker items.

For each answer, the app records:

- Whether it was correct, wrong, or timed out
- How long it took, measured as response time in milliseconds
- How the response time compares with the current speed target and fluency timing
- The item's recent attempts, confidence, and display status

**Wrong answers** reset the current streak and lower the item's confidence score. If the student enters repeated wrong answers on the same item, the app briefly shows a reminder to slow down and read carefully.

**Timeouts** happen when there is no answer within 12 seconds. A timeout counts as a weak attempt. The correct answer is shown, and the student must type it before moving on. This turns a timeout into a small learning moment rather than just skipping past the item.

---

### How an item changes color

Each item in the Stage Map has one of six student-facing states:

| Color | State | What it means |
|---|---|---|
| Dark green | **Mastered** | Accurate and quick enough for now. This item counts fully toward mastery. |
| Dark green with a small yellow dot | **Review Soon** | Still counts as mastered, but the app has noticed a small weakness and will review it sooner. |
| Light green with a dashed border | **Almost There** | Nearly mastered. A few more good answers can turn it fully green. |
| Yellow | **Learning** | Started, but not yet fast or consistent enough. |
| Red / pink | **Needs Practice** | Recently missed, timed out, or repeatedly slow. |
| Grey | **Not Started** | Not started yet, locked, or not yet reached in practice. |

An item usually moves from Not Started to Learning, then toward Almost There and Mastered as the student answers it correctly and quickly across multiple spaced attempts. An item can also become Needs Practice after missed, timed-out, or repeatedly slow attempts.

---

### What "Mastered" actually requires

An item reaches **Mastered** status only when the app has enough recent evidence that the student can answer it accurately and quickly enough for that stage.

The exact thresholds are stage-aware. Early stages are more forgiving, while later mental math stages require stronger confidence and more attempts. In general, the app checks that:

- The item has been shown enough times for its current stage.
- The confidence score has reached the stage's mastery threshold.
- Recent attempts are correct.
- Most recent correct attempts are within the fluent or timely response range.
- The most recent attempt was not wrong and did not time out.
- There are not too many recent weak attempts, wrong answers, or timeouts.

This means a student cannot turn every item green from one lucky answer. The app waits for repeated success, but it stays friendlier than the multiplication version because NumberFlow is aimed at younger students.

---

### Protecting mastered items

Once an item is Mastered, it is protected. One typo, one timeout, or one very slow answer will not immediately erase progress.

A mastered item may first become Review Soon. Review Soon still counts as mastered, but it tells the app to bring the item back sooner. The item drops out of mastery only after repeated weakness or a larger confidence drop.

This makes the system feel fair. A student who genuinely knows an item will not lose progress from a single bad moment.

---

### Opening more items in the current stage

The current stage does not show every item right away. Each stage is divided into smaller clusters. More clusters open when the previous cluster has been fully seen and enough items are ready, nearly ready, or mastered.

Readiness is based on repeated practice, accuracy, confidence, and response time. This keeps the app from overwhelming a student with too many new items at once.

---

### Moving to the next stage

A student graduates to the next stage only after the current stage has been fully opened and every item in that stage has been answered at least once.

A regular graduation happens when there are no Needs Practice items in the current stage and enough items are Mastered or Review Soon.

A very strong round can also trigger graduation when the student has enough attempts, reaches strong accuracy, meets or beats the speed target, has no Needs Practice items, and has enough items that are mastered or nearly ready.

When the student graduates, a stage-unlock message appears and confetti plays. Items from previous stages are still reviewed occasionally so earlier learning is not forgotten.

---

### Speed target

The speed target is intentionally set for young students.

Available speed targets:

| Setting | Items per minute |
|---|---:|
| 1 | 10 |
| 2 | 15 |
| 3 | 20 |
| 4 | 25 |
| 5 | 30 |

Default: 10 items per minute.

The speed target affects the speed bar, graph scoring, and mastery timing. It is saved with the student's progress so each signed-in user can have a different target.

---

### The mastery score

The mastery score is shown as a number out of 100. It reflects progress across all 326 items.

It is calculated mostly from stage and item progress:

- **Mastered** and **Review Soon** items count fully toward the score.
- Started but not-yet-mastered items count partially.
- Accuracy and speed from the completed round add a small progress-based bonus.

This means the score can move forward even while items are still yellow or light green. The student does not have to wait for every item to turn green before seeing improvement.

After each round, a one-sentence note explains why the score went up, held steady, or dipped.

The progress graph shows the most recent 10 quiz results by default. The Show all results button changes the graph to all saved quiz results. The scorecard above the graph shows the current mastery score plus the average items/min and accuracy for whichever results are currently visible.

---

### Daily practice goal

The app tracks how many rounds a student completes each day. The daily goal is **5 rounds**. The practice header shows "Today: X of 5" and turns green when the goal is reached. Five rounds takes roughly 5 minutes and is enough to meaningfully move items forward.

---

### The full journey

| Stage | What the student experiences |
|---|---|
| First session | Anchor facts are introduced gradually. "New fact!" appears the first time an item is shown. |
| Early practice | Items appear often. Correct answers raise confidence. Wrong answers or timeouts bring items back quickly. |
| Building fluency | Items start turning yellow, then light green as confidence and speed improve. |
| Mastery | Items turn dark green. Some may show as Review Soon when they need a little extra review. |
| Cluster unlocks | New clusters open inside the current stage when the student shows readiness. |
| Stage graduation | Enough stage progress triggers a move to the next stage, with a level-up message and confetti. |
| Long-term | All six stages are worked through, from anchor facts to two-digit mental math methods. The mastery score climbs toward 100. |

## Deployment notes for copies

If you deploy your own copy of NumberFlow, update the Google OAuth client ID in `index.html` before publishing.

1. Open Google Cloud Console.
2. Create or select a project.
3. Enable the Google Drive API.
4. Configure the OAuth consent screen.
5. Create an OAuth 2.0 Client ID for a Web application.
6. Add your exact site URL under Authorized JavaScript origins. For GitHub Pages, this usually looks like `https://YOUR-USERNAME.github.io`.
7. Replace `GOOGLE_CLIENT_ID` in `index.html` with your own OAuth client ID.

NumberFlow uses Google Drive `appDataFolder` storage. This keeps the progress file separate from the student's normal visible Google Drive files.

## Teacher settings

Teacher-facing settings are intentionally kept in code rather than behind a password panel. To adjust defaults, edit the `APP_SETTINGS` object in `index.html`. Be careful to preserve valid JavaScript syntax when changing values.

Useful defaults in the current file include:

| Setting | Current value |
|---|---:|
| Round length | 60 seconds |
| Timeout | 12 seconds |
| Review mix | 30% |
| Default speed target | 10 items/min |
| Daily round goal | 5 rounds |

Other classroom defaults, such as requiring Google sign-in, shared-device behavior, starting stage, maximum stage, speed target options, and mastery thresholds, are also set in code.

## One-device-at-a-time recommendation

Students should not practice on two devices at the same time using the same Google account. NumberFlow can merge progress across devices, but simultaneous active practice may cause confusing score changes or over-counted attempts.

## Static files

The app is self-contained in one main HTML file, but the favicon and Apple touch icon PNG files should stay in the same folder as `index.html`. If the final celebration video is used, keep `celebration.mp4` beside `index.html` as well.

## File structure

Typical deployment filename:

```text
index.html
```

Development filename:

```text
numberflow.html
```

No build tooling is required.

## Storage details

Important local storage keys and prefixes:

| Key or prefix | Purpose |
|---|---|
| `numberflow-progress-` | Signed-in user progress key prefix |
| `numberflow-settings` | Teacher settings saved in the browser |
| `numberflow-theme-pref` | Light, dark, or system appearance preference |
| `numberflow-haptics-enabled` | Mobile haptic feedback preference |
| `numberflow-current-session-progress` | Working progress during the signed-in session |
| `numberflow-device-id` | Local sync device identifier |
| `numberflow-google-token-session` | Session token cache for Google sync |
| `numberflow-google-user-cache` | Cached Google user display info |

Drive filename:

```text
numberflow_data.json
```

## Local development

Open `numberflow.html` directly in a browser for basic local testing. The app interface can load locally, but Google sign-in and Drive sync require a correctly configured OAuth client and authorized origin.

To test with a local server:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000/numberflow.html
```

## Testing checklist

After changing the app, test:

- Google sign-in before practice
- Starting and finishing a round
- Correct answers, incorrect answers, and timeouts
- Speed target settings from 10 to 30 items per minute
- Next Up practice queue updates
- Stage Map color changes
- Sub-stage or cluster unlock confetti
- Main-stage graduation confetti
- Daily goal display: Today X of 5
- Streak, best streak, speed, and best-speed displays
- Progress graph recent/all-results toggle
- Local progress behavior after refresh
- Google Drive sync, sync now, sign-out, and reset-progress options
- Mobile layout during active rounds
- Optional haptic feedback on supported mobile devices
- Final completion celebration if all stages are complete

## License

MIT
