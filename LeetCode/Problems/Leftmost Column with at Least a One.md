# 1428. Leftmost Column with at Least a One

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/leftmost-column-with-at-least-a-one](https://leetcode.com/problems/leftmost-column-with-at-least-a-one)
**Companies:** Meta, Sap, Uber

---

## 1. Problem Description

Given a binary matrix (rows sorted non-decreasing), find the leftmost column containing a 1. Interactive API: `binaryMatrix.get(r, c)` and `binaryMatrix.dimensions()`.

---

## 2. Approach: Top-Right Walk — O(m + n) ✅

Start from top-right. If 1, move left (potential answer). If 0, move down.

```
FUNCTION leftMostColumnWithOne(binaryMatrix):
    rows, cols = binaryMatrix.dimensions()
    r = 0; c = cols - 1; result = -1
    WHILE r < rows AND c >= 0:
        IF binaryMatrix.get(r, c) == 1:
            result = c; c -= 1
        ELSE: r += 1
    RETURN result
```

| Time | Space |
|------|-------|
| O(m + n) | O(1) |

---

## 3. Key Takeaway

> Top-right corner walk exploits row-sorted property. Each step either eliminates a row or a column. At most m + n steps.
