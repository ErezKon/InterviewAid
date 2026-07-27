# 393. UTF-8 Validation

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/utf-8-validation](https://leetcode.com/problems/utf-8-validation)
**Companies:** Google, Meta, Snapchat, Tesla

---

```
FUNCTION validUtf8(data):
    remaining = 0
    FOR byte IN data:
        IF remaining > 0:
            IF byte >> 6 != 0b10: RETURN false
            remaining -= 1
        ELSE IF byte >> 7 == 0: remaining = 0
        ELSE IF byte >> 5 == 0b110: remaining = 1
        ELSE IF byte >> 4 == 0b1110: remaining = 2
        ELSE IF byte >> 3 == 0b11110: remaining = 3
        ELSE: RETURN false
    RETURN remaining == 0
```
