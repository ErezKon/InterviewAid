# 66. Plus One

**Difficulty:** 🟢 Easy
**Acceptance:** 45.0%
**LeetCode:** [https://leetcode.com/problems/plus-one](https://leetcode.com/problems/plus-one)
**Companies:** Accenture, Amazon, Bloomberg, Capgemini, Google, Ibm, Intuit, Meta, Microsoft, Tcs, Tiktok, Visa, Zoho

---

## 1. Problem Description

Given a large integer represented as an array of digits, increment it by one.

---

## 2. Approach: Right-to-Left Carry — O(n) ✅

```text
FUNCTION plusOne(digits):
    FOR i ← len(digits) - 1 DOWN TO 0:
        IF digits[i] < 9:
            digits[i] += 1
            RETURN digits
        digits[i] = 0
    RETURN [1] + digits    // overflow (e.g., 999 → 1000)
```

---

## 3. Examples

| Input | Output |
|-------|--------|
| `[1,2,3]` | `[1,2,4]` |
| `[9,9,9]` | `[1,0,0,0]` |
| `[0]` | `[1]` |

---

## 4. Walkthrough

Take `[9,9,9]`:
1. Start from the last digit (9). It is 9, set to 0.
2. Move left, next 9 → set to 0.
3. Move left, next 9 → set to 0.
4. All digits processed, prepend 1 → `[1,0,0,0]`.

---

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## 6. Follow-Up Questions

- How would you handle the number if it were represented as a linked list?
- Can you modify the algorithm to work in-place without extra space for the result array?

---

## Key Takeaway

> Handle carry propagation. If a digit < 9, increment and return immediately. If all digits are 9, prepend a 1.
