# 1012. Numbers With Repeated Digits

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/numbers-with-repeated-digits](https://leetcode.com/problems/numbers-with-repeated-digits)
**Companies:** Google, Jpmorgan

---

## Problem Description
Given a non‑negative integer `n`, return the count of positive integers in the range `[0, n]` that contain at least one repeated digit.

## Examples
| Input | Output | Explanation |
|-------|--------|-------------|
| 20    | 1      | Only `11` has repeated digits. |
| 100   | 10     | Numbers `11,22,33,44,55,66,77,88,99,100` have repeats. |
| 1000  | 262    | All numbers with any digit appearing more than once up to 1000. |

## Approach
**Digit DP (Dynamic Programming on Digits)**
The key insight is to count numbers **without** repeated digits and subtract from `n+1`.
1. Pre‑compute permutations for choosing distinct digits.
2. Process digits of `n` from most significant to least, tracking used digits with a mask.
3. For each position, try placing a smaller unused digit and add the number of ways to fill remaining positions.
4. If a digit repeats, stop early.

```text
FUNCTION countUniqueDigits(n):
    IF n < 0: RETURN 0
    digits ← LIST of digits of n
    m ← LENGTH(digits)
    // count numbers with length < m
    result ← 0
    FOR len FROM 1 TO m-1:
        result ← result + 9 * PERMUTATION(9, len-1)
    usedMask ← 0
    FOR i FROM 0 TO m-1:
        cur ← digits[i]
        start ← 1 IF i == 0 ELSE 0
        FOR d FROM start TO cur-1:
            IF (usedMask >> d) & 1 == 0:
                remaining ← m - i - 1
                result ← result + PERMUTATION(9 - i, remaining)
        IF (usedMask >> cur) & 1 == 1:
            RETURN result
        usedMask ← usedMask OR (1 << cur)
    RETURN result + 1  // include n itself

FUNCTION numbersWithRepeatedDigits(n):
    RETURN n + 1 - countUniqueDigits(n)
```

## Walkthrough
Consider `n = 321`:
| Step | Digit | Used Mask (binary) | Added Count |
|------|-------|-------------------|------------|
| 1    | 3     | 0000 → 1000       | Numbers with length <3: 9 + 9*9 = 90 |
| 2    | 2     | 1000 → 1100       | Digits <2 at position 1: {0,1} → add 8 |
| 3    | 1     | 1100 → 1110       | Digits <1 at position 2: {0} → add 1 |
| End  | -     | Reached end       | +1 for 321 itself |
Total unique = 90+8+1+1 = 100 → repeated = 322 - 100 = 222.

## Complexity Analysis
- Time: `O(L * 10)` where `L` is number of digits (≤10). 
- Space: `O(1)` for mask and counters.

## Follow‑Up Questions
1. How would you adapt the solution to count numbers with exactly `k` repeated digits?
2. Extend to handle a range `[low, high]` instead of `[0, n]`.
3. What changes are needed for bases other than decimal?

## Key Takeaway
Digit DP lets you efficiently count numbers with digit constraints by enumerating possibilities position‑by‑position while tracking used digits.
