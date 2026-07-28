# 681. Next Closest Time

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/next-closest-time](https://leetcode.com/problems/next-closest-time)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Enumerate All Valid Times — O(1)](#4-approach)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given a time in "HH:MM" format, form the **next closest** valid time reusing the same digits. The time wraps around midnight.

---

## 2. Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| "19:34" | "19:39" | Digits {1,9,3,4}. The next minute using only these digits is 19:39. |
| "23:59" | "22:22" | After 23:59 the next day starts. The smallest valid time using digits {2,3,5,9} is 22:22. |
| "00:00" | "00:00" | All digits are 0, so the next closest time is the same.

---

## 3. Key Insight

> Only 4 digits are available. Enumerate all 4⁴ = 256 possible combinations, filter valid times, find the smallest time strictly greater than current (wrapping past midnight).

---

## 4. Approach: Enumerate All Valid Times — O(1)

```text
FUNCTION nextClosestTime(time):
    // Extract digits from the given time string
    SET digits ← SET of characters in time excluding ':'
    // Convert current time to total minutes
    SET hours ← INTEGER of first two characters of time
    SET minutes ← INTEGER of last two characters of time
    SET current ← hours * 60 + minutes

    // Try each minute forward up to a full day (1440 minutes)
    FOR delta ← 1 TO 1440:
        SET next ← (current + delta) MOD 1440
        SET h ← next DIV 60
        SET m ← next MOD 60
        // Format hour and minute with leading zeros
        SET candidate ← STRING of h with two digits + ':' + STRING of m with two digits
        // Check if every digit of candidate is in the original set
        IF ALL characters c IN candidate WHERE c ≠ ':' SATISFY c IN digits:
            RETURN candidate
```

---

## 5. Walkthrough

Consider the input **"19:34"**.

| Step | Action | Result |
|------|--------|--------|
| 1 | Extract digits → {1,9,3,4} | |
| 2 | Current minutes = 19*60 + 34 = 1174 | |
| 3 | delta = 1 → next = 1175 → 19:35 (digits 1,9,3,5) → 5 not allowed |
| 4 | delta = 2 → 19:36 (digit 6) → invalid |
| 5 | ... continue until delta = 5 → 19:39 (digits 1,9,3,9) → all allowed |
| 6 | Return **"19:39"** as the next closest time |

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(1) — at most 1440 iterations, constant bound |
| **Space** | O(1) — only a few integer variables and a small set of digits |

---

## 7. Follow-Up Questions

1. How would you modify the algorithm if the time format included seconds ("HH:MM:SS")?
2. Can you solve the problem without enumerating all 256 combinations, perhaps using a backtracking approach?
3. How would you extend the solution to handle a custom set of allowed digits provided as input?

---

## 8. Key Takeaway

> **Brute force over time increments.** With only 1440 minutes in a day and ≤ 4 digits, iterate forward until finding a valid time using only the available digits.
