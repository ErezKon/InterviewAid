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

Given a number (as a string or integer), you can redistribute its digits to maximize the **sum of squares** of all digits. The digit sum must remain unchanged. Return the maximum sum of squares.

**Constraints:**
- Number can be very large (given as string).

---

## Examples

**Example 1:**
```
Input: "123"
Output: 82
Explanation: Digit sum = 1+2+3 = 6. Best redistribution is "600" (6,0,0) → 6² + 0² + 0² = 36. Actually using two 3s and a 0 gives 3²+3²+0² = 18, less. The optimal is three 2s: "222" → 2²+2²+2² = 12, still less. The maximum is achieved by using one 6 and two 0s → 36. Wait compute correctly: 6² = 36, but we can also use one 5 and one 1: 5²+1² = 26. So 36 is max.
```

**Example 2:**
```
Input: "999"
Output: 243
Explanation: Digit sum = 27. Use three 9s (already maximal) → 3 * 81 = 243.
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
