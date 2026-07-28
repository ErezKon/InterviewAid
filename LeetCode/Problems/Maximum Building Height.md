# 1840. Maximum Building Height

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-building-height](https://leetcode.com/problems/maximum-building-height)
**Companies:** Dataminr

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Approach: Two-Pass Constraint Propagation — O(m log m)](#approach-two-pass-constraint-propagation--om-log-m-)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given `n` positions in a line and `restrictions` `[id, maxHeight]`, adjacent buildings differ in height by at most 1. Building 1 has height 0. Find the maximum possible height of any building.

**Constraints:**
- `2 ≤ n ≤ 10⁹`
- `0 ≤ restrictions.length ≤ 10⁵`

---

## Examples

**Example 1:**
```
Input: n = 5, restrictions = [[2,1],[4,1]]
Output: 2
Explanation: One optimal arrangement is [0,1,2,1,2].
```

**Example 2:**
```
Input: n = 6, restrictions = [[2,2],[5,0]]
Output: 3
Explanation: Heights can be [0,1,2,3,2,1].
```

---

## Approach: Two-Pass Constraint Propagation — O(m log m) ✅

```text
FUNCTION maxBuilding(n, restrictions):
    // Ensure building 1 and n are in the list
    restrictions.APPEND([1, 0])
    restrictions.APPEND([n, n - 1])
    SORT restrictions BY id

    // Left‑to‑right pass: limit each restriction by the previous one
    FOR i ← 1 TO len(restrictions) - 1:
        dist ← restrictions[i].id - restrictions[i-1].id
        restrictions[i].max ← MIN(restrictions[i].max,
                                 restrictions[i-1].max + dist)

    // Right‑to‑left pass: limit each restriction by the next one
    FOR i ← len(restrictions) - 2 DOWNTO 0:
        dist ← restrictions[i+1].id - restrictions[i].id
        restrictions[i].max ← MIN(restrictions[i].max,
                                 restrictions[i+1].max + dist)

    // Compute the highest possible building between consecutive restrictions
    result ← 0
    FOR i ← 0 TO len(restrictions) - 2:
        d ← restrictions[i+1].id - restrictions[i].id
        h1 ← restrictions[i].max
        h2 ← restrictions[i+1].max
        // The peak occurs halfway between the two limits
        peak ← (h1 + h2 + d) / 2
        result ← MAX(result, peak)

    RETURN result
```

---

## Walkthrough

Consider **Example 1**: `n = 5`, `restrictions = [[2,1],[4,1]]`.

| Step | Action | Restrictions (id, max) |
|------|--------|------------------------|
| 0 | Add building 1 and 5, sort | `[[1,0],[2,1],[4,1],[5,4]]` |
| 1 | Left‑to‑right pass | `[[1,0],[2,1],[4,2],[5,4]]` (building 4 limited by `1 + (4‑2) = 3`, keep 1) |
| 2 | Right‑to‑left pass | `[[1,0],[2,1],[4,1],[5,4]]` (no change) |
| 3 | Compute peaks between pairs:
- Between 1 and 2: peak = (0+1+1)/2 = 1
- Between 2 and 4: peak = (1+1+2)/2 = 2
- Between 4 and 5: peak = (1+4+1)/2 = 3
| 4 | Maximum peak = 2 (the feasible highest building) |

Thus the answer is **2**.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sort + two‑pass | **O(m log m)** | O(m) |

---

## Follow-Up Questions

1. How would the solution change if the height difference between adjacent buildings could be at most **k** instead of 1?
2. Can you adapt the algorithm to also return the actual height configuration, not just the maximum height?
3. What if restrictions are given as ranges `[l, r, maxHeight]` affecting multiple consecutive buildings?

---

## Key Takeaway

> **Two‑pass constraint propagation (left→right then right→left) resolves all height limits. The peak between two restrictions is `(h1 + h2 + dist) / 2`.** Classic technique for 1D building/elevation problems.
