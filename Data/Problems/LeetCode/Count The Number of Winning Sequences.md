# 3320. Count The Number of Winning Sequences

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-the-number-of-winning-sequences](https://leetcode.com/problems/count-the-number-of-winning-sequences)
**Companies:** Google

---

## Problem Description

Alice and Bob are playing a fantasy battle game consisting of `n` rounds where they summon one of three magical creatures each round: a Fire Dragon, a Water Serpent, or an Earth Golem. In each round, players **simultaneously** summon their creature and are awarded points as follows:

- If one player summons a Fire Dragon and the other summons an Earth Golem, the player who summoned the **Fire Dragon** is awarded a point.
- If one player summons a Water Serpent and the other summons a Fire Dragon, the player who summoned the **Water Serpent** is awarded a point.
- If one player summons an Earth Golem and the other summons a Water Serpent, the player who summoned the **Earth Golem** is awarded a point.
- If both players summon the same creature, no player is awarded a point.

You are given a string `s` consisting of `n` characters `'F'`, `'W'`, and `'E'`, representing the sequence of creatures Alice will summon in each round:

- If `s[i] == 'F'`, Alice summons a Fire Dragon.
- If `s[i] == 'W'`, Alice summons a Water Serpent.
- If `s[i] == 'E'`, Alice summons an Earth Golem.

Bob's sequence of moves is unknown, but it is guaranteed that Bob will never summon the same creature in two consecutive rounds. Bob *beats* Alice if the total number of points awarded to Bob after `n` rounds is **strictly greater** than the points awarded to Alice.

Return the number of distinct sequences Bob can use to beat Alice.

Since the answer may be very large, return it **modulo** `10^9 + 7`.

**Constraints:**
- `1 <= s.length <= 1000`
- `s[i]` is one of `'F'`, `'W'`, or `'E'`.

---

## Examples

```
Example 1:
  Input: s = "FFF"
  Output: 3
  Explanation: Bob can beat Alice by making one of the following sequences of moves: "WFW", "FWF", or "WEW".
  Note that other winning sequences like "WWE" or "EWW" are invalid since Bob cannot make the same move twice in a row.
```

```
Example 2:
  Input: s = "FWEFW"
  Output: 18
  Explanation: Bob can beat Alice by making one of the following sequences of moves:
  "FWFWF", "FWFWE", "FWEFE", "FWEWE", "FEFWF", "FEFWE", "FEFEW", "FEWFE", "WFEFE", "WFEWE",
  "WEFWF", "WEFWE", "WEFEF", "WEFEW", "WEWFW", "WEWFE", "EWFWE", or "EWEWE".
```

---

## Key Insight

DP with state `(round, score_diff, last_choice)`. Score diff ranges from `-n` to `n`. Bob wins if final score > 0. The "no consecutive same" constraint limits transitions. Offset the score diff for array indexing.

---

## Approach

```text
FUNCTION countWinningSequences(s):
    MOD ← 10^9 + 7
    n ← LENGTH(s)
    // dp[i][diff][last] = ways for Bob to reach score diff after round i
    // diff offset by n to handle negatives
    dp ← ARRAY[n][2*n+1][3] INITIALIZED TO 0
    FOR bob_choice IN [F, W, E]:
        delta ← score(bob_choice, s[0])
        dp[0][n + delta][bob_choice] ← dp[0][n + delta][bob_choice] + 1
    FOR i ← 1 TO n-1:
        FOR diff ← 0 TO 2*n:
            FOR last ← 0 TO 2:
                IF dp[i-1][diff][last] = 0: CONTINUE
                FOR choice ← 0 TO 2:
                    IF choice = last: CONTINUE
                    newDiff ← diff + score(choice, s[i])
                    dp[i][newDiff][choice] ← dp[i][newDiff][choice] + dp[i-1][diff][last]
    RETURN SUM(dp[n-1][diff][last] FOR diff > n, last ← 0 TO 2) MOD MOD
```

---

## Walkthrough

Consider `s = "FWE"` (n = 3).
| Round | Bob Choice | Alice | Score Δ | Cumulative Diff | Last Move |
|-------|------------|-------|--------|----------------|----------|
| 0     | W          | F     | +1     | +1 (offset 4)  | W        |
| 1     | E          | W     | +1     | +2 (offset 5)  | E        |
| 2     | F          | E     | +1     | +3 (offset 6)  | F        |
Bob ends with positive diff → winning sequence.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n² × 9) — n rounds × (2n+1) diffs × 3 last × up to 2 choices |
| **Space** | O(n × 3) with rolling array |

---

## Follow-Up Questions

1. How would the solution change if Bob could repeat the same move consecutively?
2. Can the DP be optimized to O(n) time using combinatorial formulas?
3. Extend the problem to more than three creature types.

---

## Key Takeaway

> **Game sequence DP with score tracking: state = (round, score_diff, last_move). The no-consecutive constraint limits transitions to 2 options per round. Offset negative scores for array indexing.**