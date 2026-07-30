# 2437. Number of Valid Clock Times

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/number-of-valid-clock-times](https://leetcode.com/problems/number-of-valid-clock-times)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: Enumerate — O(1)](#3-approach)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given a time string "HH:MM" with some digits replaced by '?', count valid times.

---

## 2. Examples

**Example 1:**
```
Input: time = "?5:00"
Output: 2
Explanation: Valid times are "05:00" and "15:00".
```

**Example 2:**
```
Input: time = "??:??"
Output: 1440
Explanation: All 24·60 possible times are valid.
```

---

## 3. Approach: Enumerate — O(1) ✅

```text
FUNCTION countTime(time):
    count ← 0
    FOR h ← 0 TO 23:
        FOR m ← 0 TO 59:
            IF matches(h, m, time):
                count ← count + 1
    RETURN count
```

---

## 4. Walkthrough

Consider the input "?5:00".
| h | m | matches? |
|---|---|----------|
| 0 | 0 | false (hour 00 does not have 5 as tens) |
| 5 | 0 | true |
| 15| 0 | true |
| 20| 0 | false |
Only two combinations satisfy the pattern, so the function returns 2.

---

## 5. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(24·60) = O(1) |
| **Space** | O(1) |

---

## 6. Follow-Up Questions

1. How would you adapt the solution if the time format included seconds ("HH:MM:SS")?
2. Can you compute the answer without iterating over all possibilities?
3. What if the input allowed a 12‑hour clock with AM/PM designators?

---

## 7. Key Takeaway

> **Enumerate all 1440 valid times.** Check each against the pattern. Constant time since the search space is fixed.
