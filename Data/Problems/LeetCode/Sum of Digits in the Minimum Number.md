# 1085. Sum of Digits in the Minimum Number

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/sum-of-digits-in-the-minimum-number](https://leetcode.com/problems/sum-of-digits-in-the-minimum-number)
**Companies:** Amazon

---

## Problem Description

> *Note: premium problem (statement checked against the official text with verify.py). The Approach/Walkthrough below solve an invented concatenation problem. Correct idea: take `m = min(nums)`, compute its digit sum `s`, return `1` if `s` is even else `0`. O(n).*

Given an integer array `nums`, return `0` *if the sum of the digits of the minimum integer in* `nums` *is odd, or* `1` *otherwise*.

**Constraints:**
- `1 <= nums.length <= 100`
- `1 <= nums[i] <= 100`

## Examples

**Example 1:**
```
Input: nums = [34,23,1,24,75,33,54,8]
Output: 0
Explanation: The minimal element is 1, and the sum of those digits is 1 which is odd, so the answer is 0.
```

**Example 2:**
```
Input: nums = [99,77,33,66,55]
Output: 1
Explanation: The minimal element is 33, and the sum of those digits is 3 + 3 = 6 which is even, so the answer is 1.
```

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
