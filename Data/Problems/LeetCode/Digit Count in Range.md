# 1067. Digit Count in Range

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/digit-count-in-range](https://leetcode.com/problems/digit-count-in-range)
**Companies:** Amazon

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Digit DP](#approach-digit-dp)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a digit `d` and two integers `low` and `high`, count the number of times digit `d` appears in all integers in the range `[low, high]`.

**Constraints:**
- `0 <= d <= 9`
- `1 <= low <= high <= 2 × 10^8`

---

## Examples

**Example 1:**
```
Input: d = 1, low = 1, high = 13
Output: 6
Explanation: Digit 1 appears in: 1, 10, 11 (twice), 12, 13 → total = 6
```

**Example 2:**
```
Input: d = 3, low = 100, high = 250
Output: 35
```

---

## Key Insight

> Use prefix counting: `count(d, [low, high]) = count(d, [1, high]) - count(d, [1, low-1])`. To count occurrences of digit `d` in `[1, N]`, analyze each digit position independently — for each position, calculate how many times `d` appears there across all numbers 1..N using math (not iteration).

---

## Approach: Digit DP ✅

For each digit position (ones, tens, hundreds, ...), count occurrences of `d`:

```
FUNCTION countDigit(d, N):
    // Count occurrences of digit d in 1..N
    IF N < 0: RETURN 0
    count ← 0
    power ← 1    // 1, 10, 100, ...

    WHILE power <= N DO
        higher ← N / (power * 10)
        current ← (N / power) MOD 10
        lower ← N MOD power

        IF d = 0 THEN
            higher ← higher - 1    // leading zero adjustment

        IF current > d THEN
            count ← count + (higher + 1) * power
        ELSE IF current = d THEN
            count ← count + higher * power + lower + 1
        ELSE
            count ← count + higher * power

        power ← power * 10
    END WHILE
    RETURN count

FUNCTION digitsCount(d, low, high):
    RETURN countDigit(d, high) - countDigit(d, low - 1)
```

---

## Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| **Time** | O(log N) | Process each digit position |
| **Space** | O(1) | Constant extra space |

---

## Follow-Up Questions

**Q1: Why the special case for d=0?**
> Leading zeros aren't real occurrences. For d=0 at position p, the "higher" part must be at least 1 (the number must have digits beyond position p), so we subtract 1 from `higher`.

**Q2: How does the position-by-position counting work?**
> For digit position `p` (with value `power`), all numbers cycle through 0-9 at that position. The count depends on whether the current digit in N at position p is >, =, or < d.

**Q3: Could you use digit DP with memoization instead?**
> Yes — standard digit DP with state (position, count, tight, started). More general but slower by a constant factor.

---

## Key Takeaway

> **Counting digit occurrences in a range is solved by position-by-position analysis — for each digit place, mathematically compute how many numbers have digit `d` there, avoiding brute-force enumeration.**
