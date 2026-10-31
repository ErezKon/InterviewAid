# 172. Factorial Trailing Zeroes

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/factorial-trailing-zeroes](https://leetcode.com/problems/factorial-trailing-zeroes)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description

Given an integer `n`, return *the number of trailing zeroes in* `n!`.

Note that `n! = n * (n - 1) * (n - 2) * ... * 3 * 2 * 1`.

**Constraints:**

- `0 <= n <= 10^4`

**Follow up:** Could you write a solution that works in logarithmic time complexity?

---

## Key Insight

> Trailing zeros come from factors of 10 = 2 × 5. There are always more 2s than 5s in n!, so count factors of 5. Numbers like 25, 125 contribute multiple 5s.

---

## Examples

```
Example 1:
  Input: n = 3
  Output: 0
  Explanation: 3! = 6, no trailing zero.
```

```
Example 2:
  Input: n = 5
  Output: 1
  Explanation: 5! = 120, one trailing zero.
```

```
Example 3:
  Input: n = 0
  Output: 0
```

---

## Approach: Count Factors of 5 — O(log n) ✅

```text
FUNCTION trailingZeroes(n):
    SET count ← 0
    WHILE n >= 5:
        SET n ← n / 5
        SET count ← count + n
    RETURN count
```

---

## Walkthrough

```
n = 100
  100/5 = 20 (multiples of 5)
  20/5 = 4   (multiples of 25, extra 5 each)
  4/5 = 0    → STOP
  count = 20 + 4 = 24 trailing zeros ✅
```

---

## Complexity Analysis

- **Time:** O(log₅ n) – repeatedly divide by 5.
- **Space:** O(1) – only a few variables.

---

## Follow-Up Questions

- How would you compute trailing zeros for factorials of very large numbers (beyond 64-bit)?
- Can you extend the method to count trailing zeros in other bases?

---

## Key Takeaway

> **Trailing zeros in n! = sum of ⌊n/5⌋ + ⌊n/25⌋ + ⌊n/125⌋ + ... Count factors of 5 at every power level.**