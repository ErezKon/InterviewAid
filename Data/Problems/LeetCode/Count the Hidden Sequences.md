# 2145. Count the Hidden Sequences

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-the-hidden-sequences](https://leetcode.com/problems/count-the-hidden-sequences)
**Companies:** Amazon, Bloomberg, Google, Meta, Tiktok, Zomato

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given a **0-indexed** array of `n` integers `differences`, which describes the **differences **between each pair of **consecutive **integers of a **hidden** sequence of length `(n + 1)`. More formally, call the hidden sequence `hidden`, then we have that `differences[i] = hidden[i + 1] - hidden[i]`.

You are further given two integers `lower` and `upper` that describe the **inclusive** range of values `[lower, upper]` that the hidden sequence can contain.

- For example, given `differences = [1, -3, 4]`, `lower = 1`, `upper = 6`, the hidden sequence is a sequence of length `4` whose elements are in between `1` and `6` (**inclusive**).

- `[3, 4, 1, 5]` and `[4, 5, 2, 6]` are possible hidden sequences.
- `[5, 6, 3, 7]` is not possible since it contains an element greater than `6`.
- `[1, 2, 3, 4]` is not possible since the differences are not correct.

Return *the number of **possible** hidden sequences there are.* If there are no possible sequences, return `0`.

**Constraints:**
- `n == differences.length`
- `1 <= n <= 10^5`
- `-10^5 <= differences[i] <= 10^5`
- `-10^5 <= lower <= upper <= 10^5`

---

## Examples

**Example 1:**
```
Input: differences = [1,-3,4], lower = 1, upper = 6
Output: 2
Explanation: The possible hidden sequences are:
- [3, 4, 1, 5]
- [4, 5, 2, 6]
Thus, we return 2.
```

**Example 2:**
```
Input: differences = [3,-4,5,1,-2], lower = -4, upper = 5
Output: 4
Explanation: The possible hidden sequences are:
- [-3, 0, -4, 1, 2, 0]
- [-2, 1, -3, 2, 3, 1]
- [-1, 2, -2, 3, 4, 2]
- [0, 3, -1, 4, 5, 3]
Thus, we return 4.
```

**Example 3:**
```
Input: differences = [4,-7,2], lower = 3, upper = 6
Output: 0
Explanation: There are no possible hidden sequences. Thus, we return 0.
```

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