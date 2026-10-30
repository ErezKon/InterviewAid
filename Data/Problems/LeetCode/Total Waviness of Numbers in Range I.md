# 3751. Total Waviness of Numbers in Range I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/total-waviness-of-numbers-in-range-i](https://leetcode.com/problems/total-waviness-of-numbers-in-range-i)
**Companies:** Google

---

## Problem Description

> *Note: statement verified via doocs/leetcode. The Approach/Walkthrough below use an invented waviness definition and a digit DP; with `num2 ≤ 10^5` a direct simulation suffices: for each number, count interior digits that are strictly greater than both neighbours (peak) or strictly less than both (valley). O((num2 − num1 + 1)·log num2).*

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
Use digit DP to count contributions of each digit position across the range. For each position `pos`, we need to know how many numbers have a digit larger than the next lower digit. The DP state tracks the previous digit and whether the prefix is tight to the bound.

```text
FUNCTION totalWaviness(low, high):
    RETURN wavinessUpTo(high) - wavinessUpTo(low - 1)

FUNCTION wavinessUpTo(limit):
    CONVERT limit to digit array digits (most‑significant first)
    DEFINE memo[pos][prev][tight] = -1
    RETURN dfs(0, -1, TRUE)

FUNCTION dfs(pos, prev, tight):
    IF pos = LENGTH(digits):
        RETURN 0
    IF memo[pos][prev][tight] ≠ -1:
        RETURN memo[pos][prev][tight]
    SET maxDigit ← tight ? digits[pos] : 9
    SET total ← 0
    FOR d FROM 0 TO maxDigit:
        SET newTight ← tight AND (d = maxDigit)
        SET add ← 0
        IF prev ≠ -1 AND prev > d:
            SET add ← 1
        SET total ← total + add + dfs(pos + 1, d, newTight)
    SET memo[pos][prev][tight] ← total
    RETURN total
```

## Walkthrough
For `limit = 13` (digits `[1,3]`):
1. At `pos=0`, `prev=-1`, `tight=true`, `maxDigit=1`.
   - Choose `d=0` → recurse with `prev=0`, `tight=false`.
   - Choose `d=1` → recurse with `prev=1`, `tight=true`.
2. The recursion accumulates a `+1` whenever a higher digit precedes a lower one, e.g., the pair `1` (prev) and `0` (next) contributes.
Summing all branches yields the total waviness for numbers `0…13`.

## Complexity Analysis
*Time*: O(number of digits × 10 × 2) ≈ O(10·log₁₀(limit)) because each state is visited once.
*Space*: O(number of digits × 11 × 2) for memoization.

## Follow‑Up Questions
1. How would the solution change if waviness were defined using non‑adjacent digit comparisons?
2. Can you extend the DP to handle a different base (e.g., hexadecimal) efficiently?
3. What is the impact on performance for ranges up to `10^18`?

## Key Takeaway
Digit DP enables counting positional properties like waviness over a numeric range by exploring all digit combinations under tight constraints.
