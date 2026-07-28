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

```text
FUNCTION assignElements(groups, elements):
    // Map each element value to its earliest index
    valToIdx ← {}
    FOR i, v IN enumerate(elements):
        IF v NOT IN valToIdx:
            valToIdx[v] ← i
    
    result ← []
    FOR g IN groups:
        bestIdx ← INF
        FOR d ← 1 TO √g:
            IF g % d == 0:
                IF d IN valToIdx:
                    bestIdx ← MIN(bestIdx, valToIdx[d])
                IF g/d IN valToIdx:
                    bestIdx ← MIN(bestIdx, valToIdx[g/d])
        result.ADD(bestIdx IF bestIdx != INF ELSE -1)
    RETURN result
```

| Time | Space |
|------|-------|
| O(n√max_val) | O(n) |

---

## 4. Examples

| groups | elements | Output |
|--------|----------|--------|
| [6,10] | [2,3,5] | [0,2] |
| [7,14] | [1,2,3] | [0,1] |

*Explanation*: For group 6, element 2 (index 0) divides it; for group 10, element 5 (index 2) divides it.

---

## 5. Walkthrough

Consider `groups = [12]` and `elements = [2,3,4]`.

1. Build `valToIdx`: {2→0, 3→1, 4→2}.
2. For group 12, iterate divisors `d = 1..√12` → {1,2,3,4}. Matching values give indices 0,1,2; the smallest is 0.
3. Result = [0].

---

## 6. Complexity Analysis

- **Time**: For each group we enumerate divisors up to √g, giving O(g √max) overall; building the map is O(n).
- **Space**: O(n) for the value‑to‑index map and O(m) for the result array.

---

## 7. Follow‑Up Questions

- How would the solution change if an element could be used for multiple groups?
- What if groups and elements are up to 10⁹ and you need a sub‑linear solution?

---

## Key Takeaway

> Enumerate divisors of each group value in O(√g) and look up the smallest-index element for each divisor.
