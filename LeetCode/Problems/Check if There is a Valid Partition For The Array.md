# 2369. Check if There is a Valid Partition For The Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/check-if-there-is-a-valid-partition-for-the-array](https://leetcode.com/problems/check-if-there-is-a-valid-partition-for-the-array)
**Companies:** Google

---

## 1. Problem Description

Given an array, check if it can be partitioned into subarrays where each subarray is: (1) two equal elements, (2) three equal elements, or (3) three consecutive increasing elements.

---

## 2. Approach: DP — O(n) ✅

```
FUNCTION validPartition(nums):
    n = len(nums)
    dp = [false] * (n + 1)
    dp[0] = true
    
    FOR i ← 2 TO n:
        // Two equal
        IF nums[i-1] == nums[i-2]:
            dp[i] = dp[i] OR dp[i-2]
        // Three equal
        IF i >= 3 AND nums[i-1] == nums[i-2] == nums[i-3]:
            dp[i] = dp[i] OR dp[i-3]
        // Three consecutive
        IF i >= 3 AND nums[i-1] == nums[i-2]+1 == nums[i-3]+2:
            dp[i] = dp[i] OR dp[i-3]
    
    RETURN dp[n]
```

| Time | Space |
|------|-------|
| O(n) | O(n), optimizable to O(1) |

---

## Key Takeaway

> Linear DP where `dp[i]` = can we validly partition `nums[0..i-1]`. Check all valid partition endings (2 or 3 elements) at each position.
