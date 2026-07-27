# 2723. Add Two Promises

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/add-two-promises](https://leetcode.com/problems/add-two-promises)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## 1. Problem Description

Given two promises that resolve to numbers, return a promise that resolves to their **sum**.

---

## 2. Approach: Promise.all — O(1) ✅

```javascript
var addTwoPromises = async function(promise1, promise2) {
    const [val1, val2] = await Promise.all([promise1, promise2]);
    return val1 + val2;
};
```

`Promise.all` runs both concurrently and waits for both to resolve, then we sum the results.

---

## Key Takeaway

> `Promise.all` is the standard way to await multiple independent promises concurrently. Destructure the results for clean access. Awaiting sequentially (`await p1; await p2`) would be slower.
