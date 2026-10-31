# 2241. Design an ATM Machine

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-an-atm-machine](https://leetcode.com/problems/design-an-atm-machine)
**Companies:** Google, Yandex

---

## Problem Description

There is an ATM machine that stores banknotes of `5` denominations: `20`, `50`, `100`, `200`, and `500` dollars. Initially the ATM is empty. The user can use the machine to deposit or withdraw any amount of money.

When withdrawing, the machine prioritizes using banknotes of **larger** values.

- For example, if you want to withdraw `$300` and there are `2` `$50` banknotes, `1` `$100` banknote, and `1` `$200` banknote, then the machine will use the `$100` and `$200` banknotes.
- However, if you try to withdraw `$600` and there are `3` `$200` banknotes and `1` `$500` banknote, then the withdraw request will be rejected because the machine will first try to use the `$500` banknote and then be unable to use banknotes to complete the remaining `$100`. Note that the machine is **not** allowed to use the `$200` banknotes instead of the `$500` banknote.

Implement the ATM class:

- `ATM()` Initializes the ATM object.
- `void deposit(int[] banknotesCount)` Deposits new banknotes in the order `$20`, `$50`, `$100`, `$200`, and `$500`.
- `int[] withdraw(int amount)` Returns an array of length `5` of the number of banknotes that will be handed to the user in the order `$20`, `$50`, `$100`, `$200`, and `$500`, and update the number of banknotes in the ATM after withdrawing. Returns `[-1]` if it is not possible (do **not** withdraw any banknotes in this case).

**Constraints:**
- `banknotesCount.length == 5`
- `0 <= banknotesCount[i] <= 10^9`
- `1 <= amount <= 10^9`
- At most `5000` calls **in total** will be made to `withdraw` and `deposit`.
- At least **one** call will be made to each function `withdraw` and `deposit`.
- Sum of `banknotesCount[i]` in all deposits doesn't exceed `10^9`.

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

```
Example 1:
  Input:
  ["ATM", "deposit", "withdraw", "deposit", "withdraw", "withdraw"]
  [[], [[0,0,1,2,1]], [600], [[0,1,0,1,1]], [600], [550]]
  Output:
  [null, null, [0,0,1,0,1], null, [-1], [0,1,0,0,1]]
  Explanation:
  ATM atm = new ATM();
  atm.deposit([0,0,1,2,1]); // Deposits 1 $100 banknote, 2 $200 banknotes, and 1 $500 banknote.
  atm.withdraw(600);        // Returns [0,0,1,0,1]. The machine uses 1 $100 banknote and 1 $500 banknote.
                            // The banknotes left over in the machine are [0,0,0,2,0].
  atm.deposit([0,1,0,1,1]); // Deposits 1 $50, $200, and $500 banknote.
                            // The banknotes in the machine are now [0,1,0,3,1].
  atm.withdraw(600);        // Returns [-1]. The machine will try to use a $500 banknote
                            // and then be unable to complete the remaining $100,
                            // so the withdraw request will be rejected.
                            // Since the request is rejected, the number of banknotes
                            // in the machine is not modified.
  atm.withdraw(550);        // Returns [0,1,0,0,1]. The machine uses 1 $50 banknote
                            // and 1 $500 banknote.
```

---

## Walkthrough

1. **Deposit** – `deposit([0,0,1,2,1])` adds one 100-note, two 200-notes, and one 500-note to the machine.
2. **Withdraw 380** – Greedy loop starts with 500 (none used), then 200 → take 1 (remaining 180), 100 → take 1 (remaining 80), 50 → take 1 (remaining 30), 20 → take 1 (remaining 10). Since 10 cannot be formed, the algorithm would backtrack, but with available counts it succeeds with `[0,1,1,1,0]`.
3. **Withdraw 30** – After the previous withdrawal, the remaining denominations cannot make 30, so the method returns `[-1]` and state stays unchanged.

---

## Complexity Analysis

- **Time**: `deposit` O(1) (fixed 5 denominations), `withdraw` O(5) ≈ O(1).
- **Space**: O(1) for storing counts of the five denominations.

---

## Follow-Up Questions

- How would you modify the design to support new denominations dynamically?
- How to handle concurrent deposits and withdrawals safely?
- How to provide a minimal-note solution when multiple combinations exist?

---

## Key Takeaway

> **Greedy withdrawal from largest denomination first. If amount can't reach zero, return failure without modifying state. Simulate before committing.**