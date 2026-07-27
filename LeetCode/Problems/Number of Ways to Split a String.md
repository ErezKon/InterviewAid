# 1573. Number of Ways to Split a String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-ways-to-split-a-string](https://leetcode.com/problems/number-of-ways-to-split-a-string)
**Companies:** Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Count Ones + Gaps — O(n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Split binary string into 3 parts with equal number of '1's. Count ways mod 10⁹+7.

---

## 2. Key Insight

> If total ones = 0, answer = C(n-1, 2). Otherwise, each part must have `total/3` ones. Find the gap between the end of one third and start of the next. Multiply gap sizes.

---

## 3. Approach: Count Ones + Gaps — O(n) ✅

```
FUNCTION numWays(s):
    MOD = 10^9 + 7
    ones = count of '1' in s
    IF ones % 3 != 0: RETURN 0
    IF ones == 0: RETURN (n-1) * (n-2) / 2 % MOD
    target = ones / 3
    // Find gaps between target-th and (target+1)-th '1'
    // and between (2*target)-th and (2*target+1)-th '1'
    RETURN gap1 * gap2 % MOD
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## 5. Key Takeaway

> **Equal partition of ones → find split gaps.** Each split point can be anywhere in the gap of zeros between sections. Multiply gap sizes.
