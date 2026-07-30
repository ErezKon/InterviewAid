# 1968. Array With Elements Not Equal to Average of Neighbors

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/array-with-elements-not-equal-to-average-of-neighbors](https://leetcode.com/problems/array-with-elements-not-equal-to-average-of-neighbors)
**Companies:** Uber

---

## 1. Problem Description

Given an array `nums` of distinct integers, rearrange it so that no element equals the average of its two neighbors. Any valid rearrangement is accepted.

## 2. Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `[1,2,3,4,5]` | `[2,5,1,4,3]` | No element is the average of its neighbors.
| `[5,1,3,2,4]` | `[1,5,2,4,3]` | Alternate ordering avoids average condition.

## 3. Approach

A "wiggle" arrangement (small, large, small, large, ...) guarantees no element is the average of its neighbors. Sort, then interleave the first half and second half, or simply sort and swap adjacent pairs.

```text
FUNCTION rearrangeArray(nums):
    SORT nums
    // swap adjacent pairs to create wiggle pattern
    FOR i ← 1 TO LENGTH(nums) - 2 STEP 2:
        SWAP nums[i], nums[i+1]
    RETURN nums
```

## 4. Walkthrough

Take `[1,2,3,4,5]`:
1. Sort → `[1,2,3,4,5]`.
2. Swap indices 1&2 → `[1,3,2,4,5]`.
3. Swap indices 3&4 → `[1,3,2,5,4]`.
Result `[1,3,2,5,4]` satisfies the condition.

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(n log n) due to sorting | O(1) extra |

## 6. Follow‑Up Questions

- How would you handle arrays with duplicate values?
- Can you achieve O(n) time without sorting?
- What if the condition applied to circular neighbors?

## Key Takeaway

> Wiggle sort ensures every middle element is either a local max or local min, preventing it from being the average of its neighbors.
