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

## Key Takeaway

> **SortedList for O(log n) insertion and O(1) median access by index. Running sum for O(1) mean. Combine data structures for multi-query designs.**
