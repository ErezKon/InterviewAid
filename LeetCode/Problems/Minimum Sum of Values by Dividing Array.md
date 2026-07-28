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

## Examples

**Example 1:**
```
nums = [7, 3, 5, 6]
andValues = [3, 4]
```
*We can split into `[7,3]` (AND = 3) and `[5,6]` (AND = 4). The last elements are 3 and 6, sum = 9.*

**Example 2:**
```
nums = [1,2,3]
andValues = [0]
```
*All numbers AND together give 0, but the last element is 3, so the answer is 3.*

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
