# 3819. Rotate Non Negative Elements

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/rotate-non-negative-elements](https://leetcode.com/problems/rotate-non-negative-elements)
**Companies:** Accolite

---

## Problem Description

Given an array `nums` containing positive, negative, and zero values, rotate only the **non-negative elements** (≥ 0) to the right by one position while keeping negative elements in their original positions.

---

## Approach

```
FUNCTION rotateNonNegative(nums):
    // Collect indices and values of non-negative elements
    indices ← [i for i in range(len(nums)) if nums[i] >= 0]
    values ← [nums[i] for i in indices]

    // Rotate values right by 1
    IF LENGTH(values) > 0:
        values ← [values[-1]] + values[:-1]

    // Place back
    FOR k ← 0 TO LENGTH(indices) - 1:
        nums[indices[k]] ← values[k]

    RETURN nums
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## Key Takeaway

> Extract elements matching a predicate, transform (rotate) them separately, then place them back at their original indices — the "filter, transform, scatter" pattern.
