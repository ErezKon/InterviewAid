# 1680. Concatenation of Consecutive Binary Numbers

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/concatenation-of-consecutive-binary-numbers](https://leetcode.com/problems/concatenation-of-consecutive-binary-numbers)
**Companies:** Amazon, Bloomberg, Google

---

## Problem Description
Given an integer `n`, write the binary representation of each integer from `1` to `n` and concatenate them in order. Return the resulting number modulo `10^9 + 7`.

## Examples
**Example 1:**
```
n = 1
Output: 1          // binary "1"
```
**Example 2:**
```
n = 3
Binary strings: "1", "10", "11"
Concatenated: "11011" (binary) = 27
Output: 27
```
**Example 3:**
```
n = 12
Output: 505379714   // as per LeetCode example
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
