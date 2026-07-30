# 1632. Rank Transform of a Matrix

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/rank-transform-of-a-matrix](https://leetcode.com/problems/rank-transform-of-a-matrix)
**Companies:** Citadel, Google, Meta

---

## Problem Description
Given an `m × n` integer matrix, assign a rank to each cell such that:
1. The rank is a positive integer.
2. If two cells are in the same row or column, the cell with the larger value must have a strictly larger rank.
3. Cells with equal values that are connected via rows or columns must share the same rank.
Return the matrix of ranks.

## Examples
**Example 1:**
```
matrix = [[1,2],[3,4]]
```
Ranks become `[[1,2],[2,3]]` respecting row/column ordering.

**Example 2:**
```
matrix = [[20,-21,14],[-19,4,19],[22,-47,24],[-19,4,19]]
```
Resulting ranks are `[[4,1,3],[1,3,4],[5,1,6],[1,3,4]]`.

## Approach
Process cells in increasing order of their values. For each group of equal values, use **Union‑Find** to connect cells that share a row or column, forming components that must receive the same rank. The rank of a component is `1 + max(previous max rank of its rows and columns)`. After assigning ranks, update the row and column maximums.

```text
FUNCTION rankTransform(matrix):
    rows ← number of rows, cols ← number of columns
    maxRowRank[0..rows-1] ← 0
    maxColRank[0..cols-1] ← 0
    cells ← LIST of (value, r, c) for all cells
    SORT cells BY value ASC
    i ← 0
    WHILE i < LENGTH(cells):
        j ← i
        // gather group with same value
        WHILE j < LENGTH(cells) AND cells[j].value = cells[i].value:
            j ← j + 1
        group ← cells[i..j-1]
        // Union‑Find for this group
        UF ← NEW UnionFind()
        FOR each (val, r, c) IN group:
            UF.MAKESET((r,c))
        FOR each (val, r, c) IN group:
            FOR each other cell (val2, r2, c2) IN group:
                IF r = r2 OR c = c2:
                    UF.UNION((r,c), (r2,c2))
        // compute rank for each component
        compMax ← MAP root → 0
        FOR each (val, r, c) IN group:
            root ← UF.FIND((r,c))
            compMax[root] ← MAX(compMax[root], maxRowRank[r], maxColRank[c])
        FOR each (val, r, c) IN group:
            root ← UF.FIND((r,c))
            rank ← compMax[root] + 1
            matrix[r][c] ← rank
            maxRowRank[r] ← MAX(maxRowRank[r], rank)
            maxColRank[c] ← MAX(maxColRank[c], rank)
        i ← j
    RETURN matrix
```

## Walkthrough
Consider `matrix = [[1,2],[3,4]]`.
1. Sort cells → (1,0,0), (2,0,1), (3,1,0), (4,1,1).
2. Process value 1: component {(0,0)} → rank 1, update row0/col0 max to 1.
3. Value 2: component {(0,1)} → max(row0=1, col1=0) → rank 2.
4. Value 3: component {(1,0)} → max(row1=0, col0=1) → rank 2.
5. Value 4: component {(1,1)} → max(row1=2, col1=2) → rank 3.
Resulting rank matrix `[[1,2],[2,3]]`.

## Complexity Analysis
- **Time:** Sorting `O(m·n log(m·n))` plus near‑linear Union‑Find operations `≈ O(m·n α(m·n))`.
- **Space:** `O(m·n)` for storing cells and Union‑Find structures.

## Follow‑Up Questions
1. How would you adapt the algorithm for streaming updates to the matrix?
2. Can the approach be modified to minimize the maximum rank assigned?
3. What changes are needed if ties are broken by column order instead of row order?

## Key Takeaway
Processing cells by increasing value and using Union‑Find to group equal‑value cells in the same row/column yields a correct rank assignment while respecting all ordering constraints.
