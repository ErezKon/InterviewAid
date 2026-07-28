# 2347. Best Poker Hand

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/best-poker-hand](https://leetcode.com/problems/best-poker-hand)
**Companies:** Amazon, Apple

---

## Problem Description

Given 5 cards (ranks and suits), return the best poker hand: "Flush" (all same suit), "Three of a Kind" (3+ same rank), "Pair" (2+ same rank), or "High Card".

---

## Examples

| cards (ranks, suits) | Output |
|----------------------|--------|
| `[13,2,3,4,5]`, `["a","a","a","a","a"]` | `"Flush"` |
| `[13,13,13,2,5]`, `["a","b","c","d","e"]` | `"Three of a Kind"` |
| `[13,13,2,5,7]`, `["a","b","c","d","e"]` | `"Pair"` |

---

## Approach

Count ranks and check suits.

```text
FUNCTION bestHand(ranks, suits):
    // If all suits identical, it's a Flush
    IF all elements in suits are equal:
        RETURN "Flush"
    // Count occurrences of each rank
    SET rankCount ← empty map
    FOR each r IN ranks:
        INCREMENT rankCount[r]
    SET maxFreq ← maximum value in rankCount
    IF maxFreq >= 3:
        RETURN "Three of a Kind"
    IF maxFreq >= 2:
        RETURN "Pair"
    RETURN "High Card"
```

---

## Walkthrough

Consider ranks `[13,13,2,5,7]` and suits `["a","b","c","d","e"]`.

| Step | Action | Result |
|------|--------|--------|
| 1 | Check suits | Not all equal → not Flush |
| 2 | Count ranks | `{13:2, 2:1, 5:1, 7:1}` |
| 3 | maxFreq = 2 | → Pair |
| 4 | Return | `"Pair"` |

---

## Complexity Analysis

| Time | Space |
|------|-------|
| O(5) → O(1) | O(1) (fixed‑size map) |

---

## Follow-Up Questions

1. How would you extend this to a full 52‑card deck with variable hand sizes?
2. Can you rank multiple hands against each other?
3. What changes are needed for Texas Hold'em where community cards are shared?

---

## Key Takeaway

> Prioritize checking for a Flush before rank counts; with only five cards all operations run in constant time.
