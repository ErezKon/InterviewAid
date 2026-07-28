# 168. Excel Sheet Column Title

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/excel-sheet-column-title](https://leetcode.com/problems/excel-sheet-column-title)
**Companies:** Amazon, Bloomberg, De Shaw, Google, Meta, Microsoft, Zenefits, Zoho

---

## Problem Description

Given an integer `columnNumber`, return its corresponding Excel column title (A=1, B=2, ..., Z=26, AA=27, ...).

---

## Approach

### Modified Base-26 — O(log n) ✅

```text
FUNCTION convertToTitle(columnNumber):
    SET result ← ""
    WHILE columnNumber > 0:
        SET columnNumber ← columnNumber - 1  // make 0-indexed
        SET charCode ← (columnNumber % 26) + ASCII('A')
        SET result ← CHAR(charCode) + result
        SET columnNumber ← columnNumber / 26
    RETURN result
```

---

## Examples

**Example 1:**
```
Input: 1
Output: "A"
```

**Example 2:**
```
Input: 28
Output: "AB"
```

**Example 3:**
```
Input: 701
Output: "ZY"
```

---

## Walkthrough

| Step | columnNumber | Operation | result |
|------|--------------|-----------|--------|
| 1 | 28 | subtract 1 → 27 | |
|   |   | char = 27 % 26 = 1 → 'B' | result = "B" |
|   |   | columnNumber = 27 / 26 = 1 | |
| 2 | 1 | subtract 1 → 0 | |
|   |   | char = 0 % 26 = 0 → 'A' | result = "AB" |
|   |   | columnNumber = 0 → stop | |

---

## Complexity Analysis

| Operation | Time | Space |
|-----------|------|-------|
| Conversion | O(log n) where n is the column number | O(1) |

---

## Key Takeaway

> 1‑indexed base‑26 conversion: subtract 1 before each modulo/division.
