# 1247. Minimum Swaps to Make Strings Equal

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-swaps-to-make-strings-equal](https://leetcode.com/problems/minimum-swaps-to-make-strings-equal)
**Companies:** Goldman Sachs, Google, Jpmorgan, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Greedy Pairing — O(n)](#4-approach-greedy-pairing--on)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given two strings `s1` and `s2` of `'x'` and `'y'`, you can swap `s1[i]` with `s2[j]`. Return the **minimum** swaps to make `s1 == s2`, or `-1`.

**Constraints:**
- `1 <= s1.length == s2.length <= 1000`

---

## 2. Examples

```
Example 1:
  Input: s1 = "xx", s2 = "yy"
  Output: 1
  Explanation: Swap s1[0] with s2[1]: s1="yx", s2="yx". ✅

Example 2:
  Input: s1 = "xy", s2 = "yx"
  Output: 2
  Explanation: Swap s1[0] with s2[0]: s1="yy",s2="xx". Then swap s1[0] with s2[1]: s1="xy",s2="xy". ✅
```

---

## 3. Key Insight

> Count mismatches: `xy` = positions where s1='x', s2='y'; `yx` = opposite. Two `xy` mismatches fix with 1 swap. Two `yx` mismatches fix with 1 swap. One `xy` + one `yx` needs 2 swaps. If `(xy + yx)` is odd → impossible.

---

## 4. Approach: Greedy Pairing — O(n) ✅

```
FUNCTION minimumSwap(s1, s2):
    xy = yx = 0
    FOR a, b IN zip(s1, s2):
        IF a == 'x' AND b == 'y': xy += 1
        IF a == 'y' AND b == 'x': yx += 1
    IF (xy + yx) % 2 != 0: RETURN -1
    RETURN xy // 2 + yx // 2 + (xy % 2) * 2
```

---

## 5. Walkthrough

```
s1 = "xxyyxyxyxx", s2 = "xyyxyxxxyx"

Count mismatches:
  Positions where s1[i]≠s2[i]:
  i=1: x,y → xy++; i=2: y,y skip; ...
  
Say xy=3, yx=3:
  3//2 + 3//2 + (1)*2 = 1+1+2 = 4 swaps

If xy=2, yx=2:
  2//2 + 2//2 = 1+1 = 2 swaps
```

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) — single pass |
| **Space** | O(1) |

---

## 7. Key Takeaway

> **Pair same-type mismatches first** — `xy-xy` pairs and `yx-yx` pairs cost 1 swap each. The leftover mixed pair costs 2. Total = `xy//2 + yx//2 + 2*(xy%2)`.
