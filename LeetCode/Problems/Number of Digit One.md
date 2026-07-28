# 233. Number of Digit One

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/number-of-digit-one](https://leetcode.com/problems/number-of-digit-one)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Salesforce

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Digit DP — O(log n)](#4-approach)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Count the total number of digit `1` appearing in all non‑negative integers less than or equal to `n`.

---

## 2. Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `n = 13` | `6` | Numbers with a `1`: 1, 10, 11, 12, 13 → total six `1`s.
| `n = 0` | `0` | No numbers contain the digit `1`.
| `n = 100` | `21` | Count `1`s in 1‑100 inclusive.

---

## 3. Key Insight

> For each decimal position, the count of `1`s depends on the higher, current, and lower parts of the number. Three cases based on the current digit (0, 1, ≥2).

---

## 4. Approach: Digit DP — O(log n) ✅

```text
FUNCTION countDigitOne(n):
    count ← 0
    factor ← 1
    WHILE factor ≤ n:
        lower ← n MOD factor
        curr ← (n DIV factor) MOD 10
        higher ← n DIV (factor * 10)
        IF curr == 0:
            count ← count + higher * factor
        ELSE IF curr == 1:
            count ← count + higher * factor + lower + 1
        ELSE:
            count ← count + (higher + 1) * factor
        factor ← factor * 10
    RETURN count
```

---

## 5. Walkthrough

**Example:** `n = 13`

1. `factor = 1` (units): `higher = 1`, `curr = 3`, `lower = 0` → `curr ≥ 2` → add `(higher+1)*1 = 2`.
2. `factor = 10` (tens): `higher = 0`, `curr = 1`, `lower = 3` → `curr == 1` → add `higher*10 + lower + 1 = 0 + 3 + 1 = 4`.
3. Total `count = 2 + 4 = 6`, matching the six `1`s.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(log n) — one iteration per digit |
| **Space** | O(1) |

---

## 7. Follow-Up Questions

- How would you adapt the algorithm to count occurrences of any digit `d` (0‑9) instead of just `1`?
- Can you compute the count for a range `[low, high]` efficiently?
- What changes are needed for bases other than decimal (e.g., binary or hexadecimal)?

---

## 8. Key Takeaway

> **Per‑position digit counting.** For each decimal place, combine contributions from higher, current, and lower parts. Handles all three cases of the current digit to accumulate the total number of `1`s.
