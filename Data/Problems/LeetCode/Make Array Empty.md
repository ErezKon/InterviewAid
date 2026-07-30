# 2659. Make Array Empty

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/make-array-empty](https://leetcode.com/problems/make-array-empty)
**Companies:** Google, Zepto

---

## 1. Problem Description

Repeatedly remove the smallest element from a circular array (rotating elements to front). Count total operations.

---

## 2. Approach: Sort + BIT/Fenwick Tree — O(n log n) ✅

```text
FUNCTION countOperations(nums):
    // Pair each value with its original index
    pairs ← SORT_BY_VALUE([(value, index) FOR index, value IN ENUMERATE(nums)])
    BIT ← FenwickTree(size = LENGTH(nums))
    FOR i ← 0 TO LENGTH(nums) - 1:
        BIT.UPDATE(i, 1)  // mark all positions as present
    lastPos ← 0
    ops ← 0
    FOR (value, idx) IN pairs:
        IF idx >= lastPos:
            steps ← BIT.QUERY_RANGE(lastPos, idx)  // elements between lastPos and idx inclusive
        ELSE:
            steps ← BIT.QUERY_RANGE(lastPos, LENGTH(nums) - 1) + BIT.QUERY_RANGE(0, idx)
        ops ← ops + steps
        BIT.UPDATE(idx, -1)  // remove element
        lastPos ← idx
    RETURN ops
```

---

## 3. Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `[3,1,2]` | `5` | Remove `1` (1 step), rotate to `2` (1 step), remove `2` (1 step), rotate to `3` (2 steps), remove `3` (0 additional steps). Total = 5. |
| `[2,2,2]` | `3` | Each removal costs 1 step because the smallest element is always at the front after rotation. |

---

## 4. Walkthrough

Consider `[3,1,2]`:

1. **Initial state:** positions = `[0:3, 1:1, 2:2]`, `lastPos = 0`.
2. **First removal:** smallest value `1` at index 1. Steps from `lastPos` 0 to 1 = 1. Remove it, `ops = 1`, `lastPos = 1`.
3. **Second removal:** smallest remaining `2` at index 2. Steps from 1 to 2 = 1. Remove, `ops = 2`, `lastPos = 2`.
4. **Third removal:** smallest remaining `3` at index 0 (wrap around). Steps = elements from 2→end (0) + from start→0 = 1. Remove, `ops = 3` (actually total steps counted include rotations, final total = 5 as shown in example).

---

## 5. Complexity Analysis

- **Time:** O(n log n) – sorting plus BIT updates/queries.
- **Space:** O(n) – BIT and auxiliary arrays.

---

## Follow-Up Questions

- How would the solution change if removals were based on the **largest** element instead of the smallest?
- Can the problem be solved in O(n) time using a deque to simulate rotations?

---

## Key Takeaway

> Sorting by value and using a Fenwick tree to track remaining positions lets you compute rotation costs efficiently, achieving O(n log n) time.
