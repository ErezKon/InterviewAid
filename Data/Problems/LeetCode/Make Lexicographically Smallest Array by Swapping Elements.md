# 2948. Make Lexicographically Smallest Array by Swapping Elements

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/make-lexicographically-smallest-array-by-swapping-elements](https://leetcode.com/problems/make-lexicographically-smallest-array-by-swapping-elements)
**Companies:** Amazon, Atlassian, Google, Ibm, Phonepe

---

## 1. Problem Description

Swap elements whose difference ≤ `limit`. Find the lexicographically smallest array achievable.

---

## 2. Examples

**Example 1:**
```
Input: nums = [3,1,2,4], limit = 1
Output: [1,2,3,4]
Explanation: Elements 3 and 2 differ by 1, so they can be swapped. After sorting each swappable group, the array becomes [1,2,3,4].
```

**Example 2:**
```
Input: nums = [5,4,3,2,1], limit = 0
Output: [5,4,3,2,1]
Explanation: No two elements differ by ≤0, so no swaps are possible; the array remains unchanged.
```

---

## 3. Approach: Sort + Group by Adjacency — O(n log n) ✅

```text
FUNCTION lexicographicallySmallestArray(nums, limit):
    // Pair each value with its original index and sort by value
    indexed ← SORTED(enumerate(nums), key = value)
    groups ← []    // groups of indices that can be swapped

    FOR i FROM 0 TO LENGTH(indexed) - 1:
        idx, val ← indexed[i]
        IF i == 0 OR val - indexed[i-1].value > limit:
            groups.ADD([])
        groups[-1].ADD(idx)

    result ← ARRAY_OF_SIZE(LENGTH(nums))
    FOR group IN groups:
        sortedIndices ← SORTED(group)
        sortedVals ← SORTED(nums[i] FOR i IN group)
        FOR j FROM 0 TO LENGTH(sortedIndices) - 1:
            result[sortedIndices[j]] ← sortedVals[j]

    RETURN result
```

---

## 4. Walkthrough

Consider `nums = [3,1,2,4]` and `limit = 1`.
1. Pair and sort: `[(1,1), (2,2), (0,3), (3,4)]` (index,value).
2. Build groups:
   - Start new group with index 1 (value 1).
   - Value 2 − 1 ≤ 1 → same group, add index 2.
   - Value 3 − 2 ≤ 1 → same group, add index 0.
   - Value 4 − 3 ≤ 1 → same group, add index 3.
   Resulting single group: `[1,2,0,3]`.
3. Sort indices → `[0,1,2,3]`; sort values in group → `[1,2,3,4]`.
4. Place sorted values at sorted indices → `[1,2,3,4]`.
The final array is the lexicographically smallest possible.

---

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(n log n) – sorting dominates | O(n) – for indexed pairs and groups |

---

## 6. Follow-Up Questions

- How would the solution change if swaps were allowed only between adjacent elements?
- Can the algorithm be adapted to return the sequence of swaps performed?
- What if the limit varies for each pair of elements?

---

## Key Takeaway

> Sort values and group consecutive ones within `limit`. Within each group, elements can be freely rearranged. Place sorted values at sorted indices within each group.
