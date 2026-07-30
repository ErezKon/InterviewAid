# 3914. Minimum Operations to Make Array Non Decreasing

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-operations-to-make-array-non-decreasing](https://leetcode.com/problems/minimum-operations-to-make-array-non-decreasing)
**Companies:** Amazon

---

## Problem Description
Given an integer array `nums`, you may perform the following operation any number of times: choose an index `i` and increment `nums[i]` by `1`. Return the minimum number of operations required to make the array non‑decreasing (i.e., `nums[i] ≤ nums[i+1]` for all `i`).

## Examples
**Example 1:**
Input: `nums = [3,2,5,1,7]`
Output: `5`
Explanation: Increment `nums[1]` three times to `5` and `nums[3]` twice to `3`, resulting in `[3,5,5,3,7] → [3,5,5,5,7]`.

**Example 2:**
Input: `nums = [1,2,3]`
Output: `0`
Explanation: The array is already non‑decreasing.

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
