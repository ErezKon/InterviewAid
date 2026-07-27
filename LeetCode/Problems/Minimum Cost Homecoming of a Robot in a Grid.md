# 2087. Minimum Cost Homecoming of a Robot in a Grid

**Difficulty:** 🟡 Medium

**Companies:** Goldman Sachs, Hp, Oracle
---

## Key Insight

> Every path from start to home must cross the same set of rows and columns (exclusive of start). The cost is fixed regardless of path order — just sum `rowCosts` and `colCosts` for traversed rows/cols.

---

## Approach: Direct Sum — O(m + n) ✅

```
FUNCTION minCost(startPos, homePos, rowCosts, colCosts):
    cost ← 0
    r1, c1 ← startPos
    r2, c2 ← homePos
    // Sum row costs between r1 and r2 (excluding start row)
    step ← 1 IF r2 > r1 ELSE -1
    FOR r ← r1 + step TO r2 (inclusive) STEP step DO
        cost ← cost + rowCosts[r]
    // Sum col costs between c1 and c2 (excluding start col)
    step ← 1 IF c2 > c1 ELSE -1
    FOR c ← c1 + step TO c2 (inclusive) STEP step DO
        cost ← cost + colCosts[c]
    RETURN cost
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Direct sum | **O(m + n)** | **O(1)** |

---

## Key Takeaway

> **Path-independent cost** — in a grid where row/column traversal costs are fixed, every path between two points costs the same. Just sum the intermediate row and column costs.

---
