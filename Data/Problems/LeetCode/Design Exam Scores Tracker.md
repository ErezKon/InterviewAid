# 3709. Design Exam Scores Tracker

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-exam-scores-tracker](https://leetcode.com/problems/design-exam-scores-tracker)
**Companies:** Meesho

---

## Problem Description

Alice frequently takes exams and wants to track her scores and calculate the total scores over specific time periods.

Implement the `ExamTracker` class:

- `ExamTracker()`: Initializes the `ExamTracker` object.
- `void record(int time, int score)`: Alice takes a new exam at time `time` and achieves the score `score`.
- `long long totalScore(int startTime, int endTime)`: Returns an integer that represents the **total** score of all exams taken by Alice between `startTime` and `endTime` (inclusive). If there are no recorded exams taken by Alice within the specified time interval, return 0.

It is guaranteed that the function calls are made in chronological order. That is,

- Calls to `record()` will be made with **strictly increasing** `time`.
- Alice will never ask for total scores that require information from the future. That is, if the latest `record()` is called with `time = t`, then `totalScore()` will always be called with `startTime <= endTime <= t`.

**Constraints:**

- `1 <= time <= 10^9`
- `1 <= score <= 10^9`
- `1 <= startTime <= endTime <= t`, where `t` is the value of `time` from the most recent call of `record()`.
- Calls of `record()` will be made with **strictly increasing** `time`.
- After `ExamTracker()`, the first function call will always be `record()`.
- At most `10^5` calls will be made in total to `record()` and `totalScore()`.

---

## Approach

```
CLASS ExamScoresTracker:
    scores = SortedList()
    total = 0

    FUNCTION addScore(score):
        scores.ADD(score)
        total += score

    FUNCTION getMedian():
        n = len(scores)
        IF n % 2 == 1: RETURN scores[n // 2]
        RETURN (scores[n // 2 - 1] + scores[n // 2]) / 2

    FUNCTION getMean():
        RETURN total / len(scores)
```

---

## Examples

```
Example 1:
  Input:
  ["ExamTracker", "record", "totalScore", "record", "totalScore", "totalScore", "totalScore", "totalScore"]
  [[], [1, 98], [1, 1], [5, 99], [1, 3], [1, 5], [3, 4], [2, 5]]
  Output:
  [null, null, 98, null, 98, 197, 0, 99]
  Explanation:
  ExamTracker examTracker = new ExamTracker();
  examTracker.record(1, 98); // Alice takes a new exam at time 1, scoring 98.
  examTracker.totalScore(1, 1); // Between time 1 and time 1, Alice took 1 exam at time 1, scoring 98. The total score is 98.
  examTracker.record(5, 99); // Alice takes a new exam at time 5, scoring 99.
  examTracker.totalScore(1, 3); // Between time 1 and time 3, Alice took 1 exam at time 1, scoring 98. The total score is 98.
  examTracker.totalScore(1, 5); // Between time 1 and time 5, Alice took 2 exams at time 1 and 5, scoring 98 and 99. The total score is 98 + 99 = 197.
  examTracker.totalScore(3, 4); // Alice did not take any exam between time 3 and time 4. Therefore, the answer is 0.
  examTracker.totalScore(2, 5); // Between time 2 and time 5, Alice took 1 exam at time 5, scoring 99. The total score is 99.
```

---

## Walkthrough

| Operation | Internal State (`scores`, `total`) |
|-----------|-----------------------------------|
| addScore(90) | scores=[90], total=90 |
| addScore(80) | scores=[80,90], total=170 |
| addScore(70) | scores=[70,80,90], total=240 |
| getMedian() | n=3 → return scores[1]=80 |
| getMean()   | return 240/3 = 80 |
| addScore(100) | scores=[70,80,90,100], total=340 |
| getMedian() | n=4 → (scores[1]+scores[2])/2 = (80+90)/2 = 85 |

---

## Complexity Analysis

- **Time Complexity:** `addScore` O(log n) for insertion into SortedList; `getMedian` O(1); `getMean` O(1).
- **Space Complexity:** O(n) to store all scores.

---

## Follow-Up Questions

- How would you support retrieving the top k scores efficiently?
- How can you handle deletions of scores while maintaining median and mean?
- What if scores are streamed in real‑time and you need constant‑time median?

---

## Key Takeaway

> **SortedList for O(log n) insertion and O(1) median access by index. Running sum for O(1) mean. Combine data structures for multi‑query designs.**