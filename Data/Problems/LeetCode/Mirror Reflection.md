# 858. Mirror Reflection

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/mirror-reflection](https://leetcode.com/problems/mirror-reflection)
**Companies:** Amazon, Google, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: GCD Math — O(log(min(p,q)))](#4-approach-gcd-math)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

A square room with mirrors. A laser starts from corner 0 at angle toward corner. Given side `p` and offset `q`, determine which receptor (0, 1, or 2) the laser hits first.

**Constraints:**
- `1 <= q <= p <= 1000`

---

## 2. Examples

| p | q | Output |
|---|---|--------|
| 2 | 1 | 2 |
| 3 | 1 | 1 |
| 3 | 2 | 0 |

*Explanation:* For `p = 2, q = 1`, the laser reflects once vertically and twice horizontally, landing at receptor 2.

---

## 3. Key Insight

> "Unfold" the reflections: the laser travels in a straight line in a tiled grid. It hits a corner at the LCM of `p` and `q`. Let `m = LCM/q` (vertical bounces), `n = LCM/p` (horizontal bounces). The receptor depends on parity of `m` and `n`.

---

## 4. Approach: GCD Math — O(log(min(p,q))) ✅

```text
FUNCTION mirrorReflection(p, q):
    // Compute greatest common divisor
    g ← GCD(p, q)
    // Number of vertical reflections
    m ← q / g
    // Number of horizontal reflections
    n ← p / g
    IF m % 2 == 0:
        RETURN 0
    IF n % 2 == 0:
        RETURN 2
    RETURN 1
```

---

## 5. Walkthrough

Consider `p = 3, q = 1`.
1. `g = GCD(3,1) = 1` → `m = 1/1 = 1` (odd), `n = 3/1 = 3` (odd).
2. Both `m` and `n` are odd, so the laser hits receptor **1**.

For `p = 2, q = 1`:
1. `g = GCD(2,1) = 1` → `m = 1` (odd), `n = 2` (even).
2. `n` even → receptor **2**.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(log(min(p,q))) — GCD computation |
| **Space** | O(1) |

---

## 7. Follow-Up Questions

1. How would the solution change if the laser could start from any corner?
2. What if the room were a rectangle with different side lengths?
3. Can this approach be extended to 3‑dimensional mirrored chambers?

---

## 8. Key Takeaway

> **Unfold reflections into a tiled grid.** The laser hits a receptor at `LCM(p,q)` distance. Which receptor depends on the parity of vertical and horizontal bounce counts.
