# 2038. Remove Colored Pieces if Both Neighbors are the Same Color

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/remove-colored-pieces-if-both-neighbors-are-the-same-color](https://leetcode.com/problems/remove-colored-pieces-if-both-neighbors-are-the-same-color)
**Companies:** Ibm, Mathworks, Unity, Yelp

---

## Problem Description
There are `n` pieces arranged in a line, and each piece is colored either by `'A'` or by `'B'`. You are given a string `colors` of length `n` where `colors[i]` is the color of the `iᵗʰ` piece.

Alice and Bob are playing a game where they take **alternating turns** removing pieces from the line. In this game, Alice moves **first**.

- Alice is only allowed to remove a piece colored `'A'` if **both its neighbors** are also colored `'A'`. She is **not allowed** to remove pieces that are colored `'B'`.
- Bob is only allowed to remove a piece colored `'B'` if **both its neighbors** are also colored `'B'`. He is **not allowed** to remove pieces that are colored `'A'`.
- Alice and Bob **cannot** remove pieces from the edge of the line.
- If a player cannot make a move on their turn, that player **loses** and the other player **wins**.

Assuming Alice and Bob play optimally, return `true` *if Alice wins, or return* `false` *if Bob wins*.

**Constraints:**

- `1 <= colors.length <= 10⁵`
- `colors` consists of only the letters `'A'` and `'B'`

## Examples

```
Example 1:
  Input: colors = "AAABABB"
  Output: true
  Explanation:
    AAABABB -> AABABB
    Alice moves first.
    She removes the second 'A' from the left since that is the only 'A' whose neighbors are both 'A'.

    Now it's Bob's turn.
    Bob cannot make a move on his turn since there are no 'B's whose neighbors are both 'B'.
    Thus, Alice wins, so return true.
```

```
Example 2:
  Input: colors = "AA"
  Output: false
  Explanation:
    Alice has her turn first.
    There are only two 'A's and both are on the edge of the line, so she cannot move on her turn.
    Thus, Bob wins, so return false.
```

```
Example 3:
  Input: colors = "ABBBBBBBAAA"
  Output: false
  Explanation:
    ABBBBBBBAAA -> ABBBBBBBAA
    Alice moves first.
    Her only option is to remove the second to last 'A' from the right.

    ABBBBBBBAA -> ABBBBBBAA
    Next is Bob's turn.
    He has many options for which 'B' piece to remove. He can pick any.

    On Alice's second turn, she has no more pieces that she can remove.
    Thus, Bob wins, so return false.
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
