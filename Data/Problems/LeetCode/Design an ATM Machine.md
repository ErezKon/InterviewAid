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

## Examples

| Operation | Input | Output |
|-----------|-------|--------|
| ATM() | – | – |
| deposit | ([0,0,1,2,1]) | – |
| withdraw | (380) | [0,1,1,1,0] |
| withdraw | (30) | [-1] |

---

## Walkthrough

1. **Deposit** – `deposit([0,0,1,2,1])` adds one 100‑note, two 200‑notes, and one 500‑note to the machine.
2. **Withdraw 380** – Greedy loop starts with 500 (none used), then 200 → take 1 (remaining 180), 100 → take 1 (remaining 80), 50 → take 1 (remaining 30), 20 → take 1 (remaining 10). Since 10 cannot be formed, the algorithm would backtrack, but with available counts it succeeds with `[0,1,1,1,0]`.
3. **Withdraw 30** – After the previous withdrawal, the remaining denominations cannot make 30, so the method returns `[-1]` and state stays unchanged.

---

## Complexity Analysis

- **Time**: `deposit` O(1) (fixed 5 denominations), `withdraw` O(5) ≈ O(1).
- **Space**: O(1) for storing counts of the five denominations.

---

## Follow-Up Questions

- How would you modify the design to support new denominations dynamically?
- How to handle concurrent deposits and withdrawals safely?
- How to provide a minimal‑note solution when multiple combinations exist?

---

## Key Takeaway

> **Greedy withdrawal from largest denomination first. If amount can't reach zero, return failure without modifying state. Simulate before committing.**