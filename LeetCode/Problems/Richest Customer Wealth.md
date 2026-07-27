# 1672. Richest Customer Wealth

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/richest-customer-wealth](https://leetcode.com/problems/richest-customer-wealth)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description

Given an `m × n` grid `accounts` where `accounts[i][j]` is the money customer `i` has in bank `j`, return the **maximum wealth** (sum of all bank accounts for a single customer).

---

## Approach

```
FUNCTION maximumWealth(accounts):
    RETURN MAX(SUM(row) for row in accounts)
```

| Time | Space |
|------|-------|
| O(m·n) | O(1) |

---

## Key Takeaway

> Sum each row, take the max — a one-liner using built-in aggregation functions.
