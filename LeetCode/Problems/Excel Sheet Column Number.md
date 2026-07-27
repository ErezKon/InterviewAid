# 171. Excel Sheet Column Number

**Difficulty:** 🟢 Easy
**Acceptance:** 64.0%
**LeetCode:** [https://leetcode.com/problems/excel-sheet-column-number](https://leetcode.com/problems/excel-sheet-column-number)
**Companies:** Amazon, Bloomberg, Docusign, Goldman Sachs, Google, Microsoft, Razorpay, Uber, Zoho

---

## 1. Problem Description

Given an Excel column title (e.g., "A", "AB", "ZY"), return its corresponding column number.

---

## 2. Approach: Base-26 Conversion — O(n) ✅

```
FUNCTION titleToNumber(columnTitle):
    result = 0
    FOR char IN columnTitle:
        result = result * 26 + (char - 'A' + 1)
    RETURN result
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

### Reverse: Column Number to Title (#168)

```
FUNCTION convertToTitle(n):
    result = ""
    WHILE n > 0:
        n -= 1
        result = chr(n % 26 + ord('A')) + result
        n /= 26
    RETURN result
```

---

## Key Takeaway

> It's base-26 but 1-indexed (A=1 not 0). For the reverse, subtract 1 before modding.
