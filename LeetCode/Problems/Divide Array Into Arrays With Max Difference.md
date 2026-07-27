# 2966. Divide Array Into Arrays With Max Difference

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/divide-array-into-arrays-with-max-difference](https://leetcode.com/problems/divide-array-into-arrays-with-max-difference)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Salesforce

---

## Problem Description

Divide `nums` (length divisible by 3) into groups of 3 such that the difference between the max and min in each group is ≤ `k`. Return the groups, or empty array if impossible.

---

## Key Insight

> Sort and greedily group consecutive triples. Sorted order minimizes the spread within each group.

---

## Approach: Sort + Group ✅

```
FUNCTION divideArray(nums, k):
    SORT nums
    result = []
    FOR i ← 0 TO len(nums) - 1 STEP 3:
        IF nums[i+2] - nums[i] > k: RETURN []
        result.ADD([nums[i], nums[i+1], nums[i+2]])
    RETURN result
```

Sort, group in triples. If max - min in any triple > k, impossible.

---

## Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| **Time** | O(n log n) | Sorting dominates |
| **Space** | O(n) | Result storage |

---

## Key Takeaway

> **Minimizing within-group spread = sort first, then group adjacent elements. If any group violates the constraint, no valid partition exists.**
