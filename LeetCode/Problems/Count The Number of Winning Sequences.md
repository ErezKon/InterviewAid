# 3320. Count The Number of Winning Sequences

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-the-number-of-winning-sequences](https://leetcode.com/problems/count-the-number-of-winning-sequences)
**Companies:** Google

---

## Problem Description

Alice plays a sequence of creatures (F/W/E). Bob must choose a sequence (no two consecutive same) to maximize his score vs Alice (rock-paper-scissors style). Count Bob's winning sequences modulo `10^9 + 7`.

---

## Examples

**Example 1:**
```
Input: s = "FWE"
Output: 5
Explanation: Bob can choose sequences such as "WFE", "EWF", etc., that beat Alice's sequence.
```

**Example 2:**
```
Input: s = "FFF"
Output: 0
Explanation: No valid Bob sequence can avoid consecutive same moves and win.
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

> **Game sequence DP with score tracking: state = (round, score_diff, last_move). The no‑consecutive constraint limits transitions to 2 options per round. Offset negative scores for array indexing.**