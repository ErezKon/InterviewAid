# 1703. Minimum Adjacent Swaps for K Consecutive Ones

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-adjacent-swaps-for-k-consecutive-ones](https://leetcode.com/problems/minimum-adjacent-swaps-for-k-consecutive-ones)
**Companies:** Google, Microsoft, Turing

---

## Key Insight

> Collect positions of all 1s. Slide a window of size `k` over these positions. The minimum swaps to make `k` ones consecutive equals moving them to the **median** position. Use prefix sums to compute costs in O(1) per window.

---

## Approach: Sliding Window + Prefix Sums — O(n) ✅

```
FUNCTION minMoves(nums, k):
    ones ← [i FOR i, v IN ENUMERATE(nums) IF v = 1]
    // Normalize: ones[j] -= j to account for gaps
    FOR j ← 0 TO LEN(ones)-1 DO ones[j] ← ones[j] - j
    
    // Sliding window of size k, minimize sum of distances to median
    prefix ← PREFIX_SUM(ones)
    result ← INFINITY
    
    FOR i ← 0 TO LEN(ones) - k DO
        mid ← i + k / 2
        // Cost = sum of distances from ones[i..i+k-1] to ones[mid]
        left ← ones[mid] * (mid - i) - (prefix[mid] - prefix[i])
        right ← (prefix[i+k] - prefix[mid+1]) - ones[mid] * (i+k-1 - mid)
        result ← MIN(result, left + right)
    
    RETURN result
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sliding window + prefix sums | **O(n)** | **O(n)** |

---

## Key Takeaway

> **Median minimizes L1 distance** — after normalizing positions, the minimum swaps for a window of 1s is the sum of distances to the median, computable in O(1) with prefix sums.

---
