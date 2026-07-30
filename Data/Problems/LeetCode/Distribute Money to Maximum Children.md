# 2591. Distribute Money to Maximum Children

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/distribute-money-to-maximum-children](https://leetcode.com/problems/distribute-money-to-maximum-children)
**Companies:** Apple, Google, Gusto, Zendesk

---

## Problem Description

Distribute `money` dollars among `children` kids. Each child must get at least 1 dollar. No child can get exactly 4 dollars. Maximize the number of children receiving exactly **8 dollars**. Return -1 if impossible (money < children).

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

| money | children | Expected Output |
|-------|----------|-----------------|
| 16    | 2        | 2 |
| 20    | 3        | 2 |
| 4     | 5        | -1 |

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