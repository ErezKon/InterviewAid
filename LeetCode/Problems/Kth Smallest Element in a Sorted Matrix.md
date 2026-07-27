# 378. Kth Smallest Element in a Sorted Matrix

**Difficulty:** 🟡 Medium
**Acceptance:** 64.0%
**LeetCode:** [https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix](https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix)
**Companies:** Amazon, Apple, Bloomberg, Google, Meta, Microsoft, Oracle, Phonepe, Tiktok, Twitter

---

## 1. Problem Description

Given an n×n matrix where each row and column is sorted in ascending order, return the kth smallest element.

---

## 2. Approach 1: Binary Search on Value — O(n log(max-min)) ✅

```
FUNCTION kthSmallest(matrix, k):
    lo = matrix[0][0]
    hi = matrix[n-1][n-1]

    WHILE lo < hi:
        mid = (lo + hi) / 2
        count = countLessOrEqual(matrix, mid)
        IF count < k:
            lo = mid + 1
        ELSE:
            hi = mid

    RETURN lo

FUNCTION countLessOrEqual(matrix, target):
    count = 0
    r = n - 1, c = 0
    WHILE r >= 0 AND c < n:
        IF matrix[r][c] <= target:
            count += r + 1
            c += 1
        ELSE:
            r -= 1
    RETURN count
```

### Approach 2: Min-Heap — O(k log n)

Start with first element of each row (or just first element). Pop min, push the next element in the same row.

| Approach | Time | Space |
|----------|------|-------|
| **Binary Search** | **O(n · log(max-min))** | **O(1)** |
| Min-Heap | O(k log n) | O(n) |

---

## Key Takeaway

> Binary search on value + staircase count gives O(n log(range)). The `countLessOrEqual` function uses the sorted structure to count in O(n) by walking from bottom-left.
