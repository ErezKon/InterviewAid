# 1840. Maximum Building Height

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-building-height](https://leetcode.com/problems/maximum-building-height)
**Companies:** Dataminr

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Two-Pass Constraint Propagation — O(m log m)](#approach-two-pass-constraint-propagation--om-log-m-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given `n` positions in a line and `restrictions` `[id, maxHeight]`, adjacent buildings differ in height by at most 1. Building 1 has height 0. Find the maximum possible height of any building.

**Constraints:**
- `2 ≤ n ≤ 10⁹`
- `0 ≤ restrictions.length ≤ 10⁵`

---

## Key Insight

> Restrictions propagate: if building `i` has max height `h`, then building `i+d` has max height `h+d`. Do a **left-to-right** pass to propagate constraints forward, then a **right-to-left** pass backward. Between any two restricted buildings, the peak height is computed from their adjusted limits and distance.

---

## Approach: Two-Pass Constraint Propagation — O(m log m) ✅

```
FUNCTION maxBuilding(n, restrictions):
    restrictions.APPEND([1, 0])
    restrictions.APPEND([n, n - 1])
    SORT restrictions by id

    // Left-to-right: each restriction limited by previous
    FOR i ← 1 TO len(restrictions) - 1:
        dist = restrictions[i].id - restrictions[i-1].id
        restrictions[i].max = MIN(restrictions[i].max,
                                  restrictions[i-1].max + dist)

    // Right-to-left
    FOR i ← len(restrictions) - 2 DOWNTO 0:
        dist = restrictions[i+1].id - restrictions[i].id
        restrictions[i].max = MIN(restrictions[i].max,
                                  restrictions[i+1].max + dist)

    // Find max height between consecutive restrictions
    result = 0
    FOR i ← 0 TO len(restrictions) - 2:
        d = restrictions[i+1].id - restrictions[i].id
        h1 = restrictions[i].max
        h2 = restrictions[i+1].max
        peak = (h1 + h2 + d) / 2
        result = MAX(result, peak)

    RETURN result
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sort + two-pass | **O(m log m)** | O(m) |

---

## Key Takeaway

> **Two-pass constraint propagation (left→right then right→left) resolves all height limits. The peak between two restrictions is `(h1 + h2 + dist) / 2`.** Classic technique for 1D building/elevation problems.
