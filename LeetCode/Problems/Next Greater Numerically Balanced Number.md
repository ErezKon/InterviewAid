# 2048. Next Greater Numerically Balanced Number

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/next-greater-numerically-balanced-number](https://leetcode.com/problems/next-greater-numerically-balanced-number)
**Companies:** Bloomberg, Google, Meta, Microsoft, Sprinklr

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Brute Force — O(?)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

A number is **numerically balanced** if digit `d` appears exactly `d` times. Find the smallest balanced number > `n`.

**Constraints:**
- `0 <= n <= 10⁶`

---

## 2. Key Insight

> Balanced numbers are very sparse. Just increment from `n+1` and check each number. The check is O(d) where d = number of digits.

---

## 3. Approach: Brute Force ✅

```
FUNCTION nextBeautifulNumber(n):
    FUNCTION isBalanced(num):
        s = str(num)
        RETURN all(s.count(d) == int(d) for d in set(s))

    candidate = n + 1
    WHILE NOT isBalanced(candidate):
        candidate += 1
    RETURN candidate
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(gap × d) — gap between balanced numbers is small |
| **Space** | O(d) |

---

## 5. Key Takeaway

> **Brute force works because balanced numbers are dense enough** for n ≤ 10⁶. The next balanced number is never far away. Alternative: precompute all balanced numbers up to the limit.
