# 3280. Convert Date to Binary

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/convert-date-to-binary](https://leetcode.com/problems/convert-date-to-binary)
**Companies:** Google

---

## 1. Problem Description

Given a date string in `"YYYY-MM-DD"` format, convert each component (year, month, day) to its binary representation and return as `"binary_year-binary_month-binary_day"`.

---

## 2. Approach: Split + Convert — O(1) ✅

```text
FUNCTION convertDateToBinary(date):
    // Split the date string into year, month, day components
    parts ← date.SPLIT("-")
    // Convert each component to integer then to binary string without the "0b" prefix
    binaryParts ← []
    FOR part IN parts:
        SET num ← INTEGER(part)
        APPEND BINARY_STRING(num) TO binaryParts
    // Rejoin the binary components with hyphens
    RETURN "-".JOIN(binaryParts)
```

---

## 3. Examples

| Input | Output |
|-------|--------|
| `"2023-03-15"` | `"11111100111-11-1111"` |
| `"2000-01-01"` | `"11111010000-1-1"` |

---

## 4. Walkthrough

1. Receive `"2023-03-15"`.
2. Split → `["2023", "03", "15"]`.
3. Convert each:
   - `2023 → 11111100111`
   - `3 → 11`
   - `15 → 1111`
4. Join with hyphens → `"11111100111-11-1111"`.
5. Return the result.

---

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(1) – constant work on three components | O(1) – only a few strings stored |

---

## 6. Follow-Up Questions

- How would you handle invalid date formats?
- Can you extend the solution to support time components (HH:MM:SS)?
- What changes are needed for locales with different date separators?

---

## Key Takeaway

> Split the date, convert each integer part to binary string (stripping the `"0b"` prefix), and rejoin with hyphens.
