# 171. Excel Sheet Column Number

**Difficulty:** 🟢 Easy
**Acceptance:** 64.0%
**LeetCode:** [https://leetcode.com/problems/excel-sheet-column-number](https://leetcode.com/problems/excel-sheet-column-number)
**Companies:** Amazon, Bloomberg, Docusign, Goldman Sachs, Google, Microsoft, Razorpay, Uber, Zoho

---

## Problem Description

Given an Excel column title (e.g., "A", "AB", "ZY"), return its corresponding column number.

---

## Approach

### Base-26 Conversion — O(n) ✅

```text
FUNCTION titleToNumber(columnTitle):
    SET result ← 0
    FOR char IN columnTitle:
        // Convert character to 1‑based value
        SET value ← (ASCII(char) - ASCII('A') + 1)
        SET result ← result * 26 + value
    RETURN result
```

---

## Examples

**Example 1:**
```
Input: "A"
Output: 1
```

**Example 2:**
```
Input: "AB"
Output: 28
```

**Example 3:**
```
Input: "ZY"
Output: 701
```

---

## Walkthrough

| Step | char | result calculation |
|------|------|--------------------|
| 1 | 'A' | result = 0 * 26 + 1 = 1 |
| 2 | 'B' | result = 1 * 26 + 2 = 28 |

The algorithm processes each character, treating the string as a base‑26 number where 'A' maps to 1.

---

## Complexity Analysis

| Operation | Time | Space |
|-----------|------|-------|
| Conversion | O(n) where n is length of title | O(1) |

---

## Key Takeaway

> It's base‑26 but 1‑indexed (A=1 not 0). For the reverse, subtract 1 before modding.
