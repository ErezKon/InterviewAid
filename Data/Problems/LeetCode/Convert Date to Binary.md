# 3280. Convert Date to Binary

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/convert-date-to-binary](https://leetcode.com/problems/convert-date-to-binary)
**Companies:** Google

---

## 1. Problem Description

You are given a string `date` representing a Gregorian calendar date in the `yyyy-mm-dd` format.

`date` can be written in its binary representation obtained by converting year, month, and day to their binary representations without any leading zeroes and writing them down in `year-month-day` format.

Return the **binary** representation of `date`.

**Constraints:**
- `date.length == 10`
- `date[4] == date[7] == '-'`, and all other `date[i]`'s are digits.
- The input is generated such that `date` represents a valid Gregorian calendar date between Jan 1st, 1900 and Dec 31st, 2100 (both inclusive).

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

```
Example 1:
  Input: date = "2080-02-29"
  Output: "100000100000-10-11101"
  Explanation: 100000100000, 10, and 11101 are the binary representations of 2080, 02, and 29 respectively.
```
```
Example 2:
  Input: date = "1900-01-01"
  Output: "11101101100-1-1"
  Explanation: 11101101100, 1, and 1 are the binary representations of 1900, 1, and 1 respectively.
```

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
