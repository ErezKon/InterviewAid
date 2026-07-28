# 3819. Rotate Non Negative Elements

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/rotate-non-negative-elements](https://leetcode.com/problems/rotate-non-negative-elements)
**Companies:** Accolite

---

## Problem Description

Given an array `nums` containing positive, negative, and zero values, rotate only the **non‑negative elements** (≥ 0) to the right by one position while keeping negative elements in their original positions.

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

| Input | Output |
|-------|--------|
| `[1, -2, 3, -4, 5]` | `[5, -2, 1, -4, 3]` |
| `[-1, -2, -3]` | `[-1, -2, -3]` |
| `[0, 2, -1, 4]` | `[4, 0, -1, 2]` |

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
