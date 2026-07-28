# 3096. Minimum Levels to Gain More Points

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-levels-to-gain-more-points](https://leetcode.com/problems/minimum-levels-to-gain-more-points)
**Companies:** Ibm

---

## Problem Description

Two players play levels in order. Player 1 plays first `i` levels, Player 2 plays the rest. Each level gives +1 (if possible[j]=1) or -1 (if possible[j]=0). Return the **minimum** levels Player 1 must play to have **strictly more** points than Player 2, or -1 if impossible.

## Approach

**Prefix Sum — O(n)** ✅

```text
FUNCTION minimumLevels(possible):
    // Convert each level to score: +1 for 1, -1 for 0
    total ← 0
    FOR val IN possible:
        IF val == 1:
            total ← total + 1
        ELSE:
            total ← total - 1
    prefix ← 0
    FOR i ← 0 TO LEN(possible) - 2:   // Player 1 must play at least one level, Player 2 at least one
        IF possible[i] == 1:
            prefix ← prefix + 1
        ELSE:
            prefix ← prefix - 1
        IF prefix > total - prefix:
            RETURN i + 1
    RETURN -1
```

## Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `[1,0,1,0,1]` | `2` | After first two levels Player 1 has score `+0` (1‑1), Player 2 has `+1` (remaining). Not enough. After three levels Player 1 score `+1`, Player 2 `+0` → Player 1 leads. Minimum `i=3`? Actually algorithm returns `3`. |
| `[0,0,1]` | `-1` | No split gives Player 1 a strict lead.
| `[1,1,0,0]` | `1` | After first level Player 1 score `+1`, Player 2 score `0` (remaining `+1‑0‑0`). Player 1 already leads.

## Walkthrough

Consider `possible = [1,0,1,0,1]`:

1. Compute total score: `+1 -1 +1 -1 +1 = +1`.
2. Iterate prefixes:
   - i=0: prefix `+1`; remaining score `0`. `+1 > 0` → condition satisfied, return `1`? Actually remaining score = total - prefix = 0, so Player 1 leads after first level. The algorithm would return `1`.
   - If not satisfied, continue.
3. The earliest index where `2 * prefix > total` yields the answer.

## Complexity Analysis

| Time | Space |
|------|-------|
| O(n) | O(1) |

## Follow-Up Questions

* How would the solution change if levels could have arbitrary integer scores instead of binary values?
* Can you extend the approach to return the actual set of levels Player 1 should play rather than just the count?
* What if both players could choose any subset of levels (not necessarily contiguous) to maximize their scores?

## Key Takeaway

> Convert each level to `+1`/`-1` and use a prefix sum. Player 1 needs the smallest prefix where `2 * prefix > total`.
