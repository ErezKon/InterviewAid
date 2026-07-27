# 3184. Count Pairs That Form a Complete Day I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-pairs-that-form-a-complete-day-i](https://leetcode.com/problems/count-pairs-that-form-a-complete-day-i)
**Companies:** Google, Infosys

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an array `hours`, count pairs `(i, j)` where `i < j` and `(hours[i] + hours[j]) % 24 == 0`.

**Constraints:**
- `1 <= hours.length <= 100`
- `1 <= hours[i] <= 10^9`

---

## Examples

**Example 1:**
- **Input:** `hours = [12, 12, 30, 24, 24]`
- **Output:** `2`

---

## Key Insight

Same as Part II — pair sum divisible by 24. With n ≤ 100, brute force O(n²) works, but the O(n) modular frequency approach is cleaner.

---

## Approach

```
FUNCTION countCompleteDayPairs(hours):
    freq = [0] * 24
    count = 0
    FOR h IN hours DO
        r = h % 24
        count += freq[(24 - r) % 24]
        freq[r] += 1
    RETURN count
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) |
| **Space** | O(1) |

---

## Key Takeaway

> **Same modular complement pattern as Part II. The small constraint here allows brute force, but learning the O(n) approach prepares you for the harder variant.**
