# 2545. Sort the Students by Their Kth Score

**Difficulty:** 🟡 Medium

**Companies:** Amazon, Ibm, Lime
---

## Problem Description
Given a 2D integer array `score` where each `score[i]` represents the scores of the i‑th student in several exams, and an integer `k`, sort the students in **descending** order by their `k`‑th exam score. If two students have the same `k`‑th score, preserve their original relative order (stable sort). Return the sorted array.

## Examples
**Example 1**
```
Input: score = [[10,6,9,1],[7,6,3,4],[7,6,7,7],[10,8,9,7]], k = 3
Output: [[10,8,9,7],[10,6,9,1],[7,6,7,7],[7,6,3,4]]
Explanation: Sort by the 3‑rd index (0‑based). The first two rows have score 9, then 7, then 3.
```

**Example 2**
```
Input: score = [[3,2,1],[4,5,6],[7,8,9]], k = 0
Output: [[7,8,9],[4,5,6],[3,2,1]]
Explanation: Sort by the first column in descending order.
```

## Approach
Use a **stable sort** keyed on the `k`‑th element of each row in descending order.

```text
FUNCTION sortStudents(score, k):
    // Perform stable sort based on k‑th score descending
    RETURN STABLE_SORT(score, KEY = lambda row: -row[k])
```

## Walkthrough
| Step | Current list | Action |
|------|--------------|--------|
| 1 | [[10,6,9,1],[7,6,3,4],[7,6,7,7],[10,8,9,7]] | Sort by index 3 (value 1,4,7,7) descending |
| 2 | [[10,8,9,7],[7,6,7,7],[10,6,9,1],[7,6,3,4]] | Stable order keeps rows with equal key in original order |

## Complexity Analysis
- Time: `O(m log m)` where `m` is the number of students (rows).
- Space: `O(m)` for the sorted output (in‑place stable sort may use `O(1)` extra).

## Follow‑Up Questions
1. How would you sort by multiple columns (e.g., first by `k`‑th score, then by another column)?
2. Can you achieve the same ordering without using built‑in stable sort?
3. How would you handle very large datasets that do not fit in memory?

## Key Takeaway
A stable sort keyed on a specific column lets you reorder rows while preserving the original order for ties.
