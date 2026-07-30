# 733. Flood Fill

**Difficulty:** 🟢 Easy
**Acceptance:** 64.0%
**LeetCode:** [https://leetcode.com/problems/flood-fill](https://leetcode.com/problems/flood-fill)
**Companies:** Amazon, Apple, Bloomberg, Capital One, Criteo, Goldman Sachs, Google, Meta, Microsoft, Oracle, Uber, Visa

---

## 1. Problem Description

Given an image (2D array), a starting pixel `(sr, sc)`, and a `color`, flood fill all connected pixels of the same original color with the new color.

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
image = [[1,1,1],[1,1,0],[1,0,1]]
sr = 1, sc = 1, color = 2
output = [[2,2,2],[2,2,0],[2,0,1]]
```
*Starting from the center pixel, all connected `1`s are changed to `2`.*

**Example 2:**
```
image = [[0,0,0],[0,0,0]]
sr = 0, sc = 0, color = 0
output = [[0,0,0],[0,0,0]]
```
*New color equals original color, so the image remains unchanged.*

---

## Walkthrough

| Step | Action |
|------|--------|
| 1 | Record original color at `(sr, sc)`. |
| 2 | Call `dfs(sr, sc)`. |
| 3 | In `dfs`, recolor current pixel and recursively visit its four neighbors. |
| 4 | Recursion stops when out of bounds or pixel color differs from original. |
| 5 | After recursion finishes, all reachable original‑color pixels are recolored. |

---

## Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(m·n) – each pixel visited at most once |
| **Space** | O(m·n) recursion stack in worst case |

---

## Follow-Up Questions

1. How would you implement the same algorithm iteratively using a queue (BFS)?
2. How does the algorithm change for 8‑directional connectivity?
3. Can you modify it to return the number of distinct regions in the image?

---

## Key Takeaway

> Classic flood fill = DFS/BFS from starting pixel. Critical edge case: if new color == original color, skip (otherwise infinite recursion).