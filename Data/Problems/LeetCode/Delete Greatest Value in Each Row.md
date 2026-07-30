# 2500. Delete Greatest Value in Each Row

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/delete-greatest-value-in-each-row](https://leetcode.com/problems/delete-greatest-value-in-each-row)
**Companies:** Amazon, Google

---

## Problem Description

Repeatedly remove the maximum element from each row of a matrix simultaneously and add the overall maximum of those removed values to a running total. Continue this process until the matrix becomes empty, then return the total sum.

---

## Examples

**Example 1:**
```
Input: grid = [[1,2,4],[3,3,1]]
Output: 8
Explanation:
Step 1: remove max of each row -> [4,3]; overall max = 4, sum = 4.
Step 2: remaining rows -> [1,2] and [3,1]; remove max -> [2,3]; overall max = 3, sum = 7.
Step 3: remaining rows -> [1] and [1]; remove max -> [1,1]; overall max = 1, sum = 8.
```

**Example 2:**
```
Input: grid = [[5,2,1],[4,6,7]]
Output: 18
Explanation:
Sorted rows: [1,2,5] and [4,6,7].
Take column maxes from rightmost to leftmost: 7 + 5 + 6 = 18.
```

---

## Approach

```text
FUNCTION deleteGreatestValue(grid):
    // Sort each row in ascending order
    FOR each row IN grid:
        SORT(row)
    answer ← 0
    // Number of columns after sorting
    m ← length of grid[0]
    // Iterate columns from rightmost to leftmost
    FOR col ← m-1 DOWN TO 0:
        maxVal ← -∞
        FOR each row IN grid:
            maxVal ← MAX(maxVal, row[col])
        answer ← answer + maxVal
    RETURN answer
```

---

## Walkthrough

| Step | Grid State (rows sorted) | Column Index | Max of Column | Cumulative Sum |
|------|--------------------------|--------------|---------------|----------------|
| 1 | [[1,2,5],[4,6,7]] | 2 (rightmost) | 7 | 7 |
| 2 | Same rows | 1 | 6 | 13 |
| 3 | Same rows | 0 | 5 | 18 |

The algorithm sorts rows once, then simply picks the maximum of each column from right to left, which matches the process of repeatedly removing row maxima.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n × m log m) for sorting each of the n rows of length m |
| **Space** | O(1) extra space (in‑place sorting) |

---

## Follow-Up Questions

1. How would the solution change if rows could have different lengths?
2. Can you solve the problem without sorting, using a max‑heap for each row?
3. What is the time‑space trade‑off when using a priority queue versus sorting?

---

## Key Takeaway

> **Sort each row once; then the maximum removed at step `i` corresponds to the `(m‑i)`‑th largest element of each row. Iterating columns right‑to‑left and taking the column max yields the final answer efficiently.**