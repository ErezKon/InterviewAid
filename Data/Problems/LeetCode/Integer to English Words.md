# 273. Integer to English Words

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/integer-to-english-words](https://leetcode.com/problems/integer-to-english-words)
**Companies:** Amazon, Apple, Attentive, Bloomberg, Cisco, Delhivery, Faire, Fractal Analytics, Goldman Sachs, Google, Gusto, Linkedin, Meta, Microsoft, Nvidia, Oracle, Palantir, Roblox, Snowflake, Tcs, Warnermedia, Zoho, Zscaler

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Divide into Groups of Three — O(1) ✅](#4-approach-divide-into-groups-of-three--o1-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Convert a non-negative integer to its English words representation. The input is guaranteed to be less than 2³¹ - 1.

**Constraints:**
- `0 <= num <= 2³¹ - 1`

---

## 2. Examples

```
Input: 123     → "One Hundred Twenty Three"
Input: 12345   → "Twelve Thousand Three Hundred Forty Five"
Input: 1234567 → "One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven"
Input: 0       → "Zero"
```

---

## 3. Key Insight

English numbers follow a **group-of-three** pattern: every 3 digits form a "chunk" with a scale word (Thousand, Million, Billion). Within each chunk, handle three ranges: 1-19 (unique words), 20-99 (tens + ones), 100-999 (hundreds + remainder). Process chunks from least significant to most significant.

---

## 4. Approach: Divide into Groups of Three — O(1) ✅

```
FUNCTION numberToWords(num):
    IF num == 0: RETURN "Zero"

    ones = ["","One","Two","Three","Four","Five","Six","Seven","Eight","Nine",
            "Ten","Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen",
            "Seventeen","Eighteen","Nineteen"]
    tens = ["","","Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"]
    thousands = ["","Thousand","Million","Billion"]

    FUNCTION helper(n):
        IF n == 0: RETURN ""
        ELSE IF n < 20: RETURN ones[n]
        ELSE IF n < 100: RETURN tens[n/10] + " " + helper(n%10)
        ELSE: RETURN ones[n/100] + " Hundred " + helper(n%100)

    result = ""
    FOR i ← 0 WHILE num > 0:
        IF num % 1000 != 0:
            result = helper(num % 1000) + " " + thousands[i] + " " + result
        num /= 1000
        i += 1

    RETURN TRIM(result)
```

---

## 5. Walkthrough

```
num = 1234567
```

| Iteration | num % 1000 | helper result | Scale | Running result |
|-----------|-----------|---------------|-------|----------------|
| i=0 | 567 | "Five Hundred Sixty Seven" | "" | "Five Hundred Sixty Seven" |
| i=1 | 234 | "Two Hundred Thirty Four" | "Thousand" | "Two Hundred Thirty Four Thousand Five Hundred Sixty Seven" |
| i=2 | 1 | "One" | "Million" | "One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven" |

**Result:** `"One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven"` ✅

---

## 6. Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| Time | O(1) | At most 4 groups (Billion is max for 2³¹-1) |
| Space | O(1) | Fixed-size lookup tables |

---

## 7. Follow-Up Questions

### 7.1 How to handle edge case num = 0?

Check at the start and return "Zero" immediately — the loop would produce an empty string otherwise.

### 7.2 What about groups of 000 in the middle (e.g., 1000010)?

The `IF num % 1000 != 0` check skips groups that are all zeros, preventing output like "... Thousand ..." with nothing before it.

### 7.3 How to extend to larger numbers?

Add more scale words: "Trillion", "Quadrillion", etc. The algorithm structure is unchanged.

---

## 8. Key Takeaway

> Process in groups of 3 digits. Handle 1-19 (special words), 20-99 (tens + ones), 100-999 (hundreds). Append scale word (Thousand/Million/Billion). Watch for edge cases: 0, groups of 000, and trailing spaces.
