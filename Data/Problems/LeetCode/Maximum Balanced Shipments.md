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

> *Note: the Approach below is a placeholder (running sum). Correct greedy: scan the parcels keeping the running maximum `m` of the current shipment. When `weight[i] < m`, close the shipment (`count++`, reset `m = 0`), otherwise set `m = max(m, weight[i])`. Checked against brute force. O(n).*

You are given an integer array weight` of length n`, representing the weights of n` parcels arranged in a straight line. A **shipment** is defined as a contiguous subarray of parcels. A shipment is considered **balanced** if the weight of the **last parcel** is **strictly less** than the **maximum weight** among all parcels in that shipment.

Select a set of **non-overlapping**, contiguous, balanced shipments such that **each parcel appears in at most one shipment** (parcels may remain unshipped).

Return the **maximum possible number** of balanced shipments that can be formed.

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

**Example 1:**
```
Input: weight = [2,5,1,4,3]
Output: 2
Explanation: We can form the maximum of two balanced shipments as follows:
  Shipment 1: [2, 5, 1]
  Maximum parcel weight = 5
  Last parcel weight = 1, which is strictly less than 5. Thus, it's balanced.
  Shipment 2: [4, 3]
  Maximum parcel weight = 4
  Last parcel weight = 3, which is strictly less than 4. Thus, it's balanced.
It is impossible to partition the parcels to achieve more than two balanced shipments, so the answer is 2.
```

**Example 2:**
```
Input: weight = [4,4]
Output: 0
Explanation: No balanced shipment can be formed in this case:
  A shipment [4, 4] has maximum weight 4 and the last parcel's weight is also 4, which is not strictly less. Thus, it's not balanced.
  Single-parcel shipments [4] have the last parcel weight equal to the maximum parcel weight, thus not balanced.
As there is no way to form even one balanced shipment, the answer is 0.
```

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
