# 2489. Number of Substrings With Fixed Ratio

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-substrings-with-fixed-ratio](https://leetcode.com/problems/number-of-substrings-with-fixed-ratio)
**Companies:** Intuit

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Prefix Transform + Hash Map — O(n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Count substrings of a binary string where the ratio of 0s to 1s equals `num1:num2`.

---

## 2. Key Insight

> Transform: count0 · num2 == count1 · num1. Define `f(i) = count0(i) · num2 - count1(i) · num1`. Substrings where f(r) - f(l) == 0 have the target ratio. Count prefix value matches.

---

## 3. Approach: Prefix Transform + Hash Map — O(n) ✅

```
FUNCTION fixedRatio(s, num1, num2):
    prefix = Counter({0: 1})
    val = 0; result = 0
    FOR c IN s:
        IF c == '0': val += num2
        ELSE: val -= num1
        result += prefix[val]
        prefix[val] += 1
    RETURN result
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(n) |

---

## 5. Key Takeaway

> **Transform ratio constraint into prefix sum equality.** `count0·num2 - count1·num1` constant across a substring means the ratio is fixed. Standard prefix + hash map pattern.
