# 400. Nth Digit

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/nth-digit](https://leetcode.com/problems/nth-digit)
**Companies:** Accenture, Airbnb, Amazon, Google, Meta, Microsoft, Tiktok

---

## Problem Description
Given an integer `n`, return the `n^th` digit of the infinite integer sequence `[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, ...]`.

**Constraints:**

- `1 <= n <= 2^31 - 1`

## Examples

```
Example 1:
  Input: n = 3
  Output: 3
```

```
Example 2:
  Input: n = 11
  Output: 0
  Explanation: The 11th digit of the sequence 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, ... is a 0, which is part of the number 10.
```

## Approach
**Algorithm:** Determine the length block (1‑digit, 2‑digit, …) that contains the `n`‑th digit, then locate the exact number and digit within it.

```text
FUNCTION findNthDigit(n):
    SET digits ← 1               // current digit length
    SET count ← 9                // numbers with 'digits' length
    SET start ← 1                // first number with 'digits' length

    WHILE n > digits * count:
        SET n ← n - digits * count
        SET digits ← digits + 1
        SET count ← count * 10
        SET start ← start * 10

    // n now points inside the block of 'digits'-digit numbers
    SET num ← start + (n - 1) DIV digits   // target number
    SET digitIdx ← (n - 1) MOD digits      // position inside num
    CONVERT num TO string
    RETURN INTEGER VALUE OF CHARACTER AT digitIdx
```

## Walkthrough
Take `n = 15`:
1. 1‑digit block: 9 digits → `n = 15-9 = 6`.
2. Move to 2‑digit block (`digits=2`, `start=10`). `6 ≤ 2*90`, stop.
3. `num = 10 + (6-1) DIV 2 = 12`.
4. `digitIdx = (6-1) MOD 2 = 1` → second digit of "12" → **2** (actually the 15th digit is 2).

## Complexity Analysis
- **Time:** O(log n) – at most the number of digit groups.
- **Space:** O(1) – only constant extra variables.

## Follow‑Up Questions
- How would you adapt the solution for a base‑`b` numeral system?
- Can you compute the sum of digits in a range `[l, r]` efficiently?
- What if the sequence excluded numbers containing a certain digit?

## Key Takeaway
Identify the digit‑length block containing the target, then compute the exact number and digit using simple arithmetic.
