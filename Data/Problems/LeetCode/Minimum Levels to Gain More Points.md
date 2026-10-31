# 3096. Minimum Levels to Gain More Points

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-levels-to-gain-more-points](https://leetcode.com/problems/minimum-levels-to-gain-more-points)
**Companies:** Ibm

---

## Problem Description

You are given a binary array `possible` of length `n`.

Alice and Bob are playing a game that consists of `n` levels. Some of the levels in the game are **impossible** to clear while others can **always** be cleared. In particular, if `possible[i] == 0`, then the `i^th` level is **impossible** to clear for **both** the players. A player gains `1` point on clearing a level and loses `1` point if the player fails to clear it.

At the start of the game, Alice will play some levels in the **given order** starting from the `0^th` level, after which Bob will play for the rest of the levels.

Alice wants to know the **minimum** number of levels she should play to gain more points than Bob, if both players play optimally to **maximize** their points.

Return *the **minimum** number of levels Alice should play to gain more points*. *If this is **not** possible, return* `-1`.

**Note** that each player must play at least `1` level.

**Constraints:**
- `2 <= n == possible.length <= 10^5`
- `possible[i]` is either `0` or `1`.

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

**Example 1:**
```
Input: possible = [1,0,1,0]
Output: 1
Explanation: Let's look at all the levels that Alice can play up to:
- If Alice plays only level 0 and Bob plays the rest of the levels, Alice has 1 point, while Bob has -1 + 1 - 1 = -1 point.
- If Alice plays till level 1 and Bob plays the rest of the levels, Alice has 1 - 1 = 0 points, while Bob has 1 - 1 = 0 points.
- If Alice plays till level 2 and Bob plays the rest of the levels, Alice has 1 - 1 + 1 = 1 point, while Bob has -1 point.
Alice must play a minimum of 1 level to gain more points.
```

**Example 2:**
```
Input: possible = [1,1,1,1,1]
Output: 3
Explanation: Let's look at all the levels that Alice can play up to:
- If Alice plays only level 0 and Bob plays the rest of the levels, Alice has 1 point, while Bob has 4 points.
- If Alice plays till level 1 and Bob plays the rest of the levels, Alice has 2 points, while Bob has 3 points.
- If Alice plays till level 2 and Bob plays the rest of the levels, Alice has 3 points, while Bob has 2 points.
- If Alice plays till level 3 and Bob plays the rest of the levels, Alice has 4 points, while Bob has 1 point.
Alice must play a minimum of 3 levels to gain more points.
```

**Example 3:**
```
Input: possible = [0,0]
Output: -1
Explanation: The only possible way is for both players to play 1 level each. Alice plays level 0 and loses 1 point. Bob plays level 1 and loses 1 point. As both players have equal points, Alice can't gain more points than Bob.
```

## Walkthrough

Consider `possible = [1,0,1,0,1]`:

1. Compute total score: `+1 -1 +1 -1 +1 = +1`.
2. Iterate prefixes:
   - i=0: prefix `+1`; remaining score `0`. `+1 > 0` → condition satisfied, return `1`? Actually remaining score = total - prefix = 0, so Player 1 leads after first level. The algorithm would return `1`.
   - If not satisfied, continue.
3. The earliest index where `2 * prefix > total` yields the answer.

## Complexity Analysis

| Time | Space |
|------|-------|
| O(n) | O(1) |

## Follow-Up Questions

* How would the solution change if levels could have arbitrary integer scores instead of binary values?
* Can you extend the approach to return the actual set of levels Player 1 should play rather than just the count?
* What if both players could choose any subset of levels (not necessarily contiguous) to maximize their scores?

## Key Takeaway

> Convert each level to `+1`/`-1` and use a prefix sum. Player 1 needs the smallest prefix where `2 * prefix > total`.
