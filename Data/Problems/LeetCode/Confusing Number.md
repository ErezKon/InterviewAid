# 1056. Confusing Number

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/confusing-number](https://leetcode.com/problems/confusing-number)
**Companies:** Google

---

## 1. Problem Description

A confusing number is one that, when rotated 180°, becomes a **different** valid number. Valid rotated digits: 0→0, 1→1, 6→9, 8→8, 9→6. Digits 2,3,4,5,7 are invalid. Return whether `n` is confusing.

---

## 2. Approach: Rotate and Compare — O(d) ✅

```text
FUNCTION confusingNumber(n):
    rotateMap ← {0:0, 1:1, 6:9, 8:8, 9:6}
    original ← n
    rotated ← 0
    WHILE n > 0:
        digit ← n % 10
        IF digit NOT IN rotateMap:
            RETURN false
        rotated ← rotated * 10 + rotateMap[digit]
        n ← n // 10
    RETURN rotated ≠ original
```

| Time | Space |
|------|-------|
| O(d) where d = number of digits | O(1) |

---

## Examples

**Example 1:**
```
Input: n = 6
Output: true
Explanation: 6 rotates to 9, which is different.
```

**Example 2:**
```
Input: n = 11
Output: false
Explanation: 11 rotates to 11, same as original.
```

---

## Walkthrough

Take `n = 69`.

| Step | n (remaining) | digit | rotated (so far) |
|------|---------------|-------|------------------|
| 1    | 69            | 9     | 6                |
| 2    | 6             | 6     | 69               |

After processing all digits, `rotated = 69` which equals original, so not confusing.

---

## Complexity Analysis

- **Time:** O(d) – each digit processed once.
- **Space:** O(1) – only constant extra variables.

---

## Follow-Up Questions

- How would you extend this to count all confusing numbers up to `n`?
- Can you modify the algorithm to handle a custom rotation mapping?
- What is the impact on complexity if the input size is extremely large (e.g., up to 10^18)?

---

## Key Takeaway

> Build the rotated number by reversing digits with the rotation map. It's confusing only if the result differs from the original.
