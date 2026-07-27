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

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n log M) where M = max value |
| **Space** | O(M) |

---

## Key Takeaway

> **Insertion cost = min(count_less, count_greater). BIT maintains frequency counts for O(log M) prefix queries. Update after each insertion to maintain running counts.**
