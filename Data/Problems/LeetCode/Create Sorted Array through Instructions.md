# 1649. Create Sorted Array through Instructions

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/create-sorted-array-through-instructions](https://leetcode.com/problems/create-sorted-array-through-instructions)
**Companies:** Akuna Capital, Google

---

## Problem Description

Insert elements one by one into a sorted array. The cost of each insertion is `min(elements_strictly_less, elements_strictly_greater)`. Return total cost modulo `10^9 + 7`.

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

| instructions | Output |
|--------------|--------|
| [1,5,6,2] | 1 |
| [1,2,3,4,5] | 0 |
| [5,4,3,2,1] | 6 |

*Explanation*: For each insertion, compute the minimum of elements less and greater; sum modulo `10^9+7`.

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