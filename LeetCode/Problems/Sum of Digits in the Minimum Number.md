# 1085. Sum of Digits in the Minimum Number

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/sum-of-digits-in-the-minimum-number](https://leetcode.com/problems/sum-of-digits-in-the-minimum-number)
**Companies:** Amazon

---

## Problem Description
Given an integer array `nums`, form the smallest possible number by concatenating the elements in some order (treat each element as a string). Compute the sum of the decimal digits of this minimum number.

## Examples
**Example 1:**
Input: `nums = [10,2]`
Output: `3`
Explanation: Minimum concatenation is "102"; digit sum = 1+0+2 = 3.

**Example 2:**
Input: `nums = [3,30,34,5,9]`
Output: `27`
Explanation: Minimum number is "3033459"; digit sum = 3+0+3+3+4+5+9 = 27.

## Approach
Sort the numbers as strings using a custom comparator: for strings `a` and `b`, compare `a+b` vs `b+a`. Concatenating the sorted list yields the smallest number. Then iterate over the characters of the concatenated string, summing their numeric values.

## Walkthrough
| nums | sorted strings | concatenated | digit sum |
|------|----------------|--------------|----------|
| [10,2] | ["10","2"] | "102" | 1+0+2 = 3 |
| [3,30,34,5,9] | ["30","3","34","5","9"] | "3033459" | 27 |

## Complexity Analysis
Time: O(n log n) for sorting plus O(L) to sum digits, where L is total length of concatenated string.
Space: O(L) for the concatenated string.

## Follow-Up Questions
* How would you handle very large arrays where the concatenated number does not fit in standard numeric types?
* Can the sorting be performed in linear time using radix sort on the string representations?
* What if the problem asked for the largest possible number instead?

## Key Takeaway
A custom lexical comparator on string concatenations yields the minimal arrangement, after which digit summation is trivial.
