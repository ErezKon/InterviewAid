# 1573. Number of Ways to Split a String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-ways-to-split-a-string](https://leetcode.com/problems/number-of-ways-to-split-a-string)
**Companies:** Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Count Ones + Gaps — O(n)](#4-approach)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Split binary string into 3 parts with equal number of '1's. Count ways mod 10⁹+7.

---

## 2. Examples

| s | Output |
|---|--------|
| "10101" | 4 |
| "011001" | 1 |
| "0000" | 3 |

*Explanation*: For `"10101"`, the three parts can be split at positions that give each part one `1`. There are 4 valid ways.

---

## 3. Key Insight

> If total ones = 0, answer = C(n-1, 2). Otherwise, each part must have `total/3` ones. Find the gap between the end of one third and start of the next. Multiply gap sizes.

---

## 4. Approach: Count Ones + Gaps — O(n) ✅

```text
FUNCTION numWays(s):
    MOD ← 1_000_000_007
    n ← LENGTH(s)
    totalOnes ← COUNT of '1' in s
    IF totalOnes % 3 ≠ 0:
        RETURN 0
    IF totalOnes = 0:
        RETURN ((n-1) * (n-2) / 2) MOD MOD
    target ← totalOnes / 3
    firstEnd ← -1
    secondEnd ← -1
    count ← 0
    onesSeen ← 0
    FOR i ← 0 TO n-1:
        IF s[i] = '1':
            onesSeen ← onesSeen + 1
        IF onesSeen = target AND firstEnd = -1:
            firstEnd ← i
        IF onesSeen = 2*target AND secondEnd = -1:
            secondEnd ← i
    // zeros after firstEnd until next '1'
    gap1 ← 0
    i ← firstEnd + 1
    WHILE i < n AND s[i] = '0':
        gap1 ← gap1 + 1
        i ← i + 1
    // zeros after secondEnd until next '1'
    gap2 ← 0
    i ← secondEnd + 1
    WHILE i < n AND s[i] = '0':
        gap2 ← gap2 + 1
        i ← i + 1
    RETURN ((gap1 + 1) * (gap2 + 1)) MOD MOD
```

---

## 5. Walkthrough

Take `s = "10101"`.

| Index | Char | onesSeen |
|-------|------|----------|
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 2 | 1 | 2 |
| 3 | 0 | 2 |
| 4 | 1 | 3 |

`totalOnes = 3`, `target = 1`. `firstEnd` at index 0, `secondEnd` at index 2. `gap1` = 1 (index 1), `gap2` = 1 (index 3). Ways = (1+1)*(1+1) = 4.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## 7. Follow-Up Questions

1. How would the solution change if the string could contain characters other than `0` and `1`?
2. Can you extend the approach to split the string into `k` parts with equal number of `1`s?
3. What is the impact on performance if the modulo operation is omitted?

---

## 8. Key Takeaway

> **Count ones and use gaps.** When total ones are divisible by three, the number of ways equals the product of the sizes of zero‑gaps between the required partitions.
