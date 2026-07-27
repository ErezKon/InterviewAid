# 344. Reverse String

**Difficulty:** 🟢 Easy
**Acceptance:** 79.0%
**LeetCode:** [https://leetcode.com/problems/reverse-string](https://leetcode.com/problems/reverse-string)
**Companies:** Accenture, Amazon, Apple, Bloomberg, Epam Systems, Garmin, Goldman Sachs, Google, Hcl, Infosys, Meta, Microsoft, Nvidia, Qualcomm, Tcs

---

## 1. Problem Description

Write a function that reverses a character array in-place with O(1) extra memory.

---

## 2. Approach: Two Pointers — O(n) ✅

```
FUNCTION reverseString(s):
    left, right = 0, len(s) - 1
    WHILE left < right:
        SWAP(s[left], s[right])
        left += 1
        right -= 1
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## Key Takeaway

> The simplest two-pointer problem. Swap from both ends toward the center.
