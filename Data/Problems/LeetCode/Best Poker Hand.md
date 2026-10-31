# 2347. Best Poker Hand

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/best-poker-hand](https://leetcode.com/problems/best-poker-hand)
**Companies:** Amazon, Apple

---

## Problem Description

You are given an integer array `ranks` and a character array `suits`. You have `5` cards where the `iᵗʰ` card has a rank of `ranks[i]` and a suit of `suits[i]`.

The following are the types of **poker hands** you can make from best to worst:

- `"Flush"`: Five cards of the same suit.
- `"Three of a Kind"`: Three cards of the same rank.
- `"Pair"`: Two cards of the same rank.
- `"High Card"`: Any single card.

Return *a string representing the **best** type of **poker hand** you can make with the given cards.*

**Note** that the return values are **case-sensitive**.

**Constraints:**
- `ranks.length == suits.length == 5`
- `1 ≤ ranks[i] ≤ 13`
- `'a' ≤ suits[i] ≤ 'd'`
- No two cards have the same rank and suit.

---

## Examples

```
Example 1:
  Input: ranks = [13,2,3,1,9], suits = ["a","a","a","a","a"]
  Output: "Flush"
  Explanation: The hand with all the cards consists of 5 cards with the same suit, so we have a "Flush".

Example 2:
  Input: ranks = [4,4,2,4,4], suits = ["d","a","a","b","c"]
  Output: "Three of a Kind"
  Explanation: The hand with the first, second, and fourth card consists of 3 cards with the same rank, so we have a "Three of a Kind".
  Note that we could also make a "Pair" hand but "Three of a Kind" is a better hand.
  Also note that other cards could be used to make the "Three of a Kind" hand.

Example 3:
  Input: ranks = [10,10,2,12,9], suits = ["a","b","c","a","d"]
  Output: "Pair"
  Explanation: The hand with the first and second card consists of 2 cards with the same rank, so we have a "Pair".
  Note that we cannot make a "Flush" or a "Three of a Kind".
```

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
| O(5) → O(1) | O(1) (fixed-size map) |

---

## Follow-Up Questions

1. How would you extend this to a full 52-card deck with variable hand sizes?
2. Can you rank multiple hands against each other?
3. What changes are needed for Texas Hold'em where community cards are shared?

---

## Key Takeaway

> Prioritize checking for a Flush before rank counts; with only five cards all operations run in constant time.
