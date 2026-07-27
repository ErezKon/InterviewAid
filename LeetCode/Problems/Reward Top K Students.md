# 2512. Reward Top K Students

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/reward-top-k-students](https://leetcode.com/problems/reward-top-k-students)
**Companies:** Bookingcom

---

## Problem Description

Given arrays `positive_feedback` and `negative_feedback` (word lists), a `report` array (one per student), and `student_id` array, compute a score for each student: +3 per positive word, -1 per negative word in their report. Return the top `k` student IDs sorted by score descending, then by ID ascending.

---

## Approach

```
FUNCTION topStudents(positive_feedback, negative_feedback, report, student_id, k):
    posSet ← SET(positive_feedback)
    negSet ← SET(negative_feedback)

    scores ← []
    FOR i ← 0 TO LENGTH(report) - 1 DO
        score ← 0
        FOR word IN SPLIT(report[i]) DO
            IF word IN posSet: score += 3
            ELSE IF word IN negSet: score -= 1
        scores.APPEND((-score, student_id[i]))

    SORT(scores)
    RETURN [sid FOR (_, sid) IN scores[:k]]
END FUNCTION
```

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | O(n·m + n log n) — n reports, m words each, then sort |
| Space  | O(n + p + q) — scores + feedback word sets |

---

## Key Takeaway

> HashSet lookups turn word matching from O(p+q) per word into O(1). Sort by `(-score, id)` to get descending score with ascending ID tiebreak in one sort.
