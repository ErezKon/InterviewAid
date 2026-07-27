# 2241. Design an ATM Machine

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-an-atm-machine](https://leetcode.com/problems/design-an-atm-machine)
**Companies:** Google, Yandex

---

## Problem Description

Design an ATM with denominations [20, 50, 100, 200, 500]. Support `deposit(banknotesCount)` and `withdraw(amount)` using greedy largest-first.

---

## Approach

```
CLASS ATM:
    denoms = [20, 50, 100, 200, 500]
    counts = [0] * 5

    FUNCTION deposit(banknotesCount):
        FOR i ← 0 TO 4: counts[i] += banknotesCount[i]

    FUNCTION withdraw(amount):
        taken = [0] * 5
        FOR i ← 4 DOWN TO 0:
            taken[i] = MIN(counts[i], amount // denoms[i])
            amount -= taken[i] * denoms[i]
        IF amount > 0: RETURN [-1]
        FOR i ← 0 TO 4: counts[i] -= taken[i]
        RETURN taken
```

---

## Key Takeaway

> **Greedy withdrawal from largest denomination first. If amount can't reach zero, return failure without modifying state. Simulate before committing.**
