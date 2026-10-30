# 2677. Chunk Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/chunk-array](https://leetcode.com/problems/chunk-array)
**Companies:** Capgemini, Google

---

## 1. Problem Description

Given an array `arr` and a chunk size `size`, return a **chunked** array.

A **chunked** array contains the original elements in `arr`, but consists of subarrays each of length `size`. The length of the last subarray may be less than `size` if `arr.length` is not evenly divisible by `size`.

Please solve it without using lodash's `_.chunk` function.

**Constraints:**
- `arr` is a valid JSON array
- `2 <= JSON.stringify(arr).length <= 10^5`
- `1 <= size <= arr.length + 1`

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

```
Example 1:
  Input: arr = [1,2,3,4,5], size = 1
  Output: [[1],[2],[3],[4],[5]]
  Explanation: The arr has been split into subarrays each with 1 element.
```

```
Example 2:
  Input: arr = [1,9,6,3,2], size = 3
  Output: [[1,9,6],[3,2]]
  Explanation: The arr has been split into subarrays with 3 elements. However, only two elements are left for the 2nd subarray.
```

```
Example 3:
  Input: arr = [8,5,3,2,6], size = 6
  Output: [[8,5,3,2,6]]
  Explanation: Size is greater than arr.length thus all elements are in the first subarray.
```

```
Example 4:
  Input: arr = [], size = 1
  Output: []
  Explanation: There are no elements to be chunked so an empty array is returned.
```

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
