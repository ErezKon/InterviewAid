# 2040. Kth Smallest Product of Two Sorted Arrays

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/kth-smallest-product-of-two-sorted-arrays](https://leetcode.com/problems/kth-smallest-product-of-two-sorted-arrays)
**Companies:** Amazon, Bloomberg, Google, Linkedin, Microsoft

---

## 1. Problem Description

Given two sorted integer arrays `nums1` and `nums2` (which may contain negative numbers), return the k‑th smallest product `nums1[i] × nums2[j]` among all possible pairs.

---

## 2. Approach: Binary Search on Value — O((m+n)·log max) ✅

Binary search over the range of possible products. For each candidate `mid`, count how many pairs produce a product ≤ `mid`. Counting is done with two‑pointer style binary searches, handling negative‑negative, negative‑positive, and positive‑positive cases separately.

```text
FUNCTION kthSmallestProduct(nums1, nums2, k):
    lo ← -10^10
    hi ← 10^10
    WHILE lo < hi:
        mid ← (lo + hi) / 2
        cnt ← countPairsLessOrEqual(nums1, nums2, mid)
        IF cnt >= k:
            hi ← mid
        ELSE:
            lo ← mid + 1
    RETURN lo

FUNCTION countPairsLessOrEqual(A, B, target):
    // A and B are sorted
    cnt ← 0
    // Count pairs where A[i] is negative
    FOR each a IN A WHERE a < 0:
        // Need largest b such that a*b ≤ target → b ≥ ceil(target / a)
        idx ← LOWER_BOUND(B, CEIL(target / a))
        cnt ← cnt + (LEN(B) - idx)
    // Count pairs where a == 0
    IF 0 IN A AND target >= 0:
        cnt ← cnt + (COUNT_ZERO(A) * LEN(B))
    // Count pairs where a is positive
    FOR each a IN A WHERE a > 0:
        // Need b ≤ floor(target / a)
        idx ← UPPER_BOUND(B, FLOOR(target / a))
        cnt ← cnt + idx
    RETURN cnt
```

---

## Examples

**Example 1:** `nums1 = [-2, -1, 0, 1, 2]`, `nums2 = [-3, -1, 2, 4]`, `k = 3`
- All products sorted: \[-6, -6, -4, -3, -3, -2, -2, -1, -1, 0, 0, 0, 0, 1, 2, 2, 2, 4, 4, 8\]
- 3rd smallest is **-4**.

**Example 2:** `nums1 = [1,2]`, `nums2 = [3,4]`, `k = 4`
- Products: \[3,4,6,8\]
- 4th smallest is **8**.

---

## Walkthrough

| Step | lo | hi | mid | count ≤ mid | Action |
|------|----|----|-----|------------|--------|
| 1 | -10^10 | 10^10 | 0 | 6 (all non‑positive) | count < k → lo = 1 |
| 2 | 1 | 10^10 | 5 000 000 000 | 8 | count ≥ k → hi = 5 000 000 000 |
| … | … | … | … | … | … |
| Final | lo = hi = 8 | → answer |

---

## Complexity Analysis

- **Time:** O((m + n) · log range) where `range` ≈ 2·10^10, because each binary‑search step counts pairs in linear time.
- **Space:** O(1) extra space.

---

## Follow‑Up Questions

- How would you adapt the algorithm if the arrays were not sorted?
- Can you find the k‑th largest product instead?
- What changes are needed if the arrays contain up to 10⁵ elements?

---

## Key Takeaway

> Binary search on the product value combined with careful counting of pairs handles negatives and zeros efficiently, turning a potentially O(m·n) problem into O((m+n)·log range).
