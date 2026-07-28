# 2147. Number of Ways to Divide a Long Corridor

**Difficulty:** 🔴 Hard

**Companies:** Bloomberg, Microsoft, Zomato

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Multiply Gaps — O(n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Divide a corridor string into sections, each containing exactly 2 seats ('S'). Count ways to place dividers. Return mod 10⁹+7.

---

## Examples

| corridor | output |
|----------|--------|
| "SSPPS" | 1 |
| "SPSPS" | 2 |

*Explanation*: In the first example the two seats are already adjacent, only one divider placement is possible. In the second example there are two gaps between seat pairs, giving two possible divider positions.

---

## 2. Key Insight

> Between each pair of sections (2nd seat of one group and 1st seat of next), the divider can go in any of the plant positions between them. Multiply the gaps.

---

## 3. Approach: Multiply Gaps — O(n) ✅

```text
FUNCTION numberOfWays(corridor):
    MOD ← 10^9 + 7
    seats ← [i FOR i, c IN ENUMERATE(corridor) IF c = 'S']
    IF LENGTH(seats) = 0 OR LENGTH(seats) MOD 2 ≠ 0: RETURN 0
    result ← 1
    FOR i ← 2 TO LENGTH(seats) - 1 STEP 2:
        gap ← seats[i] - seats[i-1]
        result ← (result * gap) MOD MOD
    RETURN result
```

---

## Walkthrough

Consider the corridor "S P S P S" (spaces for readability):
1. Seat indices = [0,2,4]
2. Pairs: (0,2) and (2,4) → gaps = 2‑0 = 2 and 4‑2 = 2
3. Multiply gaps: 2 * 2 = 4 → 4 possible divider placements.
4. Apply modulo if needed.

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(S) where S = seat count |

---

## Follow-Up Questions

1. How would the solution change if each section must contain exactly **k** seats?
2. Can you extend the approach to handle multiple types of dividers with different constraints?

---

## 5. Key Takeaway

> **Multiply gap sizes between seat pairs.** Each gap between the 2nd seat of one pair and the 1st of the next offers `gap_size` divider positions. Product of all gaps = answer.
