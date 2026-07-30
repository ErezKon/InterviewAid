# 13. Roman to Integer

**Difficulty:** 🟢 Easy
**Acceptance:** 63.0%
**LeetCode:** [https://leetcode.com/problems/roman-to-integer](https://leetcode.com/problems/roman-to-integer)
**Companies:** Accenture, Adobe, Amazon, Amd, Apple, Axon, Bloomberg, Bookingcom, Capgemini, Cognizant, Deloitte, Deltax, Doordash, Epam Systems, Expedia, Goldman Sachs, Google, Ibm, Infosys, Jpmorgan, Linkedin, Meta, Microsoft, Oracle, Pwc, Salesforce, Snowflake, Sofi, Tcs, Tiktok, Uber, Virtusa, Walmart Labs, Warnermedia, Wix, Yahoo, Yandex, Zoho

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: Left-to-Right Scan — O(n) ✅](#3-approach-left-to-right-scan--on-)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)

---

## 1. Problem Description

Roman numerals are represented by seven symbols: `I`(1), `V`(5), `X`(10), `L`(50), `C`(100), `D`(500), `M`(1000).

Given a roman numeral string, convert it to an integer.

Subtraction is used when a smaller value precedes a larger value: `IV`=4, `IX`=9, `XL`=40, `XC`=90, `CD`=400, `CM`=900.

**Constraints:**
- `1 <= s.length <= 15`
- `s` contains only the characters `I`, `V`, `X`, `L`, `C`, `D`, `M`.
- It is guaranteed that `s` is a valid roman numeral in the range `[1, 3999]`.

---

## 2. Examples

```
Example 1:
  Input:  s = "III"
  Output: 3

Example 2:
  Input:  s = "LVIII"
  Output: 58   (L=50, V=5, III=3)

Example 3:
  Input:  s = "MCMXCIV"
  Output: 1994 (M=1000, CM=900, XC=90, IV=4)
```

---

## 3. Approach: Left-to-Right Scan — O(n) ✅

### Key Insight

If a symbol's value is **less than** the next symbol's value, **subtract** it. Otherwise, **add** it.

```
FUNCTION romanToInt(s):

    values = {'I':1, 'V':5, 'X':10, 'L':50, 'C':100, 'D':500, 'M':1000}
    result = 0

    FOR i ← 0 TO len(s) - 1:
        IF i < len(s) - 1 AND values[s[i]] < values[s[i+1]]:
            result -= values[s[i]]
        ELSE:
            result += values[s[i]]

    RETURN result
```

---

## 4. Walkthrough

```
s = "MCMXCIV"

M: 1000 < C(next=100)? No  → result = 1000
C: 100 < M(next=1000)? Yes → result = 1000 - 100 = 900
M: 1000 < X(next=10)? No   → result = 900 + 1000 = 1900
X: 10 < C(next=100)? Yes   → result = 1900 - 10 = 1890
C: 100 < I(next=1)? No     → result = 1890 + 100 = 1990
I: 1 < V(next=5)? Yes      → result = 1990 - 1 = 1989
V: last char               → result = 1989 + 5 = 1994 ✅
```

---

## 5. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) — single pass |
| **Space** | O(1) |

---

## 6. Follow-Up Questions

### 6.1 Integer to Roman (LeetCode #12)?

Use a greedy approach with a value-symbol table (descending). Repeatedly subtract the largest possible value and append its symbol.

```
FUNCTION intToRoman(num):
    pairs = [(1000,"M"),(900,"CM"),(500,"D"),(400,"CD"),
             (100,"C"),(90,"XC"),(50,"L"),(40,"XL"),
             (10,"X"),(9,"IX"),(5,"V"),(4,"IV"),(1,"I")]
    result = ""
    FOR (val, sym) IN pairs:
        WHILE num >= val:
            result += sym
            num -= val
    RETURN result
```

### 6.2 What about extended Roman numerals (beyond 3999)?

Use a bar notation (vinculum) where a bar over a symbol multiplies by 1000. E.g., V̅ = 5000. Implementation: define new symbols or use lowercase for the barred versions.

---

## Key Takeaway

> The subtraction rule makes this elegant: if `current < next`, subtract; otherwise add. One pass, O(1) space.
