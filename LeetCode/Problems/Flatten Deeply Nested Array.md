# 2625. Flatten Deeply Nested Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/flatten-deeply-nested-array](https://leetcode.com/problems/flatten-deeply-nested-array)
**Companies:** Google, Meta, Otterai, Paypal, Rivian, Tiktok

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: Recursive Flatten — O(n) ✅](#2-approach-recursive-flatten--on-)
3. [Key Takeaway](#3-key-takeaway)

---

## 1. Problem Description

Given a multi-dimensional array `arr` and depth `n`, flatten it up to `n` levels deep. (JavaScript problem)

---

## 2. Approach: Recursive Flatten — O(n) ✅

```javascript
var flat = function(arr, n) {
    if (n === 0) return arr.slice();
    const result = [];
    for (const item of arr) {
        if (Array.isArray(item) && n > 0) {
            result.push(...flat(item, n - 1));
        } else {
            result.push(item);
        }
    }
    return result;
};
```

---

## 3. Key Takeaway

> Recurse with decreasing depth `n`. When `n == 0`, return as-is. Each level of recursion flattens one depth level.
