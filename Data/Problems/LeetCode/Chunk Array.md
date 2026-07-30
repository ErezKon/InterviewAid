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

## Examples

| Input | Output |
|-------|--------|
| `arr = [1,2,3,4,5], size = 2` | `[[1,2],[3,4],[5]]` |
| `arr = [1,2,3,4,5,6], size = 3` | `[[1,2,3],[4,5,6]]` |

---

## Walkthrough

1. Start with `i = 0`. Slice `arr[0:2]` → `[1,2]`, push to result.
2. Increment `i` by `size` (2). Slice `arr[2:4]` → `[3,4]`, push.
3. Increment `i` to 4. Slice `arr[4:6]` → `[5]`, push (last chunk smaller).
4. Loop ends when `i >= arr.length`. Return `[[1,2],[3,4],[5]]`.

---

## Complexity Analysis

- **Time:** O(n) – each element is visited once during slicing.
- **Space:** O(n) – output array stores all elements.

---

## Follow-Up Questions

- How would you modify the algorithm to work in-place without extra space?
- Can you handle streaming input where the array size is unknown upfront?

---

## Key Takeaway

> Use `slice(i, i + size)` in a loop stepping by `size` — a clean O(n) chunking pattern.
