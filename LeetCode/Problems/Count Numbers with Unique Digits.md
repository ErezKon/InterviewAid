# 357. Count Numbers with Unique Digits

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-numbers-with-unique-digits](https://leetcode.com/problems/count-numbers-with-unique-digits)
**Companies:** Bloomberg, Google, Microsoft

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a non-negative integer `n`, count all numbers `x` where `0 <= x < 10^n` such that every digit in `x` is unique (no repeated digits).

**Constraints:**
- `0 <= n <= 8`

---

## Examples

**Example 1:**
- **Input:** `n = 2`
- **Output:** `91`
- **Explanation:** Numbers from 0 to 99 with all unique digits. Exclude 11, 22, 33, 44, 55, 66, 77, 88, 99 → 100 - 9 = 91.

**Example 2:**
- **Input:** `n = 0`
- **Output:** `1`
- **Explanation:** Only `0` is in range `[0, 1)`.

**Example 3:**
- **Input:** `n = 3`
- **Output:** `739`
- **Explanation:** 1-digit: 10, 2-digit unique: 81, 3-digit unique: 648 → 10 + 81 + 648 = 739.

---

## Key Insight

This is a **combinatorics / counting** problem. For a k-digit number with all unique digits:
- The first digit has **9** choices (1–9, can't be 0).
- The second digit has **9** choices (0–9 minus the first).
- The third digit has **8** choices, and so on.

So the count of k-digit numbers with unique digits = `9 × 9 × 8 × 7 × ... × (11 - k)`.

We accumulate across all lengths from 1 to `n`.

---

## Approach

Use a simple loop to compute the count of unique-digit numbers for each length from 1 to `n`, accumulating into a running total.

```
FUNCTION countNumbersWithUniqueDigits(n):
    IF n == 0: RETURN 1
    result = 10; product = 9
    FOR i ← 2 TO MIN(n, 10):
        product *= (11 - i)
        result += product
    RETURN result
```

**How it works:**
- `result` starts at 10 (all 1-digit numbers: 0–9 are unique).
- `product` tracks the count of k-digit unique numbers. For k=1, it's 9 (digits 1–9).
- Each iteration multiplies by `(11 - i)` to get the next available digit count.
- We cap at `n = 10` because with 10 digits all 0–9 are used; no 11-digit number can have all unique digits.

---

## Walkthrough

**Input:** `n = 3`

| k (digits) | Calculation | Count | Running Total |
|---|---|---|---|
| 0 | Base | 1 | 1 |
| 1 | 9 (digits 1–9) + 1 (digit 0) | 10 | 10 |
| 2 | 9 × 9 = 81 | 81 | 91 |
| 3 | 9 × 9 × 8 = 648 | 648 | 739 |

**Result:** `739` ✅

Visual breakdown for 2-digit numbers:
```
First digit:  1  2  3  4  5  6  7  8  9    → 9 choices
Second digit: 0-9 minus first digit         → 9 choices each
Total: 9 × 9 = 81
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(1) — loop runs at most 10 iterations |
| **Space** | O(1) — only a few variables |

---

## Follow-Up Questions

**Q1: Why do we cap at `n = 10`?**
There are only 10 distinct digits (0–9). Any number with 11+ digits must repeat at least one digit by the pigeonhole principle.

**Q2: Can you solve this with digit DP?**
Yes — use `dp(position, usedDigitsMask, isLeadingZero)`. This generalizes to harder variants (e.g., digit sum constraints), but is overkill here since the combinatorial formula is O(1).

**Q3: What if the upper bound isn't a power of 10?**
Then digit DP is needed. Count unique-digit numbers in `[0, X]` by processing `X` digit-by-digit with a bitmask of used digits.

**Q4: How does this relate to permutations?**
The count of k-digit unique numbers equals `9 × P(9, k-1)` = `9 × 9! / (10-k)!`, which is a partial permutation.

---

## Key Takeaway

> **Counting problems with digit constraints often reduce to combinatorics — compute the number of valid choices per position and multiply. When the bound is a clean power of 10, a simple product formula suffices; for arbitrary bounds, digit DP is the general tool.**
