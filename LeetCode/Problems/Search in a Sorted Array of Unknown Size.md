# 702. Search in a Sorted Array of Unknown Size

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/search-in-a-sorted-array-of-unknown-size](https://leetcode.com/problems/search-in-a-sorted-array-of-unknown-size)
**Companies:** Google

---

## Problem Description

Given a sorted array accessible via `reader.get(index)` (returns `2^31 - 1` if out of bounds) and a target, find the index of target or return `-1`. You don't know the array size.

---

## 2. Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `reader = [1,3,5,7,9]`, `target = 5` | `2` | Index of `5` in the virtual array.
| `reader = [1,2,3]`, `target = 4` | `-1` | Target not present.

---

## 3. Approach

First find the **search boundary** by doubling the right bound until `reader.get(right) >= target`, then do standard **binary search** within `[left, right]`.

```text
FUNCTION search(reader, target):
    // Expand bounds exponentially
    left ← 0
    right ← 1
    WHILE reader.get(right) < target:
        left ← right
        right ← right * 2

    // Binary search in [left, right]
    WHILE left ≤ right:
        mid ← (left + right) / 2
        val ← reader.get(mid)
        IF val == target:
            RETURN mid
        ELSE IF val < target:
            left ← mid + 1
        ELSE:
            right ← mid - 1
    RETURN -1
```

---

## 4. Walkthrough

For `reader = [1,3,5,7,9]`, `target = 5`:

| Step | left | right | mid | reader.get(mid) | Action |
|------|------|-------|-----|----------------|--------|
| 1 | 0 | 1 | 1 | 3 (<5) | left←1, right←2
| 2 | 1 | 2 | 2 | 5 (=5) | return 2 |

The exponential expansion quickly reaches a bound covering the target, then binary search finds it.

---

## 5. Complexity Analysis

| Metric | Complexity |
|--------|------------|
| Time | O(log n) — exponential expansion + binary search |
| Space | O(1) |

---

## 6. Follow-Up Questions

- How would you adapt the algorithm if the array could contain duplicate values?
- Can you modify the approach to work with a descending sorted array?
- What changes are needed if `reader.get` is an expensive I/O operation?

---

## Key Takeaway

> When the search space size is unknown, use **exponential doubling** to find the upper bound first, then binary search — total cost remains O(log n).
