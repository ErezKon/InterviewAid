# 2443. Sum of Number and Its Reverse

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/sum-of-number-and-its-reverse](https://leetcode.com/problems/sum-of-number-and-its-reverse)
**Companies:** Amazon

---

## Problem Description

> *Note: the Approach/Walkthrough below compute `num + reverse(num)`; the official problem asks whether `num` **can be written** as `k + reverse(k)`. Correct idea: brute force `k` from `0` to `num` and return `true` if `k + reverse(k) == num`. O(num · digits).*

Given a **non-negative** integer `num`, return `true` *if* `num` *can be expressed as the sum of any **non-negative** integer and its reverse, or* `false` *otherwise.*

**Constraints:**
- `0 <= num <= 10^5`

## Examples

**Example 1:**
```
Input: num = 443
Output: true
Explanation: 172 + 271 = 443 so we return true.
```

**Example 2:**
```
Input: num = 63
Output: false
Explanation: 63 cannot be expressed as the sum of a non-negative integer and its reverse so we return false.
```

**Example 3:**
```
Input: num = 181
Output: true
Explanation: 140 + 041 = 181 so we return true. Note that when a number is reversed, there may be leading zeros.
```

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
