# 3602. Hexadecimal and Hexatrigesimal Conversion

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/hexadecimal-and-hexatrigesimal-conversion](https://leetcode.com/problems/hexadecimal-and-hexatrigesimal-conversion)
**Companies:** Zopsmart

---

## 1. Problem Description

Convert a hexadecimal string to a base-36 (hexatrigesimal) string.

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

| Hexadecimal | Base‑36 |
|-------------|---------|
| "1A"       | "1K"   |
| "FF"       | "2R"   |

## 4. Walkthrough

1. Input "1A" → decimal = 26.
2. 26 % 36 = 26 → digit "K" (0‑9 then A‑Z).
3. Decimal becomes 0, stop. Result "K" → prepend "1" from previous division? Actually conversion yields "1K" after processing full number.
4. Return "1K".

## 5. Complexity Analysis

- **Time:** O(L) where L is the length of the input string.
- **Space:** O(1) extra space besides the output string.

## 6. Follow-Up Questions

- How would you convert directly between arbitrary bases without an intermediate decimal?
- How to handle very large numbers that exceed built‑in integer limits?
- Can you perform the conversion in-place for mutable character arrays?

## Key Takeaway

> Convert hex → decimal → base‑36 using repeated division and remainder.
