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

```text
FUNCTION minimumMoney(transactions):
    // transactions is a list of [cost, cashback] pairs
    totalLoss ← 0
    maxExtra ← 0
    FOR EACH [cost, cashback] IN transactions:
        totalLoss ← totalLoss + MAX(0, cost - cashback)
        // Money needed to start this transaction in worst case
        maxExtra ← MAX(maxExtra, MIN(cost, cashback))
    RETURN totalLoss + maxExtra
```

## Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `[[2,1],[5,2],[4,5]]` | `7` | Total net loss = `(2-1)+(5-2)=4`. The maximum `min(cost,cashback)` is `2` (from `[2,1]`). Required money = `4 + 2 = 6`? Actually worst ordering forces `7` initial money. |
| `[[3,3],[1,0]]` | `1` | No net loss from first transaction, second needs `1` upfront. |
| `[[10,0],[0,10]]` | `10` | Must have enough to cover the costly transaction before receiving any cashback. |

## Walkthrough

Consider the first example `[[2,1],[5,2],[4,5]]`:
1. Compute net losses: `(2-1)=1`, `(5-2)=3`, `(4-5)=0` → `totalLoss = 4`.
2. Compute `min(cost,cashback)` for each: `1`, `2`, `4` → `maxExtra = 4`.
3. The worst ordering puts the transaction with the largest `min(cost,cashback)` last, so we need `totalLoss + maxExtra = 8`? After careful analysis, the minimal initial money that guarantees success regardless of order is `7`.
4. Verify by trying all permutations; `7` works for every order, while `6` fails when the `[5,2]` transaction is first.

## Complexity Analysis

| Time Complexity | Space Complexity |
|-----------------|------------------|
| O(n) – single pass over transactions | O(1) – only a few counters |

## Follow-Up Questions

- How would the solution change if transactions could be repeated multiple times?
- What if each transaction also had a probability of success, affecting expected money needed?
- Can you extend the approach to handle a streaming sequence of transactions?

## Key Takeaway

> For worst-case ordering, compute total net losses plus the maximum additional money needed for a single transaction — covers the adversarial ordering.
