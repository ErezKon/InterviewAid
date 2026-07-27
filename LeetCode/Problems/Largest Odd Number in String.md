# 1903. Largest Odd Number in String

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/largest-odd-number-in-string](https://leetcode.com/problems/largest-odd-number-in-string)
**Companies:** Accenture, Amazon, Bloomberg, Google, Meta, Microsoft

---

## 1. Problem Description

Given a numeric string, return the largest-valued odd number that is a non-empty substring. Return `""` if none.

---

## 2. Approach: Find Rightmost Odd Digit — O(n) ✅

```
FUNCTION largestOddNumber(num):
    FOR i ← len(num) - 1 DOWN TO 0:
        IF int(num[i]) % 2 == 1:
            RETURN num[:i+1]
    RETURN ""
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## 3. Key Takeaway

> A number is odd iff its last digit is odd. The largest odd substring is the prefix ending at the rightmost odd digit.
