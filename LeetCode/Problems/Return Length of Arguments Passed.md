# 2703. Return Length of Arguments Passed

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/return-length-of-arguments-passed](https://leetcode.com/problems/return-length-of-arguments-passed)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Tcs

---

## Problem Description

Write a function `argumentsLength` that returns the count of arguments passed to it.

---

## Approach

```javascript
var argumentsLength = function(...args) {
    return args.length;
};
```

---

## Key Takeaway

> The **rest parameter** (`...args`) collects all arguments into an array, making `.length` the simplest way to count them.
