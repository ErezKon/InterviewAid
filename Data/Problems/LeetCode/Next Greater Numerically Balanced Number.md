# 2048. Next Greater Numerically Balanced Number

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/next-greater-numerically-balanced-number](https://leetcode.com/problems/next-greater-numerically-balanced-number)
**Companies:** Bloomberg, Google, Meta, Microsoft, Sprinklr

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach](#3-approach)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

An integer `x` is **numerically balanced** if for every digit `d` in the number `x`, there are **exactly** `d` occurrences of that digit in `x`.

Given an integer `n`, return *the **smallest numerically balanced** number **strictly greater** than* `n`*.*

**Constraints:**

- `0 <= n <= 10⁶`

---

## 2. Examples

```
Example 1:
  Input: n = 1
  Output: 22
  Explanation:
  22 is numerically balanced since:
  - The digit 2 occurs 2 times.
  It is also the smallest numerically balanced number strictly greater than 1.
```

```
Example 2:
  Input: n = 1000
  Output: 1333
  Explanation:
  1333 is numerically balanced since:
  - The digit 1 occurs 1 time.
  - The digit 3 occurs 3 times.
  It is also the smallest numerically balanced number strictly greater than 1000.
  Note that 1022 cannot be the answer because 0 appeared more than 0 times.
```

```
Example 3:
  Input: n = 3000
  Output: 3133
  Explanation:
  3133 is numerically balanced since:
  - The digit 1 occurs 1 time.
  - The digit 3 occurs 3 times.
  It is also the smallest numerically balanced number strictly greater than 3000.
```

---

## 3. Approach

**Algorithm:** Brute‑Force Search

```text
FUNCTION nextBalancedNumber(n):
    FUNCTION isBalanced(num):
        SET s ← STRING(num)
        FOR each digit d IN SET(s):
            IF COUNT(d IN s) ≠ INTEGER(d):
                RETURN FALSE
        RETURN TRUE

    SET candidate ← n + 1
    WHILE NOT isBalanced(candidate):
        SET candidate ← candidate + 1
    RETURN candidate
```

The insight is that balanced numbers are sparse, so scanning forward quickly finds the answer for the given constraints.

---

## 4. Walkthrough

Consider `n = 1000`.

1. Start with `candidate = 1001`.
2. `isBalanced(1001)` → digits: `1` appears 2 times, `0` appears 2 times → not balanced.
3. Increment `candidate` to `1002` … continue.
4. When `candidate = 1333`:
   - Digits: `1` appears once, `3` appears three times.
   - All digits satisfy the balanced condition.
5. Return `1333`.

The loop stops after a few hundred increments because the gap between balanced numbers is small for the given range.

---

## 5. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(gap × d) where `gap` is the distance to the next balanced number (small) and `d` is number of digits. |
| **Space** | O(d) for the string representation of the candidate. |

---

## 6. Follow-Up Questions

- How would you pre‑compute all balanced numbers up to `10⁶` and answer queries in O(1)?
- Can the algorithm be adapted for larger ranges, e.g., `n ≤ 10¹⁸`?
- What modifications are needed if the definition changes to “digit `d` appears at most `d` times”?

---

## 7. Key Takeaway

> Brute‑force works because numerically balanced numbers are extremely sparse; the next one is never far away for `n ≤ 10⁶`.
