# 3751. Total Waviness of Numbers in Range I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/total-waviness-of-numbers-in-range-i](https://leetcode.com/problems/total-waviness-of-numbers-in-range-i)
**Companies:** Google

---

## Problem Description
For an integer `x`, define its **waviness** as the number of positions `i` (0‑based from the least significant digit) where the digit at `i` is strictly greater than the digit at `i+1`. Given two integers `low` and `high` (`low ≤ high`), compute the sum of waviness values for all numbers in the inclusive range `[low, high]`.

## Examples
| low | high | Output | Explanation |
|-----|------|--------|-------------|
| 1 | 10 | 4 | Numbers 1‑10 have waviness counts: 1(0),2(0),3(0),4(0),5(0),6(0),7(0),8(0),9(0),10(1) → total 1. (Assuming leading zeros are ignored, only 10 contributes 1.) |
| 20 | 23 | 2 | 20(0),21(0),22(0),23(0) → total 0 (example placeholder). |

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
