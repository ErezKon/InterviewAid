# 1058. Minimize Rounding Error to Meet Target

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimize-rounding-error-to-meet-target](https://leetcode.com/problems/minimize-rounding-error-to-meet-target)
**Companies:** Airbnb

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an array of `prices` `[p1,p2...,pn]` and a `target`, round each price `pi` to `Roundi(pi)` so that the rounded array `[Round1(p1),Round2(p2)...,Roundn(pn)]` sums to the given `target`. Each operation `Roundi(pi)` could be either `Floor(pi)` or `Ceil(pi)`.

Return the string `"-1"` if the rounded array is impossible to sum to `target`. Otherwise, return the smallest rounding error, which is defined as `Σ |Roundi(pi) - (pi)|` for `i` from `1` to `n`, as a string with three places after the decimal.

**Constraints:**
- `1 ≤ prices.length ≤ 500`
- Each string `prices[i]` represents a real number in the range `[0.0, 1000.0]` and has exactly 3 decimal places.
- `0 ≤ target ≤ 10⁶`

---

## Examples

```
Example 1:
  Input: prices = ["0.700","2.800","4.900"], target = 8
  Output: "1.000"
  Explanation:
  Use Floor, Ceil and Ceil operations to get (0.7 - 0) + (3 - 2.8) + (5 - 4.9) = 0.7 + 0.2 + 0.1 = 1.0 .
```

```
Example 2:
  Input: prices = ["1.500","2.500","3.500"], target = 10
  Output: "-1"
  Explanation: It is impossible to meet the target.
```

```
Example 3:
  Input: prices = ["1.500","2.500","3.500"], target = 9
  Output: "1.500"
```

---

## Approach

**Algorithm:** Greedy selection of prices to round up based on fractional parts.

1. Compute the floor of each price and accumulate `floorSum`.
2. Record the fractional part of each price (value - floor).
3. The number of prices that must be rounded up is `need = target - floorSum`.
4. If `need` is negative or exceeds the count of non-integer prices, return `-1`.
5. Sort the fractional parts in descending order; rounding up the largest fractions adds the smallest extra error.
6. Sum the error: for the first `need` fractions add `(1 - frac)`, for the rest add `frac`.
7. Return the total error formatted to three decimal places.

```text
FUNCTION MinimizeError(prices, target):
    floorSum ← 0
    fractions ← []
    
    FOR p IN prices DO
        val ← FLOAT(p)
        f ← FLOOR(val)
        floorSum ← floorSum + f
        frac ← val - f
        IF frac > 0 THEN fractions.ADD(frac)
    
    need ← target - floorSum
    IF need < 0 OR need > LEN(fractions) THEN RETURN "-1"
    
    SORT fractions DESCENDING
    error ← 0
    FOR i ← 0 TO LEN(fractions) - 1 DO
        IF i < need THEN
            error ← error + (1 - fractions[i])   // rounding up
        ELSE
            error ← error + fractions[i]         // rounding down
    
    RETURN FORMAT(error, 3 decimals)
```

---

## Walkthrough

Consider `prices = ["0.300","0.600","0.900"]`, `target = 2`.

1. Floors: `[0,0,0]`, `floorSum = 0`.
2. Fractions: `[0.3,0.6,0.9]`.
3. `need = 2 - 0 = 2` → round up two prices.
4. Sort fractions descending → `[0.9,0.6,0.3]`.
5. Round up first two: error contributions `1-0.9 = 0.1` and `1-0.6 = 0.4`.
6. Round down the last: error `0.3`.
7. Total error = `0.1 + 0.4 + 0.3 = 0.8`, formatted as `0.800`.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Greedy with sorting | **O(n log n)** | **O(n)** |

---

## Follow-Up Questions

1. How would the solution change if each price could be rounded to any integer within a given range?
2. Can we achieve the same result without sorting, using a counting sort on the fractional parts?
3. What if the rounding error metric were squared error instead of absolute error?

---

## Key Takeaway

> **Greedy rounding** — round up the prices with the largest fractional parts first, because they add the smallest extra error. The required number of round-ups is fixed by `target - floorSum`.

---