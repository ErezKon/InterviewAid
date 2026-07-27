# 1271. Hexspeak

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/hexspeak](https://leetcode.com/problems/hexspeak)
**Companies:** Virtu

---

## 1. Problem Description

Convert a decimal string to hexadecimal, replace '0' with 'O' and '1' with 'I'. Return "ERROR" if any other digit (2-9) remains.

## 2. Approach: Hex Conversion + Replace — O(n) ✅

```
FUNCTION toHexspeak(num):
    hexStr ← uppercase hex(int(num))
    hexStr ← hexStr.replace('0', 'O').replace('1', 'I')
    IF any char in hexStr is a digit: RETURN "ERROR"
    RETURN hexStr
```

## Key Takeaway

> Convert to hex, replace 0→O and 1→I, validate no remaining digits.
