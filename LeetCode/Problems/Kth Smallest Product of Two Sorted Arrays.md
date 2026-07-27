# 2040. Kth Smallest Product of Two Sorted Arrays

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/kth-smallest-product-of-two-sorted-arrays](https://leetcode.com/problems/kth-smallest-product-of-two-sorted-arrays)
**Companies:** Amazon, Bloomberg, Google, Linkedin, Microsoft

---

## 1. Problem Description

Given two sorted arrays `nums1` and `nums2` (may contain negatives), return the k-th smallest product `nums1[i] × nums2[j]`.

---

## 2. Approach: Binary Search on Value — O(n log(max)) ✅

Binary search on the product value. For each candidate `mid`, count how many products ≤ mid. Handle positive/negative elements separately (product sign flips).

```
FUNCTION kthSmallestProduct(nums1, nums2, k):
    lo, hi = -10^10, 10^10

    WHILE lo < hi:
        mid = (lo + hi) / 2
        count = countProductsLessOrEqual(nums1, nums2, mid)
        IF count >= k: hi = mid
        ELSE: lo = mid + 1

    RETURN lo

// Count products ≤ target using binary search per element
// Handle positive/negative separately
```

| Time | Space |
|------|-------|
| O((m+n) · log(10^10)) | O(1) |

---

## 3. Key Takeaway

> Binary search on the product value. The tricky part is counting products ≤ mid when arrays have negatives — positive × negative flips the comparison direction. Split arrays into negative and positive parts.
