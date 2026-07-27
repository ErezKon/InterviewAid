# 533. Lonely Pixel II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/lonely-pixel-ii](https://leetcode.com/problems/lonely-pixel-ii)
**Companies:** Google

---

## 1. Problem Description

Count black pixels in a grid that are in a row with exactly `target` black pixels, and all rows containing a black pixel in that column are identical.

---

## 2. Approach: Row Hashing — O(m·n) ✅

```
FUNCTION findBlackPixel(picture, target):
    rowStr = {r: tuple(row) for r, row in enumerate(picture)}
    colCount = [count of 'B' in each col]
    rowCount = [count of 'B' in each row]
    // Group identical rows
    // For each column with exactly target 'B's,
    //   check if all rows with 'B' in that col are identical
    //   and each such row has exactly target 'B's
```

| Time | Space |
|------|-------|
| O(m · n) | O(m · n) |

---

## 3. Key Takeaway

> Hash each row as a string/tuple. Group identical rows. A column qualifies if it has exactly `target` black pixels and all corresponding rows are identical with exactly `target` black pixels.
