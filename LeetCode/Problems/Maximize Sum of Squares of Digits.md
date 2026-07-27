# 3723. Maximize Sum of Squares of Digits

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximize-sum-of-squares-of-digits](https://leetcode.com/problems/maximize-sum-of-squares-of-digits)
**Companies:** Google

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Greedy Digit Redistribution — O(d)](#approach-greedy-digit-redistribution--od-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a number (as a string or integer), you can redistribute its digits to maximize the **sum of squares** of all digits. The digit sum must remain unchanged. Return the maximum sum of squares.

**Constraints:**
- Number can be very large (given as string).

---

## Key Insight

> To maximize sum of squares with a fixed digit sum S, concentrate the digit sum into as few 9s as possible. Since 9² = 81 > 1² × 9 = 9, larger digits contribute more to the sum of squares. Greedily assign digits: use `S // 9` nines, then one digit of `S % 9`, rest are zeros.

---

## Approach: Greedy Digit Redistribution — O(d) ✅

```
FUNCTION maxSumOfSquares(num):
    S = SUM(digits of num)
    nines = S // 9
    remainder = S % 9
    RETURN nines * 81 + remainder * remainder
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Greedy | **O(d)** | O(1) |

Where d = number of digits (just to compute the digit sum).

---

## Key Takeaway

> **To maximize sum of squares with fixed sum, pack into 9s.** This follows from the convexity of x² — the sum of squares is maximized when values are as unequal as possible.
