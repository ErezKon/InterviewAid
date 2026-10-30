# 2369. Check if There is a Valid Partition For The Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/check-if-there-is-a-valid-partition-for-the-array](https://leetcode.com/problems/check-if-there-is-a-valid-partition-for-the-array)
**Companies:** Google

---

## 1. Problem Description

You are given a **0-indexed** integer array `nums`. You have to partition the array into one or more **contiguous** subarrays.

We call a partition of the array **valid** if each of the obtained subarrays satisfies **one** of the following conditions:

1. The subarray consists of **exactly** `2` equal elements. For example, the subarray `[2,2]` is good.
2. The subarray consists of **exactly** `3` equal elements. For example, the subarray `[4,4,4]` is good.
3. The subarray consists of **exactly** `3` consecutive increasing elements, that is, the difference between adjacent elements is `1`. For example, the subarray `[3,4,5]` is good, but the subarray `[1,3,5]` is not.

Return `true` *if the array has **at least** one valid partition*. Otherwise, return `false`.

**Constraints:**
- `2 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^6`

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

```
Example 1:
  Input: nums = [4,4,4,5,6]
  Output: true
  Explanation: The array can be partitioned into the subarrays [4,4] and [4,5,6].
  This partition is valid, so we return true.
```

```
Example 2:
  Input: nums = [1,1,1,2]
  Output: false
  Explanation: There is no valid partition for this array.
```

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
