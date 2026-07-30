# 3605. Minimum Stability Factor of Array

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-stability-factor-of-array](https://leetcode.com/problems/minimum-stability-factor-of-array)
**Companies:** Amazon

---

## Problem Description
Given an integer array `nums`, the **stability factor** of a subarray is defined as the difference between its maximum and minimum elements. You may perform any number of operations where you replace an element with any integer. Determine the minimum possible stability factor of the entire array after any number of such replacements.

## Examples
**Example 1:**
```
nums = [5,1,9,3]
Output: 2
Explanation: Replace 5 with 2 and 9 with 4 → array becomes [2,1,4,3]; max=4, min=1, factor=3. A better replacement yields factor 2.
```
**Example 2:**
```
nums = [7,7,7]
Output: 0
Explanation: All elements already equal; stability factor is 0.
```

## Approach
The stability factor after replacements depends only on the chosen final min and max values. To minimize the factor, we can set all elements to a common value, achieving factor 0, unless there are constraints (e.g., limited replacement values). Since the problem allows any integer replacement, the optimal strategy is to make all elements equal, yielding a factor of 0. If additional constraints existed (e.g., limited number of operations), we would compute the smallest range covering the most frequent values.

```text
FUNCTION minStabilityFactor(nums):
    // With unrestricted replacements, set all to the same value
    RETURN 0
```

## Walkthrough
For `nums = [5,1,9,3]`:
1. Choose a target value, e.g., 4.
2. Replace each element with 4 → array `[4,4,4,4]`.
3. Max = Min = 4 → factor = 0.
Thus the minimum achievable stability factor is 0.

## Complexity Analysis
- **Time:** O(1) – constant work regardless of array size.
- **Space:** O(1).

## Follow-Up Questions
1. How would the solution change if each replacement incurs a cost proportional to the absolute difference?
2. What if only a limited number of replacements are allowed?
3. Can you compute the minimal factor when you must keep at least one original element unchanged?

## Key Takeaway
When arbitrary replacements are allowed, the array can be made uniform, driving the stability factor to zero.
