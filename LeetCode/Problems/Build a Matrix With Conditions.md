# 2392. Build a Matrix With Conditions

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/build-a-matrix-with-conditions](https://leetcode.com/problems/build-a-matrix-with-conditions)
**Companies:** Google

---

## 1. Problem Description

Given `k`, `rowConditions` (pairs `[above, below]`), and `colConditions` (pairs `[left, right]`), build a `k × k` matrix containing numbers `1` to `k` exactly once such that all row and column ordering constraints are satisfied. Return any valid matrix, or empty if impossible.

---

## 2. Key Insight

> Row ordering and column ordering are independent topological sort problems. Topo-sort on `rowConditions` gives the row position of each number. Topo-sort on `colConditions` gives the column position. If either has a cycle, return empty.

---

## 3. Approach: Two Topological Sorts — O(k + E) ✅

```
FUNCTION buildMatrix(k, rowConditions, colConditions):
    rowOrder = topoSort(k, rowConditions)
    colOrder = topoSort(k, colConditions)
    IF rowOrder is empty OR colOrder is empty: RETURN []  // cycle
    
    rowPos = {val: idx for idx, val in enumerate(rowOrder)}
    colPos = {val: idx for idx, val in enumerate(colOrder)}
    
    matrix = k × k zeros
    FOR num FROM 1 TO k:
        matrix[rowPos[num]][colPos[num]] = num
    RETURN matrix
```

| Time | Space |
|------|-------|
| O(k + E) | O(k²) for the matrix |

---

## Key Takeaway

> When row and column constraints are independent, decompose into two separate topological sorts. Place each number at the intersection of its row-order and column-order positions.
