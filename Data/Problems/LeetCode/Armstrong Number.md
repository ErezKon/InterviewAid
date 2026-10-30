# 1134. Armstrong Number

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/armstrong-number](https://leetcode.com/problems/armstrong-number)
**Companies:** Amazon

---

## 1. Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

Given an integer `n`, return `true` *if and only if it is an **Armstrong number***.

The `k`-digit number `n` is an Armstrong number if and only if the `k^th` power of each digit sums to `n`.

**Constraints:**
- `1 <= n <= 10^8`

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
Output: true
Explanation: 153 is a 3-digit number, and 153 = 1^3 + 5^3 + 3^3.
```

**Example 2:**
```
Input: n = 123
Output: false
Explanation: 123 is a 3-digit number, and 123 != 1^3 + 2^3 + 3^3 = 36.
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
