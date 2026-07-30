# 2038. Remove Colored Pieces if Both Neighbors are the Same Color

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/remove-colored-pieces-if-both-neighbors-are-the-same-color](https://leetcode.com/problems/remove-colored-pieces-if-both-neighbors-are-the-same-color)
**Companies:** Ibm, Mathworks, Unity, Yelp

---

## Problem Description
Two players, Alice and Bob, take turns removing a piece from a line of colored pieces. A piece can be removed only if both its immediate neighbors have the same color as the piece itself. Alice moves first. Return `true` if Alice can guarantee a win assuming both play optimally, otherwise return `false`.

## Examples
**Example 1**
```
Input: colors = "AAABABB"
Output: true
Explanation: Alice can remove the middle 'A' (index 3) because its neighbors are both 'A'. After removal the string becomes "AABABB" and Bob has no valid move.
```
**Example 2**
```
Input: colors = "ABAB"
Output: false
Explanation: No piece has two identical neighbors, so Alice cannot make a move and loses.
```

## Approach
The game reduces to counting the number of removable pieces for each player. A piece is removable if it and its two neighbors share the same color. The players simply remove any such piece; the order does not affect the total count. Alice wins if she has more removable pieces than Bob.

```text
FUNCTION winnerOfGame(colors):
    a ← 0; b ← 0
    FOR i ← 1 TO LENGTH(colors) - 2:
        IF colors[i-1] = colors[i] = colors[i+1]:
            IF colors[i] = 'A': a ← a + 1
            ELSE: b ← b + 1
    RETURN a > b
```

## Walkthrough
For `colors = "AAABABB"`:
| Index | Triplet | Removable? | Counter |
|-------|---------|------------|---------|
| 1     | A A A   | Yes (A)    | a=1     |
| 2     | A A B   | No         | —       |
| 3     | A B A   | No         | —       |
| 4     | B A B   | No         | —       |
| 5     | A B B   | No         | —       |
Only one removable piece belonging to Alice, so `a > b`.

## Complexity Analysis
Time: `O(n)` where `n` is the length of the string.
Space: `O(1)`.

## Follow-Up Questions
1. How would the solution change if a piece could be removed when at least one neighbor matches its color?
2. Can you extend the game to a circular arrangement of pieces?
3. What is the outcome if both players can remove any piece (no neighbor condition) – how does optimal play affect the result?

## Key Takeaway
The game outcome depends solely on the count of removable pieces for each color; the optimal strategy is simply to compare these counts.
