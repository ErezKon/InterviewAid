# 3154. Find Number of Ways to Reach the K-th Stair

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-number-of-ways-to-reach-the-k-th-stair](https://leetcode.com/problems/find-number-of-ways-to-reach-the-k-stair)
**Companies:** Amazon

---

## Problem Description
Given a staircase with `K` steps, you start at step `0`. At each move you may climb either `1` or `2` steps. Compute the number of distinct sequences of moves that land exactly on the `K`‑th step. Return the answer modulo `10^9 + 7`.

## Examples
| Input | Output | Explanation |
|-------|--------|-------------|
| `K = 3` | `3` | The possible sequences are `[1,1,1]`, `[1,2]`, `[2,1]`. |
| `K = 4` | `5` | Sequences: `[1,1,1,1]`, `[1,1,2]`, `[1,2,1]`, `[2,1,1]`, `[2,2]`. |

## Approach
The problem follows a classic Fibonacci‑like recurrence: `ways[i] = ways[i‑1] + ways[i‑2]`. Use dynamic programming with O(K) time and O(1) space by keeping only the last two values.

```text
FUNCTION countWays(K):
    IF K == 0: RETURN 1
    SET a ← 1          // ways for step 0
    SET b ← 1          // ways for step 1
    FOR i ← 2 TO K:
        SET c ← (a + b) MOD 1_000_000_007
        SET a ← b
        SET b ← c
    RETURN b
```

## Walkthrough
Consider `K = 4`:
| i | a (ways[i‑2]) | b (ways[i‑1]) | c = a+b (ways[i]) |
|---|--------------|--------------|-------------------|
| 2 | 1 | 1 | 2 |
| 3 | 1 | 2 | 3 |
| 4 | 2 | 3 | 5 |
The final `b` after the loop is `5`, the answer.

## Complexity Analysis
- **Time:** O(K) – one iteration per stair.
- **Space:** O(1) – only three integer variables.

## Follow‑Up Questions
1. What if you can climb up to `m` steps at a time?
2. How would you handle very large `K` (e.g., `10^18`)?
3. Can you compute the answer using matrix exponentiation for faster queries?

## Key Takeaway
The number of ways to reach the K‑th stair follows a simple Fibonacci recurrence, allowing an O(K) time and O(1) space solution.
