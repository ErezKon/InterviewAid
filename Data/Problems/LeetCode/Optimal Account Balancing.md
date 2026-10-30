# 465. Optimal Account Balancing

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/optimal-account-balancing](https://leetcode.com/problems/optimal-account-balancing)
**Companies:** Affirm, Amazon, Citadel, Goldman Sachs, Google, Intuit, Microsoft, Pinterest, Rippling, Salesforce, Uber, Zscaler

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

You are given an array of transactions `transactions` where `transactions[i] = [from_i, to_i, amount_i]` indicates that the person with `ID = from_i` gave `amount_i $` to the person with `ID = to_i`.

Return *the minimum number of transactions required to settle the debt*.

**Constraints:**
- `1 <= transactions.length <= 8`
- `transactions[i].length == 3`
- `0 <= from_i, to_i < 12`
- `from_i != to_i`
- `1 <= amount_i <= 100`

## Examples

**Example 1:**
```
Input: transactions = [[0,1,10],[2,0,5]]
Output: 2
Explanation: Person #0 gave person #1 $10.
Person #2 gave person #0 $5.
Two transactions are needed. One way to settle the debt is person #1 pays person #0 and #2 $5 each.
```

**Example 2:**
```
Input: transactions = [[0,1,10],[1,0,1],[1,2,5],[2,0,5]]
Output: 1
Explanation: Person #0 gave person #1 $10.
Person #1 gave person #0 $1.
Person #1 gave person #2 $5.
Person #2 gave person #0 $5.
Therefore, person #1 only need to give person #0 $4, and all debt is settled.
```

## Approach
1. Compute net balance for each person.
2. Collect non‑zero balances into a list `debts`.
3. Use backtracking (DFS) to settle debts pairwise: try to cancel the current debt with any later opposite‑sign debt, recurse, and keep the minimum number of transactions.
4. Prune when a debt is zero or when the current count exceeds known best.

```text
FUNCTION minTransfers(transactions):
    SET balance ← MAP()
    FOR each [frm, to, amt] IN transactions:
        balance[frm] ← balance.get(frm,0) - amt
        balance[to] ← balance.get(to,0) + amt
    SET debts ← [v FOR v IN balance.values() IF v != 0]

    FUNCTION dfs(start):
        WHILE start < LENGTH(debts) AND debts[start] == 0:
            start ← start + 1
        IF start == LENGTH(debts): RETURN 0
        SET minTxns ← INFINITY
        FOR i FROM start+1 TO LENGTH(debts)-1:
            IF debts[i] * debts[start] < 0:   // opposite signs
                SET debts[i] ← debts[i] + debts[start]
                SET minTxns ← MIN(minTxns, 1 + dfs(start+1))
                SET debts[i] ← debts[i] - debts[start]   // backtrack
                IF debts[i] + debts[start] == 0: BREAK   // optimal pruning
        RETURN minTxns

    RETURN dfs(0)
```

## Walkthrough
Consider `transactions = [[0,1,10],[2,0,5]]`.
1. Balances: 0 → -5, 1 → +10, 2 → -5.
2. `debts = [-5, 10, -5]`.
3. `dfs(0)`: try settling debt[0] (-5) with debt[1] (+10) → debt[1]=5, recurse `dfs(1)`.
4. `dfs(1)`: settle debt[1] (5) with debt[2] (-5) → debt[2]=0, recurse `dfs(2)` returns 0.
5. Total transactions = 2.

## Complexity Analysis
- **Time:** O(n!) in the worst case due to backtracking over `k` non‑zero debts (k ≤ 12 in practice). Pruning reduces average time.
- **Space:** O(k) for the `debts` list and recursion stack.

## Follow‑Up Questions
1. How would you adapt the algorithm if each transaction had a cost proportional to the amount transferred?
2. Can the problem be approximated with a greedy algorithm that runs in polynomial time?
3. How would you extend the solution to handle dynamic addition of new transactions?

## Key Takeaway
Transform the problem into settling net balances and use backtracking to pair opposite‑sign debts, pruning aggressively to find the minimal number of transactions.
