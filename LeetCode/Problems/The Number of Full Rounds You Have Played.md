# 1904. The Number of Full Rounds You Have Played

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/the-number-of-full-rounds-you-have-played](https://leetcode.com/problems/the-number-of-full-rounds-you-have-played)
**Companies:** Microsoft

---

## Problem Description
Given the total number of minutes `n` a player has played a game that consists of 5‑minute rounds, return the number of complete rounds that have been finished. A round is considered complete only if all 5 minutes have elapsed.

## Examples
| n | fullRounds |
|---|------------|
| 12 | 2 |
| 5  | 1 |
| 4  | 0 |
*Explanation:* 12 minutes contain two full 5‑minute rounds (10 minutes) with 2 minutes left over. 5 minutes is exactly one full round. 4 minutes is insufficient for a full round.

## Approach
Use integer division to compute how many times 5 fits into `n`. The floor division automatically discards any remainder.

## Walkthrough
1. Input `n = 12`.
2. Compute `fullRounds ← n DIV 5` (integer division).
3. `fullRounds = 12 DIV 5 = 2`.
4. Return `2`.

## Complexity Analysis
Time complexity is `O(1)` because only a single arithmetic operation is performed. Space complexity is `O(1)`.

## Follow‑Up Questions
* How would you handle a variable round length instead of a fixed 5 minutes?
* If the game had overtime rules where a partial round counts after a certain threshold, how would the calculation change?
* How to compute the total minutes spent in incomplete rounds across multiple games?

## Key Takeaway
The number of complete rounds is simply the integer division of total minutes by the round length, discarding any leftover minutes.