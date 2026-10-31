# 2460. Apply Operations to an Array

**Difficulty:** 🟢 Easy
**LeetCode:** https://leetcode.com/problems/apply-operations-to-an-array
**Companies:** Amazon, Bloomberg, Google, Meta
---

## Problem Description
You are given a **0-indexed** array `nums` of size `n` consisting of **non-negative** integers.

You need to apply `n - 1` operations to this array where, in the `iᵗʰ` operation (**0-indexed**), you will apply the following on the `iᵗʰ` element of `nums`:

- If `nums[i] == nums[i + 1]`, then multiply `nums[i]` by `2` and set `nums[i + 1]` to `0`. Otherwise, you skip this operation.

After performing **all** the operations, **shift** all the `0`'s to the **end** of the array.

- For example, the array `[1,0,2,0,0,1]` after shifting all its `0`'s to the end, is `[1,2,1,0,0,0]`.

Return *the resulting array*.

**Note** that the operations are applied **sequentially**, not all at once.

**Constraints:**
- `2 <= nums.length <= 2000`
- `0 <= nums[i] <= 1000`

## Examples
```
Example 1:
  Input: nums = [1,2,2,1,1,0]
  Output: [1,4,2,0,0,0]
  Explanation: We do the following operations:
  - i = 0: nums[0] and nums[1] are not equal, so we skip this operation.
  - i = 1: nums[1] and nums[2] are equal, we multiply nums[1] by 2 and change nums[2] to 0. The array becomes [1,4,0,1,1,0].
  - i = 2: nums[2] and nums[3] are not equal, so we skip this operation.
  - i = 3: nums[3] and nums[4] are equal, we multiply nums[3] by 2 and change nums[4] to 0. The array becomes [1,4,0,2,0,0].
  - i = 4: nums[4] and nums[5] are equal, we multiply nums[4] by 2 and change nums[5] to 0. The array becomes [1,4,0,2,0,0].
  After that, we shift the 0's to the end, which gives the array [1,4,2,0,0,0].
```
```
Example 2:
  Input: nums = [0,1]
  Output: [1,0]
  Explanation: No operation can be applied, we just shift the 0 to the end.
```

## Approach
1. Single left-to-right pass: when `nums[i] == nums[i+1]`, set `nums[i] ← nums[i] * 2` and `nums[i+1] ← 0` and skip the next index.
2. After the pass, collect all non-zero values preserving order, then append the appropriate number of zeros.

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
    // compact non-zeros
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
*Space*: O(n) for the result array (in-place can be O(1)).

## Follow-Up Questions
1. How would you modify the algorithm to perform the operation repeatedly until no adjacent equal pairs remain?
2. Can you achieve the same result using only O(1) extra space?
3. What changes are needed if the operation should be applied from right to left instead?

## Key Takeaway
A single linear scan with in-place updates, followed by a compacting step, solves the problem efficiently.
