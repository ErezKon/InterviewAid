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

Count integers in `[low, high]` where the number of even digits equals the number of odd digits and the integer is divisible by `k`.

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

**Example 1:**
```
Input: low = 1, high = 20, k = 2
Output: 2
Explanation: The beautiful integers are 2 and 20.
```

**Example 2:**
```
Input: low = 1, high = 100, k = 5
Output: 4
Explanation: Beautiful integers are 5, 15, 55, 95.
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
