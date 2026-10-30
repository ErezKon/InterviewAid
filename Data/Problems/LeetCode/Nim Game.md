# 292. Nim Game

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/nim-game](https://leetcode.com/problems/nim-game)
**Companies:** Adobe, Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description
You are playing the following Nim Game with your friend:

- Initially, there is a heap of stones on the table.
- You and your friend will alternate taking turns, and **you go first**.
- On each turn, the person whose turn it is will remove 1 to 3 stones from the heap.
- The one who removes the last stone is the winner.

Given `n`, the number of stones in the heap, return `true` *if you can win the game assuming both you and your friend play optimally, otherwise return* `false`.

**Constraints:**

- `1 <= n <= 2^31 - 1`

## Examples

```
Example 1:
  Input: n = 4
  Output: false
  Explanation: These are the possible outcomes:
  1. You remove 1 stone. Your friend removes 3 stones, including the last stone. Your friend wins.
  2. You remove 2 stones. Your friend removes 2 stones, including the last stone. Your friend wins.
  3. You remove 3 stones. Your friend removes the last stone. Your friend wins.
  In all outcomes, your friend wins.
```

```
Example 2:
  Input: n = 1
  Output: true
```

```
Example 3:
  Input: n = 2
  Output: true
```

## Approach
**Algorithm:** Mathematical modulo insight (Nim‑style). The losing positions are exactly multiples of 4. If `n % 4 != 0`, the first player can move to a multiple of 4 and maintain the advantage.

```text
FUNCTION canWinNim(n):
    // If n is a multiple of 4, the current player loses
    IF n MOD 4 == 0:
        RETURN FALSE
    ELSE:
        RETURN TRUE
```

## Walkthrough
Consider `n = 7`:
| Turn | Stones left | Move taken | Stones after move |
|------|-------------|------------|-------------------|
| 1 (first) | 7 | remove 3 | 4 |
| 2 (second) | 4 | any (1‑3) | 1‑3 |
| 1 (first) | ≤3 | remove remaining | 0 (win) |
The first player forces a multiple of 4 after the first move and wins.

## Complexity Analysis
- **Time:** O(1) – single modulo operation.
- **Space:** O(1) – constant extra space.

## Follow-Up Questions
- How would the solution change if players could remove up to `k` stones?
- What is the general solution for arbitrary move sets?
- Can this be extended to multiple piles (standard Nim)?

## Key Takeaway
The game reduces to a simple modulo check: any position that is a multiple of 4 is losing for the player about to move.
