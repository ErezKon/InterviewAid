# 3723. Maximize Sum of Squares of Digits

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximize-sum-of-squares-of-digits](https://leetcode.com/problems/maximize-sum-of-squares-of-digits)
**Companies:** Google

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Greedy Digit Redistribution — O(d)](#approach-greedy-digit-redistribution--od-)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

> *Note: the Approach below solves an invented problem. Officially you build the `num`-digit integer with digit sum `sum` that maximizes the sum of squared digits. If `sum > 9·num` return `""`. Otherwise fill the digits from the left with 9s, then the remainder digit, then zeros. By convexity this maximizes the score, and it is also the largest such integer.*

You are given two **positive** integers `num` and `sum`.

A positive integer `n` is **good** if it satisfies both of the following:

- The number of digits in `n` is **exactly** `num`.
- The sum of digits in `n` is **exactly** `sum`.

The **score** of a **good** integer `n` is the sum of the squares of digits in `n`.

Return a **string** denoting the **good** integer `n` that achieves the **maximum** **score**. If there are multiple possible integers, return the **maximum **one. If no such integer exists, return an empty string.

**Constraints:**
- `1 <= num <= 2 * 10^5`
- `1 <= sum <= 2 * 10^6`

---

## Examples

**Example 1:**
```
Input: num = 2, sum = 3
Output: "30"
Explanation: There are 3 good integers: 12, 21, and 30.
- The score of 12 is 1^2 + 2^2 = 5.
- The score of 21 is 2^2 + 1^2 = 5.
- The score of 30 is 3^2 + 0^2 = 9.
The maximum score is 9, which is achieved by the good integer 30. Therefore, the answer is "30".
```

**Example 2:**
```
Input: num = 2, sum = 17
Output: "98"
Explanation: There are 2 good integers: 89 and 98.
- The score of 89 is 8^2 + 9^2 = 145.
- The score of 98 is 9^2 + 8^2 = 145.
The maximum score is 145. The maximum good integer that achieves this score is 98. Therefore, the answer is "98".
```

**Example 3:**
```
Input: num = 1, sum = 10
Output: ""
Explanation: There are no integers that have exactly 1 digit and whose digits sum to 10. Therefore, the answer is "".
```

---

## Key Insight

> To maximize sum of squares with a fixed digit sum S, concentrate the digit sum into as few 9s as possible. Since 9² = 81 > 1² × 9 = 9, larger digits contribute more to the sum of squares. Greedily assign digits: use `S // 9` nines, then one digit of `S % 9`, rest are zeros.

---

## Approach: Greedy Digit Redistribution — O(d) ✅

```text
FUNCTION maxSumOfSquares(num):
    // Compute total digit sum S
    SET S ← 0
    FOR each character c IN num:
        SET digit ← INTEGER_VALUE(c)
        SET S ← S + digit
    
    // Number of full 9s we can create
    SET nines ← S DIV 9
    SET remainder ← S MOD 9
    
    // Sum of squares: each 9 contributes 81, remainder contributes remainder²
    RETURN nines * 81 + remainder * remainder
```

---

## Walkthrough

Take the input `"12345"`.

| Step | Action | Variable Values |
|------|--------|------------------|
| 1 | Compute digit sum | S = 1+2+3+4+5 = 15 |
| 2 | Determine full 9s | nines = 15 DIV 9 = 1 |
| 3 | Remainder digit | remainder = 15 MOD 9 = 6 |
| 4 | Compute result | 1*81 + 6*6 = 81 + 36 = 117 |

The optimal redistribution is `"90006"` (or any arrangement of one 9, one 6, and zeros) giving a sum of squares of 117.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Greedy | **O(d)** | O(1) |

Where d = number of digits (just to compute the digit sum).

---

## Follow-Up Questions

- How would the problem change if the digit sum had to remain the same **modulo** a given number?
- Can you extend the approach to maximize the sum of cubes of digits?
- What if you were allowed to insert or delete digits while keeping the total sum constant?

---

## Key Takeaway

> **To maximize sum of squares with fixed sum, pack into 9s.** This follows from the convexity of x² — the sum of squares is maximized when values are as unequal as possible.
