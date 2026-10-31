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

You are given a string of length `5` called `time`, representing the current time on a digital clock in the format `"hh:mm"`. The **earliest** possible time is `"00:00"` and the **latest** possible time is `"23:59"`.

In the string `time`, the digits represented by the `?` symbol are **unknown**, and must be **replaced** with a digit from `0` to `9`.

Return* an integer *`answer`*, the number of valid clock times that can be created by replacing every *`?`* with a digit from *`0`* to *`9`.

**Constraints:**
- `time` is a valid string of length `5` in the format `"hh:mm"`.
- `"00" <= hh <= "23"`
- `"00" <= mm <= "59"`
- Some of the digits might be replaced with `'?'` and need to be replaced with digits from `0` to `9`.

---

## 2. Examples

**Example 1:**
```
Input: time = "?5:00"
Output: 2
Explanation: We can replace the ? with either a 0 or 1, producing "05:00" or "15:00". Note that we cannot replace it with a 2, since the time "25:00" is invalid. In total, we have two choices.
```

**Example 2:**
```
Input: time = "0?:0?"
Output: 100
Explanation: Each ? can be replaced by any digit from 0 to 9, so we have 100 total choices.
```

**Example 3:**
```
Input: time = "??:??"
Output: 1440
Explanation: There are 24 possible choices for the hours, and 60 possible choices for the minutes. In total, we have 24 * 60 = 1440 choices.
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
3. What if the input allowed a 12-hour clock with AM/PM designators?

---

## 7. Key Takeaway

> **Enumerate all 1440 valid times.** Check each against the pattern. Constant time since the search space is fixed.
