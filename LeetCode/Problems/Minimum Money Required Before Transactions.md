# 2412. Minimum Money Required Before Transactions

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-money-required-before-transactions](https://leetcode.com/problems/minimum-money-required-before-transactions)
**Companies:** Amazon

---

## Problem Description

Each transaction `[cost, cashback]` costs `cost` money and returns `cashback`. You choose the order. Return the **minimum initial money** to guarantee completing all transactions in any order.

## Key Insight

> Sum up all net losses: `totalLoss = sum(max(0, cost - cashback))`. The worst case is doing the most expensive profitable transaction last. Answer = `totalLoss + max(min(cost, cashback) for each transaction)`.

## Approach: Greedy — O(n) ✅

```
FUNCTION minimumMoney(transactions):
    totalLoss ← 0
    maxExtra ← 0
    FOR [cost, cashback] IN transactions:
        totalLoss += MAX(0, cost - cashback)
        // After accounting for losses, need extra for the worst single transaction
        maxExtra ← MAX(maxExtra, MIN(cost, cashback))
    RETURN totalLoss + maxExtra
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

## Key Takeaway

> For worst-case ordering, compute total net losses plus the maximum additional money needed for a single transaction — covers the adversarial ordering.
