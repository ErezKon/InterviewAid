# 914. X of a Kind in a Deck of Cards

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/x-of-a-kind-in-a-deck-of-cards](https://leetcode.com/problems/x-of-a-kind-in-a-deck-of-cards)
**Companies:** Google, Meta

---

## Problem Description

You are given an integer array `deck` where `deck[i]` represents the number written on the `i^th` card.

Partition the cards into **one or more groups** such that:

- Each group has **exactly** `x` cards where `x > 1`, and
- All the cards in one group have the same integer written on them.

Return `true`* if such partition is possible, or *`false`* otherwise*.

**Constraints:**
- `1 <= deck.length <= 10^4`
- `0 <= deck[i] < 10^4`

## Examples

**Example 1:**
```
Input: deck = [1,2,3,4,4,3,2,1]
Output: true
Explanation: Possible partition [1,1],[2,2],[3,3],[4,4].
```

**Example 2:**
```
Input: deck = [1,1,1,2,2,2,3,3]
Output: false
Explanation: No possible partition.
```

## Approach
1. Count the frequency of each distinct card.
2. Compute the greatest common divisor (GCD) of all frequencies.
3. If the GCD is at least 2, return it; otherwise return `-1`.

```text
FUNCTION hasGroupsSizeX(deck):
    freqMap ← MAP()
    FOR card IN deck:
        freqMap[card] ← freqMap.get(card, 0) + 1
    g ← 0
    FOR count IN freqMap.values():
        g ← GCD(g, count)
    IF g ≥ 2:
        RETURN g
    RETURN -1
```

## Walkthrough
| Card | Frequency |
|------|-----------|
| 1    | 2 |
| 2    | 2 |
| 3    | 2 |
| 4    | 2 |
GCD of (2,2,2,2) = 2 → return 2.

## Complexity Analysis
Time: O(N) to count frequencies and compute GCD.
Space: O(U) where U is the number of unique card values.

## Follow-Up Questions
1. How would you modify the solution to return all possible valid group sizes?
2. What if the deck size is extremely large and cannot fit in memory?
3. Can the algorithm be adapted for multi-set grouping where groups may contain multiple distinct values?

## Key Takeaway
The problem reduces to finding the GCD of card frequencies; the GCD determines the largest uniform group size possible.
