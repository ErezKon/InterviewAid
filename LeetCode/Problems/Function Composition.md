# 2629. Function Composition

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/function-composition](https://leetcode.com/problems/function-composition)
**Companies:** Amazon, Google, Meta, Microsoft, Yandex

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: Right-to-Left Apply — O(n) ✅](#2-approach-right-to-left-apply--on-)
3. [Key Takeaway](#3-key-takeaway)

---

## 1. Problem Description

Given an array of functions, return a new function that is the composition of those functions: `compose([f, g, h])(x) = f(g(h(x)))`. (JavaScript problem)

---

## 2. Approach: Right-to-Left Apply — O(n) ✅

```javascript
var compose = function(functions) {
    return function(x) {
        for (let i = functions.length - 1; i >= 0; i--) {
            x = functions[i](x);
        }
        return x;
    };
};
```

---

## 3. Key Takeaway

> Function composition applies functions right-to-left. Use `reduceRight` or reverse iteration.
