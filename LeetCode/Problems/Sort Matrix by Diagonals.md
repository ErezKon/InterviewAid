# 3446. Sort Matrix by Diagonals

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/sort-matrix-by-diagonals](https://leetcode.com/problems/sort-matrix-by-diagonals)
**Companies:** Amazon, Google, Meta, Microsoft, Verizon

---

## Problem Description

Sort each diagonal of a matrix independently. Bottom-left diagonals are sorted ascending, top-right diagonals descending (based on problem variant).

### Examples

- **Input:** `mat = [[3,3,1,1],[2,2,1,2],[1,1,1,2]]` → **Output:** sorted diagonals

## Approach: Group by Diagonal — O(mn log(min(m,n))) ✅

**Key Insight:** Diagonals share the same `r - c` value. Group elements by diagonal, sort, and place back.

```
FUNCTION sortMatrix(mat):
    m, n = dimensions
    // For each diagonal (identified by r - c):
    diags = defaultdict(list)
    FOR r, c: diags[r - c].ADD(mat[r][c])
    FOR key: SORT diags[key] (ascending for lower-left, descending for upper-right based on problem)

    // Place back
    idx = defaultdict(int)
    FOR r, c:
        d = r - c
        mat[r][c] = diags[d][idx[d]]
        idx[d] += 1
    RETURN mat
```

### Complexity

| | |
|---|---|
| **Time** | O(m·n·log(min(m,n))) |
| **Space** | O(m·n) |
