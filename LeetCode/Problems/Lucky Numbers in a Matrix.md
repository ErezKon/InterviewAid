# 1380. Lucky Numbers in a Matrix

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/lucky-numbers-in-a-matrix](https://leetcode.com/problems/lucky-numbers-in-a-matrix)
**Companies:** Amazon, Cisco, Oracle

---

## 1. Problem Description

Find all "lucky" numbers: minimum in their row AND maximum in their column.

---

## 2. Approach: Set Intersection — O(m·n) ✅

```
FUNCTION luckyNumbers(matrix):
    rowMins = SET(MIN(row) for row in matrix)
    colMaxs = SET(MAX(matrix[r][c] for r in range(m)) for c in range(n))
    RETURN list(rowMins & colMaxs)
```

| Time | Space |
|------|-------|
| O(m · n) | O(m + n) |

---

## 3. Key Takeaway

> Collect row minimums and column maximums into sets. Their intersection gives lucky numbers. At most one lucky number exists in any matrix.
