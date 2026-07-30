# 2369. Check if There is a Valid Partition For The Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/check-if-there-is-a-valid-partition-for-the-array](https://leetcode.com/problems/check-if-there-is-a-valid-partition-for-the-array)
**Companies:** Google

---

## 1. Problem Description

Given an array, check if it can be partitioned into subarrays where each subarray is: (1) two equal elements, (2) three equal elements, or (3) three consecutive increasing elements.

---

## 2. Approach: DP — O(n) ✅

```text
FUNCTION validPartition(nums):
    n ← length of nums
    dp ← array of false of size n+1
    dp[0] ← true
    
    FOR i FROM 2 TO n:
        // two equal elements
        IF nums[i-1] == nums[i-2]:
            dp[i] ← dp[i] OR dp[i-2]
        // three equal elements
        IF i >= 3 AND nums[i-1] == nums[i-2] == nums[i-3]:
            dp[i] ← dp[i] OR dp[i-3]
        // three consecutive increasing elements
        IF i >= 3 AND nums[i-1] == nums[i-2] + 1 AND nums[i-2] == nums[i-3] + 1:
            dp[i] ← dp[i] OR dp[i-3]
    
    RETURN dp[n]
```

| Time | Space |
|------|-------|
| O(n) | O(n), optimizable to O(1) |

---

## 3. Examples

**Example 1**
```
nums = [4,4,4,5,6]
```
We can partition as `[4,4] , [4,5,6]`. Both subarrays satisfy the rules, so the output is `true`.

**Example 2**
```
nums = [1,1,1,2]
```
No valid partition exists because the last `2` cannot form a required subarray. Output: `false`.

---

## 4. Walkthrough

Consider Example 1 (`nums = [4,4,4,5,6]`).
| i | Subarray considered | Condition satisfied | dp[i] |
|---|----------------------|---------------------|------|
| 2 | `[4,4]` | two equal | true |
| 3 | `[4,4,4]` | three equal (or `[4,4]` + `[4]` not allowed) | true |
| 5 | `[4,5,6]` (indices 3‑5) | three consecutive | true |
The final `dp[5]` is true, indicating a valid partition.

---

## 5. Complexity Analysis

- **Time Complexity:** The loop runs once per element, performing O(1) work → `O(n)`.
- **Space Complexity:** The DP array stores `n+1` booleans → `O(n)`. It can be reduced to `O(1)` by keeping only the last three states.

---

## Key Takeaway

> Linear DP where `dp[i]` indicates whether the prefix `nums[0..i-1]` can be partitioned. Evaluate all allowed partition endings (size 2 or 3) at each position.
