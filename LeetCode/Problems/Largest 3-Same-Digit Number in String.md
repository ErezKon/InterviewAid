# 2264. Largest 3-Same-Digit Number in String

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/largest-3-same-digit-number-in-string](https://leetcode.com/problems/largest-3-same-digit-number-in-string)
**Companies:** Bloomberg, Google, Meta, Opentext, Paypay

---

## 1. Problem Description

Find the largest "good integer" (3 consecutive identical digits) substring. Return `""` if none.

---

## 2. Approach — O(n) ✅

```
FUNCTION largestGoodInteger(num):
    FOR d IN '9876543210':
        IF d * 3 IN num: RETURN d * 3
    RETURN ""
```

| Time | Space |
|------|-------|
| O(10·n) = O(n) | O(1) |

---

## 3. Key Takeaway

> Check from '9' down to '0' — first match is the largest. Only 10 candidates to check.
