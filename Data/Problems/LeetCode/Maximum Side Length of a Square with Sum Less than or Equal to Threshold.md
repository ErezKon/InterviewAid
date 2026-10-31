# 1292. Maximum Side Length of a Square with Sum Less than or Equal to Threshold

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-side-length-of-a-square-with-sum-less-than-or-equal-to-threshold](https://leetcode.com/problems/maximum-side-length-of-a-square-with-sum-less-than-or-equal-to-threshold)
**Companies:** Amazon, De Shaw, Fractal Analytics, Google, Imc

---

## Problem Description

Given a `m x n` matrix `mat` and an integer `threshold`, return *the maximum side-length of a square with a sum less than or equal to *`threshold`* or return *`0`* if there is no such square*.

**Constraints:**
- `m == mat.length`
- `n == mat[i].length`
- `1 <= m, n <= 300`
- `0 <= mat[i][j] <= 10^4`
- `0 <= threshold <= 10^5`

## Examples

**Example 1:**
```
Input: mat = [[1,1,3,2,4,3,2],[1,1,3,2,4,3,2],[1,1,3,2,4,3,2]], threshold = 4
Output: 2
Explanation: The maximum side length of square with sum less than or equal to 4 is 2 as shown.
```

**Example 2:**
```
Input: mat = [[2,2,2,2,2],[2,2,2,2,2],[2,2,2,2,2],[2,2,2,2,2],[2,2,2,2,2]], threshold = 1
Output: 0
```

## Approach
The problem can be solved with **2-D prefix sums** to query any square sum in O(1) and **binary search** on the side length.
1. Build a prefix sum matrix `pref` where `pref[i][j]` is the sum of the rectangle `(0,0)` to `(i-1,j-1)`.
2. Binary search `k` in `[0, min(m,n)]`. For each candidate `k`, slide a window over the matrix and use the prefix sums to check if any `k×k` square has sum ≤ threshold.
3. The largest `k` that passes the check is the answer.

```text
FUNCTION maxSideLength(mat, threshold):
    m ← ROW_COUNT(mat)
    n ← COL_COUNT(mat)
    // Build 2-D prefix sum
    pref ← MATRIX(m+1, n+1, 0)
    FOR i ← 1 TO m:
        FOR j ← 1 TO n:
            pref[i][j] ← pref[i-1][j] + pref[i][j-1] - pref[i-1][j-1] + mat[i-1][j-1]
    // Binary search on side length
    lo ← 0
    hi ← MIN(m, n)
    WHILE lo < hi:
        mid ← (lo + hi + 1) / 2
        IF existsSquare(pref, mid, threshold):
            lo ← mid
        ELSE:
            hi ← mid - 1
    RETURN lo

FUNCTION existsSquare(pref, k, threshold):
    FOR i ← k TO ROW_COUNT(pref)-1:
        FOR j ← k TO COL_COUNT(pref)-1:
            sum ← pref[i][j] - pref[i-k][j] - pref[i][j-k] + pref[i-k][j-k]
            IF sum ≤ threshold:
                RETURN TRUE
    RETURN FALSE
```

## Walkthrough
Consider the first example matrix (3×5) and `threshold = 8`.
| Step | Action | Result |
|------|--------|--------|
| Build prefix | Compute cumulative sums | `pref` matrix ready |
| Binary search | mid = 2 → check all 2×2 squares | Found square with sum 4 ≤ 8 → lo = 2 |
| Next iteration | mid = 3 → check 3×3 squares | All sums > 8 → hi = 2 |
| End | lo = 2 is maximum side length |

## Complexity Analysis
*Time*: Building prefix sum `O(m·n)`. Binary search performs `O(log min(m,n))` checks, each scanning the matrix `O(m·n)`. Overall `O(m·n·log min(m,n))`.
*Space*: Prefix sum matrix `O(m·n)`.

## Follow-Up Questions
1. How would you modify the solution if the matrix contained negative numbers?
2. Can the problem be solved in `O(m·n)` without binary search using a sliding-window technique?
3. How would you extend this to find the largest rectangle (not necessarily square) under a threshold?

## Key Takeaway
Using a 2-D prefix sum enables constant-time sub-matrix queries, and binary search efficiently discovers the maximal feasible square size.
