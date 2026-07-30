# 2952. Minimum Number of Coins to be Added

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-coins-to-be-added](https://leetcode.com/problems/minimum-number-of-coins-to-be-added)
**Companies:** Amazon, Flipkart

---

## Problem Description

You are given an integer array `coins` where each element represents the value of a coin you already have. You may add any number of additional coins, each of value **1**. After adding, the total sum of all coins must be a power of two (i.e., `2^k` for some integer `k ≥ 0`). Return the minimum number of `1`‑valued coins you need to add to achieve this.

## Examples

1. **Input:** `coins = [1,2,3]`
   **Output:** `2`
   **Explanation:** Current sum = `6`. The next power of two is `8`. Adding two `1`‑coins makes the sum `8`.
2. **Input:** `coins = [5,5]`
   **Output:** `2`
   **Explanation:** Sum = `10`. Next power of two is `16`. Need `6` more, but we can only add `1`‑coins, so `6` coins are required. However, a smaller power of two `8` is less than `10`, so we must go to `16`. Adding `6` coins yields `16`. Minimum added = `6`.

## Approach

**Algorithm:** Compute the current sum `S`. Find the smallest power of two `P` such that `P ≥ S`. The answer is `P - S`.

- Compute `S = Σ coins[i]`.
- If `S` is already a power of two (`S & (S-1) == 0`), answer is `0`.
- Otherwise, find `P = 1 << (bit_length(S))` (the next higher power of two).
- Return `P - S`.

```text
FUNCTION minCoinsToAdd(coins):
    S ← 0
    FOR value IN coins DO
        S ← S + value
    IF S = 0 THEN RETURN 1   // need at least one coin to reach 2^0 = 1
    IF (S AND (S - 1)) = 0 THEN RETURN 0   // already power of two
    // Find next power of two
    bits ← BIT_LENGTH(S)               // number of bits needed to represent S
    P ← 1 LEFT_SHIFT bits               // 2^bits
    RETURN P - S
```

## Walkthrough

For `coins = [1,2,3]`:

- `S = 6` (binary `110`).
- `S` is not a power of two.
- `BIT_LENGTH(6) = 3`, so `P = 1 << 3 = 8`.
- Answer = `8 - 6 = 2`.

## Complexity Analysis

- **Time:** `O(n)` to sum the array.
- **Space:** `O(1)`.

## Follow‑Up Questions

- How would the solution change if you could add coins of any denomination, not just `1`?
- What if the target sum must be a power of three instead of two?
- Can you compute the answer without using bit‑operations, using only arithmetic?

## Key Takeaway

The minimal number of `1`‑coins needed is simply the difference between the current sum and the next higher power of two; bit manipulation makes finding that power trivial.
