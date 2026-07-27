# 2607. Make K-Subarray Sums Equal

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/make-k-subarray-sums-equal](https://leetcode.com/problems/make-k-subarray-sums-equal)
**Companies:** Morgan Stanley, Observeai

---

## 1. Problem Description

Make all subarrays of length `k` have the same sum. Elements at indices `i` and `(i+k) mod n` must be equal. Minimize total changes.

---

## 2. Approach: GCD Cycles + Median — O(n log n) ✅

```
// Elements at positions i, i+k, i+2k, ... (mod n) must all be equal
// These form cycles of length n / gcd(n, k)
// For each cycle, make all elements equal to the median (minimizes cost)
```

| Time | Space |
|------|-------|
| O(n log n) | O(n) |

---

## 3. Key Takeaway

> Positions connected by step `k` mod `n` form cycles (determined by GCD). Within each cycle, the optimal target is the median. Sum of absolute deviations from median is minimized.
