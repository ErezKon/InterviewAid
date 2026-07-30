# 3709. Design Exam Scores Tracker

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-exam-scores-tracker](https://leetcode.com/problems/design-exam-scores-tracker)
**Companies:** Meesho

---

## Problem Description

Design a tracker that supports adding exam scores and querying statistics like median, mean, or top scores efficiently.

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

**Example 1:**
```
tracker = ExamScoresTracker()
tracker.addScore(90)
tracker.addScore(80)
tracker.addScore(70)
tracker.getMedian() // returns 80
tracker.getMean()   // returns 80
```
*Explanation:* After inserting three scores, median is the middle value and mean is the average.

**Example 2:**
```
tracker.addScore(100)
tracker.getMedian() // returns 85 (average of 80 and 90)
```
*Explanation:* Adding a fourth score makes the median the average of the two middle scores.

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