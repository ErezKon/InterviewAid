# 3664. Two-Letter Card Game

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/two-letter-card-game](https://leetcode.com/problems/two-letter-card-game)
**Companies:** Amazon, Google

---

## Problem Description
You are given an array `cards` where each element is a string of exactly two lowercase letters representing a card. Two players take turns picking a card from the array. When a player picks a card, they may optionally reverse the order of the two letters on that card before adding it to their hand. After all cards are taken, each player concatenates the letters on their cards in the order they were picked to form a final string. Determine whether the first player can guarantee a win by making their final string lexicographically smaller than the second player's final string, assuming both play optimally.

## Examples
**Example 1:**
Input: `cards = ["ab","ba","ac"]`
Output: `true`
Explanation: Player 1 picks "ab" (keeps as "ab"), Player 2 picks "ba" (reverses to "ab"), Player 1 picks "ac" (keeps). Final strings: P1 = "abac", P2 = "ab". P1 is lexicographically larger, but Player 1 can instead pick "ba" first and reverse it to "ab" to force a win.

**Example 2:**
Input: `cards = ["aa","bb","cc"]`
Output: `false`
Explanation: No matter how the cards are chosen or reversed, both players end up with the same multiset of letters, leading to equal final strings.

## Approach
Model the game as a turn‑based selection where each card offers two possible strings (original and reversed). Use minimax with memoization on the multiset of remaining cards and the current turn. Since each card contributes exactly two characters, the state can be represented by a bitmask of used cards. For each turn, iterate over unused cards, consider both orientations, and recursively evaluate the opponent's best response. The first player wins if any move leads to a state where the opponent cannot force a win.

## Walkthrough
| Turn | Remaining cards | Chosen card (orientation) | Resulting strings so far |
|------|----------------|---------------------------|--------------------------|
| 1 (P1) | ["ab","ba","ac"] | pick "ba" reversed → "ab" | P1 = "ab" |
| 2 (P2) | ["ab","ac"] | pick "ab" (keep) → "ab" | P2 = "ab" |
| 3 (P1) | ["ac"] | pick "ac" → "ac" | P1 = "abac" |
Final comparison: "abac" > "ab" → P1 loses, but alternative first move leads to win.

## Complexity Analysis
- **Time:** `O(2^n * n)` where `n` is the number of cards, due to exploring all subsets with memoization.
- **Space:** `O(2^n)` for the memo table storing game outcomes for each bitmask.

## Follow‑Up Questions
1. How would the solution change if cards could have more than two letters?
2. Can you design a greedy strategy that works for a restricted set of cards (e.g., already sorted)?
3. What is the complexity if the number of cards is large (≥ 20) – can you use alpha‑beta pruning?

## Key Takeaway
Representing each turn as a choice among remaining cards and orientations, and memoizing results for each subset, transforms the game into a tractable minimax problem despite exponential possibilities.
