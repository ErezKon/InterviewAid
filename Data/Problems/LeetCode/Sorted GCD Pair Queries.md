# 3312. Sorted GCD Pair Queries

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/sorted-gcd-pair-queries](https://leetcode.com/problems/sorted-gcd-pair-queries)
**Companies:** Google

---

## Problem Description

You are given an integer array `nums` of length `n` and an integer array `queries`.

Let `gcdPairs` denote an array obtained by calculating the GCD of all possible pairs `(nums[i], nums[j])`, where `0 <= i < j < n`, and then sorting these values in **ascending** order.

For each query `queries[i]`, you need to find the element at index `queries[i]` in `gcdPairs`.

Return an integer array `answer`, where `answer[i]` is the value at `gcdPairs[queries[i]]` for each query.

The term `gcd(a, b)` denotes the **greatest common divisor** of `a` and `b`.

**Constraints:**
- `2 <= n == nums.length <= 10⁵`
- `1 <= nums[i] <= 5 * 10⁴`
- `1 <= queries.length <= 10⁵`
- `0 <= queries[i] < n * (n - 1) / 2`

### Examples

```
Example 1:
  Input: nums = [2,3,4], queries = [0,2,2]
  Output: [1,2,2]
  Explanation:
    gcdPairs = [gcd(nums[0], nums[1]), gcd(nums[0], nums[2]), gcd(nums[1], nums[2])] = [1, 2, 1].
    After sorting in ascending order, gcdPairs = [1, 1, 2].
    So, the answer is [gcdPairs[queries[0]], gcdPairs[queries[1]], gcdPairs[queries[2]]] = [1, 2, 2].
```

```
Example 2:
  Input: nums = [4,4,2,1], queries = [5,3,1,0]
  Output: [4,2,1,1]
  Explanation: gcdPairs sorted in ascending order is [1, 1, 1, 2, 2, 4].
```

```
Example 3:
  Input: nums = [2,2], queries = [0,0]
  Output: [2,2]
  Explanation: gcdPairs = [2].
```

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
