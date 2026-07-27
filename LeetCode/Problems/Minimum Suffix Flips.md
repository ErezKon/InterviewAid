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

Given a binary string `target`, starting from all zeros, each operation flips all bits from index `i` to the end (suffix flip). Return the **minimum** number of flips to reach `target`.

**Constraints:**
- `1 <= target.length <= 10⁵`
- `target[i]` is `'0'` or `'1'`

---

## 2. Examples

```
Example 1:
  Input: target = "10111"
  Output: 3
  Explanation: "00000" → flip from 0 → "11111" → flip from 1 → "10000" → flip from 2 → "10111"

Example 2:
  Input: target = "101"
  Output: 3
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
