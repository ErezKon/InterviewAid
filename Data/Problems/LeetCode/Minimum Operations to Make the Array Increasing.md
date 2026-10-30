# 1827. Minimum Operations to Make the Array Increasing

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/minimum-operations-to-make-the-array-increasing](https://leetcode.com/problems/minimum-operations-to-make-the-array-increasing)
**Companies:** Amazon, Deutsche Bank, Google, Tiktok

---

## Problem Description
You are given an integer array `nums` (**0-indexed**). In one operation, you can choose an element of the array and increment it by `1`.

- For example, if `nums = [1,2,3]`, you can choose to increment `nums[1]` to make `nums = [1,3,3]`.

Return *the **minimum** number of operations needed to make* `nums` ***strictly increasing**.*

An array `nums` is **strictly increasing** if `nums[i] < nums[i+1]` for all `0 <= i < nums.length - 1`. An array of length `1` is trivially strictly increasing.

**Constraints:**
- `1 <= nums.length <= 5000`
- `1 <= nums[i] <= 10^4`

## Examples

```
Example 1:
  Input: nums = [1,1,1]
  Output: 3
  Explanation: You can do the following operations:
  1) Increment nums[2], so nums becomes [1,1,2].
  2) Increment nums[1], so nums becomes [1,2,2].
  3) Increment nums[2], so nums becomes [1,2,3].
```

```
Example 2:
  Input: nums = [1,5,2,4,1]
  Output: 14
  Explanation: Transform to [1,5,6,7,8]; increments = 0+0+4+3+7 = 14.
```

```
Example 3:
  Input: nums = [8]
  Output: 0
```

## Approach
Traverse the array from left to right, ensuring each element is greater than its predecessor. If `nums[i]` is not larger than `nums[i-1]`, compute the needed increment `delta = nums[i-1] - nums[i] + 1`, add `delta` to the answer, and set `nums[i] = nums[i-1] + 1`. This greedy adjustment is optimal because any smaller increase would violate the strictly increasing condition.

```text
FUNCTION minOperations(nums):
    ops ← 0
    FOR i ← 1 TO LEN(nums) - 1:
        IF nums[i] ≤ nums[i-1]:
            delta ← nums[i-1] - nums[i] + 1
            ops ← ops + delta
            nums[i] ← nums[i-1] + 1
    RETURN ops
```

## Walkthrough
For `nums = [1,5,2,4,1]`:
1. i=1: 5 > 1 → no change.
2. i=2: 2 ≤ 5 → delta = 5-2+1 = 4 → ops=4, nums[2]=6.
3. i=3: 4 ≤ 6 → delta = 6-4+1 = 3 → ops=7, nums[3]=7.
4. i=4: 1 ≤ 7 → delta = 7-1+1 = 7 → ops=14, nums[4]=8.
Resulting array `[1,5,6,7,8]` with 14 increments.

## Complexity Analysis
- **Time:** O(n) – single pass through the array.
- **Space:** O(1) – only constant extra variables.

## Follow-Up Questions
1. How would the solution change if you could also decrement elements?
2. What if each increment has a different cost per index?
3. Can you extend the approach to handle a circular array where the first element must also be greater than the last after adjustments?

## Key Takeaway
A single left‑to‑right pass with greedy increments yields the minimal operations needed to enforce a strictly increasing sequence.
