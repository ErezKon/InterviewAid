# 2703. Return Length of Arguments Passed

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/return-length-of-arguments-passed](https://leetcode.com/problems/return-length-of-arguments-passed)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Tcs

---

## Problem Description

Write a function `argumentsLength` that returns the count of arguments passed to it.

**Constraints:**
- `args` is a valid JSON array
- `0 <= args.length <= 100`

---

## Examples

**Example 1:**
```
Input: args = [5]
Output: 1
Explanation:
argumentsLength(5); // 1

One value was passed to the function so it should return 1.
```

**Example 2:**
```
Input: args = [{}, null, "3"]
Output: 3
Explanation:
argumentsLength({}, null, "3"); // 3

Three values were passed to the function so it should return 3.
```

---

## Approach

```javascript
var argumentsLength = function(...args) {
    return args.length;
};
```

---

## Walkthrough

1. The function uses the **rest parameter** `...args` to collect all arguments into an array.
2. `args.length` directly gives the number of arguments.
3. Return this length.

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | O(1) — constant time to get array length |
| Space  | O(1) — no extra space beyond the arguments array |

---

## Follow-Up Questions

- How would you implement this in a language without a built-in rest parameter?
- How can you count arguments in a variadic function written in C?

---

## Key Takeaway

> The **rest parameter** (`...args`) collects all arguments into an array, making `.length` the simplest way to count them.
