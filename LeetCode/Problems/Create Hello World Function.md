# 2667. Create Hello World Function

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/create-hello-world-function](https://leetcode.com/problems/create-hello-world-function)
**Companies:** Amazon, Bloomberg, Google, Innovaccer, Meta, Microsoft, Tcs, Wipro, Yandex

---

## Problem Description

Write a function that returns a new function which always returns `"Hello World"`, regardless of arguments.

---

## Approach

```javascript
var createHelloWorld = function() {
    return function(...args) {
        return "Hello World";
    }
};
```

---

## Key Takeaway

> **Closure / higher-order function basics: return a function from a function. The inner function ignores all arguments via rest parameters.**
