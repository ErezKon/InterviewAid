# 3289. The Two Sneaky Numbers of Digitville

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/the-two-sneaky-numbers-of-digitville](https://leetcode.com/problems/the-two-sneaky-numbers-of-digitville)
**Companies:** Amazon, Google, Meta, Microsoft

---

## Problem Description
Given an integer array `nums` where exactly two distinct numbers appear more than once and all other numbers appear exactly once, return the two numbers that have duplicates. The order of the returned numbers does not matter.

## Examples
**Example 1:**
```
nums = [1,2,3,2,4,5,1]
Output = [1,2]
```
Numbers 1 and 2 each appear twice.

**Example 2:**
```
nums = [10,20,30,20,10,40]
Output = [10,20]
```
Both 10 and 20 are duplicated.

## Approach
Iterate through the array while maintaining a hash set of seen numbers. When a number is already in the set, add it to the result list. Continue until two duplicates are collected.

```text
FUNCTION getSneakyNumbers(nums):
    seen ← SET()
    result ← LIST()
    FOR num IN nums:
        IF num IN seen:
            APPEND result, num
            IF LENGTH(result) = 2:
                BREAK
        ELSE:
            ADD seen, num
    RETURN result
```
The set provides O(1) lookup for previously seen values.

## Walkthrough
| Step | num | seen set | result |
|------|-----|----------|--------|
| 1 | 1 | {1} | [] |
| 2 | 2 | {1,2} | [] |
| 3 | 3 | {1,2,3} | [] |
| 4 | 2 | {1,2,3} | [2] |
| 5 | 4 | {1,2,3,4} | [2] |
| 6 | 5 | {1,2,3,4,5} | [2] |
| 7 | 1 | {1,2,3,4,5} | [2,1] |

## Complexity Analysis
- **Time:** O(n) where n is the length of `nums`.
- **Space:** O(n) in the worst case for the `seen` set.

## Follow‑Up Questions
1. How would you solve the problem if the array is read‑only and you cannot use extra space?
2. What if more than two numbers could be duplicated; how would you modify the algorithm?
3. Can you find the duplicates in a single pass without using a hash set, e.g., by modifying the array in‑place?

## Key Takeaway
A hash set enables constant‑time detection of previously seen elements, making it trivial to collect the two duplicated numbers.
