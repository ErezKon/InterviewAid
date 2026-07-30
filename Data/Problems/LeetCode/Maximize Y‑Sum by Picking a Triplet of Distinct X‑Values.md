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

## Examples

**Example 1:**
```
points = [[1,5],[2,3],[3,4],[1,2]]
Output: 12
Explanation: Choose (1,5), (2,3), (3,4). Their x-values are distinct and the sum is 5+3+4 = 12.
```

**Example 2:**
```
points = [[1,10],[1,8],[2,7],[3,6]]
Output: 23
Explanation: The best y for x=1 is 10. Pick (1,10), (2,7), (3,6) → sum = 23.
```

---

## Walkthrough

1. **Group by x:**
   - Iterate over each pair and store the maximum y for each x in a hash map.
2. **Collect maxima:**
   - After processing all pairs, the map contains the best y for every distinct x.
3. **Select top 3:**
   - Sort the map values in descending order and take the first three.
4. **Sum:**
   - Return the sum of these three values.

For Example 1, the map becomes `{1:5, 2:3, 3:4}`. Sorting the values yields `[5,4,3]`; the sum of the top three is `12`.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Hash map + top 3 | **O(n)** | O(n) |

---

## Key Takeaway

> **Group by the distinct key, keep the best value per group, then select the top k groups.** Simple hash map aggregation.
