# 2347. Best Poker Hand

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/best-poker-hand](https://leetcode.com/problems/best-poker-hand)
**Companies:** Amazon, Apple

---

## 1. Problem Description

Given 5 cards (ranks and suits), return the best poker hand: "Flush" (all same suit), "Three of a Kind" (3+ same rank), "Pair" (2+ same rank), or "High Card".

---

## 2. Approach: Count + Check — O(1) ✅

```
FUNCTION bestHand(ranks, suits):
    IF all suits are same: RETURN "Flush"
    count = Counter(ranks)
    IF max(count.values()) >= 3: RETURN "Three of a Kind"
    IF max(count.values()) >= 2: RETURN "Pair"
    RETURN "High Card"
```

| Time | Space |
|------|-------|
| O(1) — always 5 cards | O(1) |

---

## Key Takeaway

> Check conditions in priority order: flush first, then three-of-a-kind, then pair. With fixed 5-card input, everything is O(1).
