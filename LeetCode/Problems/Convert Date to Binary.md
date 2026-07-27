# 3280. Convert Date to Binary

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/convert-date-to-binary](https://leetcode.com/problems/convert-date-to-binary)
**Companies:** Google

---

## 1. Problem Description

Given a date string in `"YYYY-MM-DD"` format, convert each component (year, month, day) to its binary representation and return as `"binary_year-binary_month-binary_day"`.

---

## 2. Approach: Split + Convert — O(1) ✅

```
FUNCTION convertDateToBinary(date):
    parts = date.split("-")
    RETURN "-".JOIN(bin(int(p))[2:] for p in parts)
```

| Time | Space |
|------|-------|
| O(1) | O(1) |

---

## Key Takeaway

> Split the date, convert each integer part to binary string (stripping the `"0b"` prefix), and rejoin with hyphens.
