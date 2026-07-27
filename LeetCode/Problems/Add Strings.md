# 415. Add Strings

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/add-strings](https://leetcode.com/problems/add-strings)
**Companies:** Airbnb, Amazon, Bloomberg, Capital One, Google, Jane Street, Meta, Microsoft, Oracle, Tiktok, Uber, Visa, Wayfair, Yandex

---

## Problem Description
Given two non‑negative integers represented as decimal strings `num1` and `num2`, return their sum as a string. The input strings contain only digits and have no leading zeros unless the number itself is zero.

## Examples
**Example 1**
Input: `num1 = "123", num2 = "456"`
Output: `"579"`
Explanation: 123 + 456 = 579.

**Example 2**
Input: `num1 = "999", num2 = "1"`
Output: `"1000"`
Explanation: Adding with carry creates a new most‑significant digit.

## Approach
**Algorithm:** Simulate elementary addition from right to left with a carry.
1. Initialise pointers `i` and `j` at the ends of `num1` and `num2`.
2. While any pointer is valid or there is a carry, compute the digit sum, append `sum % 10` to a result list, and update the carry as `sum / 10`.
3. Reverse the result list and join to form the answer string.

## Walkthrough
| Step | i | j | carry | sum | result (reversed) |
|------|---|---|-------|-----|-------------------|
| 1 | 2 | 2 | 0 | 3+6+0=9 | [9] |
| 2 | 1 | 1 | 0 | 2+5+0=7 | [9,7] |
| 3 | 0 | 0 | 0 | 1+4+0=5 | [9,7,5] |
| 4 | -1| -1| 0 | stop | reverse → "579" |

## Complexity Analysis
- **Time:** O(max(m, n)) where m and n are the lengths of the two strings.
- **Space:** O(max(m, n)) for the result list.

## Follow‑Up Questions
1. How would you adapt the solution to add numbers in bases other than 10?
2. Can you perform the addition in place if the strings are mutable arrays?
3. What changes are needed to add three or more numbers simultaneously?

## Key Takeaway
Adding two numeric strings is a straightforward digit‑by‑digit simulation using pointers and a carry, mirroring manual addition.

---

```text
FUNCTION addStrings(num1, num2):
    i ← len(num1) - 1
    j ← len(num2) - 1
    carry ← 0
    result ← []
    WHILE i >= 0 OR j >= 0 OR carry != 0:
        sum ← carry
        IF i >= 0:
            sum ← sum + int(num1[i])
            i ← i - 1
        IF j >= 0:
            sum ← sum + int(num2[j])
            j ← j - 1
        APPEND (sum % 10) TO result
        carry ← sum / 10
    REVERSE result
    RETURN JOIN(result) AS STRING
```