# 66. Plus One

**Difficulty:** 🟢 Easy
**Acceptance:** 45.0%
**LeetCode:** [https://leetcode.com/problems/plus-one](https://leetcode.com/problems/plus-one)
**Companies:** Accenture, Amazon, Bloomberg, Capgemini, Google, Ibm, Intuit, Meta, Microsoft, Tcs, Tiktok, Visa, Zoho

---

## 1. Problem Description

You are given a **large integer** represented as an integer array `digits`, where each `digits[i]` is the `i`th digit of the integer. The digits are ordered from most significant to least significant in left-to-right order. The large integer does not contain any leading `0`'s.

Increment the large integer by one and return *the resulting array of digits*.

**Constraints:**
- `1 <= digits.length <= 100`
- `0 <= digits[i] <= 9`
- `digits` does not contain any leading `0`'s.

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

**Example 1:**
```
Input: digits = [1,2,3]
Output: [1,2,4]
Explanation: The array represents the integer 123.
Incrementing by one gives 123 + 1 = 124.
Thus, the result should be [1,2,4].
```

**Example 2:**
```
Input: digits = [4,3,2,1]
Output: [4,3,2,2]
Explanation: The array represents the integer 4321.
Incrementing by one gives 4321 + 1 = 4322.
Thus, the result should be [4,3,2,2].
```

**Example 3:**
```
Input: digits = [9]
Output: [1,0]
Explanation: The array represents the integer 9.
Incrementing by one gives 9 + 1 = 10.
Thus, the result should be [1,0].
```

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
