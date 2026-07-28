# 2966. Divide Array Into Arrays With Max Difference

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/divide-array-into-arrays-with-max-difference](https://leetcode.com/problems/divide-array-into-arrays-with-max-difference)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Salesforce

---

## Problem Description

Divide `nums` (length divisible by 3) into groups of 3 such that the difference between the max and min in each group is ≤ `k`. Return the groups, or empty array if impossible.

---

## Approach: Sort + Group ✅

```text
FUNCTION divideArray(nums, k):
    // Sort the numbers to minimize spread within each group
    SORT nums
    SET result ← []
    FOR i ← 0 TO len(nums) - 1 STEP 3:
        // Check the spread of the current triple
        IF nums[i+2] - nums[i] > k:
            RETURN []
        APPEND [nums[i], nums[i+1], nums[i+2]] TO result
    RETURN result
```

---

## Examples

| nums | k | Expected Output |
|------|---|-----------------|
| `[1,3,5,6,8,10]` | `4` | `[[1,3,5],[6,8,10]]` |
| `[1,2,3,4,5,6]` | `1` | `[]` |
| `[2,2,2,2,2,2]` | `0` | `[[2,2,2],[2,2,2]]` |

---

## Walkthrough

**Example 1:** `nums = [1,3,5,6,8,10]`, `k = 4`

| Step | Action | Sorted nums | Triple | Max‑Min | Valid? |
|------|--------|-------------|--------|--------|-------|
| 1 | Sort | `[1,3,5,6,8,10]` | — | — | — |
| 2 | Form first triple (indices 0‑2) | — | `[1,3,5]` | `5‑1 = 4` | ✅ |
| 3 | Form second triple (indices 3‑5) | — | `[6,8,10]` | `10‑6 = 4` | ✅ |

All triples satisfy the constraint, so the result is `[[1,3,5],[6,8,10]]`.

---

## Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| **Time** | O(n log n) | Sorting dominates |
| **Space** | O(n) | Result storage |

---

## Follow-Up Questions

1. How would you modify the algorithm if groups could be of size `m` (not just 3)?
2. Can you solve it in O(1) extra space if the input array can be reordered in‑place?
3. What if the constraint was on the sum of each group instead of max‑min difference?

---

## Key Takeaway

> **Minimizing within‑group spread = sort first, then group adjacent elements. If any group violates the constraint, no valid partition exists.**