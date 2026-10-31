# 3602. Hexadecimal and Hexatrigesimal Conversion

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/hexadecimal-and-hexatrigesimal-conversion](https://leetcode.com/problems/hexadecimal-and-hexatrigesimal-conversion)
**Companies:** Zopsmart

---

## 1. Problem Description

You are given an integer `n`.

Return the concatenation of the **hexadecimal** representation of `n²` and the **hexatrigesimal** representation of `n³`.

A **hexadecimal** number is defined as a base-16 numeral system that uses the digits `0 – 9` and the uppercase letters `A - F` to represent values from 0 to 15.

A **hexatrigesimal** number is defined as a base-36 numeral system that uses the digits `0 – 9` and the uppercase letters `A - Z` to represent values from 0 to 35.

**Constraints:**
- `1 <= n <= 1000`

## 2. Approach: Base Conversion — O(n) ✅

```text
FUNCTION convertBase(hexString):
    // Convert hex to decimal integer
    decimal ← int(hexString, 16)
    IF decimal == 0: RETURN "0"
    result ← ""
    WHILE decimal > 0 DO
        remainder ← decimal % 36
        result ← digits36[remainder] + result
        decimal ← decimal / 36
    RETURN result
```

## 3. Examples

```
Example 1:
  Input: n = 13
  Output: "A91P1"
  Explanation:
  - n² = 13 * 13 = 169. In hexadecimal, it converts to (10 * 16) + 9 = 169, which corresponds to "A9".
  - n³ = 13 * 13 * 13 = 2197. In hexatrigesimal, it converts to (1 * 36²) + (25 * 36) + 1 = 2197, which corresponds to "1P1".
  - Concatenating both results gives "A9" + "1P1" = "A91P1".
```
```
Example 2:
  Input: n = 36
  Output: "5101000"
  Explanation:
  - n² = 36 * 36 = 1296. In hexadecimal, it converts to (5 * 16²) + (1 * 16) + 0 = 1296, which corresponds to "510".
  - n³ = 36 * 36 * 36 = 46656. In hexatrigesimal, it converts to (1 * 36³) + (0 * 36²) + (0 * 36) + 0 = 46656, which corresponds to "1000".
  - Concatenating both results gives "510" + "1000" = "5101000".
```

## 4. Walkthrough

1. Input "1A" → decimal = 26.
2. 26 % 36 = 26 → digit "K" (0-9 then A-Z).
3. Decimal becomes 0, stop. Result "K" → prepend "1" from previous division? Actually conversion yields "1K" after processing full number.
4. Return "1K".

## 5. Complexity Analysis

- **Time:** O(L) where L is the length of the input string.
- **Space:** O(1) extra space besides the output string.

## 6. Follow-Up Questions

- How would you convert directly between arbitrary bases without an intermediate decimal?
- How to handle very large numbers that exceed built-in integer limits?
- Can you perform the conversion in-place for mutable character arrays?

## Key Takeaway

> Convert hex → decimal → base-36 using repeated division and remainder.
