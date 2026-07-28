# 1329. Sort the Matrix Diagonally

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/sort-the-matrix-diagonally](https://leetcode.com/problems/sort-the-matrix-diagonally)
**Companies:** Amazon, Google, Quora, Walmart Labs

---

## Problem Description
Given an `m x n` integer matrix `mat`, sort each diagonal that runs from the top‑left to the bottom‑right in non‑decreasing order and return the resulting matrix.

## Examples
- **Input:** `mat = [[3,3,1,1],[2,2,1,2],[1,1,1,2]]`  
  **Output:** `[[1,1,1,1],[1,2,2,2],[1,2,3,3]]`  
  **Explanation:** Each diagonal is sorted individually.
- **Input:** `mat = [[5,4,3],[2,1,0]]`  
  **Output:** `[[5,4,0],[2,1,3]]`  
  **Explanation:** Diagonals `[5,1]`, `[4,0]`, `[3]` become `[5,1]`, `[4,0]`, `[3]` after sorting (already sorted).

## Approach
Collect all elements of each diagonal identified by the key `row - col`. Sort each list, then write the sorted values back to the matrix in the same diagonal order.

```text
FUNCTION diagonalSort(mat):
    m ← NUMBER OF ROWS in mat
    n ← NUMBER OF COLUMNS in mat
    diags ← MAP from integer TO LIST
    // Collect elements per diagonal
    FOR r ← 0 TO m - 1:
        FOR c ← 0 TO n - 1:
            key ← r - c
            APPEND diags[key] WITH mat[r][c]
    // Sort each diagonal list
    FOR key IN diags:
        SORT diags[key] IN ASCENDING ORDER
    // Write back sorted values
    idxMap ← MAP from integer TO INTEGER initialized to 0
    FOR r ← 0 TO m - 1:
        FOR c ← 0 TO n - 1:
            key ← r - c
            pos ← idxMap[key]
            mat[r][c] ← diags[key][pos]
            idxMap[key] ← pos + 1
    RETURN mat
```

## Walkthrough
For the first example matrix:
1. Collect diagonals: key `0` → `[3,2,1]`, key `-1` → `[3,1]`, key `-2` → `[1]`, etc.
2. Sort each list: key `0` becomes `[1,2,3]`, key `-1` becomes `[1,3]`.
3. Re‑populate matrix using the sorted lists, yielding the output matrix shown.

## Complexity Analysis
- **Time:** `O(m·n·log(min(m,n)))` – each diagonal of length ≤ min(m,n) is sorted.
- **Space:** `O(m·n)` for storing the diagonal elements.

## Follow-Up Questions
1. How would you modify the algorithm to sort diagonals in decreasing order?
2. Can the solution be implemented in‑place with `O(1)` extra space?
3. What is the complexity if the matrix is extremely sparse (mostly zeros)?

## Key Takeaway
Grouping elements by `row - col` isolates each diagonal, allowing independent sorting and reconstruction of the matrix.
