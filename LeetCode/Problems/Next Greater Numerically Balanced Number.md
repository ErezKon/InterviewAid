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

A number is **numerically balanced** if digit `d` appears exactly `d` times. Find the smallest balanced number > `n`.

**Constraints:**
- `0 <= n <= 10⁶`

---

## 2. Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `n = 1` | `22` | `22` is balanced because digit `2` appears exactly two times. |
| `n = 1000` | `1333` | `1333` is the next balanced number after 1000. |
| `n = 1234` | `1444` | Digits `1`, `4` appear 1 and 4 times respectively. |

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
