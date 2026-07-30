# 2784. Check if Array is Good

**Difficulty:** 🟢 Easy
**Companies:** Bloomberg, Google, Microsoft

---

## Problem Description
Given an integer array `nums` of length `n+1` where each element is in the range `[1, n]`, determine whether the array is "good". An array is considered good if, after sorting, it equals the sequence `[1, 2, ..., n-1, n, n]`—that is, the numbers from 1 to n appear exactly once except the number `n` which appears twice. Return `true` if the array meets this condition, otherwise `false`. Constraints: `2 ≤ n ≤ 10⁵`.

## Examples
**Example 1**
```
Input: nums = [1,2,3,3]
Output: true
Explanation: After sorting we get [1,2,3,3] which matches the required pattern for n=3.
```
**Example 2**
```
Input: nums = [1,1,2]
Output: false
Explanation: The sorted array is [1,1,2]; number 2 should appear twice for n=2.
```

## Approach
Sort the array and compare it against the expected pattern generated on the fly.

```text
FUNCTION isGood(nums):
    SET n ← LENGTH(nums) - 1
    SORT nums IN NON‑DECREASING ORDER
    FOR i ← 0 TO n-1:
        IF nums[i] != i + 1:
            RETURN false
    IF nums[n] != n:
        RETURN false
    RETURN true
```

## Walkthrough
| Step | Sorted nums | Check index | Expected | Result |
|------|-------------|-------------|----------|--------|
|0|[1,2,3,3]|0|1|match|
|1|[1,2,3,3]|1|2|match|
|2|[1,2,3,3]|2|3|match|
|final|[1,2,3,3]|n=3|3|match → return true|

## Complexity Analysis
- **Time:** O(n log n) due to sorting.
- **Space:** O(1) additional space if an in‑place sort is used; otherwise O(n).

## Follow-Up Questions
1. How can you achieve O(n) time without sorting, using a frequency array?
2. What modifications are needed if the duplicate element could be any value, not necessarily `n`?
3. How would you extend the check to validate multiple duplicate occurrences?

## Key Takeaway
Sorting the array and verifying the expected sequence provides a straightforward way to confirm the "good" property.
