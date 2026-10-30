# 3438. Find Valid Pair of Adjacent Digits in String

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-valid-pair-of-adjacent-digits-in-string](https://leetcode.com/problems/find-valid-pair-of-adjacent-digits-in-string)
**Companies:** Amazon, Google, Oracle

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: Count + Linear Scan — O(n) ✅](#2-approach-count--linear-scan--on-)
3. [Examples](#3-examples)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Key Takeaway](#6-key-takeaway)

---

## 1. Problem Description

You are given a string `s` consisting only of digits. A **valid pair** is defined as two **adjacent** digits in `s` such that:

- The first digit is **not equal** to the second.
- Each digit in the pair appears in `s` **exactly** as many times as its numeric value.

Return the first **valid pair** found in the string `s` when traversing from left to right. If no valid pair exists, return an empty string.

**Constraints:**
- `2 <= s.length <= 100`
- `s` only consists of digits from `'1'` to `'9'`.

**Official examples:** `s = "2523533"` → `"23"` ('2' appears 2 times, '3' appears 3 times); `s = "221"` → `"21"`; `s = "22"` → `""` (no valid pair — the two digits are equal).

---

## 2. Approach: Count + Linear Scan — O(n) ✅

```text
FUNCTION findValidPair(s):
    // Count frequency of each digit
    count ← COUNTER(s)
    // Scan adjacent pairs
    FOR i ← 0 TO LENGTH(s) - 2 DO
        IF s[i] != s[i+1] AND count[s[i]] == INT(s[i]) AND count[s[i+1]] == INT(s[i+1]):
            RETURN SUBSTRING(s, i, i+2)
    RETURN ''
```

---

## 3. Examples

**Example 1**
```
Input: s = "122333"
Output: "12"
Explanation: Digit '1' appears once, '2' appears twice, and they form the first qualifying adjacent pair.
```
**Example 2**
```
Input: s = "1122"
Output: ""
Explanation: No adjacent pair meets the frequency‑value condition.
```

---

## 4. Walkthrough

Consider `s = "122333"`.
1. Count frequencies: {'1':1, '2':2, '3':3}.
2. Scan pairs:
   - i=0: "12" → both frequencies match their digit values, return "12".
   - The algorithm stops at the first valid pair.

---

## 5. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## 6. Key Takeaway

> Count digit frequencies first, then scan for the first adjacent pair where both digits match their own frequency. O(n) single pass after counting.
