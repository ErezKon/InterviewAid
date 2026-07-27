# 2627. Debounce

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/debounce](https://leetcode.com/problems/debounce)
**Companies:** Confluent, Meta

---

## Problem Description

Implement a debounced function that delays invoking `fn` until `t` milliseconds after the last call. If called again within `t`, reset the timer.

---

## Approach

```javascript
var debounce = function(fn, t) {
    let timer;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), t);
    }
};
```

---

## Key Takeaway

> **Debounce = clear + reset timer on each call. Only the last invocation within the delay window actually fires. Classic JS closure + setTimeout pattern.**
