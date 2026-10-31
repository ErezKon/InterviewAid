# 2512. Reward Top K Students

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/reward-top-k-students](https://leetcode.com/problems/reward-top-k-students)
**Companies:** Bookingcom

---

## Problem Description

You are given two string arrays `positive_feedback` and `negative_feedback`, containing the words denoting positive and negative feedback, respectively. Note that **no** word is both positive and negative.

Initially every student has `0` points. Each positive word in a feedback report **increases** the points of a student by `3`, whereas each negative word **decreases** the points by `1`.

You are given `n` feedback reports, represented by a **0-indexed** string array `report` and a **0-indexed** integer array `student_id`, where `student_id[i]` represents the ID of the student who has received the feedback report `report[i]`. The ID of each student is **unique**.

Given an integer `k`, return *the top* `k` *students after ranking them in **non-increasing** order by their points*. In case more than one student has the same points, the one with the lower ID ranks higher.

**Constraints:**
- `1 <= positive_feedback.length, negative_feedback.length <= 10^4`
- `1 <= positive_feedback[i].length, negative_feedback[j].length <= 100`
- Both `positive_feedback[i]` and `negative_feedback[j]` consists of lowercase English letters.
- No word is present in both `positive_feedback` and `negative_feedback`.
- `n == report.length == student_id.length`
- `1 <= n <= 10^4`
- `report[i]` consists of lowercase English letters and spaces `' '`.
- There is a single space between consecutive words of `report[i]`.
- `1 <= report[i].length <= 100`
- `1 <= student_id[i] <= 10^9`
- All the values of `student_id[i]` are **unique**.
- `1 <= k <= n`

---

## Examples

**Example 1:**
```
Input: positive_feedback = ["smart","brilliant","studious"], negative_feedback = ["not"], report = ["this student is studious","the student is smart"], student_id = [1,2], k = 2
Output: [1,2]
Explanation:
Both the students have 1 positive feedback and 3 points but since student 1 has a lower ID he ranks higher.
```

**Example 2:**
```
Input: positive_feedback = ["smart","brilliant","studious"], negative_feedback = ["not"], report = ["this student is not studious","the student is smart"], student_id = [1,2], k = 2
Output: [2,1]
Explanation:
- The student with ID 1 has 1 positive feedback and 1 negative feedback, so he has 3-1=2 points.
- The student with ID 2 has 1 positive feedback, so he has 3 points.
Since student 2 has more points, [2,1] is returned.
```

---

## Walkthrough

| Step | Student ID | Report Words | Positive Count | Negative Count | Score |
|------|------------|--------------|----------------|----------------|-------|
| 1 | 1 | "this student is smart" | 1 (smart) | 0 | 3 |
| 2 | 2 | "the student is not smart" | 1 (smart) | 1 (not) | 2 |
| 3 | 3 | "brilliant work" | 1 (brilliant) | 0 | 3 |

After computing scores, sort by `(-score, id)`: (3,1), (3,3), (2,2). Return first `k=2` IDs → `[1,3]` (or `[3,1]` depending on tie-break rule; here we sort by score desc then id asc).

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
