# 3448. Count Substrings Divisible By Last Digit

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-substrings-divisible-by-last-digit](https://leetcode.com/problems/count-substrings-divisible-by-last-digit)
**Companies:** Google

---

## Problem Description

You are given a string `s` consisting of digits.

Return the **number** of substrings of `s` **divisible** by their **non-zero** last digit.

**Note:** A substring may contain leading zeros.

**Constraints:**
- `1 <= s.length <= 10^5`
- `s` consists of digits only.

---

## Examples

```
Example 1:
  Input: s = "12936"
  Output: 11
  Explanation: Substrings "29", "129", "293" and "2936" are not divisible by their last digit.
  There are 15 substrings in total, so the answer is 15 - 4 = 11.
```

```
Example 2:
  Input: s = "5701283"
  Output: 18
  Explanation: Substrings "01", "12", "701", "012", "128", "5701", "7012", "0128", "57012", "70128", "570128", and "701283" are all divisible by their last digit.
  Additionally, all substrings that are just 1 non-zero digit are divisible by themselves. Since there are 6 such digits, the answer is 12 + 6 = 18.
```

```
Example 3:
  Input: s = "1010101010"
  Output: 25
  Explanation: Only substrings that end with digit '1' are divisible by their last digit. There are 25 such substrings.
```

---

## Walkthrough

Consider `s = "303"`.

1. Enumerate all substrings:
   - `"3"` (last digit 3, 3%3=0) ✅
   - `"30"` (last digit 0 → invalid, skip)
   - `"303"` (last digit 3, 303%3=0) ✅
   - `"0"` (last digit 0 → invalid)
   - `"03"` (last digit 3, 3%3=0) ✅
   - `"3"` (second position, same as first) ✅
2. Count the valid ones → 4.

---

## Key Insight

For each ending position `j`, the last digit `d = s[j]`. We need substrings `s[i..j]` where the number formed is divisible by `d`. Track running remainders mod `d` as you extend substrings leftward, or use prefix-based modular arithmetic.

Since `d` ranges from 1-9, handle each divisor separately with modular prefix sums.

---

## Approach

```
FUNCTION countSubstrings(s):
    n = LENGTH(s)
    result = 0

    FOR d ← 1 TO 9 DO
        // Count substrings ending with digit d, divisible by d
        // Track prefix values mod d
        freqMod = [0] * d
        prefixMod = 0
        FOR j ← 0 TO n - 1 DO
            prefixMod = (prefixMod * 10 + INT(s[j])) % d
            IF INT(s[j]) == d:
                result += freqMod[prefixMod]
                IF prefixMod == 0: result += 1
            // Update freq based on current position's digit
            // ... (detailed implementation requires power tracking)

    RETURN result
```

*Note: Full implementation requires careful handling of 10^k mod d for each divisor.*

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(9 × n) = O(n) |
| **Space** | O(9) = O(1) |

---

## Key Takeaway

> **Substring divisibility by the last digit: enumerate divisors 1-9 separately, use modular prefix sums. The small divisor range (1-9) keeps the approach efficient.**