# 2200. Find All K-Distant Indices in an Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-all-k-distant-indices-in-an-array](https://leetcode.com/problems/find-all-k-distant-indices-in-an-array)
**Companies:** Amazon, Bloomberg, Google, Meta

---

## Problem Description
Given an integer array `nums`, an integer `key`, and a non‑negative integer `k`, return all indices `i` such that there exists an index `j` where `nums[j] == key` and `|i - j| ≤ k`. The result should be sorted in ascending order.

## Examples
```text
Input: nums = [1,2,3,4,5], key = 3, k = 1
Output: [2,3]
Explanation: Index 2 holds the key itself; index 3 is within distance 1.

Input: nums = [5,5,5,5], key = 5, k = 0
Output: [0,1,2,3]
```

## Approach
Iterate through the array to locate positions of `key`. For each occurrence at index `j`, add all indices from `max(0, j‑k)` to `min(n‑1, j+k)` into a set to avoid duplicates. Finally, convert the set to a sorted list.

## Pseudocode
```text
FUNCTION findKDistantIndices(nums, key, k):
    SET n ← LENGTH(nums)
    SET resultSet ← empty set
    FOR j FROM 0 TO n-1:
        IF nums[j] == key:
            SET start ← MAX(0, j - k)
            SET end ← MIN(n - 1, j + k)
            FOR i FROM start TO end:
                ADD i TO resultSet
    RETURN SORTED(resultSet)
```

## Walkthrough
| j (key) | start | end | indices added |
|---------|-------|-----|----------------|
| 2 (value 3) | 1 | 3 | 1,2,3 |
| after deduplication → [1,2,3] (sorted) |

## Complexity Analysis
- **Time:** O(n·k) in the worst case (when many keys are close together). Since `k` ≤ n, this is O(n²) worst‑case but acceptable for the given constraints.
- **Space:** O(n) for the result set.

## Follow‑Up Questions
- How would you improve the runtime to O(n) regardless of `k`?
- Can you output the result without sorting by using a boolean array of length `n`?
- What changes are needed if `k` can be larger than the array size?

## Key Takeaway
Collecting indices around each key occurrence with a set ensures uniqueness, and sorting yields the required ordered output.
