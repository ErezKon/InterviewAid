# 661. Image Smoother

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/image-smoother](https://leetcode.com/problems/image-smoother)
**Companies:** Amazon, Apple, Meta, Microsoft, Roblox, Visa

---

## Problem Description

Smooth an image by replacing each pixel with the floor average of itself and its 8 neighboring pixels (including itself) that are within the image boundaries.

## Examples

**Example 1:**
```
Input: img = [[1,2,3],[4,5,6],[7,8,9]]
Output: [[3,3,4],[4,5,5],[6,6,7]]
Explanation:
- For the top‑left pixel (1), the valid neighbors are [1,2,4,5]; floor((1+2+4+5)/4) = 3.
- For the center pixel (5), all 9 cells are considered; floor((1+2+3+4+5+6+7+8+9)/9) = 5.
```

**Example 2:**
```
Input: img = [[100]]
Output: [[100]]
Explanation: Only one pixel exists, so it remains unchanged.
```

## Approach

Brute‑Force Neighbors — O(m·n) ✅

```text
FUNCTION imageSmoother(img):
    m, n ← dimensions of img
    result ← m×n matrix of zeros
    FOR r ← 0 TO m - 1:
        FOR c ← 0 TO n - 1:
            total ← 0
            count ← 0
            FOR dr ← -1 TO 1:
                FOR dc ← -1 TO 1:
                    nr ← r + dr
                    nc ← c + dc
                    IF 0 ≤ nr < m AND 0 ≤ nc < n:
                        total ← total + img[nr][nc]
                        count ← count + 1
            result[r][c] ← FLOOR(total / count)
    RETURN result
```

## Walkthrough

Consider the first example `[[1,2,3],[4,5,6],[7,8,9]]`.
| Cell | Valid Neighbors | Sum | Count | Floor Avg |
|------|----------------|-----|-------|-----------|
| (0,0) | 1,2,4,5 | 12 | 4 | 3 |
| (0,1) | 1,2,3,4,5,6 | 21 | 6 | 3 |
| (1,1) | 1‑9 all cells | 45 | 9 | 5 |
The algorithm iterates each cell, gathers its neighbors, computes the floor average, and stores it in `result`.

## Complexity Analysis

- **Time:** O(m·n) – each cell examines at most 9 neighbors, a constant factor.
- **Space:** O(m·n) – auxiliary matrix `result` of the same size as the input.

## Follow‑Up Questions

1. How would you modify the algorithm to perform the smoothing in‑place without extra space?
2. Can you achieve O(1) additional space using prefix sums?
3. How would the solution change if the averaging rule required rounding instead of flooring?

## Key Takeaway

> For each cell, iterate the 3×3 neighborhood (with bounds checks), compute floor average. O(m·n) since neighbor count is constant.
