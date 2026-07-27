# 2337. Move Pieces to Obtain a String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/move-pieces-to-obtain-a-string](https://leetcode.com/problems/move-pieces-to-obtain-a-string)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Two Pointers — O(n)](#4-approach-two-pointers--on)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Key Takeaway](#6-key-takeaway)

---

## 1. Problem Description

Given strings `start` and `target` with `'L'`, `'R'`, and `'_'`. `L` can move left (into `_`), `R` can move right (into `_`). Return `true` if `start` can become `target`.

**Constraints:**
- `1 <= n <= 10⁵`

---

## 2. Examples

```
Example 1:
  Input: start = "_L__R__R_", target = "L______RR"
  Output: true
  Explanation: L moves left, Rs move right.
```

---

## 3. Key Insight

> Strip blanks — the sequence of L/R must match. Then check positions: each `L` in start must be at or right of its target position (L moves left). Each `R` must be at or left of its target (R moves right).

---

## 4. Approach: Two Pointers — O(n) ✅

```
FUNCTION canChange(start, target):
    // Remove '_' and check same sequence of L/R
    s = [(c, i) for i, c in enumerate(start) if c != '_']
    t = [(c, i) for i, c in enumerate(target) if c != '_']
    IF len(s) != len(t): RETURN false

    FOR (sc, si), (tc, ti) IN zip(s, t):
        IF sc != tc: RETURN false
        IF sc == 'L' AND si < ti: RETURN false    // L can only move left
        IF sc == 'R' AND si > ti: RETURN false    // R can only move right

    RETURN true
```

---

## 5. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(n) for extracted pairs |

---

## 6. Key Takeaway

> **Relative order + directional constraint.** L/R sequence must match (order invariant). Then verify each piece can reach its target position given its movement direction.
