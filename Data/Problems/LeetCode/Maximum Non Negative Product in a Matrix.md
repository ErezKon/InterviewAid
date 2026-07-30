# 1594. Maximum Non Negative Product in a Matrix

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-non-negative-product-in-a-matrix](https://leetcode.com/problems/maximum-non-negative-product-in-a-matrix)
**Companies:** Amazon, Google, Microsoft

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

Given an `m × n` matrix `grid` of integers, find a path from top-left to bottom-right (moving only **right** or **down**) that maximizes the **product** of elements along the path.

Return the maximum non-negative product modulo `10^9 + 7`. If all paths yield negative products, return `-1`.

**Constraints:**
- `1 <= m, n <= 15`
- `-4 <= grid[i][j] <= 4`

---

## Examples

**Example 1:**
```
Input:  grid = [[-1,-2,-3],
                [-2,-3,-3],
                [-3,-3,-2]]
Output: -1
Explanation: All paths have negative product.
```

**Example 2:**
```
Input:  grid = [[1,-2,1],
                [1,-2,1],
                [3,-4,1]]
Output: 8
Explanation: Path 1→1→3→-4→1 = -12, or 1→-2→-2→-3→-2 = -24... 
Best: 1→-2→-2→-3→-2? Actually: 1→1→3→(-4)→1=-12. Best path: 1→(-2)→(-2)→(-3)→(-2) = -24. Hmm.
Better: path with even negatives gives positive product.
```

---

## Key Insight

> Because negatives can flip sign, we must track **both the maximum and minimum products** at each cell (like Maximum Product Subarray). A large negative minimum can become the maximum after multiplying by a negative cell.

---

## Approach

```
FUNCTION maxProductPath(grid)
    MOD ← 10^9 + 7
    m, n ← dimensions of grid
    maxP ← m×n matrix    // max product reaching (r,c)
    minP ← m×n matrix    // min product reaching (r,c)
    maxP[0][0] ← minP[0][0] ← grid[0][0]

    // Initialize first row and column
    FOR c ← 1 TO n-1 DO
        maxP[0][c] ← maxP[0][c-1] * grid[0][c]
        minP[0][c] ← minP[0][c-1] * grid[0][c]
    FOR r ← 1 TO m-1 DO
        maxP[r][0] ← maxP[r-1][0] * grid[r][0]
        minP[r][0] ← minP[r-1][0] * grid[r][0]

    FOR r ← 1 TO m-1 DO
        FOR c ← 1 TO n-1 DO
            candidates ← [
                maxP[r-1][c] * grid[r][c],
                minP[r-1][c] * grid[r][c],
                maxP[r][c-1] * grid[r][c],
                minP[r][c-1] * grid[r][c]
            ]
            maxP[r][c] ← MAX(candidates)
            minP[r][c] ← MIN(candidates)

    IF maxP[m-1][n-1] >= 0 THEN
        RETURN maxP[m-1][n-1] MOD (10^9 + 7)
    ELSE
        RETURN -1
END FUNCTION
```

---

## Walkthrough

```
grid = [[1, -2, 1],
        [1, -2, 1],
        [3, -4, 1]]
```

| Cell  | maxP | minP |
|-------|------|------|
| (0,0) | 1    | 1    |
| (0,1) | -2   | -2   |
| (0,2) | -2   | -2   |
| (1,0) | 1    | 1    |
| (1,1) | max(4, -2, -2, -2)=4 | min(...)=-2 |
| (1,2) | max(4, -2, -2, -2)=4 | min(...)=-2 |
| (2,0) | 3    | 3    |
| (2,1) | max(-16, 8, -12, -12)=**8** | min(...)=-16 |
| (2,2) | max(8, -16, 4, -2)=**8** | min(...)=-16 |

**Result: 8** ✅

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(m × n)** — visit each cell once with constant work |
| Space  | **O(m × n)** — two DP matrices (can optimize to O(n)) |

---

## Follow-Up Questions

1. **Why track both max and min?**
   Multiplying a negative value by a large negative number yields a large positive — we'd miss this without tracking minimums.

2. **How does this relate to Maximum Product Subarray?**
   Same core idea (track max & min due to sign flips), but in 2D with two directions.

3. **Could we use long/BigInteger for products?**
   With grid values in [-4, 4] and path length up to 28 (15+15-2), max product ≈ 4^28 ≈ 7×10^16 — fits in a 64-bit long.

---

## Key Takeaway

> **Dual-DP (max + min)** is essential whenever negative values appear in a product path — track both extremes because a negative minimum can become the global maximum after one more multiplication.
