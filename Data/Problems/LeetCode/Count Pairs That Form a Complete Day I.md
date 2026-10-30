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

Given an integer array `hours` representing times in **hours**, return an integer denoting the number of pairs `i`, `j` where `i < j` and `hours[i] + hours[j]` forms a **complete day**.

A **complete day** is defined as a time duration that is an **exact** **multiple** of 24 hours.

For example, 1 day is 24 hours, 2 days is 48 hours, 3 days is 72 hours, and so on.

**Constraints:**
- `1 <= hours.length <= 100`
- `1 <= hours[i] <= 10^9`

---

## Examples

**Example 1:**
```
Input: hours = [12,12,30,24,24]
Output: 2
Explanation: The pairs of indices that form a complete day are (0, 1) and (3, 4).
```

**Example 2:**
```
Input: hours = [72,48,24,3]
Output: 3
Explanation: The pairs of indices that form a complete day are (0, 1), (0, 2), and (1, 2).
```

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
