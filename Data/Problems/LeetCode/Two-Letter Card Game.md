# 3664. Two-Letter Card Game

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/two-letter-card-game](https://leetcode.com/problems/two-letter-card-game)
**Companies:** Amazon, Google

---

## Problem Description

> *Note: statement verified via doocs/leetcode. The Approach/Walkthrough below solve an invented two-player game. Correct idea: only cards containing `x` matter — split them into `"xx"`, `"x?"` (grouped by the other letter) and `"?x"` (grouped by the other letter). Within one side, two cards pair iff their other letters differ, so a side with total `s` and largest group `m` yields `min(⌊s/2⌋, s − m)` pairs; each `"xx"` card can pair with any leftover `"x?"`/`"?x"` card. Enumerate how the `"xx"` cards are used (or greedily match them to leftovers) and take the maximum. O(n + 10²).*

You are given a deck of cards represented by a string array `cards`, and each card displays two lowercase letters.

You are also given a letter `x`. You play a game with the following rules:

- Start with 0 points.
- On each turn, you must find two **compatible** cards from the deck that both contain the letter `x` in any position.
- Remove the pair of cards and earn **1 point**.
- The game ends when you can no longer find a pair of compatible cards.

Return the **maximum** number of points you can gain with optimal play.

Two cards are **compatible** if the strings differ in **exactly** 1 position.

**Constraints:**
- `2 <= cards.length <= 10^5`
- `cards[i].length == 2`
- Each `cards[i]` is composed of only lowercase English letters between `'a'` and `'j'`.
- `x` is a lowercase English letter between `'a'` and `'j'`.

## Examples

**Example 1:**
```
Input: cards = ["aa","ab","ba","ac"], x = "a"
Output: 2
Explanation:
- On the first turn, select and remove cards "ab" and "ac", which are compatible because they differ at only index 1.
- On the second turn, select and remove cards "aa" and "ba", which are compatible because they differ at only index 0.
Because there are no more compatible pairs, the total score is 2.
```

**Example 2:**
```
Input: cards = ["aa","ab","ba"], x = "a"
Output: 1
Explanation:
- On the first turn, select and remove cards "aa" and "ba".
Because there are no more compatible pairs, the total score is 1.
```

**Example 3:**
```
Input: cards = ["aa","ab","ba","ac"], x = "b"
Output: 0
Explanation: The only cards that contain the character 'b' are "ab" and "ba". However, they differ in both indices, so they are not compatible. Thus, the output is 0.
```

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
3. What is the complexity if the number of cards is large (≥ 20) – can you use alpha‑beta pruning?

## Key Takeaway
Representing each turn as a choice among remaining cards and orientations, and memoizing results for each subset, transforms the game into a tractable minimax problem despite exponential possibilities.
