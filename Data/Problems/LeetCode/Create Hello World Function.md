# 2667. Create Hello World Function

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/create-hello-world-function](https://leetcode.com/problems/create-hello-world-function)
**Companies:** Amazon, Bloomberg, Google, Innovaccer, Meta, Microsoft, Tcs, Wipro, Yandex

---

## Problem Description

Write a function that returns a new function which always returns `"Hello World"`, regardless of arguments.

---

## Examples

| Input | Output |
|-------|--------|
| N/A   | `function(){ return "Hello World"; }` |

*Explanation*: Calling the returned function yields the string `"Hello World"`.

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

## Walkthrough

1. `createHelloWorld` is invoked – it returns an inner function.
2. The inner function uses a rest parameter `...args` to accept any arguments but ignores them.
3. When the inner function is called, it simply returns the constant string `"Hello World"`.

---

## Complexity Analysis

- **Time Complexity:** O(1) – the function creation and each call are constant‑time operations.
- **Space Complexity:** O(1) – only a constant amount of extra space is used for the closure.

---

## Follow-Up Questions

- How would you modify the function to return a custom message supplied at creation time?
- Can you implement the same behavior without using closures?

---

## Key Takeaway

> **Closure / higher-order function basics: return a function from a function. The inner function ignores all arguments via rest parameters.**