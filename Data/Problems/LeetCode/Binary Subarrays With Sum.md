# 930. Binary Subarrays With Sum

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/binary-subarrays-with-sum](https://leetcode.com/problems/binary-subarrays-with-sum)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description
Given a binary array `nums` and an integer `goal`, return *the number of non-empty **subarrays** with a sum* `goal`.

A **subarray** is a contiguous part of the array.

**Constraints:**
- `1 ≤ nums.length ≤ 3 * 10⁴`
- `nums[i]` is either `0` or `1`.
- `0 ≤ goal ≤ nums.length`

## Examples
```
Example 1:
  Input: nums = [1,0,1,0,1], goal = 2
  Output: 4
  Explanation: The 4 subarrays are marked with brackets below:
  [[1,0,1],0,1]
  [[1,0,1,0],1]
  [1,[0,1,0,1]]
  [1,0,[1,0,1]]

Example 2:
  Input: nums = [0,0,0,0,0], goal = 0
  Output: 15
```

## Approach
The problem can be solved using the **Sliding Window** technique. The key insight is that the number of subarrays with sum exactly `K` equals `atMost(K) - atMost(K-1)`, where `atMost(x)` counts subarrays with sum **≤** `x`. For a binary array, a sliding window can maintain the current sum and expand/shrink efficiently.

### Pseudocode
```text
FUNCTION numSubarraysWithSum(nums, goal):
    RETURN atMost(nums, goal) - atMost(nums, goal - 1)

FUNCTION atMost(nums, limit):
    IF limit < 0: RETURN 0
    SET left ← 0
    SET count ← 0
    SET sum ← 0
    FOR right ← 0 TO LENGTH(nums) - 1:
        SET sum ← sum + nums[right]
        WHILE sum > limit:
            SET sum ← sum - nums[left]
            SET left ← left + 1
        SET count ← count + (right - left + 1)
    RETURN count
```

## Walkthrough
Consider `nums = [1,0,1,0,1]`, `goal = 2`.
1. Compute `atMost(2)`: sliding window expands, counting all subarrays with sum ≤ 2 → 9.
2. Compute `atMost(1)`: similarly → 5.
3. Result = 9 − 5 = 4, matching the example.

## Complexity Analysis
- **Time:** `O(n)` – each element is visited at most twice by the two pointers.
- **Space:** `O(1)` – only a few integer variables are used.

## Follow-Up Questions
1. How would the solution change if the array contained arbitrary non-negative integers?
2. Can you extend the method to count subarrays with sum in a range `[L, R]`?
3. What if the array were very large and streamed? How would you maintain the count online?

## Key Takeaway
Transform the exact-sum problem into a difference of two “at most” counts and solve each with a linear-time sliding window.
