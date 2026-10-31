# 661. Image Smoother

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/image-smoother](https://leetcode.com/problems/image-smoother)
**Companies:** Amazon, Apple, Meta, Microsoft, Roblox, Visa

---

## Problem Description

An **image smoother** is a filter of the size `3 x 3` that can be applied to each cell of an image by rounding down the average of the cell and the eight surrounding cells (i.e., the average of the nine cells in the blue smoother). If one or more of the surrounding cells of a cell is not present, we do not consider it in the average (i.e., the average of the four cells in the red smoother).
![img](https://assets.leetcode.com/uploads/2021/05/03/smoother-grid.jpg)
Given an `m x n` integer matrix `img` representing the grayscale of an image, return *the image after applying the smoother on each cell of it*.

**Constraints:**
- `m == img.length`
- `n == img[i].length`
- `1 <= m, n <= 200`
- `0 <= img[i][j] <= 255`

## Examples

**Example 1:**
```
Input: img = [[1,1,1],[1,0,1],[1,1,1]]
Output: [[0,0,0],[0,0,0],[0,0,0]]
Explanation: For the points (0,0), (0,2), (2,0), (2,2): floor(3/4) = floor(0.75) = 0
For the points (0,1), (1,0), (1,2), (2,1): floor(5/6) = floor(0.83333333) = 0
For the point (1,1): floor(8/9) = floor(0.88888889) = 0
```

**Example 2:**
```
Input: img = [[100,200,100],[200,50,200],[100,200,100]]
Output: [[137,141,137],[141,138,141],[137,141,137]]
Explanation: For the points (0,0), (0,2), (2,0), (2,2): floor((100+200+200+50)/4) = floor(137.5) = 137
For the points (0,1), (1,0), (1,2), (2,1): floor((200+200+50+200+100+100)/6) = floor(141.666667) = 141
For the point (1,1): floor((50+200+200+200+200+100+100+100+100)/9) = floor(138.888889) = 138
```

## Approach

Brute-Force Neighbors — O(m·n) ✅

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
| (1,1) | 1-9 all cells | 45 | 9 | 5 |
The algorithm iterates each cell, gathers its neighbors, computes the floor average, and stores it in `result`.

## Complexity Analysis

- **Time:** O(m·n) – each cell examines at most 9 neighbors, a constant factor.
- **Space:** O(m·n) – auxiliary matrix `result` of the same size as the input.

## Follow-Up Questions

1. How would you modify the algorithm to perform the smoothing in-place without extra space?
2. Can you achieve O(1) additional space using prefix sums?
3. How would the solution change if the averaging rule required rounding instead of flooring?

## Key Takeaway

> For each cell, iterate the 3×3 neighborhood (with bounds checks), compute floor average. O(m·n) since neighbor count is constant.
