# 681. Next Closest Time

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/next-closest-time](https://leetcode.com/problems/next-closest-time)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Enumerate All Valid Times — O(1)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given a time in "HH:MM" format, form the **next closest** valid time reusing the same digits. The time wraps around midnight.

---

## 2. Key Insight

> Only 4 digits are available. Enumerate all 4⁴ = 256 possible combinations, filter valid times, find the smallest time strictly greater than current (wrapping past midnight).

---

## 3. Approach: Enumerate All Valid Times — O(1) ✅

```
FUNCTION nextClosestTime(time):
    digits = set of digits in time (excluding ':')
    current = hours * 60 + minutes

    FOR delta ← 1 TO 1440:
        next = (current + delta) % 1440
        h, m = next / 60, next % 60
        IF all digits of h and m are in digits:
            RETURN formatted(h, m)
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(1) — at most 1440 iterations |
| **Space** | O(1) |

---

## 5. Key Takeaway

> **Brute force over time increments.** With only 1440 minutes in a day and ≤ 4 digits, iterate forward until finding a valid time using only the available digits.
