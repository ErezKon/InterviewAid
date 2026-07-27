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

## 2. Key Insight

> Between each pair of sections (2nd seat of one group and 1st seat of next), the divider can go in any of the plant positions between them. Multiply the gaps.

---

## 3. Approach: Multiply Gaps — O(n) ✅

```
FUNCTION numberOfWays(corridor):
    MOD = 10^9 + 7
    seats = [i for i, c in enumerate(corridor) if c == 'S']
    IF len(seats) == 0 OR len(seats) % 2 != 0: RETURN 0
    result = 1
    FOR i ← 2 TO len(seats) - 1 STEP 2:
        result = result * (seats[i] - seats[i-1]) % MOD
    RETURN result
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(S) where S = seat count |

---

## 5. Key Takeaway

> **Multiply gap sizes between seat pairs.** Each gap between the 2nd seat of one pair and the 1st of the next offers `gap_size` divider positions. Product of all gaps = answer.
