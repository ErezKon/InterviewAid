# 3461. Check If Digits Are Equal in String After Operations I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/check-if-digits-are-equal-in-string-after-operations-i](https://leetcode.com/problems/check-if-digits-are-equal-in-string-after-operations-i)
**Companies:** Amazon, Google, Meta, Microsoft

---

## Problem Description
You are given a string `s` consisting of digits. Perform the following operation repeatedly until the string has **exactly** two digits:

- For each pair of consecutive digits in `s`, starting from the first digit, calculate a new digit as the sum of the two digits **modulo** 10.
- Replace `s` with the sequence of newly calculated digits, *maintaining the order* in which they are computed.

Return `true` if the final two digits in `s` are the **same**; otherwise, return `false`.

**Constraints:**
- `3 <= s.length <= 100`
- `s` consists of only digits.

## Examples
```
Example 1:
  Input: s = "3902"
  Output: true
  Explanation:
  - Initially, s = "3902"
  - First operation:
    - (s[0] + s[1]) % 10 = (3 + 9) % 10 = 2
    - (s[1] + s[2]) % 10 = (9 + 0) % 10 = 9
    - (s[2] + s[3]) % 10 = (0 + 2) % 10 = 2
    - s becomes "292"
  - Second operation:
    - (s[0] + s[1]) % 10 = (2 + 9) % 10 = 1
    - (s[1] + s[2]) % 10 = (9 + 2) % 10 = 1
    - s becomes "11"
  - Since the digits in "11" are the same, the output is true.
```

```
Example 2:
  Input: s = "34789"
  Output: false
  Explanation:
  - Initially, s = "34789".
  - After the first operation, s = "7157".
  - After the second operation, s = "862".
  - After the third operation, s = "48".
  - Since '4' != '8', the output is false.
```

## Approach
The operation is associative and commutative modulo 10, so the final two digits are determined by the sum of all digits modulo 10 and the parity of the length. A direct simulation works in O(n²) but can be optimized by observing that each step reduces length by one, and the result depends only on the total sum modulo 10.

```text
FUNCTION hasSameDigits(s):
    // Convert characters to integers
    SET digits ← LIST of integers from each character in s
    WHILE LENGTH(digits) > 2:
        SET newDigits ← EMPTY LIST
        FOR i ← 0 TO LENGTH(digits) - 2:
            SET sumMod ← (digits[i] + digits[i+1]) MOD 10
            APPEND sumMod TO newDigits
        SET digits ← newDigits
    RETURN digits[0] = digits[1]
```

## Walkthrough
Consider `s = "111"`:
1. Digits = [1,1,1]
2. Compute pair sums: (1+1)%10 = 2, (1+1)%10 = 2 → newDigits = [2,2]
3. Length is 2, compare: 2 == 2 → `true`.

## Complexity Analysis
- **Time:** O(n²) in the worst case because each iteration scans the current list, whose length decreases by one each step.
- **Space:** O(n) for storing the intermediate digit list.

## Follow-Up Questions
1. Can the process be expressed in closed form using combinatorial coefficients?
2. How would you handle very long strings efficiently (e.g., length 10⁶)?
3. Extend the operation to use a different modulus or a custom binary operation.

## Key Takeaway
Repeated pairwise modulo-10 summations eventually reduce the string to two digits whose equality can be checked directly; the process is governed by modular arithmetic properties.