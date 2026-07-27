# 3117. Minimum Sum of Values by Dividing Array

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-sum-of-values-by-dividing-array](https://leetcode.com/problems/minimum-sum-of-values-by-dividing-array)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: DP + Bitwise AND — O(n · m · log(max))](#3-approach-dp--bitwise-and)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given arrays `nums` and `andValues`, divide `nums` into `m` contiguous subarrays such that the AND of the `i`-th subarray equals `andValues[i]`. Minimize the **sum of the last elements** of each subarray. Return `-1` if impossible.

**Constraints:**
- `1 <= n <= 10⁴`
- `1 <= m <= min(n, 10)`
- `1 <= nums[i] <= 10⁵`

---

## 2. Key Insight

> **DP with AND tracking**: `dp[i][j]` = minimum sum when the first `i` elements are divided into `j` subarrays. The AND of a subarray only decreases (or stays) as we extend it — there are at most O(log max) distinct AND values as we extend a suffix. Use this to prune the DP transitions.

---

## 3. Approach: DP + Bitwise AND — O(n · m · log(max)) ✅

```
FUNCTION minimumValueSum(nums, andValues):
    n, m = len(nums), len(andValues)
    // dp[i][j] = min sum using first i elements in j groups
    // For each (i, j), track possible AND values for the j-th group
    
    MEMO = {}
    FUNCTION solve(i, j, curAnd):
        IF i == n AND j == m: RETURN 0
        IF i == n OR j == m: RETURN infinity
        
        curAnd &= nums[i]
        IF curAnd < andValues[j]: RETURN infinity  // AND can only decrease
        
        result = solve(i+1, j, curAnd)  // extend current group
        IF curAnd == andValues[j]:       // end group here
            result = MIN(result, nums[i] + solve(i+1, j+1, -1))
        
        RETURN result
    
    ans = solve(0, 0, -1)  // -1 as identity for AND (all bits set)
    RETURN ans IF ans < infinity ELSE -1
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n · m · log(max)) — limited distinct AND values per position |
| **Space** | O(n · m · log(max)) — memoization |

---

## 5. Key Takeaway

> **AND monotonicity enables pruning** — as a subarray extends, its AND only decreases. This limits the number of distinct states, making the DP tractable despite the seemingly large state space.
