# 858. Mirror Reflection

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/mirror-reflection](https://leetcode.com/problems/mirror-reflection)
**Companies:** Amazon, Google, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: GCD Math — O(log(min(p,q)))](#3-approach-gcd-math)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

A square room with mirrors. A laser starts from corner 0 at angle toward corner. Given side `p` and offset `q`, determine which receptor (0, 1, or 2) the laser hits first.

**Constraints:**
- `1 <= q <= p <= 1000`

---

## 2. Key Insight

> "Unfold" the reflections: the laser travels in a straight line in a tiled grid. It hits a corner at the LCM of `p` and `q`. Let `m = LCM/q` (vertical bounces), `n = LCM/p` (horizontal bounces). The receptor depends on parity of `m` and `n`.

---

## 3. Approach: GCD Math — O(log(min(p,q))) ✅

```
FUNCTION mirrorReflection(p, q):
    // Find LCM(p, q)
    g = GCD(p, q)
    m = q / g    // number of reflections vertically
    n = p / g    // number of reflections horizontally
    IF m % 2 == 0: RETURN 0
    IF n % 2 == 0: RETURN 2
    RETURN 1
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(log(min(p,q))) — GCD computation |
| **Space** | O(1) |

---

## 5. Key Takeaway

> **Unfold reflections into tiled grid.** The laser hits a receptor at `LCM(p,q)` distance. Which receptor depends on the parity of vertical and horizontal bounce counts.
