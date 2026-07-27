# 3602. Hexadecimal and Hexatrigesimal Conversion

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/hexadecimal-and-hexatrigesimal-conversion](https://leetcode.com/problems/hexadecimal-and-hexatrigesimal-conversion)
**Companies:** Zopsmart

---

## 1. Problem Description

Convert a hexadecimal string to a base-36 (hexatrigesimal) string.

## 2. Approach: Base Conversion — O(n) ✅

```
FUNCTION convertBase(hexString):
    decimal ← int(hexString, 16)
    IF decimal == 0: RETURN "0"
    result ← ""
    WHILE decimal > 0 DO
        remainder ← decimal % 36
        result ← digits36[remainder] + result
        decimal ← decimal / 36
    RETURN result
```

## Key Takeaway

> Convert hex → decimal → base-36. Use standard base conversion with mod + divide.
