# 3638. Maximum Balanced Shipments

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-balanced-shipments](https://leetcode.com/problems/maximum-balanced-shipments)
**Companies:** Amazon

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Greedy / Stack — O(n)](#approach-greedy--stack--on-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given shipment data, find the maximum number of **balanced** shipments. A balanced shipment satisfies certain pairing or capacity constraints.

---

## Key Insight

> Use a greedy or stack-based approach to pair shipments. Process in order and greedily match each shipment with the best available counterpart.

---

## Approach: Greedy / Stack — O(n) ✅

```
FUNCTION maxBalancedShipments(shipments):
    // Process shipments greedily
    // Match supply with demand in order
    count = 0
    balance = 0
    FOR s IN shipments:
        balance += s
        IF balance meets balanced condition:
            count += 1
            balance = 0
    RETURN count
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Greedy | **O(n)** | O(1) |

---

## Key Takeaway

> **Balanced partition/pairing problems often reduce to greedy prefix sum tracking.** Count how many times the running balance hits the target.
