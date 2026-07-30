# 1752. Check if Array Is Sorted and Rotated

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/check-if-array-is-sorted-and-rotated](https://leetcode.com/problems/check-if-array-is-sorted-and-rotated)
**Companies:** Amazon, Bloomberg, Goldman Sachs, Google, Ibm, Meta, Microsoft, Soundhound, Tcs, Visa

---

## Problem Description
Given an integer array `nums` of length `n`, determine whether it is a non‑decreasing sorted array that may have been rotated an unknown number of positions. In other words, the array should contain at most one place where a larger element is followed by a smaller one when traversed circularly. Return `true` if the condition holds, otherwise `false`. Constraints: `1 ≤ n ≤ 10⁴`, `-10⁴ ≤ nums[i] ≤ 10⁴`.

## Examples
**Example 1**
```
Input: nums = [3,4,5,1,2]
Output: true
Explanation: The array is a rotation of the sorted array [1,2,3,4,5].
```
**Example 2**
```
Input: nums = [2,1,3,4]
Output: false
Explanation: There are two drops (2→1 and 4→2) violating the condition.
```

## Approach
Count the number of inversions where `nums[i] > nums[(i+1) % n]`. If the count is 0 or 1, the array is sorted‑and‑rotated.

```text
FUNCTION check(nums):
    SET n ← LENGTH(nums)
    SET inversions ← 0
    FOR i ← 0 TO n-1:
        SET next ← (i + 1) MOD n
        IF nums[i] > nums[next]:
            SET inversions ← inversions + 1
    RETURN inversions <= 1
```

## Walkthrough
| i | nums[i] | nums[next] | inversion? | inversions so far |
|---|---------|------------|------------|-------------------|
|0|3|4|no|0|
|1|4|5|no|0|
|2|5|1|yes|1|
|3|1|2|no|1|
|4|2|3 (wrap to index0)|no|1|
The final count is 1 → return `true`.

## Complexity Analysis
- **Time:** O(n) – a single pass over the array.
- **Space:** O(1) – only a few integer variables.

## Follow-Up Questions
1. How would you modify the algorithm to handle arrays with duplicate values?
2. Can you determine the rotation index in O(log n) time using binary search?
3. How would the solution change for a circularly linked list representation?

## Key Takeaway
A sorted‑and‑rotated array contains at most one drop when examined circularly, allowing a simple linear‑time check.
