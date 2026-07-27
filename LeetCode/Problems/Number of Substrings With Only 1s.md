# 1513. Number of Substrings With Only 1s

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-substrings-with-only-1s](https://leetcode.com/problems/number-of-substrings-with-only-1s)
**Companies:** Amazon, Google, Ibm

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: Running Count — O(n)](#2-approach)
3. [Complexity Analysis](#3-complexity-analysis)
4. [Key Takeaway](#4-key-takeaway)

---

## 1. Problem Description

Count substrings consisting entirely of '1's. Return mod 10⁹+7.

---

## 2. Approach: Running Count — O(n) ✅

```
FUNCTION numSub(s):
    MOD = 10^9 + 7; count = 0; curr = 0
    FOR c IN s:
        IF c == '1': curr += 1
        ELSE: curr = 0
        count = (count + curr) % MOD
    RETURN count
```

---

## 3. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## 4. Key Takeaway

> **A run of k consecutive 1s contributes k*(k+1)/2 substrings.** Incrementally add `curr` at each step. Same pattern as counting smooth descent periods.
