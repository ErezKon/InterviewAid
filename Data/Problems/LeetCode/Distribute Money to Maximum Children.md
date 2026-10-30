# 2591. Distribute Money to Maximum Children

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/distribute-money-to-maximum-children](https://leetcode.com/problems/distribute-money-to-maximum-children)
**Companies:** Apple, Google, Gusto, Zendesk

---

## Problem Description

You are given an integer `money` denoting the amount of money (in dollars) that you have and another integer `children` denoting the number of children that you **must** distribute the money to.

You have to distribute the money according to the following rules:

- All money must be distributed.
- Everyone must receive at least `1` dollar.
- Nobody receives `4` dollars.

Return *the **maximum** number of children who may receive **exactly*** `8` *dollars if you distribute the money according to the aforementioned rules*. If there is no way to distribute the money, return `-1`.

**Constraints:**
- `1 <= money <= 200`
- `2 <= children <= 30`

---

## Approach: Greedy ✅

```text
FUNCTION distMoney(money, children):
    // If not enough money for minimum 1 per child
    IF money < children:
        RETURN -1
    // Give each child 1 dollar first
    SET remaining ← money - children
    // Each child that gets 8 dollars needs 7 extra dollars
    SET eights ← MIN(remaining / 7, children)
    SET remaining ← remaining - eights * 7
    // Edge case: all children get 8 dollars but leftover money forces a 4-dollar child
    IF eights == children AND remaining > 0:
        SET eights ← eights - 1
    // Edge case: one child would end up with exactly 4 dollars
    IF eights == children - 1 AND remaining == 3:
        SET eights ← eights - 1
    RETURN eights
```

---

## Examples

```
Example 1:
  Input: money = 20, children = 3
  Output: 1
  Explanation:
  The maximum number of children with 8 dollars will be 1. One of the ways to distribute the money is:
  - 8 dollars to the first child.
  - 9 dollars to the second child.
  - 3 dollars to the third child.
  It can be proven that no distribution exists such that number of children getting 8 dollars is greater than 1.
```

```
Example 2:
  Input: money = 16, children = 2
  Output: 2
  Explanation: Each child can be given 8 dollars.
```

---

## Walkthrough

**Example 1:** `money = 16`, `children = 2`

| Step | Action | Remaining Money | Children with 8$ |
|------|--------|----------------|-------------------|
| 1 | Minimum 1$ each → give 2$ | 14 | 0 |
| 2 | Allocate 7$ extra per child → can give to both (14/7 = 2) | 0 | 2 |
| 3 | No edge cases triggered | 0 | 2 |

Result: 2 children receive 8 dollars.

---

## Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| **Time** | O(1) | Simple arithmetic |
| **Space** | O(1) | No extra data structures |

---

## Follow-Up Questions

1. How would the solution change if the forbidden amount were a different value, e.g., 5 dollars?
2. Can you extend the algorithm to maximize children receiving a different target amount, such as 10 dollars?
3. What if the distribution must be done in a streaming fashion where children arrive one by one?

---

## Key Takeaway

> **Greedy distribution with forbidden values — give the minimum first, then maximize the target allocation while handling edge cases that force a forbidden amount.**