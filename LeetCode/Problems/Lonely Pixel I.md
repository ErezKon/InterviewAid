# 531. Lonely Pixel I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/lonely-pixel-i](https://leetcode.com/problems/lonely-pixel-i)
**Companies:** Google

---

## 1. Problem Description

Count 'B' (black) pixels that are the only 'B' in their row AND column.

---

## 2. Approach: Row/Col Counts — O(m·n) ✅

```
FUNCTION findLonelyPixel(picture):
    rowCount = [count of 'B' in each row]
    colCount = [count of 'B' in each col]
    result = 0
    FOR r, c where picture[r][c] == 'B':
        IF rowCount[r] == 1 AND colCount[c] == 1:
            result += 1
    RETURN result
```

| Time | Space |
|------|-------|
| O(m · n) | O(m + n) |

---

## 3. Key Takeaway

> Precompute black-pixel counts per row and column. A pixel is "lonely" iff both its row count and column count are exactly 1.
