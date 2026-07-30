# 2413. Smallest Even Multiple

**Difficulty:** 🟢 Easy
**Companies:** Amazon, Bloomberg, Google

---

## Problem Description
Given a positive integer `n`, return the smallest even integer that is a multiple of `n`. In other words, find the minimal `x` such that `x` is divisible by `n` and `x` is even.

## Examples
| n | Output | Explanation |
|---|--------|-------------|
| `3` | `6` | `3` is odd, so the next multiple `2·3 = 6` is even. |
| `4` | `4` | `4` is already even, so it is the smallest even multiple. |
| `7` | `14` | `7` is odd; the smallest even multiple is `2·7 = 14`. |

## Approach
**Algorithm:** Simple parity check.

1. If `n` is even, the answer is `n`.
2. Otherwise, the answer is `2 * n`.

**Pseudocode:**
```text
FUNCTION smallestEvenMultiple(n):
    IF n MOD 2 = 0:
        RETURN n
    ELSE:
        RETURN 2 * n
```

## Walkthrough
For `n = 7`:
- Check `7 MOD 2` → not zero (odd).
- Compute `2 * 7 = 14` and return.

## Complexity Analysis
- **Time:** O(1) – constant-time arithmetic.
- **Space:** O(1) – no extra data structures.

## Follow‑Up Questions
1. How would you modify the solution to return the smallest *odd* multiple of `n`?
2. What if `n` could be zero? How should the function behave?
3. Can you extend the idea to find the smallest multiple of `n` that is divisible by a given integer `k`?

## Key Takeaway
A single parity check determines whether `n` itself is the answer or whether it must be doubled.
