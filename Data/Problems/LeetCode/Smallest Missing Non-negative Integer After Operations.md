# 2598. Smallest Missing Non-negative Integer After Operations

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/smallest-missing-non-negative-integer-after-operations](https://leetcode.com/problems/smallest-missing-non-negative-integer-after-operations)
**Companies:** Amazon, Atlassian, Citadel, Ibm, Mercari, Microsoft

---

## Problem Description
You are given a **0-indexed** integer array `nums` and an integer `value`.

In one operation, you can add or subtract `value` from any element of `nums`.

- For example, if `nums = [1,2,3]` and `value = 2`, you can choose to subtract `value` from `nums[0]` to make `nums = [-1,2,3]`.

The MEX (minimum excluded) of an array is the smallest missing **non-negative** integer in it.

- For example, the MEX of `[-1,2,3]` is `0` while the MEX of `[1,0,3]` is `2`.

Return *the maximum MEX of* `nums` *after applying the mentioned operation **any number of times***.

**Constraints:**
- `1 <= nums.length, value <= 10^5`
- `-10^9 <= nums[i] <= 10^9`

## Examples
```
Example 1:
  Input: nums = [1,-10,7,13,6,8], value = 5
  Output: 4
  Explanation: One can achieve this result by applying the following operations:
    - Add value to nums[1] twice to make nums = [1,0,7,13,6,8]
    - Subtract value from nums[2] once to make nums = [1,0,2,13,6,8]
    - Subtract value from nums[3] twice to make nums = [1,0,2,3,6,8]
    The MEX of nums is 4. It can be shown that 4 is the maximum MEX we can achieve.
```

```
Example 2:
  Input: nums = [1,-10,7,13,6,8], value = 7
  Output: 2
  Explanation: One can achieve this result by applying the following operation:
    - subtract value from nums[2] once to make nums = [1,-10,0,13,6,8]
    The MEX of nums is 2. It can be shown that 2 is the maximum MEX we can achieve.
```

## Approach
The problem reduces to finding the smallest missing integer after sorting the remainders. Using a **greedy** method similar to the classic “smallest missing sum” problem:
1. Compute `rem[i] = nums[i] % value` for each element.
2. Count occurrences of each remainder.
3. Iterate `i` from `0` upward, maintaining the smallest missing candidate `miss`.
   - If `count[i % value]` is zero, `miss` is the answer.
   - Otherwise decrement the count and continue.
The algorithm works because we always try to fill the next required integer using available remainders.

```text
FUNCTION findSmallestInteger(nums, value):
    // count remainders
    count ← ARRAY of size value filled with 0
    FOR num IN nums:
        remainder ← num % value
        count[remainder] ← count[remainder] + 1
    i ← 0
    WHILE TRUE:
        idx ← i % value
        IF count[idx] == 0:
            RETURN i
        count[idx] ← count[idx] - 1
        i ← i + 1
```

## Walkthrough
Consider `nums = [1,2,3], value = 2`.
| i | idx (i % 2) | count before | count after | outcome |
|---|-------------|--------------|-------------|---------|
|0|0|count[0]=1|0|continue |
|1|1|count[1]=2|1|continue |
|2|0|count[0]=0|0|return 2 |
Thus the smallest missing integer is `2`.

## Complexity Analysis
- **Time:** `O(n + m)` where `n = LENGTH(nums)` and `m = value` (size of count array).
- **Space:** `O(m)` for the remainder counts.

## Follow-Up Questions
1. How would the solution change if each number could be used multiple times?
2. Can the algorithm be adapted for very large `value` without allocating an `O(value)` array?
3. What is the impact if negative numbers are allowed in `nums`?

## Key Takeaway
By counting remainders and greedily consuming them in order, we can efficiently determine the smallest non‑negative integer that cannot be represented after the modulo operation.
