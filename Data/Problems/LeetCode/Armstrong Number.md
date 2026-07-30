# 1134. Armstrong Number

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/armstrong-number](https://leetcode.com/problems/armstrong-number)
**Companies:** Amazon

---

## 1. Problem Description

Given an integer `n`, determine if it is an Armstrong number. An Armstrong number of `k` digits satisfies: sum of each digit raised to the power `k` equals `n`.

---

## 2. Approach: Digit Extraction — O(k) ✅

```text
FUNCTION isArmstrong(n):
    SET digits ← LIST_OF_DIGITS(n)
    SET k ← LENGTH(digits)
    SET sum ← 0
    FOR d IN digits:
        SET sum ← sum + POWER(d, k)
    END FOR
    RETURN sum == n
```

---

## 3. Examples

**Example 1:**
```
Input: n = 153
Digits: [1,5,3], k = 3
1^3 + 5^3 + 3^3 = 153 → true
```

**Example 2:**
```
Input: n = 123
Digits: [1,2,3], k = 3
1^3 + 2^3 + 3^3 = 36 → false
```

---

## 4. Walkthrough

| Step | Operation | Digits | k | Computation | Result |
|------|-----------|--------|---|-------------|--------|
| 1 | Extract digits from 153 | [1,5,3] | 3 | 1^3 + 5^3 + 3^3 = 153 | true |
| 2 | Extract digits from 123 | [1,2,3] | 3 | 1^3 + 2^3 + 3^3 = 36 | false |

---

## 5. Complexity Analysis

- **Time:** O(k) where *k* is the number of digits.
- **Space:** O(k) to store the digits (can be O(1) if processed on the fly).

---

## 6. Follow-Up Questions

1. How would you handle very large numbers that cannot fit in standard integer types?
2. Can you generalize the check for different bases?
3. What is the count of Armstrong numbers for a given number of digits?

---

## Key Takeaway

> Convert to string (or extract digits), compute the sum of each digit^k, and compare with the original number.
