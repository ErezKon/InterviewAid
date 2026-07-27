# 3858. Minimum Bitwise OR From Grid

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-bitwise-or-from-grid](https://leetcode.com/problems/minimum-bitwise-or-from-grid)
**Companies:** Google

---

## Key Insight

> To minimize the OR of selecting one element per column, process column by column. For each column, try each element and combine with the running OR from previous columns. Use DP/bitmask to track possible OR values.

---

## Approach: Column-wise DP ✅

```
FUNCTION minimumOR(grid):
    m, n ← dimensions of grid
    // Track set of possible OR values
    possible ← {0}
    
    FOR col ← 0 TO n-1 DO
        nextPossible ← SET()
        FOR prevOR IN possible DO
            FOR row ← 0 TO m-1 DO
                nextPossible.ADD(prevOR OR grid[row][col])
        possible ← nextPossible
    
    RETURN MIN(possible)
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Column DP | **O(n · m · |states|)** | **O(|states|)** |

---

## Key Takeaway

> **Track reachable OR states column by column** — OR is monotonically non-decreasing, limiting the number of distinct states.

---
