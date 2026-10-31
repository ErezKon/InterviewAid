# 3024. Type of Triangle

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/type-of-triangle](https://leetcode.com/problems/type-of-triangle)
**Companies:** Bloomberg, Google, Ibm, Meta, Microsoft

---

## Problem Description

You are given a **0-indexed** integer array `nums` of size `3` which can form the sides of a triangle.

- A triangle is called **equilateral** if it has all sides of equal length.
- A triangle is called **isosceles** if it has exactly two sides of equal length.
- A triangle is called **scalene** if all its sides are of different lengths.

Return *a string representing the type of triangle that can be formed or* `"none"` *if it **cannot** form a triangle.*

**Constraints:**
- `nums.length == 3`
- `1 <= nums[i] <= 100`

## Examples

**Example 1:**
```
Input: nums = [3,3,3]
Output: "equilateral"
Explanation: Since all the sides are of equal length, therefore, it will form an equilateral triangle.
```

**Example 2:**
```
Input: nums = [3,4,5]
Output: "scalene"
Explanation:
nums[0] + nums[1] = 3 + 4 = 7, which is greater than nums[2] = 5.
nums[0] + nums[2] = 3 + 5 = 8, which is greater than nums[1] = 4.
nums[1] + nums[2] = 4 + 5 = 9, which is greater than nums[0] = 3.
Since the sum of the two sides is greater than the third side for all three cases, therefore, it can form a triangle.
As all the sides are of different lengths, it will form a scalene triangle.
```

## Approach
1. Sort the three side lengths.
2. If `a + b <= c` (where `a ≤ b ≤ c`), return "none".
3. If `a == c`, all sides equal → "equilateral".
4. If `a == b` or `b == c`, exactly two sides equal → "isosceles".
5. Otherwise, return "scalene".

## Walkthrough
| Sorted sides | Check | Result |
|--------------|-------|--------|
| [2,2,2] | 2+2>2 and all equal | equilateral |
| [3,4,5] | 3+4>5, no equal sides | scalene |
| [1,2,3] | 1+2<=3 → invalid | none |

## Complexity Analysis
- **Time:** `O(1)` (sorting three numbers is constant).
- **Space:** `O(1)`.

## Follow-Up Questions
1. How would you extend the solution to handle floating-point side lengths with precision issues?
2. What if you need to return the area of the triangle as well?
3. Can you determine the triangle type without sorting, using only comparisons?

## Key Takeaway
Sorting the three sides simplifies the triangle inequality check and classification into a few straightforward conditional branches.
