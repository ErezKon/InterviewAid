# 3312. Sorted GCD Pair Queries

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/sorted-gcd-pair-queries](https://leetcode.com/problems/sorted-gcd-pair-queries)
**Companies:** Google

---

## Problem Description

Given an array `nums` and queries, compute the GCD of all pairs `(nums[i], nums[j])` where `i < j`, sort these GCDs, and answer each query asking for the k-th smallest GCD.

### Examples

- **Input:** `nums = [2,3,4], queries = [0,2,2]` → **Output:** `[1,2,2]`

## Approach: GCD Frequency + Prefix Sum — O(M log M + Q) ✅

**Key Insight:** Count how many pairs have each GCD value using inclusion-exclusion on divisor counts. Then use prefix sums to answer queries via binary search.

```
FUNCTION gcdPairQueries(nums, queries):
    M = MAX(nums)
    cnt = frequency array of nums (size M+1)

    // cntDiv[g] = number of elements divisible by g
    cntDiv = [0] * (M + 1)
    FOR g ← 1 TO M:
        FOR multiple ← g TO M STEP g:
            cntDiv[g] += cnt[multiple]

    // pairCnt[g] = pairs with GCD exactly g (inclusion-exclusion)
    pairCnt = [0] * (M + 1)
    FOR g ← M DOWN TO 1:
        pairCnt[g] = cntDiv[g] * (cntDiv[g] - 1) / 2
        FOR multiple ← 2*g TO M STEP g:
            pairCnt[g] -= pairCnt[multiple]

    // Prefix sum for binary search
    prefix = prefix_sum(pairCnt)

    FOR each query k:
        answer[k] = binary_search for smallest g where prefix[g] > k

    RETURN answer
```

### Complexity

| | |
|---|---|
| **Time** | O(M log M + Q log M) |
| **Space** | O(M) |
