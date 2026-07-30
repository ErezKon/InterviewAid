# 1086. High Five

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/high-five](https://leetcode.com/problems/high-five)
**Companies:** Amazon, Goldman Sachs

---

## 1. Problem Description

Given an array of `(student_id, score)` pairs, compute for each student the average of their five highest scores. Return the results as a list of `[student_id, average]` pairs.

## 2. Approach: Sort + Group — O(n log n) ✅

```text
FUNCTION highFive(pairs):
    // Group scores by student id
    map ← DICTIONARY()
    FOR (id, score) IN pairs DO
        IF id NOT IN map: map[id] ← []
        APPEND score TO map[id]
    result ← []
    FOR id, scores IN map DO
        SORT scores DESCENDING
        top5 ← FIRST 5 ELEMENTS OF scores
        avg ← SUM(top5) / 5
        APPEND [id, avg] TO result
    RETURN result
```

## 3. Examples

| Input | Output |
|-------|--------|
| `[[1,91],[1,92],[2,93],[2,97],[1,60],[2,77],[1,65],[1,87],[1,100],[2,100]]` | `[[1,86],[2,92]]` |
| `[[3,100],[3,99],[3,98],[3,97],[3,96],[3,95]]` | `[[3,96]]` |

## 4. Walkthrough

1. Group scores: student 1 → `[91,92,60,65,87,100]`, student 2 → `[93,97,77,100]`.
2. Sort each list descending.
3. Take top 5: student 1 → `[100,92,91,87,65]`, student 2 → `[100,97,93,77]` (only 4 scores, use all).
4. Compute averages: student 1 → `(100+92+91+87+65)/5 = 86`, student 2 → `(100+97+93+77)/4 = 92` (rounded as integer).
5. Return `[[1,86],[2,92]]`.

## 5. Complexity Analysis

- **Time:** O(n log n) due to sorting each student's score list.
- **Space:** O(n) for storing the grouped scores.

## 6. Follow-Up Questions

- How would you solve the problem in O(n) time using a min‑heap of size 5 per student?
- What changes are needed if the number of top scores to average is a variable `k`?
- How to handle streaming input where scores arrive one by one?

## Key Takeaway

> Group by student, sort scores descending, take the top 5 and average them.
