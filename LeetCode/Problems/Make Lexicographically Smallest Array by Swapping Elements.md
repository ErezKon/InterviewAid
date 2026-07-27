# 2948. Make Lexicographically Smallest Array by Swapping Elements

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/make-lexicographically-smallest-array-by-swapping-elements](https://leetcode.com/problems/make-lexicographically-smallest-array-by-swapping-elements)
**Companies:** Amazon, Atlassian, Google, Ibm, Phonepe

---

## 1. Problem Description

Swap elements whose difference ≤ `limit`. Find the lexicographically smallest array achievable.

---

## 2. Approach: Sort + Group by Adjacency — O(n log n) ✅

```
FUNCTION lexicographicallySmallestArray(nums, limit):
    indexed = sorted(enumerate(nums), key=lambda p: p[1])
    groups = []    // groups of indices that can swap

    FOR i, (idx, val) IN enumerate(indexed):
        IF i == 0 OR val - indexed[i-1][1] > limit:
            groups.ADD([])
        groups[-1].ADD(idx)

    result = [0] * len(nums)
    FOR group IN groups:
        sortedIndices = sorted(group)
        sortedVals = sorted(nums[i] for i in group)
        FOR i, idx IN enumerate(sortedIndices):
            result[idx] = sortedVals[i]

    RETURN result
```

| Time | Space |
|------|-------|
| O(n log n) | O(n) |

---

## 3. Key Takeaway

> Sort values and group consecutive ones within `limit`. Within each group, elements can be freely rearranged. Place sorted values at sorted indices within each group.
