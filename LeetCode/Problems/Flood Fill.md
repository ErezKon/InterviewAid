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

```
FUNCTION floodFill(image, sr, sc, color):
    origColor = image[sr][sc]
    IF origColor == color: RETURN image    // avoid infinite loop

    FUNCTION dfs(r, c):
        IF r < 0 OR r >= m OR c < 0 OR c >= n: RETURN
        IF image[r][c] != origColor: RETURN
        image[r][c] = color
        dfs(r+1, c); dfs(r-1, c); dfs(r, c+1); dfs(r, c-1)

    dfs(sr, sc)
    RETURN image
```

| Time | Space |
|------|-------|
| O(m·n) | O(m·n) stack |

---

## Key Takeaway

> Classic flood fill = DFS/BFS from starting pixel. Critical edge case: if new color == original color, skip (otherwise infinite recursion).
