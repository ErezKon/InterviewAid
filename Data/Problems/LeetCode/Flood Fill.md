# 733. Flood Fill

**Difficulty:** 🟢 Easy
**Acceptance:** 64.0%
**LeetCode:** [https://leetcode.com/problems/flood-fill](https://leetcode.com/problems/flood-fill)
**Companies:** Amazon, Apple, Bloomberg, Capital One, Criteo, Goldman Sachs, Google, Meta, Microsoft, Oracle, Uber, Visa

---

## 1. Problem Description

You are given an image represented by an `m x n` grid of integers `image`, where `image[i][j]` represents the pixel value of the image. You are also given three integers `sr`, `sc`, and `color`. Your task is to perform a **flood fill** on the image starting from the pixel `image[sr][sc]`.

To perform a **flood fill**:

- Begin with the starting pixel and change its color to `color`.
- Perform the same process for each pixel that is **directly adjacent** (pixels that share a side with the original pixel, either horizontally or vertically) and shares the **same color** as the starting pixel.
- Keep **repeating** this process by checking neighboring pixels of the *updated* pixels and modifying their color if it matches the original color of the starting pixel.
- The process **stops** when there are **no more** adjacent pixels of the original color to update.

Return the **modified** image after performing the flood fill.

**Constraints:**
- `m == image.length`
- `n == image[i].length`
- `1 <= m, n <= 50`
- `0 <= image[i][j], color < 2^16`
- `0 <= sr < m`
- `0 <= sc < n`

---

## 2. Approach: DFS — O(m·n) ✅

```text
FUNCTION floodFill(image, sr, sc, color):
    origColor ← image[sr][sc]
    IF origColor == color: RETURN image    // avoid infinite loop

    FUNCTION dfs(r, c):
        IF r < 0 OR r >= m OR c < 0 OR c >= n: RETURN
        IF image[r][c] != origColor: RETURN
        image[r][c] ← color
        dfs(r+1, c); dfs(r-1, c); dfs(r, c+1); dfs(r, c-1)

    dfs(sr, sc)
    RETURN image
```

---

## Examples

**Example 1:**
```
Input: image = [[1,1,1],[1,1,0],[1,0,1]], sr = 1, sc = 1, color = 2
Output: [[2,2,2],[2,2,0],[2,0,1]]
Explanation: From the center of the image with position (sr, sc) = (1, 1) (i.e., the red pixel), all pixels connected by a path of the same color as the starting pixel (i.e., the blue pixels) are colored with the new color.
Note the bottom corner is not colored 2, because it is not horizontally or vertically connected to the starting pixel.
```

**Example 2:**
```
Input: image = [[0,0,0],[0,0,0]], sr = 0, sc = 0, color = 0
Output: [[0,0,0],[0,0,0]]
Explanation: The starting pixel is already colored with 0, which is the same as the target color. Therefore, no changes are made to the image.
```

---

## Walkthrough

| Step | Action |
|------|--------|
| 1 | Record original color at `(sr, sc)`. |
| 2 | Call `dfs(sr, sc)`. |
| 3 | In `dfs`, recolor current pixel and recursively visit its four neighbors. |
| 4 | Recursion stops when out of bounds or pixel color differs from original. |
| 5 | After recursion finishes, all reachable original-color pixels are recolored. |

---

## Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(m·n) – each pixel visited at most once |
| **Space** | O(m·n) recursion stack in worst case |

---

## Follow-Up Questions

1. How would you implement the same algorithm iteratively using a queue (BFS)?
2. How does the algorithm change for 8-directional connectivity?
3. Can you modify it to return the number of distinct regions in the image?

---

## Key Takeaway

> Classic flood fill = DFS/BFS from starting pixel. Critical edge case: if new color == original color, skip (otherwise infinite recursion).