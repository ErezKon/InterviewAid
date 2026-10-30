# 3864. Minimum Cost to Partition a Binary String

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-cost-to-partition-a-binary-string](https://leetcode.com/problems/minimum-cost-to-partition-a-binary-string)
**Companies:** Amazon

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: DP with Greedy Partitioning — O(n)](#approach-dp-with-greedy-partitioning--on)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given a binary string `s` and two integers `encCost` and `flatCost`.

For each index `i`, `s[i] = '1'` indicates that the `i-th` element is sensitive, and `s[i] = '0'` indicates that it is not.

The string must be partitioned into **segments**. Initially, the entire string forms a single segment.

For a segment of length `L` containing `X` sensitive elements:
- If `X = 0`, the cost is `flatCost`.
- If `X > 0`, the cost is `L * X * encCost`.

If a segment has **even length**, you may split it into **two contiguous segments** of **equal** length and the cost of this split is the **sum** of **costs** of the resulting segments.

Return an integer denoting the **minimum possible total cost** over all valid partitions.

**Constraints:**
- `1 ≤ s.length ≤ 10⁵`
- `s` consists only of `'0'` and `'1'`.
- `1 ≤ encCost, flatCost ≤ 10⁵`

---

## Examples

```
Example 1:
  Input: s = "1010", encCost = 2, flatCost = 1
  Output: 6
  Explanation:
  - The entire string s = "1010" has length 4 and contains 2 sensitive elements, giving a cost of 4 * 2 * 2 = 16.
  - Since the length is even, it can be split into "10" and "10". Each segment has length 2 and contains 1 sensitive element, so each costs 2 * 1 * 2 = 4, giving a total of 8.
  - Splitting both segments into four single-character segments yields the segments "1", "0", "1", and "0". A segment containing "1" has length 1 and exactly one sensitive element, giving a cost of 1 * 1 * 2 = 2, while a segment containing "0" has no sensitive elements and therefore costs flatCost = 1.
  - The total cost is thus 2 + 1 + 2 + 1 = 6, which is the minimum possible total cost.
```

```
Example 2:
  Input: s = "1010", encCost = 3, flatCost = 10
  Output: 12
  Explanation:
  - The entire string s = "1010" has length 4 and contains 2 sensitive elements, giving a cost of 4 * 2 * 3 = 24.
  - Since the length is even, it can be split into two segments "10" and "10".
  - Each segment has length 2 and contains one sensitive element, so each costs 2 * 1 * 3 = 6, giving a total of 12, which is the minimum possible total cost.
```

```
Example 3:
  Input: s = "00", encCost = 1, flatCost = 2
  Output: 2
  Explanation: The string s = "00" has length 2 and contains no sensitive elements, so storing it as a single segment costs flatCost = 2, which is the minimum possible total cost.
```

---

## Key Insight

> Each `'0'` in the string costs 0 if it forms its own substring. Each `'1'` contributes at least 1 to the total cost. The optimal strategy is to **isolate each character** as its own substring, since the value of a multi-character substring is always ≥ the sum of its individual digit values (because of positional weighting in binary).

Actually, splitting each character individually gives cost = count of `'1'`s. Any multi-character grouping where a `'1'` is in a higher-order position would increase cost.

---

## Approach: DP with Greedy Partitioning — O(n) ✅

```
FUNCTION minCost(s):
    // Each character as its own partition
    // '0' contributes 0, '1' contributes 1
    RETURN COUNT of '1' in s
```

**Why this works:** For any `'1'` at position `i` within a substring of length `L`, its contribution is `2^(L-1-i)` ≥ 1. By making each character its own substring (length 1), each `'1'` contributes exactly 1, which is the minimum possible.

---

## Walkthrough

```
s = "110"
```

| Partition | Values | Total Cost |
|-----------|--------|------------|
| "1" + "1" + "0" | 1 + 1 + 0 | **2** |
| "11" + "0" | 3 + 0 | 3 |
| "1" + "10" | 1 + 2 | 3 |
| "110" | 6 | 6 |

Minimum = **2** (split every character) ✅

---

## Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) — single pass to count ones |
| **Space** | O(1) — just a counter |

---

## Follow-Up Questions

1. **Why is splitting into individual characters always optimal?** In binary, a `'1'` in position `k` from the right represents `2^k`. As a single character, it represents `2^0 = 1`, the minimum value for any `'1'`.
2. **What if there's a fixed cost per partition?** Then you need DP to balance partition count vs. substring values.
3. **What about non-binary strings (decimal)?** The same logic applies: individual digits give minimum sum for positional number systems.

---

## Key Takeaway

> In positional number systems, **splitting digits into individual substrings minimizes total value** because each digit sits in the lowest-order position (units place), avoiding exponential positional weighting.
