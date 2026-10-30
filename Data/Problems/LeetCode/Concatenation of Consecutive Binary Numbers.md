# 1680. Concatenation of Consecutive Binary Numbers

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/concatenation-of-consecutive-binary-numbers](https://leetcode.com/problems/concatenation-of-consecutive-binary-numbers)
**Companies:** Amazon, Bloomberg, Google

---

## Problem Description
Given an integer `n`, return *the **decimal value** of the binary string formed by concatenating the binary representations of* `1` *to* `n` *in order, **modulo*** `10^9 + 7`.

**Constraints:**
- `1 <= n <= 10^5`

## Examples
```
Example 1:
  Input: n = 1
  Output: 1
  Explanation: "1" in binary corresponds to the decimal value 1.
```
```
Example 2:
  Input: n = 3
  Output: 27
  Explanation: In binary, 1, 2, and 3 corresponds to "1", "10", and "11".
    After concatenating them, we have "11011", which corresponds to the decimal value 27.
```
```
Example 3:
  Input: n = 12
  Output: 505379714
  Explanation: The concatenation results in "1101110010111011110001001101010111100".
    The decimal value of that is 118505380540.
    After modulo 10^9 + 7, the result is 505379714.
```

## Approach
Iterate from `1` to `n`. For each `i`, compute its bit length, left‑shift the current result by that many bits, then OR with `i`. Apply modulo after each step.

```text
FUNCTION concatenatedBinary(n):
    SET MOD ← 1_000_000_007
    SET result ← 0
    FOR i ← 1 TO n:
        SET bits ← FLOOR(LOG2(i)) + 1
        SET result ← ((result << bits) OR i) % MOD
    RETURN result
```

## Walkthrough
| i | bits | result before shift | result after shift & OR |
|---|------|---------------------|--------------------------|
| 1 | 1    | 0                   | (0<<1) | 1 = 1            |
| 2 | 2    | 1                   | (1<<2)=4, 4|2 = 6          |
| 3 | 2    | 6                   | (6<<2)=24, 24|3 = 27        |
Thus for `n=3` the final result is `27`.

## Complexity Analysis
- **Time:** `O(n)` – one pass over the numbers.
- **Space:** `O(1)` – only a few integer variables.

## Follow‑Up Questions
1. How would you compute the result if the concatenation order were reversed (n down to 1)?
2. Can the algorithm be adapted to work with a different modulus or without overflow concerns?
3. How many bits are required in total for the concatenated string of `1..n`?

## Key Takeaway
By tracking each number's bit length, we can incrementally build the concatenated binary value using constant‑time bit operations.
