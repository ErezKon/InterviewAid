# 414. Third Maximum Number

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/third-maximum-number](https://leetcode.com/problems/third-maximum-number)
**Companies:** Amazon, Bloomberg, Goldman Sachs, Google, Meta, Microsoft, Nvidia, Tcs

---

## Problem Description
Given an integer array `nums`, return *the **third distinct maximum** number in this array. If the third maximum does not exist, return the **maximum** number*.

**Constraints:**
- `1 <= nums.length <= 10^4`
- `-2^31 <= nums[i] <= 2^31 - 1`

**Follow up:** Can you find an `O(n)` solution?

## Examples
```
Example 1:
  Input: nums = [3,2,1]
  Output: 1
  Explanation:
  The first distinct maximum is 3.
  The second distinct maximum is 2.
  The third distinct maximum is 1.
```
```
Example 2:
  Input: nums = [1,2]
  Output: 2
  Explanation:
  The first distinct maximum is 2.
  The second distinct maximum is 1.
  The third distinct maximum does not exist, so the maximum (2) is returned instead.
```
```
Example 3:
  Input: nums = [2,2,3,1]
  Output: 1
  Explanation:
  The first distinct maximum is 3.
  The second distinct maximum is 2 (both 2's are counted together since they have the same value).
  The third distinct maximum is 1.
```

## Approach
Maintain three variables for the first, second, and third distinct maximums while iterating once through the array.

```text
FUNCTION thirdMax(nums):
    first ← second ← third ← -INFINITY
    FOR num IN nums:
        IF num == first OR num == second OR num == third: CONTINUE
        IF num > first:
            third ← second
            second ← first
            first ← num
        ELSE IF num > second:
            third ← second
            second ← num
        ELSE IF num > third:
            third ← num
    RETURN third IF third != -INFINITY ELSE first
```
The checks ensure distinctness and keep the top three values updated in O(1) space.

## Walkthrough
| num | first | second | third |
|-----|-------|--------|-------|
| 3   | 3     | -∞     | -∞    |
| 2   | 3     | 2      | -∞    |
| 1   | 3     | 2      | 1     |
Result: 1

## Complexity Analysis
- **Time:** O(n) – single pass through the array.
- **Space:** O(1) – only three extra variables.

## Follow-Up Questions
1. How would you extend the solution to return the `k`-th distinct maximum?
2. Can you solve the problem without using extra variables, e.g., by sorting?
3. How would you handle streaming input where the array is too large to store?

## Key Takeaway
Tracking the top three distinct values during a single scan yields an O(n) time, O(1) space solution.
