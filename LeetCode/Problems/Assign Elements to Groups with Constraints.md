# 3447. Assign Elements to Groups with Constraints

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/assign-elements-to-groups-with-constraints](https://leetcode.com/problems/assign-elements-to-groups-with-constraints)
**Companies:** Bcg

---

## 1. Problem Description

Given `groups` and `elements` arrays, assign elements to groups where an element can be assigned to a group if it divides the group value. Each element can be assigned to at most one group. Return the assigned element index for each group, or -1 if unassigned.

---

## 2. Key Insight

> For each group value, find the **first** element (by index) that divides it. Precompute a map: for each possible divisor, store the smallest-index element with that value.

---

## 3. Approach: Divisor Lookup — O(n√max) ✅

```
FUNCTION assignElements(groups, elements):
    // Map each element value to its earliest index
    valToIdx = {}
    FOR i, v IN enumerate(elements):
        IF v NOT IN valToIdx: valToIdx[v] = i
    
    result = []
    FOR g IN groups:
        bestIdx = INF
        FOR d ← 1 TO √g:
            IF g % d == 0:
                IF d IN valToIdx: bestIdx = MIN(bestIdx, valToIdx[d])
                IF g/d IN valToIdx: bestIdx = MIN(bestIdx, valToIdx[g/d])
        result.ADD(bestIdx IF bestIdx != INF ELSE -1)
    RETURN result
```

| Time | Space |
|------|-------|
| O(n√max_val) | O(n) |

---

## Key Takeaway

> Enumerate divisors of each group value in O(√g) and look up the smallest-index element for each divisor.
