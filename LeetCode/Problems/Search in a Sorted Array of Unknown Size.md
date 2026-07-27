# 702. Search in a Sorted Array of Unknown Size

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/search-in-a-sorted-array-of-unknown-size](https://leetcode.com/problems/search-in-a-sorted-array-of-unknown-size)
**Companies:** Google

---

## Problem Description

Given a sorted array accessible via `reader.get(index)` (returns `2^31 - 1` if out of bounds) and a target, find the index of target or return `-1`. You don't know the array size.

---

## Key Insight

> First find the **search boundary** by doubling the right bound until `reader.get(right) >= target`, then do standard **binary search** within `[left, right]`.

---

## Approach

```
FUNCTION search(reader, target):
    // Expand bounds exponentially
    left, right ← 0, 1
    WHILE reader.get(right) < target:
        left ← right
        right ← right * 2

    // Binary search in [left, right]
    WHILE left <= right:
        mid ← (left + right) / 2
        val ← reader.get(mid)
        IF val == target: RETURN mid
        ELSE IF val < target: left ← mid + 1
        ELSE: right ← mid - 1

    RETURN -1
```

| Time | Space |
|------|-------|
| O(log n) — exponential expansion + binary search | O(1) |

---

## Key Takeaway

> When the search space size is unknown, use **exponential doubling** to find the upper bound first, then binary search — total cost remains O(log n).
