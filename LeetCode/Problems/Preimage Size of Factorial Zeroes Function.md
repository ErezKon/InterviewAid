# 793. Preimage Size of Factorial Zeroes Function

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/preimage-size-of-factorial-zeroes-function](https://leetcode.com/problems/preimage-size-of-factorial-zeroes-function)
**Companies:** Adobe

---

## Problem Description
Given an integer `k`, return the number of non‑negative integers `x` such that the number of trailing zeroes in `x!` (factorial of `x`) is exactly `k`. The answer is either `0` or `5`.

## Examples
**Example 1:**
```
Input: k = 0
Output: 5
Explanation: The numbers 0, 1, 2, 3, 4 all have 0 trailing zeroes.
```
**Example 2:**
```
Input: k = 5
Output: 0
Explanation: No factorial has exactly 5 trailing zeroes.
```
**Example 3:**
```
Input: k = 3
Output: 5
Explanation: The numbers 15, 16, 17, 18, 19 each have 3 trailing zeroes.
```

## Approach
**Algorithm:** Binary search for the lower bound of `k` and `k+1` using the trailing‑zeroes function; the difference gives the count.
**Key Insight:** The function `Z(n)` = number of trailing zeroes in `n!` is monotonic and increases by 1 at multiples of 5, except for jumps caused by higher powers of 5. Therefore the set of `n` with a given `k` is either empty or a contiguous block of length 5.

```text
FUNCTION trailingZeroes(n):
    count ← 0
    WHILE n ≥ 5:
        n ← n DIV 5
        count ← count + n
    RETURN count

FUNCTION lowerBound(target):
    lo ← 0
    hi ← 5 * target + 5   // safe upper bound
    WHILE lo < hi:
        mid ← (lo + hi) DIV 2
        IF trailingZeroes(mid) ≥ target:
            hi ← mid
        ELSE:
            lo ← mid + 1
    RETURN lo

FUNCTION preimageSizeFZF(k):
    RETURN lowerBound(k + 1) - lowerBound(k)
```

## Walkthrough
For `k = 3`:
1. `lowerBound(3)` finds the smallest `n` with at least 3 zeroes → `n = 15`.
2. `lowerBound(4)` finds the smallest `n` with at least 4 zeroes → `n = 20`.
3. Difference `20 - 15 = 5` → exactly five numbers (15‑19) have 3 trailing zeroes.
For `k = 5` the two bounds are equal, yielding `0`.

## Complexity Analysis
- **Time:** O(log M) where `M` is the search range (≈ 5·k), because each bound uses binary search and each `trailingZeroes` call is O(log₅ n).
- **Space:** O(1) extra space.

## Follow‑Up Questions
1. How would you adapt the solution for a different base (e.g., trailing zeroes in base‑b factorials)?
2. Can you prove that the answer is never greater than 5 without binary search?
3. What changes are needed if `k` can be as large as 10¹⁸ (requiring 64‑bit arithmetic)?

## Key Takeaway
The monotonic nature of the trailing‑zeroes function lets us locate the exact block of numbers with `k` zeroes via two binary‑search bounds; the block size is either 0 or 5.
