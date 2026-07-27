# 465. Optimal Account Balancing

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/optimal-account-balancing](https://leetcode.com/problems/optimal-account-balancing)
**Companies:** Affirm, Amazon, Citadel, Goldman Sachs, Google, Intuit, Microsoft, Pinterest, Rippling, Salesforce, Uber, Zscaler

---

## Approach: Backtracking on Net Balances — O(n!) ✅

```
FUNCTION minTransfers(transactions):
    balance = {}
    FOR [from, to, amount] IN transactions:
        balance[from] -= amount
        balance[to] += amount

    debts = [b for b in balance.values() if b != 0]

    FUNCTION dfs(start):
        WHILE start < len(debts) AND debts[start] == 0:
            start += 1
        IF start == len(debts): RETURN 0

        minTxns = infinity
        FOR i ← start + 1 TO len(debts) - 1:
            IF debts[i] * debts[start] < 0:    // opposite signs
                debts[i] += debts[start]
                minTxns = MIN(minTxns, 1 + dfs(start + 1))
                debts[i] -= debts[start]

        RETURN minTxns

    RETURN dfs(0)
```

Reduce to net balances, then find minimum transactions to settle all debts (NP-hard, use backtracking with pruning).
