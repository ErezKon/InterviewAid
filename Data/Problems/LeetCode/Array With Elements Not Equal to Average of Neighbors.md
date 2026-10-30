# 1968. Array With Elements Not Equal to Average of Neighbors

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/array-with-elements-not-equal-to-average-of-neighbors](https://leetcode.com/problems/array-with-elements-not-equal-to-average-of-neighbors)
**Companies:** Uber

---

## 1. Problem Description

You are given a **0-indexed** array `nums` of **distinct** integers. You want to rearrange the elements in the array such that every element in the rearranged array is **not** equal to the **average** of its neighbors.

More formally, the rearranged array should have the property such that for every `i` in the range `1 <= i < nums.length - 1`, `(nums[i-1] + nums[i+1]) / 2` is **not** equal to `nums[i]`.

Return ***any** rearrangement of* `nums` *that meets the requirements*.

**Constraints:**
- `3 <= nums.length <= 10^5`
- `0 <= nums[i] <= 10^5`

## 2. Examples

```
Example 1:
  Input: nums = [1,2,3,4,5]
  Output: [1,2,4,5,3]
  Explanation:
  When i=1, nums[i] = 2, and the average of its neighbors is (1+4) / 2 = 2.5.
  When i=2, nums[i] = 4, and the average of its neighbors is (2+5) / 2 = 3.5.
  When i=3, nums[i] = 5, and the average of its neighbors is (4+3) / 2 = 3.5.

Example 2:
  Input: nums = [6,2,0,9,7]
  Output: [9,7,6,2,0]
  Explanation:
  When i=1, nums[i] = 7, and the average of its neighbors is (9+6) / 2 = 7.5.
  When i=2, nums[i] = 6, and the average of its neighbors is (7+2) / 2 = 4.5.
  When i=3, nums[i] = 2, and the average of its neighbors is (6+0) / 2 = 3.
  Note that the original array [6,2,0,9,7] also satisfies the conditions.
```

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
