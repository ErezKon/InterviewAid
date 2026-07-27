# 2259. Remove Digit From Number to Maximize Result

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/remove-digit-from-number-to-maximize-result](https://leetcode.com/problems/remove-digit-from-number-to-maximize-result)
**Companies:** Amazon, Bloomberg, Google, Infosys, Meta, Microsoft

---

```
FUNCTION removeDigit(number, digit):
    best = ""
    FOR i, c IN enumerate(number):
        IF c == digit:
            candidate = number[:i] + number[i+1:]
            IF candidate > best: best = candidate
    RETURN best
```
