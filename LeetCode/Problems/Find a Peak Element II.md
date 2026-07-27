# 1901. Find a Peak Element II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-a-peak-element-ii](https://leetcode.com/problems/find-a-peak-element-ii)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Uber, Xing

---

## Approach: Binary Search on Rows — O(n log m) ✅

```
FUNCTION findPeakGrid(mat):
    lo, hi = 0, len(mat) - 1

    WHILE lo <= hi:
        mid = (lo + hi) / 2
        maxCol = argmax(mat[mid])    // max in this row

        above = mat[mid - 1][maxCol] IF mid > 0 ELSE -1
        below = mat[mid + 1][maxCol] IF mid < m - 1 ELSE -1

        IF mat[mid][maxCol] > above AND mat[mid][maxCol] > below:
            RETURN [mid, maxCol]
        ELSE IF above > mat[mid][maxCol]:
            hi = mid - 1
        ELSE:
            lo = mid + 1
```

Binary search on rows. In each row, find the column max. Compare with neighbors above/below.
