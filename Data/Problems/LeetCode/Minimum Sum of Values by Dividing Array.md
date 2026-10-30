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

You are given two arrays `nums` and `andValues` of length `n` and `m` respectively.

The **value** of an array is equal to the **last** element of that array.

You have to divide `nums` into `m` **disjoint contiguous** subarrays such that for the `i^th` subarray `[l_i, r_i]`, the bitwise `AND` of the subarray elements is equal to `andValues[i]`, in other words, `nums[l_i] & nums[l_i + 1] & ... & nums[r_i] == andValues[i]` for all `1 <= i <= m`, where `&` represents the bitwise `AND` operator.

Return *the **minimum** possible sum of the **values** of the *`m`* subarrays *`nums`* is divided into*. *If it is not possible to divide *`nums`* into *`m`* subarrays satisfying these conditions, return* `-1`.

**Constraints:**
- `1 <= n == nums.length <= 10^4`
- `1 <= m == andValues.length <= min(n, 10)`
- `1 <= nums[i] < 10^5`
- `0 <= andValues[j] < 10^5`

---

## Examples

**Example 1:**
```
Input: nums = [1,4,3,3,2], andValues = [0,3,3,2]
Output: 12
Explanation: The only possible way to divide nums is:
- [1,4] as 1 & 4 == 0.
- [3] as the bitwise AND of a single element subarray is that element itself.
- [3] as the bitwise AND of a single element subarray is that element itself.
- [2] as the bitwise AND of a single element subarray is that element itself.
The sum of the values for these subarrays is 4 + 3 + 3 + 2 = 12.
```

**Example 2:**
```
Input: nums = [2,3,5,7,7,7,5], andValues = [0,7,5]
Output: 17
Explanation: There are three ways to divide nums:
- [[2,3,5],[7,7,7],[5]] with the sum of the values 5 + 7 + 5 == 17.
- [[2,3,5,7],[7,7],[5]] with the sum of the values 7 + 7 + 5 == 19.
- [[2,3,5,7,7],[7],[5]] with the sum of the values 7 + 7 + 5 == 19.
The minimum possible sum of the values is 17.
```

**Example 3:**
```
Input: nums = [1,2,3,4], andValues = [2]
Output: -1
Explanation: The bitwise AND of the entire array nums is 0. As there is no possible way to divide nums into a single subarray to have the bitwise AND of elements 2, return -1.
```

---

## 2. Key Insight

> **DP with AND tracking**: `dp[i][j]` = minimum sum when the first `i` elements are divided into `j` subarrays. The AND of a subarray only decreases (or stays) as we extend it — there are at most O(log max) distinct AND values as we extend a suffix. Use this to prune the DP transitions.

---

## 3. Approach: DP + Bitwise AND — O(n · m · log(max)) ✅

```text
FUNCTION minimumValueSum(nums, andValues):
    n, m ← LENGTH(nums), LENGTH(andValues)
    // dp[i][j] = min sum using first i elements in j groups
    // For each (i, j), track possible AND values for the j‑th group
    
    MEMO ← {}
    FUNCTION solve(i, j, curAnd):
        IF i = n AND j = m: RETURN 0
        IF i = n OR j = m: RETURN INFINITY
        
        curAnd ← curAnd AND nums[i]
        IF curAnd < andValues[j]: RETURN INFINITY  // AND can only decrease
        
        // Extend current group
        result ← solve(i+1, j, curAnd)
        // End group here if AND matches target
        IF curAnd = andValues[j]:
            result ← MIN(result, nums[i] + solve(i+1, j+1, -1))
        
        RETURN result
    
    ans ← solve(0, 0, -1)  // -1 as identity (all bits set)
    RETURN ans IF ans < INFINITY ELSE -1
```

---

## 4. Walkthrough

Consider `nums = [7,3,5,6]` and `andValues = [3,4]`.
| i | curAnd (extending) | Decision |
|---|--------------------|----------|
|0|7|cannot end (7≠3) → extend|
|1|7 AND 3 = 3|matches `andValues[0]`; end first subarray, add last element `3` to sum|
|2|5|start second subarray, curAnd=5|
|3|5 AND 6 = 4|matches `andValues[1]`; end second subarray, add last element `6`|
Total sum = 3 + 6 = 9.

---

## 5. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n · m · log(max)) — limited distinct AND values per position |
| **Space** | O(n · m · log(max)) — memoization |

---

## Follow-Up Questions

1. How would the solution change if the cost to minimize were the **sum of subarray lengths** instead of last elements?
2. Can the approach be adapted for a **non‑contiguous** partition of `nums`?
3. What if the AND operation were replaced by **OR** or **XOR**?

---

## Key Takeaway

> **AND monotonicity enables pruning** — as a subarray extends, its AND only decreases. This limits the number of distinct states, making the DP tractable despite the seemingly large state space.
