# 3032. Count Numbers With Unique Digits II

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-numbers-with-unique-digits-ii](https://leetcode.com/problems/count-numbers-with-unique-digits-ii)
**Companies:** Amazon

---

## Problem Description
Given an integer `n`, return the count of all non‑negative integers less than `10^n` where each digit is unique (no repeated digits). Leading zeros are allowed only for the number zero itself.

## Examples
**Example 1**
```
Input: n = 2
Output: 91
Explanation: The numbers are 0‑9 and 10‑98 excluding 11,22,…,99.
```
**Example 2**
```
Input: n = 1
Output: 10
Explanation: All single‑digit numbers 0‑9 are valid.
```

## Approach
Count numbers by length. For length `len` (1 ≤ len ≤ n):
- First digit: 9 choices (1‑9) if len>1, otherwise 10 choices (0‑9).
- Subsequent digits: choose from remaining 9,8,… options.
Sum these counts for all lengths.

```text
FUNCTION countNumbersWithUniqueDigits(n):
    IF n == 0:
        RETURN 1  // only number 0
    SET total ← 1  // count for 0
    FOR len FROM 1 TO n:
        SET count ← 9
        SET available ← 9
        FOR i FROM 2 TO len:
            SET count ← count * available
            SET available ← available - 1
        SET total ← total + count
    RETURN total
```

## Walkthrough
For `n = 2`:
- Length 1: 10 numbers (0‑9) → total = 10.
- Length 2: first digit 9 choices (1‑9), second digit 9 choices (0‑9 except first) → 9 × 9 = 81.
- Sum = 10 + 81 = 91.

## Complexity Analysis
- **Time:** O(n) – iterate over possible lengths.
- **Space:** O(1) – only a few integer variables.

## Follow-Up Questions
1. How would you adapt the solution for base b numbers instead of decimal?
2. Can you compute the result modulo a large prime for very large `n`?
3. What changes if leading zeros are allowed for all numbers?

## Key Takeaway
Counting unique‑digit numbers reduces to a simple combinatorial product for each length, avoiding enumeration.
