# 3819. Rotate Non Negative Elements

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/rotate-non-negative-elements](https://leetcode.com/problems/rotate-non-negative-elements)
**Companies:** Accolite

---

## Problem Description

You are given an integer array `nums` and an integer `k`.

Rotate only the **non-negative** elements of the array to the **left** by `k` positions, in a cyclic manner.

All **negative** elements must stay in their original positions and must not move.

After rotation, place the **non-negative** elements back into the array in the new order, filling only the positions that originally contained **non-negative** values and **skipping all negative** positions.

Return the resulting array.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `-10^5 <= nums[i] <= 10^5`
- `0 <= k <= 10^5`

---

## Approach

Only the relative order of the non-negative elements changes. Collect their indices and values, rotate the value list left by `k` (cyclically, so use `r = k mod m` where `m` is the number of non-negative elements), and write the rotated values back into the same indices. After a left rotation by `r`, the element that lands at slot `j` is `values[(j + r) mod m]`. If `m = 0`, nothing moves.

```text
FUNCTION rotateNonNegative(nums, k):
    // Collect indices of non-negative elements
    indices ← []
    FOR i ← 0 TO LENGTH(nums) - 1:
        IF nums[i] ≥ 0:
            APPEND i TO indices
    m ← LENGTH(indices)
    IF m = 0:
        RETURN nums

    // Extract their values
    values ← []
    FOR idx IN indices:
        APPEND nums[idx] TO values

    // Left rotation by k is the same as by k mod m
    r ← k MOD m

    // Scatter back: slot j receives values[(j + r) mod m]
    FOR j ← 0 TO m - 1:
        nums[indices[j]] ← values[(j + r) MOD m]

    RETURN nums
```

---

## Examples

**Example 1:**
```
Input: nums = [1,-2,3,-4], k = 3
Output: [3,-2,1,-4]
Explanation:
- The non-negative elements, in order, are [1, 3].
- Left rotation with k = 3 results in:
  - [1, 3] -> [3, 1] -> [1, 3] -> [3, 1]
- Placing them back into the non-negative indices results in [3, -2, 1, -4].
```

**Example 2:**
```
Input: nums = [-3,-2,7], k = 1
Output: [-3,-2,7]
Explanation:
- The non-negative elements, in order, are [7].
- Left rotation with k = 1 results in [7].
- Placing them back into the non-negative indices results in [-3, -2, 7].
```

**Example 3:**
```
Input: nums = [5,4,-9,6], k = 2
Output: [6,5,-9,4]
Explanation:
- The non-negative elements, in order, are [5, 4, 6].
- Left rotation with k = 2 results in [6, 5, 4].
- Placing them back into the non-negative indices results in [6, 5, -9, 4].
```

---

## Walkthrough

**Example 3:** `nums = [5, 4, -9, 6]`, `k = 2`

1. Indices of non-negative elements: `[0, 1, 3]`; values: `[5, 4, 6]`; `m = 3`.
2. `r = 2 mod 3 = 2`.
3. Scatter back:
   - `j = 0`: `nums[0] = values[(0+2) mod 3] = values[2] = 6`
   - `j = 1`: `nums[1] = values[(1+2) mod 3] = values[0] = 5`
   - `j = 2`: `nums[3] = values[(2+2) mod 3] = values[1] = 4`
4. The negative `-9` at index 2 is untouched.
5. Resulting array: `[6, 5, -9, 4]` — matches the expected output.

(Example 1: values `[1, 3]`, `r = 3 mod 2 = 1` → `[3, 1]` → `[3, -2, 1, -4]`.)

---

## Complexity Analysis

- **Time:** O(n) – one pass to collect indices/values and one pass to write back; `k` is reduced modulo `m`, so its size does not matter.
- **Space:** O(m) where m is the number of non-negative elements (extra arrays for indices and values).

---

## Follow-Up Questions

- How would you rotate to the **right** by `k` instead? (Slot `j` receives `values[(j − r + m) mod m]`.)
- Can you achieve O(1) extra space? (Apply the three-reversal rotation trick on the "virtual" array of non-negative positions, using two pointers that skip negative indices.)
- What if the array is updated online and many rotation queries arrive? (Keep a cumulative offset instead of physically rotating, and resolve positions lazily.)

---

## Key Takeaway

> Extract, rotate, and scatter: filter the elements that move, rotate them left by `k mod m` using index arithmetic `(j + r) mod m`, then place them back at their original positions.
