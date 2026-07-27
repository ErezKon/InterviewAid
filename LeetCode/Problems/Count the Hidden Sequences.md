# 2145. Count the Hidden Sequences

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-the-hidden-sequences](https://leetcode.com/problems/count-the-hidden-sequences)
**Companies:** Amazon, Bloomberg, Google, Meta, Tiktok, Zomato

---

## Table of Contents
- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a `differences` array where `differences[i] = hidden[i+1] - hidden[i]`, and bounds `[lower, upper]`, count how many valid hidden arrays exist where every element is in `[lower, upper]`.

**Constraints:**
- `1 <= differences.length <= 10^5`
- `-10^5 <= differences[i] <= 10^5`
- `-10^5 <= lower <= upper <= 10^5`

---

## Key Insight

The hidden array is fully determined by `hidden[0]`. Compute prefix sums of differences to find how all elements relate to `hidden[0]`. Then `hidden[0]` must satisfy `lower - minPrefix ≤ hidden[0] ≤ upper - maxPrefix`. The count of valid starting values is the range length.

---

## Approach

```
FUNCTION numberOfArrays(differences, lower, upper):
    prefix = 0; minP = 0; maxP = 0
    FOR d IN differences:
        prefix += d
        minP = MIN(minP, prefix)
        maxP = MAX(maxP, prefix)
    // hidden[0] must satisfy: lower <= hidden[0] + minP AND hidden[0] + maxP <= upper
    RETURN MAX(0, (upper - maxP) - (lower - minP) + 1)
```

---

## Walkthrough

**Input:** `differences = [1, -3, 4], lower = 1, upper = 6`

```
prefix sums: 0 → 1 → -2 → 2
minP = -2, maxP = 2

hidden[0] range: [lower - minP, upper - maxP] = [1-(-2), 6-2] = [3, 4]
Count: 4 - 3 + 1 = 2

hidden[0]=3: [3, 4, 1, 5] ✅ all in [1,6]
hidden[0]=4: [4, 5, 2, 6] ✅ all in [1,6]
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) |
| **Space** | O(1) |

---

## Key Takeaway

> **When an array is determined by one free variable plus differences, compute prefix sums to find the min/max offsets. The free variable's valid range is `[lower - minOffset, upper - maxOffset]`.**
