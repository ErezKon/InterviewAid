# 3447. Assign Elements to Groups with Constraints

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/assign-elements-to-groups-with-constraints](https://leetcode.com/problems/assign-elements-to-groups-with-constraints)
**Companies:** Bcg

---

## 1. Problem Description

You are given an integer array `groups`, where `groups[i]` represents the size of the `iᵗʰ` group. You are also given an integer array `elements`.

Your task is to assign **one** element to each group based on the following rules:

- An element at index `j` can be assigned to a group `i` if `groups[i]` is **divisible** by `elements[j]`.
- If there are multiple elements that can be assigned, assign the element with the **smallest index** `j`.
- If no element satisfies the condition for a group, assign -1 to that group.

Return an integer array `assigned`, where `assigned[i]` is the index of the element chosen for group `i`, or -1 if no suitable element exists.

**Note**: An element may be assigned to more than one group.

**Constraints:**
- `1 ≤ groups.length ≤ 10⁵`
- `1 ≤ elements.length ≤ 10⁵`
- `1 ≤ groups[i] ≤ 10⁵`
- `1 ≤ elements[i] ≤ 10⁵`

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

```
Example 1:
  Input: groups = [8,4,3,2,4], elements = [4,2]
  Output: [0,0,-1,1,0]
  Explanation:
  - elements[0] = 4 is assigned to groups 0, 1, and 4.
  - elements[1] = 2 is assigned to group 3.
  - Group 2 cannot be assigned any element.

Example 2:
  Input: groups = [2,3,5,7], elements = [5,3,3]
  Output: [-1,1,0,-1]
  Explanation:
  - elements[1] = 3 is assigned to group 1.
  - elements[0] = 5 is assigned to group 2.
  - Groups 0 and 3 cannot be assigned any element.

Example 3:
  Input: groups = [10,21,30,41], elements = [2,1]
  Output: [0,1,0,1]
  Explanation: elements[0] = 2 is assigned to the groups with even values, and elements[1] = 1 is assigned to the groups with odd values.
```

---

## 5. Walkthrough

Consider `groups = [12]` and `elements = [2,3,4]`.

1. Build `valToIdx`: {2→0, 3→1, 4→2}.
2. For group 12, iterate divisors `d = 1..√12` → {1,2,3,4}. Matching values give indices 0,1,2; the smallest is 0.
3. Result = [0].

---

## 6. Complexity Analysis

- **Time**: For each group we enumerate divisors up to √g, giving O(g √max) overall; building the map is O(n).
- **Space**: O(n) for the value-to-index map and O(m) for the result array.

---

## 7. Follow-Up Questions

- How would the solution change if an element could be used for multiple groups?
- What if groups and elements are up to 10⁹ and you need a sub-linear solution?

---

## Key Takeaway

> Enumerate divisors of each group value in O(√g) and look up the smallest-index element for each divisor.
