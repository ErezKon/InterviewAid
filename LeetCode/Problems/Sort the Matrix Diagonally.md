# 1329. Sort the Matrix Diagonally

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/sort-the-matrix-diagonally](https://leetcode.com/problems/sort-the-matrix-diagonally)
**Companies:** Amazon, Google, Quora, Walmart Labs

---

```
FUNCTION diagonalSort(mat):
    m, n = dimensions
    diags = defaultdict(list)
    FOR r ← 0 TO m - 1:
        FOR c ← 0 TO n - 1:
            diags[r - c].ADD(mat[r][c])
    FOR key: SORT diags[key]
    idx = defaultdict(int)
    FOR r ← 0 TO m - 1:
        FOR c ← 0 TO n - 1:
            d = r - c
            mat[r][c] = diags[d][idx[d]]
            idx[d] += 1
    RETURN mat
```
