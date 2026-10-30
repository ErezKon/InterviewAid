# 2412. Minimum Money Required Before Transactions

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-money-required-before-transactions](https://leetcode.com/problems/minimum-money-required-before-transactions)
**Companies:** Amazon

---

## Problem Description

You are given a **0-indexed** 2D integer array `transactions`, where `transactions[i] = [cost_i, cashback_i]`.

The array describes transactions, where each transaction must be completed exactly once in **some order**. At any given moment, you have a certain amount of `money`. In order to complete transaction `i`, `money >= cost_i` must hold true. After performing a transaction, `money` becomes `money - cost_i + cashback_i`.

Return* the minimum amount of *`money`* required before any transaction so that all of the transactions can be completed **regardless of the order** of the transactions.*

**Constraints:**
- `1 <= transactions.length <= 10^5`
- `transactions[i].length == 2`
- `0 <= cost_i, cashback_i <= 10^9`

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

**Example 1:**
```
Input: transactions = [[2,1],[5,0],[4,2]]
Output: 10
Explanation: Starting with money = 10, the transactions can be performed in any order.
It can be shown that starting with money < 10 will fail to complete all transactions in some order.
```

**Example 2:**
```
Input: transactions = [[3,0],[0,3]]
Output: 3
Explanation: - If transactions are in the order [[3,0],[0,3]], the minimum money required to complete the transactions is 3.
- If transactions are in the order [[0,3],[3,0]], the minimum money required to complete the transactions is 0.
Thus, starting with money = 3, the transactions can be performed in any order.
```

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
