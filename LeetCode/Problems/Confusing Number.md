# 1056. Confusing Number

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/confusing-number](https://leetcode.com/problems/confusing-number)
**Companies:** Google

---

## 1. Problem Description

A confusing number is one that, when rotated 180°, becomes a **different** valid number. Valid rotated digits: 0→0, 1→1, 6→9, 8→8, 9→6. Digits 2,3,4,5,7 are invalid. Return whether `n` is confusing.

---

## 2. Approach: Rotate and Compare — O(d) ✅

```
FUNCTION confusingNumber(n):
    rotateMap = {0:0, 1:1, 6:9, 8:8, 9:6}
    original = n
    rotated = 0
    WHILE n > 0:
        digit = n % 10
        IF digit NOT IN rotateMap: RETURN false
        rotated = rotated * 10 + rotateMap[digit]
        n /= 10
    RETURN rotated != original
```

| Time | Space |
|------|-------|
| O(d) where d = number of digits | O(1) |

---

## Key Takeaway

> Build the rotated number by reversing digits with the rotation map. It's confusing only if the result differs from the original.
