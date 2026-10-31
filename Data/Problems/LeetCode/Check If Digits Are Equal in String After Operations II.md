# 3463. Check If Digits Are Equal in String After Operations II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/check-if-digits-are-equal-in-string-after-operations-ii](https://leetcode.com/problems/check-if-digits-are-equal-in-string-after-operations-ii)
**Companies:** Adp, Google

---

## Problem Description

You are given a string `s` consisting of digits. Perform the following operation repeatedly until the string has **exactly** two digits:

- For each pair of consecutive digits in `s`, starting from the first digit, calculate a new digit as the sum of the two digits **modulo** 10.
- Replace `s` with the sequence of newly calculated digits, *maintaining the order* in which they are computed.

Return `true` if the final two digits in `s` are the **same**; otherwise, return `false`.

**Constraints:**
- `3 <= s.length <= 10^5`
- `s` consists of only digits.

---

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

---

## Approach

**Algorithm:** Binomial Coefficients mod 10 — O(n)

The final two digits are linear combinations of the original digits with binomial coefficients modulo 10. Compute these coefficients using Lucas' theorem for mod 2 and mod 5, then combine via the Chinese Remainder Theorem.

```text
FUNCTION hasSameDigits(s):
    n ← LENGTH(s)
    diff ← 0
    FOR i FROM 0 TO n-1:
        coeff1 ← binomMod10(n-2, i)          // contribution to first final digit
        coeff2 ← binomMod10(n-2, i-1)        // contribution to second final digit
        diff ← (diff + s[i] * (coeff1 - coeff2)) % 10
    RETURN diff == 0
```

---

## Walkthrough

Consider the first example `s = "1234"` (n = 4).
| i | s[i] | C(2,i) mod 10 | C(2,i-1) mod 10 | coeff1-coeff2 |
|---|------|--------------|----------------|--------------|
|0|1|C(2,0)=1|C(2,-1)=0|1|
|1|2|C(2,1)=2|C(2,0)=1|1|
|2|3|C(2,2)=1|C(2,1)=2|-1 (≡9 mod 10)|
|3|4|C(2,3)=0|C(2,2)=1|-1 (≡9 mod 10)|

Compute `diff = (1*1 + 2*1 + 3*9 + 4*9) % 10 = 0`, so the final two digits are equal.

---

## Complexity Analysis

| Time | Space |
|------|-------|
| O(n) | O(1) |

The algorithm scans the string once and uses constant extra space.

---

## Follow-Up Questions

1. How would the solution change if the reduction used sum mod k for arbitrary k?
2. Can the approach be adapted for a circular reduction where the last and first digits are also paired?
3. What if we need to output the actual final two digits instead of just equality?

---

## Key Takeaway

Repeated pairwise reduction produces linear combinations with binomial coefficients. For large `n`, compute `C(n,k) mod p` via Lucas' theorem, then combine mod 2 and mod 5 results using CRT for mod 10.
