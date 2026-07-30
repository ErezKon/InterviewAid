# 2373. Largest Local Values in a Matrix

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/largest-local-values-in-a-matrix](https://leetcode.com/problems/largest-local-values-in-a-matrix)
**Companies:** Bloomberg, Google, Meta, Openai

---

## 1. Problem Description

For each 3×3 subgrid, find the maximum value. Return the `(n-2) × (n-2)` result matrix.

---

## 2. Examples

**Example 1:**
```
Input: grid = [[9,9,8,1],[5,6,2,6],[8,2,6,4],[6,2,2,2]]
Output: [[9,9],[8,6]]
Explanation: The 3×3 subgrids are:
[[9,9,8],[5,6,2],[8,2,6]] → max 9
[[9,8,1],[6,2,6],[2,6,4]] → max 9
[[5,6,2],[8,2,6],[6,2,2]] → max 8
[[6,2,6],[2,6,4],[2,2,2]] → max 6
```

**Example 2:**
```
Input: grid = [[1,1,1],[1,1,1],[1,1,1]]
Output: [[1]]
```

---

## 3. Approach: Brute Force — O(n²) ✅

```text
FUNCTION largestLocal(grid):
    n ← LENGTH(grid)
    result ← MATRIX(n-2, n-2) FILLED WITH 0
    FOR r ← 0 TO n-3:
        FOR c ← 0 TO n-3:
            maxVal ← -∞
            FOR i ← r TO r+2:
                FOR j ← c TO c+2:
                    IF grid[i][j] > maxVal:
                        maxVal ← grid[i][j]
            result[r][c] ← maxVal
    RETURN result
```

---

## 4. Walkthrough

Consider the first example. The algorithm slides a 3×3 window across the matrix. For the top‑left window (`r=0,c=0`) it examines nine cells and records `9`. It then moves right (`c=1`) and again scans nine cells, finding another `9`. Repeating this for all positions yields `[[9,9],[8,6]]`.

---

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(n²) – each of the (n‑2)² windows scans 9 cells | O(n²) for the output matrix |

---

## 6. Follow‑Up Questions

* How would you adapt the solution for a variable window size `k`?
* Can you achieve O(n²) time without the inner 3×3 loops using prefix maxima?
* How would you handle non‑square matrices?

---

## 3. Key Takeaway

> Fixed 3×3 window — just iterate and take max of 9 elements per position. Simple and optimal for this constraint.
