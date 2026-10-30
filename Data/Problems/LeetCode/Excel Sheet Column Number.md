# 171. Excel Sheet Column Number

**Difficulty:** 🟢 Easy
**Acceptance:** 64.0%
**LeetCode:** [https://leetcode.com/problems/excel-sheet-column-number](https://leetcode.com/problems/excel-sheet-column-number)
**Companies:** Amazon, Bloomberg, Docusign, Goldman Sachs, Google, Microsoft, Razorpay, Uber, Zoho

---

## Problem Description

Given a string `columnTitle` that represents the column title as appears in an Excel sheet, return *its corresponding column number*.

For example:

```
A -> 1
B -> 2
C -> 3
...
Z -> 26
AA -> 27
AB -> 28
...
```

**Constraints:**
- `1 <= columnTitle.length <= 7`
- `columnTitle` consists only of uppercase English letters.
- `columnTitle` is in the range `["A", "FXSHRXW"]`.

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
Input: columnTitle = "A"
Output: 1
```

**Example 2:**
```
Input: columnTitle = "AB"
Output: 28
```

**Example 3:**
```
Input: columnTitle = "ZY"
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
