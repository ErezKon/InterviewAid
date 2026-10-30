# 1937. Maximum Number of Points with Cost

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-number-of-points-with-cost](https://leetcode.com/problems/maximum-number-of-points-with-cost)
**Companies:** Amazon, Bloomberg, Google, Microsoft

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given an `m x n` integer matrix `points` (**0-indexed**). Starting with `0` points, you want to **maximize** the number of points you can get from the matrix.

To gain points, you must pick one cell in **each row**. Picking the cell at coordinates `(r, c)` will **add** `points[r][c]` to your score.

However, you will lose points if you pick a cell too far from the cell that you picked in the previous row. For every two adjacent rows `r` and `r + 1` (where `0 <= r < m - 1`), picking cells at coordinates `(r, c1)` and `(r + 1, c2)` will **subtract** `abs(c1 - c2)` from your score.

Return *the **maximum** number of points you can achieve*.

`abs(x)` is defined as:

- `x` for `x >= 0`.
- `-x` for `x < 0`.

**Constraints:**
- `m == points.length`
- `n == points[r].length`
- `1 <= m, n <= 10^5`
- `1 <= m * n <= 10^5`
- `0 <= points[r][c] <= 10^5`

---

## Examples

```
Example 1:
  Input: points = [[1,2,3],[1,5,1],[3,1,1]]
  Output: 9
  Explanation:
    The blue cells denote the optimal cells to pick, which have coordinates (0, 2), (1, 1), and (2, 0).
    You add 3 + 5 + 3 = 11 to your score.
    However, you must subtract abs(2 - 1) + abs(1 - 0) = 2 from your score.
    Your final score is 11 - 2 = 9.
```

```
Example 2:
  Input: points = [[1,5],[2,3],[4,2]]
  Output: 11
  Explanation:
    The blue cells denote the optimal cells to pick, which have coordinates (0, 1), (1, 1), and (2, 0).
    You add 5 + 3 + 4 = 12 to your score.
    However, you must subtract abs(1 - 1) + abs(1 - 0) = 1 from your score.
    Your final score is 12 - 1 = 11.
```

---

## Key Insight

> Naive DP: for each cell in row `r`, check all cells in row `r-1` → O(mn²). Optimize with **left-max and right-max propagation**: precompute the best value from the left (decaying by 1 per step) and from the right, then combine in O(n) per row.

---

## Approach: DP with Left/Right Max — O(m·n) ✅

```
FUNCTION maxPoints(points)
    m, n ← dimensions
    prev ← points[0]

    FOR r ← 1 TO m - 1 DO
        // Left pass: best value coming from left
        leftMax ← array of n
        leftMax[0] ← prev[0]
        FOR c ← 1 TO n - 1 DO
            leftMax[c] ← MAX(leftMax[c-1] - 1, prev[c])

        // Right pass: best value coming from right
        rightMax ← array of n
        rightMax[n-1] ← prev[n-1]
        FOR c ← n - 2 DOWN TO 0 DO
            rightMax[c] ← MAX(rightMax[c+1] - 1, prev[c])

        // Combine
        curr ← array of n
        FOR c ← 0 TO n - 1 DO
            curr[c] ← points[r][c] + MAX(leftMax[c], rightMax[c])

        prev ← curr

    RETURN MAX(prev)
END FUNCTION
```

---

## Walkthrough

```
points = [[1,2,3],[1,5,1],[3,1,1]]
prev = [1, 2, 3]
```

**Row 1:**
- leftMax: [1, 2, 3]
- rightMax: [3, 3, 3] → wait: rightMax[2]=3, rightMax[1]=max(3-1,2)=2, rightMax[0]=max(2-1,1)=1
- Actually: leftMax=[1,2,3], rightMax=[1,2,3]
- curr: [1+1, 5+2, 1+3] = [2, 7, 4]

**Row 2:**
- prev = [2, 7, 4]
- leftMax: [2, 7, 6], rightMax: [5, 7, 4]? → rightMax[2]=4, rightMax[1]=max(4-1,7)=7, rightMax[0]=max(7-1,2)=6
- curr: [3+6, 1+7, 1+4] = [**9**, 8, 5]

**Result: 9** ✅

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(m × n)** — two passes per row |
| Space  | **O(n)** — leftMax, rightMax, curr arrays |

---

## Follow-Up Questions

1. **Why does the left/right max trick work?**
   `leftMax[c]` represents the best `prev[j] - (c-j)` for all `j ≤ c`, which decays by 1 per column. Propagating with `max(prev[c], leftMax[c-1]-1)` captures this.

2. **Is this related to the "jump cost" DP pattern?**
   Yes — any DP with transition cost `|c - c'|` can be optimized with this left/right sweep technique.

3. **What if the penalty were `(c-c')²` instead of `|c-c'|`?**
   Would need a different technique (e.g., Li Chao tree or convex hull trick).

---

## Key Takeaway

> **Left/right max propagation** eliminates the O(n) inner loop from column transitions with linear penalties, reducing O(mn²) to O(mn) — a powerful DP optimization technique.
