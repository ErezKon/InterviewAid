# 405. Convert a Number to Hexadecimal

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/convert-a-number-to-hexadecimal](https://leetcode.com/problems/convert-a-number-to-hexadecimal)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Tcs

---

## Problem Description
Given a 32-bit integer `num`, return *a string representing its hexadecimal representation*. For negative integers, [two's complement](https://en.wikipedia.org/wiki/Two%27s_complement) method is used.

All the letters in the answer string should be lowercase characters, and there should not be any leading zeros in the answer except for the zero itself.

**Note:** You are not allowed to use any built-in library method to directly solve this problem.

**Constraints:**
- `-2^31 <= num <= 2^31 - 1`

## Examples
```
Example 1:
  Input: num = 26
  Output: "1a"
```
```
Example 2:
  Input: num = -1
  Output: "ffffffff"
```

## Approach
Handle the zero case directly. For negative numbers, add 2^32 to obtain the unsigned value. Repeatedly extract the lowest 4 bits (a hex digit) using bitwise AND with `0xf`, map it to the corresponding character, and shift right by 4 bits.

```text
FUNCTION toHex(num):
    IF num = 0:
        RETURN "0"
    IF num < 0:
        SET num ← num + 2^32   // two's complement conversion
    SET hexChars ← "0123456789abcdef"
    SET result ← ""
    WHILE num > 0:
        SET digit ← num AND 0xf
        SET result ← hexChars[digit] + result
        SET num ← num SHIFT_RIGHT 4
    RETURN result
```

## Walkthrough
| Iteration | num (before) | digit (num AND 0xf) | char | result | num (after shift) |
|-----------|--------------|---------------------|------|--------|-------------------|
| 1 | 26 | 10 | a | "a" | 1 |
| 2 | 1 | 1 | 1 | "1a" | 0 |

## Complexity Analysis
- **Time:** O(k) where k is the number of hex digits (≤ 8 for 32‑bit integers).
- **Space:** O(k) for the output string.

## Follow‑Up Questions
1. How would you adapt the solution for 64‑bit integers?
2. Can you implement the conversion without using a lookup string?
3. How would you handle uppercase hexadecimal output?

## Key Takeaway
Extracting 4‑bit groups with bitwise operations yields a simple, constant‑time conversion from integer to hexadecimal.
