# 373. Find K Pairs with Smallest Sums

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-k-pairs-with-smallest-sums](https://leetcode.com/problems/find-k-pairs-with-smallest-sums)
**Companies:** Amazon, Bloomberg, Flipkart, Google, Linkedin, Meta, Microsoft, Oracle, Uber, Walmart Labs

---

## Approach: Min-Heap — O(k log k) ✅

```
FUNCTION kSmallestPairs(nums1, nums2, k):
    heap = [(nums1[0] + nums2[0], 0, 0)]
    visited = {(0, 0)}
    result = []

    WHILE heap AND len(result) < k:
        (sum, i, j) = heap.POP()
        result.ADD([nums1[i], nums2[j]])

        IF i + 1 < len(nums1) AND (i+1, j) NOT IN visited:
            heap.PUSH((nums1[i+1] + nums2[j], i+1, j))
            visited.ADD((i+1, j))
        IF j + 1 < len(nums2) AND (i, j+1) NOT IN visited:
            heap.PUSH((nums1[i] + nums2[j+1], i, j+1))
            visited.ADD((i, j+1))

    RETURN result
```

---

## Problem Description

Given two sorted arrays, find the `k` pairs `(u, v)` with smallest sums where `u` is from `nums1` and `v` from `nums2`.

---

## Key Takeaway

> **Min-heap BFS from (0,0) in the index grid. Pop smallest sum, push right and down neighbors. Track visited to avoid duplicates.**
