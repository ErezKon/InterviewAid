# 3320. Count The Number of Winning Sequences

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-the-number-of-winning-sequences](https://leetcode.com/problems/count-the-number-of-winning-sequences)
**Companies:** Google

---

## Problem Description

Alice plays a sequence of creatures (F/W/E). Bob must choose a sequence (no two consecutive same) to maximize his score vs Alice (rock-paper-scissors style). Count Bob's winning sequences modulo `10^9 + 7`.

---

## Key Insight

DP with state `(round, score_diff, last_choice)`. Score diff ranges from `-n` to `n`. Bob wins if final score > 0. The "no consecutive same" constraint limits transitions. Offset the score diff for array indexing.

---

## Approach

```
FUNCTION countWinningSequences(s):
    MOD = 10^9 + 7
    n = LENGTH(s)
    // dp[i][diff][last] = ways for Bob to reach score diff after round i
    // with last move = last (0=F, 1=W, 2=E)
    // diff offset by n to handle negatives

    dp = [[[0]*3 for _ in range(2*n+1)] for _ in range(n)]
    // Initialize round 0
    FOR bob_choice IN [F, W, E]:
        delta = score(bob_choice, s[0])
        dp[0][n + delta][bob_choice] += 1

    FOR i ← 1 TO n-1:
        FOR diff ← 0 TO 2*n:
            FOR last ← 0 TO 2:
                IF dp[i-1][diff][last] == 0: CONTINUE
                FOR choice ← 0 TO 2:
                    IF choice == last: CONTINUE
                    newDiff = diff + score(choice, s[i])
                    dp[i][newDiff][choice] += dp[i-1][diff][last]

    RETURN SUM(dp[n-1][diff][last] for diff > n, all last) % MOD
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n² × 9) — n rounds × 2n+1 diffs × 3 last × 3 choices |
| **Space** | O(n × 3) with rolling array |

---

## Key Takeaway

> **Game sequence DP with score tracking: state = (round, score_diff, last_move). The no-consecutive constraint limits transitions to 2 options per round. Offset negative scores for array indexing.**
