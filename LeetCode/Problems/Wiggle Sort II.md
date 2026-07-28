# 324. Wiggle Sort II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/wiggle-sort-ii](https://leetcode.com/problems/wiggle-sort-ii)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft
---

## Problem Description
Given an integer array `nums`, reorder it such that `nums[0] < nums[1] > nums[2] < nums[3] …`. This is called a wiggle sort. The rearranged array must satisfy the alternating inequality pattern.

## Examples
- Input: `[1,5,1,1,6,4]` → Output: `[1,4,1,5,1,6]` (one possible valid ordering).
- Input: `[1,3,2,2,3,1]` → Output: `[2,3,1,3,1,2]`.

## Approach
1. Sort the array.
2. Split the sorted array into two halves: the smaller half (including median) and the larger half.
3. Reverse each half.
4. Fill the original array: even indices receive elements from the reversed smaller half, odd indices from the reversed larger half. This guarantees the wiggle property because the largest elements are placed at odd positions and the smaller at even positions.

```text
FUNCTION wiggleSort(nums):
    SET sortedNums ← SORTED(nums)
    SET n ← LENGTH(nums)
    SET mid ← (n - 1) DIV 2
    SET small ← REVERSE(sortedNums[0 .. mid])
    SET large ← REVERSE(sortedNums[mid+1 .. n-1])
    FOR i ← 0 TO n-1:
        IF i MOD 2 = 0:
            SET nums[i] ← small[i DIV 2]
        ELSE:
            SET nums[i] ← large[i DIV 2]
```

## Walkthrough
| i | Target parity | Source array | Value placed |
|---|---------------|--------------|--------------|
| 0 | even          | small[0] = 1 | 1 |
| 1 | odd           | large[0] = 6 | 6 |
| 2 | even          | small[1] = 1 | 1 |
| 3 | odd           | large[1] = 5 | 5 |
| … | …             | …            | … |
Result satisfies `nums[0] < nums[1] > nums[2] …`.

## Complexity Analysis
- Time: O(n log n) for sorting.
- Space: O(n) for the auxiliary `small` and `large` arrays.

## Follow‑Up Questions
- How would you achieve O(n) time using the nth‑element (quick‑select) algorithm?
- Can you modify the algorithm to work in‑place with O(1) extra space?
- What if the array contains many duplicate values?

## Key Takeaway
Splitting the sorted array into two reversed halves and interleaving them yields a correct wiggle ordering.
