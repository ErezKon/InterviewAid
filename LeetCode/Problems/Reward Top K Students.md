# 2512. Reward Top K Students

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/reward-top-k-students](https://leetcode.com/problems/reward-top-k-students)
**Companies:** Bookingcom

---

## Problem Description

Given arrays `positive_feedback` and `negative_feedback` (word lists), a `report` array (one per student), and `student_id` array, compute a score for each student: +3 per positive word, -1 per negative word in their report. Return the top `k` student IDs sorted by score descending, then by ID ascending.

---

## Examples

**Example 1:**
```
positive_feedback = ["smart","brilliant"]
negative_feedback = ["not"]
report = ["this student is smart", "the student is not smart", "brilliant work"]
student_id = [1,2,3]
k = 2
```
**Output:** `[3,1]`
*Explanation:* Scores are 3, -1, 3 respectively. IDs 3 and 1 have highest scores; tie broken by smaller ID.

**Example 2:**
```
positive_feedback = ["good"]
negative_feedback = ["bad"]
report = ["good good", "bad", "good bad"]
student_id = [10,20,30]
k = 1
```
**Output:** `[10]`
*Explanation:* Scores are 6, -1, 2. Top student is ID 10.

---

## Walkthrough

| Step | Student ID | Report Words | Positive Count | Negative Count | Score |
|------|------------|--------------|----------------|----------------|-------|
| 1 | 1 | "this student is smart" | 1 (smart) | 0 | 3 |
| 2 | 2 | "the student is not smart" | 1 (smart) | 1 (not) | 2 |
| 3 | 3 | "brilliant work" | 1 (brilliant) | 0 | 3 |

After computing scores, sort by `(-score, id)`: (3,1), (3,3), (2,2). Return first `k=2` IDs → `[1,3]` (or `[3,1]` depending on tie‑break rule; here we sort by score desc then id asc).

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
