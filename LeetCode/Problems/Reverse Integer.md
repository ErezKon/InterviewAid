# 7. Reverse Integer

**Difficulty:** 🟡 Medium
**Acceptance:** 29.0%
**LeetCode:** [https://leetcode.com/problems/reverse-integer](https://leetcode.com/problems/reverse-integer)
**Companies:** Accenture, Adobe, Amazon, Apple, Bloomberg, Capgemini, Cognizant, Epam Systems, Google, Ibm, Infosys, Linkedin, Lti, Meta, Microsoft, Oracle, Qualcomm, Tcs, Tech Mahindra, Uber, Walmart Labs, Wipro, Yandex

---

## 1. Problem Description

Given a signed 32-bit integer `x`, return `x` with its digits reversed. If reversing causes overflow (outside `[-2³¹, 2³¹ - 1]`), return `0`.

---

## 2. Examples

```
Example 1: Input: 123,  Output: 321
Example 2: Input: -123, Output: -321
Example 3: Input: 120,  Output: 21
```

---

## 3. Approach: Pop and Push Digits — O(log n) ✅

```
FUNCTION reverse(x):
    result = 0
    INT_MAX = 2^31 - 1      // 2147483647
    INT_MIN = -2^31          // -2147483648

    WHILE x != 0:
        digit = x % 10       // preserves sign in most languages
        x = x / 10           // truncate toward zero

        // Overflow check before pushing
        IF result > INT_MAX / 10 OR (result == INT_MAX / 10 AND digit > 7):
            RETURN 0
        IF result < INT_MIN / 10 OR (result == INT_MIN / 10 AND digit < -8):
            RETURN 0

        result = result * 10 + digit

    RETURN result
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(log₁₀ n) — number of digits |
| **Space** | O(1) |

---

## 5. Follow-Up Questions

### 5.1 String to Integer (atoi) (LeetCode #8)?

Parse string to integer with whitespace trimming, sign handling, and overflow clamping.

### 5.2 Palindrome Number (LeetCode #9)?

Reverse half the number and compare. If equal → palindrome.

---

## Key Takeaway

> The overflow check is the key challenge. Check **before** multiplying by 10 and adding, comparing against `INT_MAX/10` and `INT_MIN/10`.
