# 3690. Split and Merge Array Transformation

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/split-and-merge-array-transformation](https://leetcode.com/problems/split-and-merge-array-transformation)
**Companies:** Meta

---

## Problem Description

> *Note: the Approach/Walkthrough below solve an invented yes/no problem. Correct idea: `n ≤ 6`, so BFS over array states (tuples) — from each state try every subarray `[l..r]` and every re-insertion position; the BFS depth at which `nums2` is reached is the answer. O(n!·n⁴).*

You are given two integer arrays `nums1` and `nums2`, each of length `n`. You may perform the following **split-and-merge operation** on `nums1` any number of times:

- Choose a subarray `nums1[L..R]`.
- Remove that subarray, leaving the prefix `nums1[0..L-1]` (empty if `L = 0`) and the suffix `nums1[R+1..n-1]` (empty if `R = n - 1`).
- Re-insert the removed subarray (in its original order) at **any** position in the remaining array (i.e., between any two elements, at the very start, or at the very end).

Return the **minimum** number of **split-and-merge operations** needed to transform `nums1` into `nums2`.

**Constraints:**
- `2 <= n == nums1.length == nums2.length <= 6`
- `-10^5 <= nums1[i], nums2[i] <= 10^5`
- `nums2` is a **permutation** of `nums1`.

## Examples

**Example 1:**
```
Input: nums1 = [3,1,2], nums2 = [1,2,3]
Output: 1
Explanation: - Split out the subarray [3] (L = 0, R = 0); the remaining array is [1,2].
- Insert [3] at the end; the array becomes [1,2,3].
```

**Example 2:**
```
Input: nums1 = [1,1,2,3,4,5], nums2 = [5,4,3,2,1,1]
Output: 3
Explanation: - Remove [1,1,2] at indices 0 - 2; remaining is [3,4,5]; insert [1,1,2] at position 2, resulting in [3,4,1,1,2,5].
- Remove [4,1,1] at indices 1 - 3; remaining is [3,2,5]; insert [4,1,1] at position 3, resulting in [3,2,5,4,1,1].
- Remove [3,2] at indices 0 - 1; remaining is [5,4,1,1]; insert [3,2] at position 2, resulting in [5,4,3,2,1,1].
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
