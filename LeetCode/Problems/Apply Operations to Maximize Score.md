# 2818. Apply Operations to Maximize Score

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/apply-operations-to-maximize-score](https://leetcode.com/problems/apply-operations-to-maximize-score)
**Companies:** Google, Meta

---

## 1. Problem Description

Given an array `nums` and integer `k`, select `k` subarrays (can overlap). For each subarray, pick one element to contribute to a product score (the element with the highest "prime score" in that subarray). Maximize the final product modulo 10^9+7.

---

## 2. Key Insight

> Each element's "prime score" = number of distinct prime factors. For each element, determine how many subarrays it dominates (has the highest prime score). Use a monotonic stack to find left/right boundaries. Then greedily pick the largest elements with the most subarray choices.

---

## 3. Approach: Sieve + Monotonic Stack + Greedy — O(n log n) ✅

```
FUNCTION maximumScore(nums, k):
    MOD = 10^9 + 7
    n = len(nums)
    
    // 1. Compute prime score for each number
    primeScore[i] = count of distinct prime factors of nums[i]
    
    // 2. Monotonic stack: for each i, find range where it has max prime score
    left[i] = nearest index to the left with primeScore >= primeScore[i]
    right[i] = nearest index to the right with primeScore > primeScore[i]
    count[i] = (i - left[i]) * (right[i] - i)  // subarrays where i dominates
    
    // 3. Greedy: sort elements by value descending, assign subarrays to largest first
    order = SORT indices by nums[i] descending
    result = 1
    remaining = k
    FOR idx IN order:
        take = MIN(count[idx], remaining)
        result = result * POW(nums[idx], take, MOD) % MOD
        remaining -= take
        IF remaining == 0: BREAK
    
    RETURN result
```

| Time | Space |
|------|-------|
| O(n log n + max_val) | O(n + max_val) |

---

## Key Takeaway

> Combine sieve for prime scores, monotonic stack for dominance ranges, and greedy assignment. Classic "contribution counting" pattern on subarrays.
