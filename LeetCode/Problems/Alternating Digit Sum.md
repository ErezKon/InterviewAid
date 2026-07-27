# 2544. Alternating Digit Sum

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/alternating-digit-sum](https://leetcode.com/problems/alternating-digit-sum)
**Companies:** Amazon, Capital One, Ebay, Visa
---

## Problem Description
Given a non‑negative integer `n`, compute the sum of its digits where the sign of each digit alternates starting with a positive sign for the most significant digit. Formally, if the digits of `n` are `d₀ d₁ … d_k` from left to right, return `d₀ - d₁ + d₂ - d₃ + …`.

## Examples
**Example 1:**
```
Input: n = 521
Output: 5 - 2 + 1 = 4
```
**Example 2:**
```
Input: n = 111
Output: 1 - 1 + 1 = 1
```

## Approach
Extract digits from most significant to least significant, then iterate while toggling a sign variable.

```text
FUNCTION alternatingDigitSum(n):
    SET digits ← []
    WHILE n > 0:
        PREPEND n MOD 10 TO digits
        SET n ← n DIV 10
    SET total ← 0
    SET sign ← 1
    FOR d IN digits:
        SET total ← total + sign * d
        SET sign ← sign * -1
    RETURN total
```

## Walkthrough
For `n = 521`:
1. Extract digits → `[5,2,1]`.
2. total = 0, sign = 1.
3. Add `5*1` → total=5, sign=-1.
4. Add `2*(-1)` → total=3, sign=1.
5. Add `1*1` → total=4.
Result = 4.

## Complexity Analysis
- **Time:** O(d) where d is the number of digits (≤ 10 for 32‑bit ints).
- **Space:** O(d) for the digit list (can be O(1) if processed on the fly).

## Follow‑Up Questions
1. How would you compute the result without storing all digits?
2. Can the same idea be applied to alternating sum of bits in a binary representation?
3. What if the sign starts negative instead of positive?

## Key Takeaway
A simple sign toggle while traversing digits yields the alternating sum in linear time.
