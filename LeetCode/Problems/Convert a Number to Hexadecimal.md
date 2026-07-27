# 405. Convert a Number to Hexadecimal

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/convert-a-number-to-hexadecimal](https://leetcode.com/problems/convert-a-number-to-hexadecimal)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Tcs

---

```
FUNCTION toHex(num):
    IF num == 0: RETURN "0"
    IF num < 0: num += 2^32    // two's complement
    hex_chars = "0123456789abcdef"
    result = ""
    WHILE num > 0:
        result = hex_chars[num & 0xf] + result
        num >>= 4
    RETURN result
```
