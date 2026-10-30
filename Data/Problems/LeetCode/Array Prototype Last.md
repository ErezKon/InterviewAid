# 2619. Array Prototype Last

**Difficulty:** 🟢 Easy
**LeetCode:** https://leetcode.com/problems/array-prototype-last
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft
---

## Problem Description
Write code that enhances all arrays such that you can call the `array.last()` method on any array and it will return the last element. If there are no elements in the array, it should return `-1`.

You may assume the array is the output of `JSON.parse`.

**Constraints:**
- `arr` is a valid JSON array
- `0 <= arr.length <= 1000`

## Examples
```
Example 1:
  Input: nums = [null, {}, 3]
  Output: 3
  Explanation: Calling nums.last() should return the last element: 3.
```
```
Example 2:
  Input: nums = []
  Output: -1
  Explanation: Because there are no elements, return -1.
```

## Approach
Define `Array.prototype.last` as a function that checks the array's length. If zero, return `-1`; otherwise return the element at `length‑1`.

```text
FUNCTION Array.prototype.last():
    IF THIS.LENGTH == 0:
        RETURN -1
    ELSE:
        RETURN THIS[THIS.LENGTH - 1]
```

## Walkthrough
For `[1,2,3]`, length is 3, so the function returns element at index 2 → `3`. For `[]`, length is 0 → returns `-1`.

## Complexity Analysis
*Time*: O(1) – direct index access.
*Space*: O(1) – no extra storage.

## Follow‑Up Questions
1. How would you implement a similar method for a custom linked‑list structure?
2. Can you extend `last` to accept a negative index to retrieve elements from the end?
3. What are the implications of modifying built‑in prototypes in production code?

## Key Takeaway
Extending `Array.prototype` with a simple length check provides a constant‑time utility to fetch the last element safely.
