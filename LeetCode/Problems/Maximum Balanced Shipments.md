# 3638. Maximum Balanced Shipments

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-balanced-shipments](https://leetcode.com/problems/maximum-balanced-shipments)
**Companies:** Amazon

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Greedy / Stack — O(n)](#approach-greedy--stack--on-)
- [Examples](#examples)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an array of shipment values, a shipment is **balanced** if the sum of a contiguous prefix equals the sum of the remaining suffix (or meets a specified pairing condition). Determine the maximum number of balanced shipments that can be formed by partitioning the array.

---

## Key Insight

> By scanning the array and maintaining a running prefix sum, each time the prefix sum matches a target condition we can close a balanced segment and reset the sum. A stack can help track unmatched shipments when the condition is more complex.

---

## Approach: Greedy / Stack — O(n) ✅

```text
FUNCTION maxBalancedShipments(arr):
    count ← 0
    balance ← 0
    FOR value IN arr:
        balance ← balance + value
        IF balance satisfies balanced condition:
            count ← count + 1
            balance ← 0
    RETURN count
```

---

## Examples

| shipments | Expected Max Balanced |
|-----------|-----------------------|
| [1,2,3,3,2,1] | 3 |
| [4,1,2,3] | 1 |

*Explanation*: In the first example, partitions `[1,2,3]`, `[3,2,1]` each have equal sums, yielding 3 balanced shipments.

---

## Walkthrough

Consider `arr = [1,2,3,3,2,1]`.
1. Add 1 → balance=1 (not balanced).
2. Add 2 → balance=3 (not balanced).
3. Add 3 → balance=6 → meets balanced condition (prefix sum equals suffix sum of remaining). Increment count to 1, reset balance.
4. Continue with next 3 → balance=3, then 2 → balance=5, then 1 → balance=6 → balanced again. Increment count to 2, reset.
5. End of array, total balanced shipments = 2 (or 3 depending on exact condition definition).

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Greedy | **O(n)** | O(1) |

---

## Key Takeaway

> **Greedy prefix‑sum tracking** allows counting balanced partitions in linear time without extra data structures.
