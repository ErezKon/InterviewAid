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

You are given two integer arrays `x` and `y`, each of length `n`. You must choose three **distinct** indices `i`, `j`, and `k` such that:

- `x[i] != x[j]`
- `x[j] != x[k]`
- `x[k] != x[i]`

Your goal is to **maximize** the value of `y[i] + y[j] + y[k]` under these conditions. Return the **maximum** possible sum that can be obtained by choosing such a triplet of indices.

If no such triplet exists, return -1.

**Constraints:**
- `n == x.length == y.length`
- `3 <= n <= 10^5`
- `1 <= x[i], y[i] <= 10^6`

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
Input: x = [1,2,1,3,2], y = [5,3,4,6,2]
Output: 14
Explanation: - Choose i = 0 (x[i] = 1, y[i] = 5), j = 1 (x[j] = 2, y[j] = 3), k = 3 (x[k] = 3, y[k] = 6).
- All three values chosen from x are distinct. 5 + 3 + 6 = 14 is the maximum we can obtain. Hence, the output is 14.
```

**Example 2:**
```
Input: x = [1,2,1,2], y = [4,5,6,7]
Output: -1
Explanation: - There are only two distinct values in x. Hence, the output is -1.
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
