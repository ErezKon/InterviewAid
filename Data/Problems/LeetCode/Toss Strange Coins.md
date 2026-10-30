# 1230. Toss Strange Coins

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/toss-strange-coins](https://leetcode.com/problems/toss-strange-coins)
**Companies:** Twitch

---

## Problem Description

> *Note: premium problem (statement checked against the official text with verify.py). The Approach/Walkthrough below solve an invented harmonic-series problem. Correct idea: DP over coins — `dp[j]` = probability of exactly `j` heads so far; for each coin `p`, update `j` from high to low: `dp[j] = dp[j]·(1−p) + dp[j−1]·p`. Answer `dp[target]`. O(n·target).*

You have some coins. The `i`-th coin has a probability `prob[i]` of facing heads when tossed.

Return the probability that the number of coins facing heads equals `target` if you toss every coin exactly once.

**Constraints:**
- `1 <= prob.length <= 1000`
- `0 <= prob[i] <= 1`
- `0 <= target <= prob.length`
- Answers will be accepted as correct if they are within `10^-5` of the correct answer.

## Examples

**Example 1:**
```
Input: prob = [0.4], target = 1
Output: 0.40000
```

**Example 2:**
```
Input: prob = [0.5,0.5,0.5,0.5,0.5], target = 0
Output: 0.03125
```

## Approach
Each toss removes each remaining coin with probability `1/2`. The expected number of tosses for `k` coins equals `1 + 1/2 + 1/3 + … + 1/k`, i.e., the `k`‑th harmonic number `H_k`. Compute the sum iteratively.

```text
FUNCTION tossStrangeCoins(n):
    SET expected ← 0.0
    FOR i FROM 1 TO n:
        SET expected ← expected + 1.0 / i
    RETURN expected
```

## Walkthrough
For `n = 3`:
| i | term | cumulative |
|---|------|------------|
| 1 | 1/1 = 1.0 | 1.0 |
| 2 | 1/2 = 0.5 | 1.5 |
| 3 | 1/3 ≈ 0.333 | 1.833 |
Result ≈ 1.833.

## Complexity Analysis
*Time*: O(n) – single loop.
*Space*: O(1).

## Follow‑Up Questions
1. How would the expectation change if the removal probability per toss were `p` instead of `1/2`?
2. Can you derive a closed‑form approximation for large `n` using the natural logarithm?
3. What is the variance of the number of tosses?

## Key Takeaway
The expected toss count equals the harmonic number `H_n`, computed by summing reciprocals from 1 to `n`.
