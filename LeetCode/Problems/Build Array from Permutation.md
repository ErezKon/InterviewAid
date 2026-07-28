# 1920. Build Array from Permutation

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/build-array-from-permutation](https://leetcode.com/problems/build-array-from-permutation)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description
Given an array `nums` of length `n` where `nums` is a permutation of the integers `[0, n-1]`, construct and return a new array `ans` of length `n` such that `ans[i] = nums[nums[i]]` for each `0 ≤ i < n`.

## Examples
- Input: `nums = [0,2,1,5,3,4]` → Output: `[0,1,2,4,5,3]`. Explanation: `ans[0]=nums[nums[0]]=nums[0]=0`, `ans[1]=nums[nums[1]]=nums[2]=1`, etc.
- Input: `nums = [5,0,1,2,3,4]` → Output: `[4,5,0,1,2,3]`.

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
