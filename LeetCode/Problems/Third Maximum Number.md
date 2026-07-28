# 414. Third Maximum Number

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/third-maximum-number](https://leetcode.com/problems/third-maximum-number)
**Companies:** Amazon, Bloomberg, Goldman Sachs, Google, Meta, Microsoft, Nvidia, Tcs

---

## Problem Description
Given a non‑empty integer array `nums`, return the third distinct maximum number. If the third maximum does not exist, return the maximum number.

## Examples
**Example 1**
```
Input: nums = [3,2,1]
Output: 1
Explanation: The distinct numbers in descending order are [3,2,1]; the third is 1.
```

**Example 2**
```
Input: nums = [1,2]
Output: 2
Explanation: There are only two distinct numbers, so the maximum (2) is returned.
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

## Follow‑Up Questions
1. How would you extend the solution to return the `k`‑th distinct maximum?
2. Can you solve the problem without using extra variables, e.g., by sorting?
3. How would you handle streaming input where the array is too large to store?

## Key Takeaway
Tracking the top three distinct values during a single scan yields an O(n) time, O(1) space solution.
