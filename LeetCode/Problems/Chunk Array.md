# 2677. Chunk Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/chunk-array](https://leetcode.com/problems/chunk-array)
**Companies:** Capgemini, Google

---

## 1. Problem Description

Given an array `arr` and a chunk size `size`, divide the array into subarrays each of length `size`. The last chunk may have fewer elements. Return the chunked array. *(JavaScript problem)*

---

## 2. Approach: Iterative Slicing — O(n) ✅

```javascript
var chunk = function(arr, size) {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size));
    }
    return result;
};
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## Key Takeaway

> Use `slice(i, i + size)` in a loop stepping by `size` — a clean O(n) chunking pattern.
