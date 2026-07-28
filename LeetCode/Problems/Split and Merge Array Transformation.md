# 3690. Split and Merge Array Transformation

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/split-and-merge-array-transformation](https://leetcode.com/problems/split-and-merge-array-transformation)
**Companies:** Meta

---

## Problem Description
Given an integer array `nums` and a target array `target` of the same length, you may repeatedly perform the following operation: choose any subarray of `nums`, split it into two non‑empty parts, and then merge the two parts back together in reversed order. Determine whether it is possible to transform `nums` into `target` using any number of such operations.

## Examples
**Example 1:**
```
Input: nums = [1,2,3,4], target = [2,1,4,3]
Output: true
Explanation: Split the whole array into [1,2] and [3,4], reverse the order of the parts and merge → [3,4,1,2]. Then split the first part [3,4] into [3] and [4] and reverse → [4,3,1,2]. Finally split the last part [1,2] and reverse → [2,1,4,3] which matches target.
```
**Example 2:**
```
Input: nums = [1,2,3], target = [3,2,1]
Output: false
Explanation: No sequence of split‑and‑merge operations can reverse the whole array because each operation preserves the relative order inside each split part.
```

## Approach
The operation only swaps whole contiguous blocks while preserving the internal order of each block. Therefore the relative order of elements inside any block never changes. The transformation is possible iff `target` can be obtained by repeatedly partitioning `nums` into blocks whose internal order matches `target`. This can be checked by a recursive divide‑and‑conquer scan:
1. Compare the first element of `target` with the first element of `nums`. If they differ, the only way to match is to split `nums` into two parts where the left part ends before that element.
2. Recursively verify the left and right sub‑segments.
If at any step the multiset of elements in a segment differs between `nums` and `target`, the transformation is impossible.

```text
FUNCTION canTransform(nums, target, l, r):
    // l and r define the current segment [l, r) in both arrays
    IF l == r:
        RETURN true
    IF nums[l] == target[l]:
        // no need to split at the leftmost position
        RETURN canTransform(nums, target, l+1, r)
    // try to find a split point k where left block matches target's right block
    FOR k FROM l+1 TO r-1:
        IF segmentEqual(nums, l, k, target, k, r) AND
           segmentEqual(nums, k, r, target, l, k):
            RETURN canTransform(nums, target, l, k) AND canTransform(nums, target, k, r)
    RETURN false

FUNCTION segmentEqual(arr1, aStart, aEnd, arr2, bStart, bEnd):
    IF (aEnd - aStart) != (bEnd - bStart):
        RETURN false
    FOR i FROM 0 TO aEnd - aStart - 1:
        IF arr1[aStart + i] != arr2[bStart + i]:
            RETURN false
    RETURN true
```
The top‑level call is `canTransform(nums, target, 0, LENGTH(nums))`.

## Walkthrough
Consider `nums = [1,2,3,4]`, `target = [2,1,4,3]`.
1. `nums[0] != target[0]` → need a split.
2. Try split at `k=2`:
   - Left block `nums[0:2] = [1,2]` matches `target[2:4] = [4,3]`? No.
   - Split at `k=1` fails similarly.
3. Split at `k=2` after reversing block order yields `[3,4,1,2]`.
4. Recursively apply the same logic on the new segments until the arrays match.
The recursion explores valid split points and confirms feasibility.

## Complexity Analysis
- **Time:** In the worst case, the algorithm tries every possible split point at each recursion level, leading to O(n²) time.
- **Space:** O(n) recursion stack depth.

## Follow-Up Questions
1. Can the algorithm be optimized to O(n log n) using memoization of segment equality?
2. How would the solution change if reversing the order of the two parts is optional?
3. What if the operation allowed rotating a subarray instead of swapping two parts?

## Key Takeaway
Split‑and‑merge operations only reorder whole contiguous blocks; checking feasibility reduces to recursively matching block structures between the original and target arrays.
