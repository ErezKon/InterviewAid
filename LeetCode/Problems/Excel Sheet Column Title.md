# 168. Excel Sheet Column Title

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/excel-sheet-column-title](https://leetcode.com/problems/excel-sheet-column-title)
**Companies:** Amazon, Bloomberg, De Shaw, Google, Meta, Microsoft, Zenefits, Zoho

---

## Problem Description

Given an integer `columnNumber`, return its corresponding Excel column title (A=1, B=2, ..., Z=26, AA=27, ...).

---

## Key Insight

> It's base-26 but **1-indexed** (A=1, not 0). Before each modulo, subtract 1 to convert to 0-indexed, then map `0→A, 1→B, ..., 25→Z`.

---

## Approach: Modified Base-26 — O(log n) ✅

```
FUNCTION convertToTitle(columnNumber):
    result = ""
    WHILE columnNumber > 0:
        columnNumber -= 1    // make 0-indexed
        result = chr(columnNumber % 26 + ord('A')) + result
        columnNumber /= 26
    RETURN result
```

---

## Walkthrough

```
columnNumber = 28
  28-1=27, 27%26=1→'B', 27/26=1, result="B"
  1-1=0, 0%26=0→'A', 0/26=0, result="AB"
Answer: "AB" ✅
```

---

## Key Takeaway

> **1-indexed base conversion: subtract 1 before each mod/divide. Pair with LC 171 (title → number) for the reverse direction.**
