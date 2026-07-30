# 292. Nim Game

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/nim-game](https://leetcode.com/problems/nim-game)
**Companies:** Adobe, Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description
Given a pile of `n` stones, two players take turns removing 1 to 3 stones. The player who removes the last stone wins. Determine whether the first player can force a win assuming both play optimally.

## Examples
| n | First player wins |
|---|-------------------|
| 1 | ✅ Yes (take 1) |
| 4 | ❌ No (any move leaves a multiple of 4) |
| 7 | ✅ Yes (remove 3, leaving 4) |

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
