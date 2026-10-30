# 2827. Number of Beautiful Integers in the Range

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/number-of-beautiful-integers-in-the-range](https://leetcode.com/problems/number-of-beautiful-integers-in-the-range)
**Companies:** Infosys

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Digit DP — O(d · k · d²)](#3-approach)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

You are given positive integers `low`, `high`, and `k`.

A number is **beautiful** if it meets both of the following conditions:

- The count of even digits in the number is equal to the count of odd digits.
- The number is divisible by `k`.

Return *the number of beautiful integers in the range* `[low, high]`.

**Constraints:**

- `0 < low <= high <= 10^9`
- `0 < k <= 20`

---

## 2. Key Insight

> Use Digit DP with states: position, tight bound, whether a non‑leading digit has started, the difference `even - odd`, and the remainder modulo `k`. The answer for the range is `count(high) - count(low‑1)`.

---

## 3. Approach: Digit DP — O(d · k · d²) ✅

```text
FUNCTION numberOfBeautifulIntegers(low, high, k):
    RETURN countUpTo(high, k) - countUpTo(low - 1, k)

FUNCTION countUpTo(n, k):
    digits ← ARRAY of digits of n
    // DP(pos, tight, started, diff, mod)
    // diff = (#even - #odd) so far, mod = current remainder mod k
    // Base: if pos == len(digits): RETURN 1 IF started AND diff == 0 AND mod == 0 ELSE 0
    RETURN dp(0, TRUE, FALSE, 0, 0)
```

---

## 4. Examples

```
Example 1:
  Input: low = 10, high = 20, k = 3
  Output: 2
  Explanation: There are 2 beautiful integers in the given range: [12,18].
  - 12 is beautiful because it contains 1 odd digit and 1 even digit, and is divisible by k = 3.
  - 18 is beautiful because it contains 1 odd digit and 1 even digit, and is divisible by k = 3.
  Additionally we can see that:
  - 16 is not beautiful because it is not divisible by k = 3.
  - 15 is not beautiful because it does not contain equal counts even and odd digits.
  It can be shown that there are only 2 beautiful integers in the given range.
```

```
Example 2:
  Input: low = 1, high = 10, k = 1
  Output: 1
  Explanation: There is 1 beautiful integer in the given range: [10].
  - 10 is beautiful because it contains 1 odd digit and 1 even digit, and is divisible by k = 1.
  It can be shown that there is only 1 beautiful integer in the given range.
```

```
Example 3:
  Input: low = 5, high = 5, k = 2
  Output: 0
  Explanation: There are 0 beautiful integers in the given range.
  - 5 is not beautiful because it is not divisible by k = 2 and it does not contain equal even and odd digits.
```

---

## 5. Walkthrough

Consider `high = 20, k = 2`.
1. Convert `20` to digits `[2,0]`.
2. DP starts at position 0 with `tight=TRUE`, `started=FALSE`, `diff=0`, `mod=0`.
3. At position 0 we can place digit `0` (skip) or `1`‑`2`.
   - Placing `2` (even) updates `diff←1`, `mod←0` (since 2 % 2 = 0).
4. Move to position 1 with `tight=TRUE` (still matching prefix) and continue.
5. At the end, only the number `2` satisfies `diff==0` and `mod==0`.
6. Repeating for `low‑1 = 0` yields 0, so answer = 2.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(d² · k · 10) where `d` is the number of digits |
| **Space** | O(d² · k) for memoization |

---

## 7. Follow-Up Questions

1. How would you adapt the DP to handle a different balance condition, e.g., `#prime‑digit == #non‑prime‑digit`?
2. Can the algorithm be extended to count numbers with a specific digit sum modulo `m`?
3. What changes are needed to output the actual beautiful integers instead of just the count?

---

## 8. Key Takeaway

> **Digit DP can simultaneously track multiple constraints** (digit parity balance and modular remainder). Combine them in the state and use the classic `count(high) - count(low‑1)` technique for range queries.
