# 2443. Sum of Number and Its Reverse

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/sum-of-number-and-its-reverse](https://leetcode.com/problems/sum-of-number-and-its-reverse)
**Companies:** Amazon

---

## Problem Description
Given an integer `num`, reverse its decimal digits to obtain `rev`. Return the sum `num + rev`. The reversal discards any leading zeros in `rev`.

## Examples
**Example 1:**
Input: num = 123
Output: 444
Explanation: rev = 321, sum = 123 + 321 = 444.

**Example 2:**
Input: num = 120
Output: 141
Explanation: rev = 21 (leading zero dropped), sum = 120 + 21 = 141.

## Approach
Iteratively extract digits of `num` using modulo and build the reversed number. Then add to the original.

```text
FUNCTION sumWithReverse(num):
    SET rev ← 0
    SET n ← num
    WHILE n > 0:
        SET digit ← n MOD 10
        SET rev ← rev * 10 + digit
        SET n ← n DIV 10
    RETURN num + rev
```

## Walkthrough
| Step | n | digit | rev |
|------|---|-------|-----|
| 1 | 123 | 3 | 3 |
| 2 | 12  | 2 | 32 |
| 3 | 1   | 1 | 321 |
After loop, return 123 + 321 = 444.

## Complexity Analysis
Time: O(k) where k is number of digits in `num`.
Space: O(1).

## Follow‑Up Questions
- How would you handle negative numbers?
- Can you compute the result without using extra variables for the reverse?
- What if the sum may overflow a 32‑bit integer?

## Key Takeaway
Reversing an integer can be done digit‑by‑digit with simple arithmetic, enabling an O(k) solution with constant space.
