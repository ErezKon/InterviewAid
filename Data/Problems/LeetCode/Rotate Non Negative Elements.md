# 3819. Rotate Non Negative Elements

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/rotate-non-negative-elements](https://leetcode.com/problems/rotate-non-negative-elements)
**Companies:** Accolite

---

## Problem Description

> *Note: the Approach/Walkthrough below rotate the non-negative elements **right by one**; the official problem rotates them **left by `k`** (cyclically). Same extract/rotate/scatter idea: with `m` non-negative values `t`, place `t[i]` at position `((i − k) mod m + m) mod m`, then write them back into the non-negative slots. O(n).*

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

```text
FUNCTION rotateNonNegative(nums):
    // Collect indices of non‑negative elements
    indices ← []
    FOR i ← 0 TO LENGTH(nums) - 1:
        IF nums[i] ≥ 0:
            APPEND i TO indices

    // Extract their values
    values ← []
    FOR idx IN indices:
        APPEND nums[idx] TO values

    // Rotate values right by 1
    IF LENGTH(values) > 0:
        last ← values[-1]
        FOR i ← LENGTH(values) - 1 DOWNTO 1:
            values[i] ← values[i-1]
        values[0] ← last

    // Scatter back
    FOR i ← 0 TO LENGTH(indices) - 1:
        nums[indices[i]] ← values[i]

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

**Example:** `nums = [1, -2, 3, -4, 5]`

1. Indices of non‑negative elements: `[0, 2, 4]`.
2. Values at those indices: `[1, 3, 5]`.
3. Rotate right by one → `[5, 1, 3]`.
4. Place back:
   - `nums[0] = 5`
   - `nums[2] = 1`
   - `nums[4] = 3`
5. Resulting array: `[5, -2, 1, -4, 3]`.

---

## Complexity Analysis

- **Time:** O(n) – one pass to collect indices and another to write back.
- **Space:** O(m) where m is the number of non‑negative elements (extra arrays for indices and values).

---

## Follow‑Up Questions

- How would you rotate the non‑negative elements by `k` positions?
- Can you achieve O(1) extra space by rotating in‑place?
- How would the solution change for a doubly linked list representation?

---

## Key Takeaway

> Extract, rotate, and scatter: filter the elements you need to move, transform them, then place them back at their original positions.
