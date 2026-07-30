# 3024. Type of Triangle

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/type-of-triangle](https://leetcode.com/problems/type-of-triangle)
**Companies:** Bloomberg, Google, Ibm, Meta, Microsoft

---

## Problem Description
Given an array `nums` of three positive integers representing side lengths, determine the type of triangle they can form. Return one of the strings: "equilateral" (all sides equal), "isosceles" (exactly two sides equal), "scalene" (all sides different), or "none" if the sides cannot form a valid triangle (the sum of any two sides must be greater than the third).

## Examples
**Example 1:**
Input: `nums = [2,2,2]`
Output: `"equilateral"`
Explanation: All sides are equal.

**Example 2:**
Input: `nums = [3,4,5]`
Output: `"scalene"`
Explanation: No sides are equal and the triangle inequality holds.

**Example 3:**
Input: `nums = [1,2,3]`
Output: `"none"`
Explanation: 1 + 2 is not greater than 3, so no triangle can be formed.

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

## Follow‑Up Questions
1. How would you extend the solution to handle floating‑point side lengths with precision issues?
2. What if you need to return the area of the triangle as well?
3. Can you determine the triangle type without sorting, using only comparisons?

## Key Takeaway
Sorting the three sides simplifies the triangle inequality check and classification into a few straightforward conditional branches.
