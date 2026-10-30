# 1920. Build Array from Permutation

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/build-array-from-permutation](https://leetcode.com/problems/build-array-from-permutation)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description
Given a **zero-based permutation** `nums` (**0-indexed**), build an array `ans` of the **same length** where `ans[i] = nums[nums[i]]` for each `0 ≤ i < nums.length` and return it.

A **zero-based permutation** `nums` is an array of **distinct** integers from `0` to `nums.length - 1` (**inclusive**).

**Constraints:**
- `1 ≤ nums.length ≤ 1000`
- `0 ≤ nums[i] < nums.length`
- The elements in `nums` are **distinct**.

**Follow-up:** Can you solve it without using an extra space (i.e., `O(1)` memory)?

## Examples
```
Example 1:
  Input: nums = [0,2,1,5,3,4]
  Output: [0,1,2,4,5,3]
  Explanation: The array ans is built as follows:
  ans = [nums[nums[0]], nums[nums[1]], nums[nums[2]], nums[nums[3]], nums[nums[4]], nums[nums[5]]]
      = [nums[0], nums[2], nums[1], nums[5], nums[3], nums[4]]
      = [0,1,2,4,5,3]

Example 2:
  Input: nums = [5,0,1,2,3,4]
  Output: [4,5,0,1,2,3]
  Explanation: The array ans is built as follows:
  ans = [nums[nums[0]], nums[nums[1]], nums[nums[2]], nums[nums[3]], nums[nums[4]], nums[nums[5]]]
      = [nums[5], nums[0], nums[1], nums[2], nums[3], nums[4]]
      = [4,5,0,1,2,3]
```

## Approach
**Direct Mapping** – Iterate over the indices and compute `nums[nums[i]]` for each position. Since `nums` is a permutation, each lookup is O(1).

```text
FUNCTION buildArray(nums):
    SET n ← LENGTH OF nums
    SET ans ← empty list of size n
    FOR i FROM 0 TO n-1:
        SET ans[i] ← nums[ nums[i] ]
    RETURN ans
```

## Walkthrough
For `nums = [0,2,1,5,3,4]`:
- i=0 → ans[0] = nums[0] = 0
- i=1 → ans[1] = nums[2] = 1
- i=2 → ans[2] = nums[1] = 2
- i=3 → ans[3] = nums[5] = 4
- i=4 → ans[4] = nums[3] = 5
- i=5 → ans[5] = nums[4] = 3
Result `[0,1,2,4,5,3]`.

## Complexity Analysis
- **Time:** O(n) – one pass over the array.
- **Space:** O(n) for the output array (in‑place modification is also possible).

## Follow‑Up Questions
1. How would you solve the problem **in‑place** without using extra O(n) space?
2. What if the permutation property is not guaranteed – how would you detect invalid inputs?
3. Can you generalize the approach to compute `ans[i] = nums[nums[...nums[i]]]` k times?

## Key Takeaway
A simple one‑pass mapping leverages the permutation property to compute the required composition directly.
