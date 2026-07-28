# 2703. Return Length of Arguments Passed

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/return-length-of-arguments-passed](https://leetcode.com/problems/return-length-of-arguments-passed)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Tcs

---

## Problem Description

Write a function `argumentsLength` that returns the count of arguments passed to it.

---

## Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `argumentsLength(1, 2, 3)` | `3` | Three arguments were passed. |
| `argumentsLength()` | `0` | No arguments were passed. |
| `argumentsLength('a', true, null, undefined)` | `4` | Four arguments of mixed types. |

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

- How would you implement this in a language without a built‑in rest parameter?
- How can you count arguments in a variadic function written in C?

---

## Key Takeaway

> The **rest parameter** (`...args`) collects all arguments into an array, making `.length` the simplest way to count them.
