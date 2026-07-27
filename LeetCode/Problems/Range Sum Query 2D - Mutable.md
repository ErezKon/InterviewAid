# 308. Range Sum Query 2D - Mutable

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/range-sum-query-2d-mutable](https://leetcode.com/problems/range-sum-query-2d-mutable)
**Companies:** Amazon, Bloomberg, Google

---

## Approach: 2D Binary Indexed Tree — O(log m · log n) per op ✅

```
CLASS NumMatrix:
    // Use 2D BIT (Fenwick tree)
    FUNCTION update(row, col, val):
        diff = val - matrix[row][col]
        matrix[row][col] = val
        BIT update at (row+1, col+1) with diff

    FUNCTION sumRegion(r1, c1, r2, c2):
        RETURN query(r2+1,c2+1) - query(r1,c2+1) - query(r2+1,c1) + query(r1,c1)
```
