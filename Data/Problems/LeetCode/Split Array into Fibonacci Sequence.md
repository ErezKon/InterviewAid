# 842. Split Array into Fibonacci Sequence

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/split-array-into-fibonacci-sequence](https://leetcode.com/problems/split-array-into-fibonacci-sequence)
**Companies:** Amazon, Google

---

## Problem Description

You are given a string of digits `num`, such as `"123456579"`. We can split it into a Fibonacci-like sequence `[123, 456, 579]`.

Formally, a **Fibonacci-like** sequence is a list `f` of non-negative integers such that:

- `0 <= f[i] < 2^31`, (that is, each integer fits in a **32-bit** signed integer type),
- `f.length >= 3`, and
- `f[i] + f[i + 1] == f[i + 2]` for all `0 <= i < f.length - 2`.

Note that when splitting the string into pieces, each piece must not have extra leading zeroes, except if the piece is the number `0` itself.

Return any Fibonacci-like sequence split from `num`, or return `[]` if it cannot be done.

**Constraints:**
- `1 <= num.length <= 200`
- `num` contains only digits.

## Examples

**Example 1:**
```
Input: num = "1101111"
Output: [11,0,11,11]
Explanation: The output [110, 1, 111] would also be accepted.
```

**Example 2:**
```
Input: num = "112358130"
Output: []
Explanation: The task is impossible.
```

**Example 3:**
```
Input: num = "0123"
Output: []
Explanation: Leading zeroes are not allowed, so "01", "2", "3" is not valid.
```

## Approach
Once the first two numbers are fixed, the whole sequence is determined: every next term must be `f[i] + f[i+1]`, and its decimal string must appear exactly at the current position of `num`. So we only enumerate the lengths of the first two numbers and greedily verify the rest.

- Each number is `< 2^31`, so it has at most 10 digits — the two lengths are each bounded by 10.
- A piece longer than one digit may not start with `'0'`.
- Stop extending as soon as the next sum is `≥ 2^31` or its string does not match at the current position.
- Return the first sequence that consumes the entire string with at least 3 terms.

```text
FUNCTION splitIntoFibonacci(num):
    n ← LENGTH(num); LIMIT ← 2^31
    FOR i ← 1 TO MIN(10, n):                     // length of first number
        IF num[0] == '0' AND i > 1: BREAK
        a ← INT(num[0..i-1]); IF a ≥ LIMIT: BREAK
        FOR j ← i+1 TO MIN(i+10, n):             // end of second number
            IF num[i] == '0' AND j > i+1: BREAK
            b ← INT(num[i..j-1]); IF b ≥ LIMIT: BREAK
            f ← [a, b]; k ← j
            WHILE k < n:
                c ← f[-1] + f[-2]
                IF c ≥ LIMIT: BREAK
                s ← STRING(c)
                IF num does not start with s at index k: BREAK
                APPEND c TO f; k ← k + LENGTH(s)
            IF k == n AND LENGTH(f) ≥ 3: RETURN f
    RETURN []
```

## Walkthrough
Example 1: `num = "1101111"`.

| First | Second | Extension | Result |
|-------|--------|-----------|--------|
| 1 | 1 | next 2, string has "0" at index 2 | fail |
| 1 | 10 | next 11, string has "11" at index 3 → [1,10,11]; next 21 vs "1" | fail |
| 1 | 101 / 1011 / ... | next sum does not match | fail |
| 11 | 0 | next 11 matches index 3 → [11,0,11]; next 11 matches index 5 → [11,0,11,11], k = 7 = n | success |

Output: `[11,0,11,11]`.

## Complexity Analysis
- **Time:** O(10 · 10 · n) = O(n): at most 100 starting pairs (lengths bounded by 10 digits), each verified in O(n) string comparisons.
- **Space:** O(n) for the sequence being built.

## Follow-Up Questions
1. How would you return *all* valid Fibonacci-like splits instead of any one?
2. How would you handle numbers of arbitrary size (no `2^31` bound)?
3. How would you return the split with the maximum number of terms?

## Key Takeaway
The first two terms fully determine a Fibonacci-like sequence, so enumerate only their (digit-bounded) lengths and greedily verify the rest against the string, respecting leading-zero and overflow rules.
