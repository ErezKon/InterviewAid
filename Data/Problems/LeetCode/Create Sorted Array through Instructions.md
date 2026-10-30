# 1649. Create Sorted Array through Instructions

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/create-sorted-array-through-instructions](https://leetcode.com/problems/create-sorted-array-through-instructions)
**Companies:** Akuna Capital, Google

---

## Problem Description

Given an integer array `instructions`, you are asked to create a sorted array from the elements in `instructions`. You start with an empty container `nums`. For each element from **left to right** in `instructions`, insert it into `nums`. The **cost** of each insertion is the **minimum** of the following:

- The number of elements currently in `nums` that are **strictly less than** `instructions[i]`.
- The number of elements currently in `nums` that are **strictly greater than** `instructions[i]`.

For example, if inserting element `3` into `nums = [1,2,3,5]`, the **cost** of insertion is `min(2, 1)` (elements `1` and `2` are less than `3`, element `5` is greater than `3`) and `nums` will become `[1,2,3,3,5]`.

Return *the **total cost** to insert all elements from* `instructions` *into* `nums`. Since the answer may be large, return it **modulo** `10^9 + 7`.

**Constraints:**
- `1 <= instructions.length <= 10^5`
- `1 <= instructions[i] <= 10^5`

---

## Key Insight

Use a **BIT (Fenwick tree)** or **merge sort** to efficiently count elements less than and greater than the current value. BIT supports prefix frequency queries in O(log M) where M is the value range.

---

## Approach

```
FUNCTION createSortedArray(instructions):
    MOD = 10^9 + 7
    m = MAX(instructions)
    bit = BIT(m + 1)
    cost = 0

    FOR i, val IN enumerate(instructions):
        less = bit.query(val - 1)         // count of elements < val
        greater = i - bit.query(val)      // count of elements > val
        cost = (cost + MIN(less, greater)) % MOD
        bit.update(val, 1)

    RETURN cost
```

---

## Examples

```
Example 1:
  Input: instructions = [1,5,6,2]
  Output: 1
  Explanation: Begin with nums = [].
  Insert 1 with cost min(0, 0) = 0, now nums = [1].
  Insert 5 with cost min(1, 0) = 0, now nums = [1,5].
  Insert 6 with cost min(2, 0) = 0, now nums = [1,5,6].
  Insert 2 with cost min(1, 2) = 1, now nums = [1,2,5,6].
  The total cost is 0 + 0 + 0 + 1 = 1.
```

```
Example 2:
  Input: instructions = [1,2,3,6,5,4]
  Output: 3
  Explanation: Begin with nums = [].
  Insert 1 with cost min(0, 0) = 0, now nums = [1].
  Insert 2 with cost min(1, 0) = 0, now nums = [1,2].
  Insert 3 with cost min(2, 0) = 0, now nums = [1,2,3].
  Insert 6 with cost min(3, 0) = 0, now nums = [1,2,3,6].
  Insert 5 with cost min(3, 1) = 1, now nums = [1,2,3,5,6].
  Insert 4 with cost min(3, 2) = 2, now nums = [1,2,3,4,5,6].
  The total cost is 0 + 0 + 0 + 0 + 1 + 2 = 3.
```

```
Example 3:
  Input: instructions = [1,3,3,3,2,4,2,1,2]
  Output: 4
  Explanation: Begin with nums = [].
  Insert 1 with cost min(0, 0) = 0, now nums = [1].
  Insert 3 with cost min(1, 0) = 0, now nums = [1,3].
  Insert 3 with cost min(1, 0) = 0, now nums = [1,3,3].
  Insert 3 with cost min(1, 0) = 0, now nums = [1,3,3,3].
  Insert 2 with cost min(1, 3) = 1, now nums = [1,2,3,3,3].
  Insert 4 with cost min(5, 0) = 0, now nums = [1,2,3,3,3,4].
  Insert 2 with cost min(1, 4) = 1, now nums = [1,2,2,3,3,3,4].
  Insert 1 with cost min(0, 6) = 0, now nums = [1,1,2,2,3,3,3,4].
  Insert 2 with cost min(2, 4) = 2, now nums = [1,1,2,2,2,3,3,3,4].
  The total cost is 0 + 0 + 0 + 0 + 1 + 0 + 1 + 0 + 2 = 4.
```

---

## Walkthrough

Consider `instructions = [1,5,6,2]`.

1. Insert `1`: no previous elements → cost `0`.
2. Insert `5`: elements less = 1, greater = 0 → cost `0`.
3. Insert `6`: less = 2, greater = 0 → cost `0`.
4. Insert `2`: less = 1 (only `1`), greater = 2 (`5` and `6`) → cost `1`.

Total cost = `1`.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n log M) where M = max value |
| **Space** | O(M) |

---

## Follow-Up Questions

- How would you adapt the solution if the value range is very large (e.g., up to 10^9)?
- Can you solve the problem using a balanced BST instead of a BIT?
- What changes are needed to handle deletions as well as insertions?

---

## Key Takeaway

> **Insertion cost = min(count_less, count_greater). BIT maintains frequency counts for O(log M) prefix queries. Update after each insertion to maintain running counts.**