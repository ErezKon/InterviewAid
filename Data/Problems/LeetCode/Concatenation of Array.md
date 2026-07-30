# 1929. Concatenation of Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/concatenation-of-array](https://leetcode.com/problems/concatenation-of-array)
**Companies:** Amazon, Bloomberg, Ge Healthcare, Google, Infosys, Meta, Microsoft
---

## Problem Description
Given an integer array `nums`, return a new array that is the concatenation of `nums` with itself (i.e., `nums` followed by `nums`).

## Examples
- **Example 1:** `nums = [1,2,1]` → output `[1,2,1,1,2,1]`.
- **Example 2:** `nums = [1,3,2,1]` → output `[1,3,2,1,1,3,2,1]`.

## Approach
Create a new array of size `2 * len(nums)` and copy the original elements twice, or simply return the result of appending the array to itself.

### Pseudocode
```text
FUNCTION getConcatenation(nums):
    result ← []
    FOR x IN nums:
        APPEND x TO result
    FOR x IN nums:
        APPEND x TO result
    RETURN result
```

## Walkthrough
For `nums = [1,2,1]`:
1. First loop copies `[1,2,1]`.
2. Second loop copies again, yielding `[1,2,1,1,2,1]`.

## Complexity Analysis
Time: O(n) – each element is visited twice.
Space: O(n) for the output array (the input is unchanged).

## Follow‑Up Questions
- How would you modify the solution to work in‑place if the language allowed resizing the original array?
- Can you achieve the same result using slicing or built‑in concatenation operators?
- What is the complexity if the input is a linked list instead of an array?

---

## Key Takeaway

> Concatenating an array with itself is a straightforward linear‑time operation that simply repeats the original sequence.
