# 3783. Mirror Distance of an Integer

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/mirror-distance-of-an-integer](https://leetcode.com/problems/mirror-distance-of-an-integer)
**Companies:** Bloomberg, Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Reverse Digits — O(d)](#3-approach)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

You are given an integer `n`.

Define its **mirror distance** as: `abs(n - reverse(n))` where `reverse(n)` is the integer formed by reversing the digits of `n`.

Return an integer denoting the mirror distance of `n`.

`abs(x)` denotes the absolute value of `x`.

**Constraints:**
- `1 <= n <= 10^9`

---

## 2. Key Insight

> Simply reverse the digits of `n` and compute `|n - reverse(n)|`.

---

## 3. Approach: Reverse Digits — O(d) ✅

```text
FUNCTION mirrorDistance(n):
    rev ← 0
    x ← n
    WHILE x > 0:
        rev ← rev * 10 + (x % 10)
        x ← x / 10
    RETURN ABS(n - rev)
```

---

## 4. Examples

**Example 1:**
```
Input: n = 25
Output: 27
Explanation: - reverse(25) = 52.
- Thus, the answer is abs(25 - 52) = 27.
```

**Example 2:**
```
Input: n = 10
Output: 9
Explanation: - reverse(10) = 01 which is 1.
- Thus, the answer is abs(10 - 1) = 9.
```

**Example 3:**
```
Input: n = 7
Output: 0
Explanation: - reverse(7) = 7.
- Thus, the answer is abs(7 - 7) = 0.
```

---

## 5. Walkthrough

Consider Example 1 (`n = 123`):

| Step | x (remaining) | rev (built) |
|------|---------------|-------------|
| Start | 123 | 0 |
| 1 | 12 | 3 |
| 2 | 1 | 32 |
| 3 | 0 | 321 |

After the loop, `rev = 321`. The absolute difference `|123 - 321| = 198`.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(d) — d = number of digits |
| **Space** | O(1) |

---

## 7. Key Takeaway

> **Digit reversal** — extract digits with mod/div, build reversed number. Basic math operation.
