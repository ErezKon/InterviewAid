# 1329. Sort the Matrix Diagonally

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/sort-the-matrix-diagonally](https://leetcode.com/problems/sort-the-matrix-diagonally)
**Companies:** Amazon, Google, Quora, Walmart Labs

---

## Problem Description
A **matrix diagonal** is a diagonal line of cells starting from some cell in either the topmost row or leftmost column and going in the bottom-right direction until reaching the matrix's end. For example, the **matrix diagonal** starting from `mat[2][0]`, where `mat` is a `6 x 3` matrix, includes cells `mat[2][0]`, `mat[3][1]`, and `mat[4][2]`.

Given an `m x n` matrix `mat` of integers, sort each **matrix diagonal** in ascending order and return *the resulting matrix*.

**Constraints:**
- `m == mat.length`
- `n == mat[i].length`
- `1 <= m, n <= 100`
- `1 <= mat[i][j] <= 100`

## Examples
```
Example 1:
  Input: mat = [[3,3,1,1],[2,2,1,2],[1,1,1,2]]
  Output: [[1,1,1,1],[1,2,2,2],[1,2,3,3]]
```

```
Example 2:
  Input: mat = [[11,25,66,1,69,7],[23,55,17,45,15,52],[75,31,36,44,58,8],[22,27,33,25,68,4],[84,28,14,11,5,50]]
  Output: [[5,17,4,1,52,7],[11,11,25,45,8,69],[14,23,25,44,58,15],[22,27,31,36,50,66],[84,28,75,33,55,68]]
```

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
