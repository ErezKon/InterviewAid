# 914. X of a Kind in a Deck of Cards

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/x-of-a-kind-in-a-deck-of-cards](https://leetcode.com/problems/x-of-a-kind-in-a-deck-of-cards)
**Companies:** Google, Meta

---

## Problem Description
Given an integer array `deck` representing a deck of cards, return the largest integer `X` such that the deck can be partitioned into groups of exactly `X` cards, where each group contains cards of the same integer value. If no such `X` exists, return `-1`.

## Examples
**Example 1:**
Input: `deck = [1,2,3,4,4,3,2,1]`
Output: `2`
Explanation: The deck can be split into groups `{1,1}`, `{2,2}`, `{3,3}`, `{4,4}`.

**Example 2:**
Input: `deck = [1,1,1,2,2,2,3,3]`
Output: `-1`
Explanation: No integer `X > 1` divides all card frequencies.

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
3. Can the algorithm be adapted for multi‑set grouping where groups may contain multiple distinct values?

## Key Takeaway
The problem reduces to finding the GCD of card frequencies; the GCD determines the largest uniform group size possible.
