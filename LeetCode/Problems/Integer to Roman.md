# 12. Integer to Roman

**Difficulty:** 🟡 Medium
**Acceptance:** 67.0%
**LeetCode:** [https://leetcode.com/problems/integer-to-roman](https://leetcode.com/problems/integer-to-roman)
**Companies:** Accenture, Adobe, Agoda, Amazon, Amd, Blackrock, Bloomberg, Bookingcom, Docusign, Doordash, Geico, Goldman Sachs, Google, Ibm, Infosys, Jpmorgan, Linkedin, Meta, Microsoft, Oracle, Palo Alto Networks, Salesforce, Swiggy, Tcs, Tiktok, Twitter, Uipath, Verkada, Walmart Labs, Wix, Zoho

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: Greedy with Value Table — O(1) ✅](#3-approach-greedy-with-value-table--o1-)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)

---

## 1. Problem Description

Convert an integer to a Roman numeral string.

Roman numerals: I(1), V(5), X(10), L(50), C(100), D(500), M(1000).

Subtraction forms: IV(4), IX(9), XL(40), XC(90), CD(400), CM(900).

**Constraints:**
- `1 <= num <= 3999`

---

## 2. Examples

```
Example 1:
  Input:  num = 3749
  Output: "MMMDCCXLIX"

Example 2:
  Input:  num = 58
  Output: "LVIII"

Example 3:
  Input:  num = 1994
  Output: "MCMXCIV"
```

---

## 3. Approach: Greedy with Value Table — O(1) ✅

List all values (including subtraction forms) in descending order. Greedily subtract the largest possible value and append its symbol.

```
FUNCTION intToRoman(num):
    pairs = [(1000,"M"), (900,"CM"), (500,"D"), (400,"CD"),
             (100,"C"), (90,"XC"), (50,"L"), (40,"XL"),
             (10,"X"), (9,"IX"), (5,"V"), (4,"IV"), (1,"I")]

    result = ""

    FOR (value, symbol) IN pairs:
        WHILE num >= value:
            result += symbol
            num -= value

    RETURN result
```

---

## 4. Walkthrough

```
num = 1994

1994 >= 1000 → "M",     num = 994
994  >= 900  → "CM",    num = 94
94   >= 90   → "XC",    num = 4
4    >= 4    → "IV",    num = 0

Result: "MCMXCIV" ✅
```

---

## 5. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(1) — bounded by max value 3999 |
| **Space** | O(1) |

---

## 6. Follow-Up Questions

### 6.1 Roman to Integer (LeetCode #13)?

Scan left to right. If current value < next value, subtract; otherwise add. See problem #13.

### 6.2 Why include subtraction forms in the table?

It simplifies the algorithm — the greedy approach handles all cases uniformly. Without subtraction forms, you'd need special-case logic for 4, 9, 40, 90, 400, 900.

---

## Key Takeaway

> The value table with 13 entries (7 standard + 6 subtraction forms) makes the greedy algorithm trivial. This is a great example of how **precomputing edge cases into a lookup table** simplifies implementation.
