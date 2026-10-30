# 3914. Minimum Operations to Make Array Non Decreasing

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-operations-to-make-array-non-decreasing](https://leetcode.com/problems/minimum-operations-to-make-array-non-decreasing)
**Companies:** Amazon

---

## Problem Description
You are given an integer array `nums` of length `n`.

In one operation, you may choose any **subarray** `nums[l..r]` and **increase** each element in that **subarray** by `x`, where `x` is any **positive** integer.

Return the **minimum** possible **sum** of the values of `x` across all operations required to make the array **non-decreasing**.

An array is **non-decreasing** if `nums[i] <= nums[i + 1]` for all `0 <= i < n - 1`.

**Constraints:**
- `1 <= n == nums.length <= 10^5`
- `1 <= nums[i] <= 10^9`

## Examples

```
Example 1:
  Input: nums = [3,3,2,1]
  Output: 2
  Explanation: One optimal set of operations:
  - Choose subarray [2..3] and add x = 1 resulting in [3, 3, 3, 2]
  - Choose subarray [3..3] and add x = 1 resulting in [3, 3, 3, 3]
  The array becomes non-decreasing, and the total sum of chosen x values is 1 + 1 = 2.
```

```
Example 2:
  Input: nums = [5,1,2,3]
  Output: 4
  Explanation: One optimal set of operations:
  - Choose subarray [1..3] and add x = 4 resulting in [5, 5, 6, 7]
  The array becomes non-decreasing, and the total sum of chosen x values is 4.
```

## Approach
Traverse the array while tracking the maximum value seen so far. If the current element is smaller than this maximum, we must raise it to the maximum, costing `maxSoFar - nums[i]` operations. Accumulate these costs.

```text
FUNCTION minOperations(nums):
    SET operations ← 0
    SET maxSoFar ← nums[0]
    FOR i ← 1 TO LENGTH(nums) - 1:
        IF nums[i] < maxSoFar:
            SET operations ← operations + (maxSoFar - nums[i])
        ELSE:
            SET maxSoFar ← nums[i]
    RETURN operations
```

## Walkthrough
| i | nums[i] | maxSoFar | ops added | total ops |
|---|---------|----------|-----------|-----------|
|0|3|3|0|0|
|1|2|3|1|1|
|2|5|5|0|1|
|3|1|5|4|5|
|4|7|7|0|5|

## Complexity Analysis
Time: **O(n)** – single pass through the array.
Space: **O(1)** – only a few scalar variables.

## Follow-Up Questions
1. How would the solution change if you could also decrement elements?
2. Can you extend the approach to handle circular arrays?
3. What is the minimal number of operations if each increment costs a variable amount?

## Key Takeaway
The optimal strategy is to raise each element to the highest value seen so far, and the total operations equal the sum of those required adjustments.
