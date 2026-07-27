# 1968. Array With Elements Not Equal to Average of Neighbors

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/array-with-elements-not-equal-to-average-of-neighbors](https://leetcode.com/problems/array-with-elements-not-equal-to-average-of-neighbors)
**Companies:** Uber

---

## 1. Problem Description

Given an array `nums` of distinct integers, rearrange it so that no element equals the average of its two neighbors. Any valid rearrangement is accepted.

---

## 2. Key Insight

> A "wiggle" arrangement (small, large, small, large, ...) guarantees no element is the average of its neighbors. Sort, then interleave the first half and second half, or simply sort and swap adjacent pairs.

---

## 3. Approach: Sort + Wiggle Swap — O(n log n) ✅

```
FUNCTION rearrangeArray(nums):
    SORT nums
    // swap adjacent pairs: ensure nums[1] > nums[0] and nums[1] > nums[2], etc.
    FOR i FROM 1 TO len(nums) - 2 STEP 2:
        SWAP nums[i], nums[i+1]
    RETURN nums
```

Alternative: sort, then place first half at even indices and second half at odd indices.

| Time | Space |
|------|-------|
| O(n log n) | O(1) extra |

---

## Key Takeaway

> Wiggle sort ensures every middle element is either a local max or local min, preventing it from being the average of its neighbors.
