# 786. K-th Smallest Prime Fraction

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/k-th-smallest-prime-fraction](https://leetcode.com/problems/k-th-smallest-prime-fraction)
**Companies:** Ponyai

---

## 1. Problem Description

Given a sorted array of primes `arr` (including 1), consider all fractions `arr[i]/arr[j]` where `i < j`. Return the k-th smallest fraction as `[arr[i], arr[j]]`.

---

## 2. Approach: Binary Search on Value — O(n log(max)) ✅

```
FUNCTION kthSmallestPrimeFraction(arr, k):
    lo, hi = 0.0, 1.0
    WHILE lo < hi:
        mid = (lo + hi) / 2
        count = 0; bestI = 0; bestJ = 1
        j = 1
        FOR i ← 0 TO n-1:
            WHILE j < n AND arr[i] / arr[j] > mid: j += 1
            IF j == n: BREAK
            count += n - j
            IF arr[i] * bestJ > bestI * arr[j]:
                bestI = arr[i]; bestJ = arr[j]
        IF count == k: RETURN [bestI, bestJ]
        IF count < k: lo = mid
        ELSE: hi = mid
```

| Time | Space |
|------|-------|
| O(n log(1/ε)) | O(1) |

---

## 3. Key Takeaway

> Binary search on the fraction value. For each candidate, count fractions ≤ mid using a two-pointer sweep. Track the largest fraction ≤ mid as the answer.
