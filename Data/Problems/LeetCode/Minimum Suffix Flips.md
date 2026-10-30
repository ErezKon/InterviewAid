# 1529. Minimum Suffix Flips

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-suffix-flips](https://leetcode.com/problems/minimum-suffix-flips)
**Companies:** Amazon, Jpmorgan, Microsoft, Morgan Stanley, Visa

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Greedy Transition Count — O(n)](#4-approach-greedy-transition-count--on)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

You are given a **0-indexed** binary string `target` of length `n`. You have another binary string `s` of length `n` that is initially set to all zeros. You want to make `s` equal to `target`.

In one operation, you can pick an index `i` where `0 <= i < n` and flip all bits in the **inclusive** range `[i, n - 1]`. Flip means changing `'0'` to `'1'` and `'1'` to `'0'`.

Return *the minimum number of operations needed to make *`s`* equal to *`target`.

**Constraints:**
- `n == target.length`
- `1 <= n <= 10^5`
- `target[i]` is either `'0'` or `'1'`.

---

## 2. Examples

**Example 1:**
```
Input: target = "10111"
Output: 3
Explanation: Initially, s = "00000".
Choose index i = 2: "00000" -> "00111"
Choose index i = 0: "00111" -> "11000"
Choose index i = 1: "11000" -> "10111"
We need at least 3 flip operations to form target.
```

**Example 2:**
```
Input: target = "101"
Output: 3
Explanation: Initially, s = "000".
Choose index i = 0: "000" -> "111"
Choose index i = 1: "111" -> "100"
Choose index i = 2: "100" -> "101"
We need at least 3 flip operations to form target.
```

**Example 3:**
```
Input: target = "00000"
Output: 0
Explanation: We do not need any operations since the initial s already equals target.
```

---

## 3. Key Insight

> Each suffix flip changes the "current state" from that point onward. The number of flips = number of **transitions** in the target string (changes between consecutive characters), plus 1 if the first character is '1'.

Equivalently: count how many times the character differs from the "current" state (starting at '0').

---

## 4. Approach: Greedy Transition Count — O(n) ✅

```
FUNCTION minFlips(target):
    flips = 0; current = '0'
    FOR c IN target:
        IF c != current:
            flips += 1
            current = c
    RETURN flips
```

---

## 5. Walkthrough

```
target = "10111", current = '0'

c='1': 1 != 0 → flip! flips=1, current='1'
c='0': 0 != 1 → flip! flips=2, current='0'
c='1': 1 != 0 → flip! flips=3, current='1'
c='1': 1 == 1 → ok
c='1': 1 == 1 → ok

Answer = 3 ✅
```

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) — single pass |
| **Space** | O(1) |

---

## 7. Key Takeaway

> **Suffix flips = transition counting.** Each transition in the target string from the current expected state requires exactly one flip. The problem reduces to counting state changes.
