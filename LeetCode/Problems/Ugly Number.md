# 263. Ugly Number

**Difficulty:** 🟢 Easy
**Acceptance:** 42.0%
**LeetCode:** [https://leetcode.com/problems/ugly-number](https://leetcode.com/problems/ugly-number)
**Companies:** Amazon, Bloomberg, Github, Google, Meta, Microsoft, Tcs

---

## Problem Description
Given a positive integer `n`, determine if it is an *ugly number*. An ugly number is a positive integer whose prime factors are limited to `2`, `3`, and `5` only. Return `true` if `n` is ugly, otherwise `false`.

## Examples
**Example 1:**
```
Input: n = 6
Output: true
Explanation: 6 = 2 × 3, both prime factors are allowed.
```
**Example 2:**
```
Input: n = 14
Output: false
Explanation: 14 = 2 × 7, factor 7 is not allowed.
```

## Approach
Repeatedly divide `n` by `2`, `3`, and `5` until it is no longer divisible by any of them. If the resulting value equals `1`, the original number had no other prime factors.

### Pseudocode
```text
FUNCTION isUgly(n):
    IF n <= 0:
        RETURN false
    FOR factor IN [2, 3, 5]:
        WHILE n % factor == 0:
            SET n ← n / factor
    RETURN n == 1
```

## Walkthrough
| Step | n before | After dividing by 2 | After dividing by 3 | After dividing by 5 | Result |
|------|----------|----------------------|----------------------|----------------------|--------|
| 1 | 30 | 15 | 5 | 1 | true |
| 2 | 14 | 7 | 7 | 7 | false |

## Complexity Analysis
- **Time:** Each division reduces `n`; at most `O(log n)` divisions.
- **Space:** `O(1)` auxiliary space.

## Follow‑Up Questions
1. How would you generate the first `k` ugly numbers?
2. Can the algorithm be adapted for a different set of allowed prime factors?
3. What is the nth ugly number and how to compute it efficiently?

## Key Takeaway
Repeated division by the allowed primes isolates any disallowed factors; if none remain, the number is ugly.