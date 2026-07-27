# 2591. Distribute Money to Maximum Children

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/distribute-money-to-maximum-children](https://leetcode.com/problems/distribute-money-to-maximum-children)
**Companies:** Apple, Google, Gusto, Zendesk

---

## Problem Description

Distribute `money` dollars among `children` kids. Each child must get at least 1 dollar. No child can get exactly 4 dollars. Maximize the number of children receiving exactly **8 dollars**. Return -1 if impossible (money < children).

---

## Key Insight

> Give everyone 1 dollar first (minimum). Then greedily distribute 7 more to as many children as possible (to make them receive 8). Handle edge cases: leftover money forcing someone to get 4, or excess money with no one left to absorb it.

---

## Approach: Greedy ✅

```
FUNCTION distMoney(money, children):
    IF money < children: RETURN -1
    money -= children    // give 1 to each
    eights = MIN(money // 7, children)
    money -= eights * 7
    // Edge cases
    IF eights == children AND money > 0: eights -= 1
    IF eights == children - 1 AND money == 3: eights -= 1
    RETURN eights
```

**Edge cases:**
- All children get 8 but money left → must give extra to someone, so one fewer "8-child"
- Last remaining child would get exactly 4 (1+3) → forbidden, sacrifice one "8-child"

---

## Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| **Time** | O(1) | Arithmetic only |
| **Space** | O(1) | No extra storage |

---

## Key Takeaway

> **Greedy distribution with forbidden values — give the minimum first, then maximize the target allocation. Handle edge cases where leftover forces a forbidden value.**
