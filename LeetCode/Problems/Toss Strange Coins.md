# 1230. Toss Strange Coins

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/toss-strange-coins](https://leetcode.com/problems/toss-strange-coins)
**Companies:** Twitch

---

## Problem Description
You are given an integer `n`. You have a bag containing `n` identical coins, each showing heads. You repeatedly toss all coins that are currently heads. After each toss, a coin that lands tails is removed from the bag. The process continues until no coins remain. Return the expected number of tosses required to remove all coins.

## Examples
| n | Output | Explanation |
|---|--------|-------------|
| 1 | 1.0 | One coin, one toss needed on average. |
| 2 | 1.5 | Expected tosses = 1 + 1/2. |
| 3 | 1.833333 | Sum of harmonic series up to 3. |

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
