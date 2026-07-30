# 2719. Count of Integers

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-of-integers](https://leetcode.com/problems/count-of-integers)
**Companies:** Cisco, Goldman Sachs

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given two numeric strings `num1` and `num2` (representing integers with no leading zeros) and two integers `min_sum` and `max_sum`, return the number of integers `x` such that:
- `num1 <= x <= num2`
- `min_sum <= digit_sum(x) <= max_sum`

Return the answer modulo `10^9 + 7`.

**Constraints:**
- `1 <= num1 <= num2 <= 10^22` (given as strings)
- `1 <= min_sum <= max_sum <= 400`

---

## Examples

**Example 1:**
- **Input:** `num1 = "1", num2 = "12", min_sum = 1, max_sum = 8`
- **Output:** `11`
- **Explanation:** Numbers 1–12 whose digit sum is in [1, 8]: 1,2,3,4,5,6,7,8,10,11,12 (skip 9).

**Example 2:**
- **Input:** `num1 = "1", num2 = "5", min_sum = 1, max_sum = 5`
- **Output:** `5`
- **Explanation:** All of 1,2,3,4,5 have digit sums in [1, 5].

---

## Key Insight

The numbers can be up to 10^22 — iteration is impossible. This is a classic **digit DP** problem. We count numbers in `[0, num2]` with valid digit sums, subtract count in `[0, num1 - 1]`, using digit DP bounded by the string representation.

---

## Approach

Use **digit DP** with memoization. Define `count(numStr)` = count of integers in `[0, numStr]` whose digit sum is in `[min_sum, max_sum]`.

Answer = `count(num2) - count(num1 - 1)` (mod 10^9 + 7).

```
FUNCTION count(numStr, min_sum, max_sum):
    MOD = 10^9 + 7
    n = LENGTH(numStr)

    // dp(pos, digitSum, tight)
    // pos: current digit position
    // digitSum: sum of digits placed so far
    // tight: whether we're still bounded by numStr

    FUNCTION dp(pos, digitSum, tight):
        IF digitSum > max_sum THEN RETURN 0        // prune
        IF pos == n THEN
            RETURN 1 IF digitSum >= min_sum ELSE 0
        
        limit ← numStr[pos] IF tight ELSE 9
        result ← 0

        FOR d ← 0 TO limit DO
            result += dp(pos + 1, digitSum + d, tight AND d == limit)
            result %= MOD

        RETURN result

    RETURN dp(0, 0, TRUE)

FUNCTION solve(num1, num2, min_sum, max_sum):
    // Subtract 1 from num1 as a string
    num1minus1 ← subtractOne(num1)
    ans ← (count(num2) - count(num1minus1)) % MOD
    RETURN (ans + MOD) % MOD
```

---

## Walkthrough

**Input:** `num1 = "1", num2 = "12", min_sum = 1, max_sum = 8`

**count("12"):** Digit DP over positions of "12":
- pos=0: d ∈ {0, 1} (tight to '1')
  - d=0, tight=false → pos=1: d ∈ {0..9}, digitSum = d. Valid if 1 ≤ d ≤ 8 → 8 numbers (1–8... but these are 01–09 = 1–9, minus 9 since sum=9 > 8) → numbers 1,2,3,4,5,6,7,8 = 8
  - d=1, tight=true → pos=1: d ∈ {0..2}, digitSum = 1+d. Valid if 1 ≤ 1+d ≤ 8 → all of {10,11,12} valid → 3
- Total count("12") = 0 (for x=0) + 8 + 3 = 11

**count("0"):** Only x=0, digit sum=0, not in [1,8] → 0

**Answer:** 11 - 0 = **11** ✅

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n × max_sum × 10) where n = length of num string |
| **Space** | O(n × max_sum) for memoization |

With n ≤ 23 and max_sum ≤ 400: ~23 × 400 × 10 ≈ 92,000 operations.

---

## Follow-Up Questions

**Q1: Why digit DP instead of brute force?**
Numbers go up to 10^22 — far too large to iterate. Digit DP processes one digit at a time, reducing the state space to O(n × max_sum).

**Q2: How do you handle "subtract 1 from a string number"?**
Process right-to-left: decrement the last non-zero digit, set all trailing zeros to 9. Handle borrow propagation. Special case: "1" → "0".

**Q3: Can this be solved with inclusion-exclusion?**
You could split into count(sum ≤ max_sum) - count(sum ≤ min_sum - 1), each being a simpler digit DP. This separates the two bounds.

**Q4: What if we need the count modulo a different prime?**
The structure is the same — just change the MOD constant. The digit DP itself doesn't depend on the modulus.

---

## Key Takeaway

> **Digit DP is the go-to technique when counting integers in a range satisfying digit-level constraints. The state is (position, accumulated property, tight bound), and pruning on the accumulated property keeps it efficient.**
