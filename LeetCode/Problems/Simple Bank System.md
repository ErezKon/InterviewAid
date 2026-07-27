# 2043. Simple Bank System

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/simple-bank-system](https://leetcode.com/problems/simple-bank-system)
**Companies:** Airbnb, Amazon, Bloomberg, Capital One, Circle, Coinbase, Dropbox, Goldman Sachs, Google, Hubspot, Instacart, Meta, Okta, Oracle, Phonepe, Ramp 2, Revolut, Stripe, The Trade Desk, Uber

---

## Problem Description

Design a simple bank system that supports:
- **Transfer** money between two accounts.
- **Deposit** money into an account.
- **Withdraw** money from an account.

Each operation returns `true` if it succeeds, or `false` if the account number is invalid or funds are insufficient.

Accounts are **1-indexed**.

### Examples

**Input:**
```
["Bank", "withdraw", "transfer", "deposit", "transfer", "withdraw"]
[[[10, 100, 20, 50, 30]], [3, 10], [5, 1, 20], [5, 20], [3, 4, 15], [10, 50]]
```
**Output:** `[null, true, true, true, true, false]`

### Constraints

- `n == balance.length`
- `1 <= n, money <= 10⁵`
- `0 <= balance[i] <= 10⁹`
- At most `10⁴` calls to each function.

---

## Approach: Array-Based — O(1) per operation ✅

Direct array indexing with validation. Accounts are 1-indexed, so access `balance[account-1]`.

```
CLASS Bank:
    CONSTRUCTOR(balance):
        self.balance = balance
        self.n = len(balance)

    FUNCTION valid(account):
        RETURN 1 <= account <= n

    FUNCTION transfer(a1, a2, money):
        IF NOT valid(a1) OR NOT valid(a2): RETURN false
        IF balance[a1-1] < money: RETURN false
        balance[a1-1] -= money
        balance[a2-1] += money
        RETURN true

    FUNCTION deposit(account, money):
        IF NOT valid(account): RETURN false
        balance[account-1] += money
        RETURN true

    FUNCTION withdraw(account, money):
        IF NOT valid(account) OR balance[account-1] < money: RETURN false
        balance[account-1] -= money
        RETURN true
```

### Walkthrough

| Operation | Args | Valid? | Result | Balances |
|-----------|------|--------|--------|----------|
| Bank | [10,100,20,50,30] | — | — | [10,100,20,50,30] |
| withdraw | 3, 10 | Yes, 20≥10 | true | [10,100,10,50,30] |
| transfer | 5→1, 20 | Yes, 30≥20 | true | [30,100,10,50,10] |
| deposit | 5, 20 | Yes | true | [30,100,10,50,30] |
| transfer | 3→4, 15 | Yes, 10<15 | false | unchanged |
| withdraw | 10, 50 | acct 10 invalid | false | unchanged |

| Time | Space |
|------|-------|
| O(1) per op | O(n) |
