# 3751. Total Waviness of Numbers in Range I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/total-waviness-of-numbers-in-range-i](https://leetcode.com/problems/total-waviness-of-numbers-in-range-i)
**Companies:** Google

---

## Problem Description

> *Note: statement verified via doocs/leetcode.*

You are given two integers `num1` and `num2` representing an **inclusive** range `[num1, num2]`.

The **waviness** of a number is defined as the total count of its **peaks** and **valleys**:

- A digit is a **peak** if it is **strictly greater** than both of its immediate neighbors.
- A digit is a **valley** if it is **strictly less** than both of its immediate neighbors.
- The first and last digits of a number **cannot** be peaks or valleys.
- Any number with fewer than 3 digits has a waviness of 0.

Return the total sum of waviness for all numbers in the range `[num1, num2]`.

**Constraints:**
- `1 <= num1 <= num2 <= 10^5`

## Examples

**Example 1:**
```
Input: num1 = 120, num2 = 130
Output: 3
Explanation: In the range [120, 130]:
- 120: middle digit 2 is a peak, waviness = 1.
- 121: middle digit 2 is a peak, waviness = 1.
- 130: middle digit 3 is a peak, waviness = 1.
- All other numbers in the range have a waviness of 0.
Thus, total waviness is 1 + 1 + 1 = 3.
```

**Example 2:**
```
Input: num1 = 198, num2 = 202
Output: 3
Explanation: In the range [198, 202]:
- 198: middle digit 9 is a peak, waviness = 1.
- 201: middle digit 0 is a valley, waviness = 1.
- 202: middle digit 0 is a valley, waviness = 1.
- All other numbers in the range have a waviness of 0.
Thus, total waviness is 1 + 1 + 1 = 3.
```

**Example 3:**
```
Input: num1 = 4848, num2 = 4848
Output: 2
Explanation: Number 4848: the second digit 8 is a peak, and the third digit 4 is a valley, giving a waviness of 2.
```

## Approach
With `num2 ≤ 10^5` the range holds at most 10^5 numbers of at most 6 digits each, so direct simulation is fast. For each number, extract its digits and check every interior position `i` (not the first or last): it counts if `d[i]` is strictly greater than both `d[i-1]` and `d[i+1]` (peak) or strictly less than both (valley). Numbers with fewer than 3 digits have no interior positions and contribute 0 automatically.

```text
FUNCTION totalWaviness(num1, num2):
    total ← 0
    FOR x ← num1 TO num2
        d ← digits of x (most-significant first)
        FOR i ← 1 TO LENGTH(d) - 2
            IF (d[i] > d[i-1] AND d[i] > d[i+1]) OR (d[i] < d[i-1] AND d[i] < d[i+1])
                total ← total + 1          // peak or valley
    RETURN total
```

## Walkthrough
Example 2: `num1 = 198`, `num2 = 202` (only the middle digit can count):

| x | Digits | Middle digit vs neighbours | Waviness | Running total |
|---|--------|----------------------------|----------|---------------|
| 198 | 1,9,8 | 9 > 1 and 9 > 8 → peak | 1 | 1 |
| 199 | 1,9,9 | 9 not > 9 | 0 | 1 |
| 200 | 2,0,0 | 0 not < 0 | 0 | 1 |
| 201 | 2,0,1 | 0 < 2 and 0 < 1 → valley | 1 | 2 |
| 202 | 2,0,2 | 0 < 2 and 0 < 2 → valley | 1 | 3 |

Result = **3**, matching the expected output.

## Complexity Analysis
*Time*: O((num2 − num1 + 1) · log₁₀ num2) — at most ~6 digit checks per number.
*Space*: O(log₁₀ num2) for the digit array of one number.

## Follow-Up Questions
1. For ranges up to 10^15 (Part II), how would a digit DP with state (position, previous two digits, tight, started) count peaks and valleys?
2. How would you handle leading zeros correctly in such a digit DP?
3. Can you generalize to an arbitrary base `b`?

## Key Takeaway
When the range is small, a direct per-number scan of interior digits is the simplest correct solution; save digit DP for when the range becomes huge.
