# 80. Remove Duplicates from Sorted Array II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii](https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii)
**Companies:** Accolite, Amazon, Bloomberg, Freshworks, Google, Meta, Microsoft, Tcs, Tiktok

---

## Problem Description
Given a sorted integer array `nums`, modify it in-place such that each distinct element appears at most twice. Return the new length of the array after removal. The relative order of the elements must be maintained.

## Examples
**Example 1:**
```
Input: nums = [1,1,1,2,2,3]
Output: 5, nums = [1,1,2,2,3]
```
**Explanation:** The third `1` is removed; each element appears at most twice.

**Example 2:**
```
Input: nums = [0,0,1,1,1,1,2,3,3]
Output: 7, nums = [0,0,1,1,2,3,3]
```
**Explanation:** Extra `1`s are removed.

## Approach
Use the two‑pointer technique. Maintain a `write` pointer indicating the position to write the next allowed element. Start `write` at 2 because the first two elements are always allowed. Iterate `read` from index 2 onward; for each `nums[read]`, compare it with `nums[write‑2]`. If they differ, the element can be kept and written at `write`, then increment `write`.

```text
FUNCTION removeDuplicates(nums):
    IF LENGTH(nums) <= 2:
        RETURN LENGTH(nums)
    SET write ← 2
    FOR read ← 2 TO LENGTH(nums) - 1:
        IF nums[read] != nums[write - 2]:
            SET nums[write] ← nums[read]
            SET write ← write + 1
    RETURN write
```

## Walkthrough
| Step | read index | nums[read] | nums[write‑2] | Action | write after |
|------|------------|-----------|--------------|--------|------------|
| 1 | 2 | 1 | 1 | equal → skip | 2 |
| 2 | 3 | 2 | 1 | not equal → write 2 at idx2 | 3 |
| 3 | 4 | 2 | 1 | not equal → write 2 at idx3 | 4 |
| 4 | 5 | 3 | 2 | not equal → write 3 at idx4 | 5 |

Resulting array `[1,1,2,2,3]` with length 5.

## Complexity Analysis
- **Time:** O(N) where N is the length of `nums`.
- **Space:** O(1) extra space (in‑place).

## Follow-Up Questions
1. How would you modify the algorithm to allow at most *k* duplicates for any k?
2. Can you solve the problem without modifying the input array (return a new array instead)?
3. How would you handle the case where the array is not sorted?

## Key Takeaway
Two‑pointer scanning with a lag of two positions lets you enforce the “at most two duplicates” rule in a single pass and O(1) space.
