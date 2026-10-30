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

You are given two strings `start` and `target`, both of length `n`. Each string consists **only** of the characters `'L'`, `'R'`, and `'_'` where:

- The characters `'L'` and `'R'` represent pieces, where a piece `'L'` can move to the **left** only if there is a **blank** space directly to its left, and a piece `'R'` can move to the **right** only if there is a **blank** space directly to its right.
- The character `'_'` represents a blank space that can be occupied by **any** of the `'L'` or `'R'` pieces.

Return `true` *if it is possible to obtain the string* `target` *by moving the pieces of the string* `start` ***any** number of times*. Otherwise, return `false`.

**Constraints:**
- `n == start.length == target.length`
- `1 <= n <= 10⁵`
- `start` and `target` consist of the characters `'L'`, `'R'`, and `'_'`.

---

## 2. Examples

```
Example 1:
  Input: start = "_L__R__R_", target = "L______RR"
  Output: true
  Explanation: We can obtain the string target from start by doing the following moves:
  - Move the first piece one step to the left, start becomes equal to "L___R__R_".
  - Move the last piece one step to the right, start becomes equal to "L___R___R".
  - Move the second piece three steps to the right, start becomes equal to "L______RR".
  Since it is possible to get the string target from start, we return true.
```

```
Example 2:
  Input: start = "R_L_", target = "__LR"
  Output: false
  Explanation: The 'R' piece in the string start can move one step to the right to obtain "_RL_".
  After that, no pieces can move anymore, so it is impossible to obtain the string target from start.
```

```
Example 3:
  Input: start = "_R", target = "R_"
  Output: false
  Explanation: The piece in the string start can move only to the right, so it is impossible to obtain the string target from start.
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
