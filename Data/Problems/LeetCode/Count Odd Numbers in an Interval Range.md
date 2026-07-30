# 1523. Count Odd Numbers in an Interval Range

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-odd-numbers-in-an-interval-range](https://leetcode.com/problems/count-odd-numbers-in-an-interval-range)
**Companies:** Amazon, Google, Meta, Microsoft

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

Given two non-negative integers `low` and `high`, return the count of odd numbers between `low` and `high` (inclusive).

**Constraints:**
- `0 <= low <= high <= 10^9`

---

## Examples

**Example 1:**
- **Input:** `low = 3, high = 7`
- **Output:** `3`
- **Explanation:** Odd numbers are 3, 5, 7.

**Example 2:**
- **Input:** `low = 8, high = 10`
- **Output:** `1`
- **Explanation:** Only 9 is odd.

---

## Key Insight

The count of odd numbers in `[0, x]` equals `⌊(x + 1) / 2⌋`. So the count in `[low, high]` = count in `[0, high]` − count in `[0, low − 1]`, which simplifies to:

```
(high + 1) / 2 - low / 2
```

This is pure integer arithmetic — no iteration needed.

---

## Approach

```
FUNCTION countOdds(low, high):
    RETURN (high + 1) / 2 - low / 2
```

**Why this works:**
- `(high + 1) / 2` (integer division) counts odd numbers in `[0, high]`.
- `low / 2` counts odd numbers in `[0, low - 1]`.
- The difference gives odd numbers in `[low, high]`.

---

## Walkthrough

**Input:** `low = 3, high = 7`

```
Odd numbers in [0, 7]: ⌊(7+1)/2⌋ = 4   →  {1, 3, 5, 7}
Odd numbers in [0, 2]: ⌊3/2⌋     = 1   →  {1}
Result: 4 - 1 = 3                        →  {3, 5, 7} ✅
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(1) |
| **Space** | O(1) |

---

## Follow-Up Questions

**Q1: How would you count even numbers instead?**
`countEvens = (high - low + 1) - countOdds(low, high)`, or use `(high / 2) - ((low - 1) / 2)`.

**Q2: What if the range is `[low, high)` (exclusive end)?**
Use `high - 1` instead of `high`.

**Q3: Can you generalize to counting multiples of k in a range?**
Count of multiples of k in `[low, high]` = `⌊high / k⌋ - ⌊(low - 1) / k⌋`.

---

## Key Takeaway

> **Counting items in a range often reduces to a prefix-count formula: count(range) = count(0..high) − count(0..low−1). Master this pattern for any "count multiples/divisibles in range" problem.**
