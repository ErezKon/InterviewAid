# 3572. Maximize Y‑Sum by Picking a Triplet of Distinct X‑Values

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximize-ysum-by-picking-a-triplet-of-distinct-xvalues](https://leetcode.com/problems/maximize-ysum-by-picking-a-triplet-of-distinct-xvalues)
**Companies:** Amazon

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Group by X, Pick Top 3 — O(n)](#approach-group-by-x-pick-top-3--on-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given pairs `(x, y)`, pick exactly 3 pairs with **distinct x-values** to maximize the sum of their y-values.

---

## Key Insight

> Group by x-value, keeping the maximum y for each x. Then pick the top 3 x-groups by their max y-value.

---

## Approach: Group by X, Pick Top 3 — O(n) ✅

```
FUNCTION maxYSum(points):
    bestY = {}    // x → max y
    FOR (x, y) IN points:
        bestY[x] = MAX(bestY.get(x, -inf), y)

    // Get top 3 y values from distinct x groups
    topY = SORTED(bestY.values(), DESC)[:3]
    RETURN SUM(topY)
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Hash map + top 3 | **O(n)** | O(n) |

---

## Key Takeaway

> **Group by the distinct key, keep the best value per group, then select the top k groups.** Simple hash map aggregation.
