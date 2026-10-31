# 1230. Toss Strange Coins

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/toss-strange-coins](https://leetcode.com/problems/toss-strange-coins)
**Companies:** Twitch

---

## Problem Description

> *Note: premium problem (statement checked against the official text with verify.py).*

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
Let `dp[j]` be the probability of exactly `j` heads among the coins processed so far (start with `dp[0] = 1`). Adding a coin with heads-probability `p`: either it lands tails and the count stays `j`, or heads and the count goes from `j-1` to `j`. So `dp[j] = dp[j]·(1-p) + dp[j-1]·p`. Update `j` from high to low so `dp[j-1]` still holds the previous coin's value (1D knapsack trick). Counts above `target` never matter, so the array has size `target + 1`.

```text
FUNCTION probabilityOfHeads(prob, target):
    SET dp ← ARRAY of size target+1 filled with 0.0
    SET dp[0] ← 1.0
    FOR p IN prob:
        FOR j FROM target DOWNTO 1:
            SET dp[j] ← dp[j] * (1 - p) + dp[j-1] * p
        SET dp[0] ← dp[0] * (1 - p)
    RETURN dp[target]
```

## Walkthrough
For `prob = [0.5,0.5,0.5,0.5,0.5]`, `target = 0` the array has a single entry `dp[0]` (probability of all tails so far):

| coin | p | dp[0] = dp[0] · (1 - p) |
|---|---|---|
| start | - | 1.0 |
| 1 | 0.5 | 0.5 |
| 2 | 0.5 | 0.25 |
| 3 | 0.5 | 0.125 |
| 4 | 0.5 | 0.0625 |
| 5 | 0.5 | 0.03125 |

Result: `0.03125`, matching the expected output. (For Example 1, `prob = [0.4], target = 1`: `dp = [1, 0]` -> `dp[1] = 0·0.6 + 1·0.4 = 0.4`.)

## Complexity Analysis
*Time*: O(n · target) - at most 1000 · 1000 = 10^6 updates.
*Space*: O(target) for the rolling DP array.

## Follow-Up Questions
1. How would you return the full distribution (probability of every head count) and what is its expected value?
2. How would you compute the probability of **at least** `target` heads?
3. For very large `n`, how could you approximate the answer (normal approximation, or FFT-based polynomial multiplication of `(1-p_i) + p_i·x`)?

## Key Takeaway
Independent Bernoulli trials with different probabilities form a "probability knapsack": `dp[j]` over the number of successes, updated per coin in reverse order, gives the exact distribution in O(n · target).
