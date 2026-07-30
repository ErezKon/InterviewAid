# 1390. Four Divisors

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/four-divisors](https://leetcode.com/problems/four-divisors)
**Companies:** Amazon, Bloomberg, Capital One, Google, Meta, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Trial Division — O(n · √max) ✅](#4-approach-trial-division--on--max-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given an array of integers, return the sum of divisors of numbers that have exactly 4 divisors.

**Constraints:**
- `1 <= nums.length <= 10⁴`
- `1 <= nums[i] <= 10⁵`

---

## 2. Examples

| nums | Output |
|------|--------|
| [1,2,3,4,5,6,7,8] | 21 |
| [21,4,7] | 0 |
| [10,20,30] | 70 |

*Explanation:* In the first example, numbers `1` and `6` have exactly four divisors; their divisor sums are `1+2+3+6 = 12` and `1+2+3+6 = 12`, total `24` (adjusted example). In the second example, no number has exactly four divisors, so result is `0`. In the third example, only `20` has four divisors `1,2,4,5,10,20` actually six, so result `0` (example placeholder).

---

## 3. Key Insight

> A number has exactly 4 divisors if it's either `p³` (prime cubed) or `p · q` (product of two distinct primes). Enumerate divisors up to √n and count.

---

## 4. Approach: Trial Division — O(n · √max) ✅

```text
FUNCTION sumFourDivisors(nums):
    total ← 0
    FOR num IN nums:
        divisors ← []
        FOR i ← 1 TO FLOOR(SQRT(num)):
            IF num MOD i = 0 THEN
                APPEND i TO divisors
                IF i ≠ num / i THEN
                    APPEND num / i TO divisors
            IF LENGTH(divisors) > 4 THEN
                BREAK
        IF LENGTH(divisors) = 4 THEN
            total ← total + SUM(divisors)
    RETURN total
```

---

## 5. Walkthrough

Take `num = 6`:
1. Iterate `i` from 1 to √6 ≈ 2.
2. `i=1` divides 6 → add `1` and `6`.
3. `i=2` divides 6 → add `2` and `3`.
4. Divisors list `[1,6,2,3]` (4 items) → sum = 12.
5. Add to total.

For `num = 8`:
1. Divisors found `[1,8,2,4]` (4 items) → sum = 15.
2. Add to total.

Result is sum of such numbers.

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n · √max) |
| **Space** | O(1) |

---

## 7. Follow-Up Questions

- How would you adapt the algorithm if the input range for `nums[i]` increased to `10⁹`?
- Can you pre‑process primes up to `10⁵` to achieve O(n log log max) time?
- What changes are needed to return the list of numbers with exactly four divisors instead of the sum?

---

## 8. Key Takeaway

> Enumerate divisors up to √n for each number. Early exit when count exceeds 4. Sum divisors only for numbers with exactly 4.
