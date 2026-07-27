# 2626. Array Reduce Transformation

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/array-reduce-transformation](https://leetcode.com/problems/array-reduce-transformation)
**Companies:** Google, Microsoft

---

## 1. Problem Description

Implement a custom `reduce` function that takes an array `nums`, a reducer function `fn(accum, curr)`, and an initial value `init`. Return the result of applying the reducer sequentially. If the array is empty, return `init`. *(JavaScript problem)*

---

## 2. Approach: Iterative Accumulation — O(n) ✅

```javascript
var reduce = function(nums, fn, init) {
    let accum = init;
    for (const num of nums) {
        accum = fn(accum, num);
    }
    return accum;
};
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## Key Takeaway

> `reduce` is a fold operation: iterate through the array, accumulating results via the reducer function. Handle the empty array case by returning `init`.
