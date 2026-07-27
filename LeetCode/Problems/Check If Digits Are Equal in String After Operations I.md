# 3461. Check If Digits Are Equal in String After Operations I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/check-if-digits-are-equal-in-string-after-operations-i](https://leetcode.com/problems/check-if-digits-are-equal-in-string-after-operations-i)
**Companies:** Amazon, Google, Meta, Microsoft

---

```
FUNCTION hasSameDigits(s):
    digits = [int(c) for c in s]
    WHILE len(digits) > 2:
        digits = [(digits[i] + digits[i+1]) % 10 for i in range(len(digits)-1)]
    RETURN digits[0] == digits[1]
```
