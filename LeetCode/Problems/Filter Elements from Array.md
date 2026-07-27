# 2634. Filter Elements from Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/filter-elements-from-array](https://leetcode.com/problems/filter-elements-from-array)
**Companies:** Amazon, Bloomberg, Google

---

## Problem Description

Implement a function that filters an array based on a callback `fn(element, index)`. Return a new array with only elements where `fn` returns truthy. Do **not** use `Array.filter`.

---

## Approach: Manual Filter ✅

```javascript
var filter = function(arr, fn) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        if (fn(arr[i], i)) result.push(arr[i]);
    }
    return result;
};
```

**One-liner using built-in:**
```javascript
var filter = function(arr, fn) {
    return arr.filter((val, idx) => fn(val, idx));
};
```

---

## Key Takeaway

> **Basic functional programming: iterate and collect elements where the predicate returns truthy. Foundation for understanding higher-order functions.**
