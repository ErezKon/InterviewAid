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

Given a binary string `s`, partition it into one or more substrings such that each substring represents a binary number. The cost of a partition is the sum of the **decimal values** of all substrings. Leading zeros in a substring are allowed and contribute value (e.g., `"01"` = 1).

Return the **minimum cost** of partitioning the string.

**Constraints:**
- `1 ≤ s.length ≤ 10⁵`
- `s` consists of `'0'` and `'1'` only

---

## Examples

**Example 1:**
```
Input: s = "110"
Output: 2
Explanation: Partition as "1" + "10" → 1 + 2 = 3, or "11" + "0" → 3 + 0 = 3,
or "1" + "1" + "0" → 1 + 1 + 0 = 2. Minimum = 2.
```

**Example 2:**
```
Input: s = "0"
Output: 0
Explanation: Single substring "0" → value 0.
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
