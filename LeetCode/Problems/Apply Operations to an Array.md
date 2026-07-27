# 2460. Apply Operations to an Array

**Difficulty:** 🟢 Easy
**LeetCode:** https://leetcode.com/problems/apply-operations-to-an-array
**Companies:** Amazon, Bloomberg, Google, Meta
---

## Problem Description
Given an integer array `nums`, perform the following operation exactly once: iterate from left to right, and whenever two adjacent elements are equal, double the left element and set the right element to `0`. After completing the pass, move all zeros to the end while preserving the order of non‑zero elements. Return the resulting array.

## Examples
**Example 1**
```
Input: nums = [2,2,1,1]
Output: [4,2,0,0]
Explanation: First pair 2,2 becomes 4,0; then pair 1,1 becomes 2,0. After moving zeros: [4,2,0,0].
```
**Example 2**
```
Input: nums = [0,1,2,3]
Output: [0,1,2,3]
Explanation: No adjacent equal elements, array unchanged.
```

## Approach
1. Single left‑to‑right pass: when `nums[i] == nums[i+1]`, set `nums[i] ← nums[i] * 2` and `nums[i+1] ← 0` and skip the next index.
2. After the pass, collect all non‑zero values preserving order, then append the appropriate number of zeros.

```text
FUNCTION applyOperations(nums):
    i ← 0
    WHILE i < LENGTH(nums) - 1:
        IF nums[i] == nums[i+1]:
            nums[i] ← nums[i] * 2
            nums[i+1] ← 0
            i ← i + 2   // skip the zero we just created
        ELSE:
            i ← i + 1
    // compact non‑zeros
    result ← []
    FOR val IN nums:
        IF val != 0:
            APPEND val TO result
    zeros ← LENGTH(nums) - LENGTH(result)
    RETURN result + [0] * zeros
```

## Walkthrough
For `[2,2,1,1]`:
- i=0: equal → nums becomes `[4,0,1,1]`, i jumps to 2.
- i=2: equal → nums becomes `[4,0,2,0]`.
Compaction yields `[4,2]` and two zeros appended → `[4,2,0,0]`.

## Complexity Analysis
*Time*: O(n) – one pass plus one compact pass.
*Space*: O(n) for the result array (in‑place can be O(1)).

## Follow‑Up Questions
1. How would you modify the algorithm to perform the operation repeatedly until no adjacent equal pairs remain?
2. Can you achieve the same result using only O(1) extra space?
3. What changes are needed if the operation should be applied from right to left instead?

## Key Takeaway
A single linear scan with in‑place updates, followed by a compacting step, solves the problem efficiently.
