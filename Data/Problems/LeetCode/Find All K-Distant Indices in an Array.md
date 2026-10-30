# 2200. Find All K-Distant Indices in an Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-all-k-distant-indices-in-an-array](https://leetcode.com/problems/find-all-k-distant-indices-in-an-array)
**Companies:** Amazon, Bloomberg, Google, Meta

---

## Problem Description
You are given a **0-indexed** integer array `nums` and two integers `key` and `k`. A **k-distant index** is an index `i` of `nums` for which there exists at least one index `j` such that `|i - j| <= k` and `nums[j] == key`.

Return *a list of all k-distant indices sorted in **increasing order***.

**Constraints:**

- `1 <= nums.length <= 1000`
- `1 <= nums[i] <= 1000`
- `key` is an integer from the array `nums`.
- `1 <= k <= nums.length`

## Examples

```
Example 1:
  Input: nums = [3,4,9,1,3,9,5], key = 9, k = 1
  Output: [1,2,3,4,5,6]
  Explanation: Here, nums[2] == key and nums[5] == key.
  - For index 0, |0 - 2| > k and |0 - 5| > k, so there is no j where |0 - j| <= k and nums[j] == key. Thus, 0 is not a k-distant index.
  - For index 1, |1 - 2| <= k and nums[2] == key, so 1 is a k-distant index.
  - For index 2, |2 - 2| <= k and nums[2] == key, so 2 is a k-distant index.
  - For index 3, |3 - 2| <= k and nums[2] == key, so 3 is a k-distant index.
  - For index 4, |4 - 5| <= k and nums[5] == key, so 4 is a k-distant index.
  - For index 5, |5 - 5| <= k and nums[5] == key, so 5 is a k-distant index.
  - For index 6, |6 - 5| <= k and nums[5] == key, so 6 is a k-distant index.
  Thus, we return [1,2,3,4,5,6] which is sorted in increasing order.
```

```
Example 2:
  Input: nums = [2,2,2,2,2], key = 2, k = 2
  Output: [0,1,2,3,4]
  Explanation: For all indices i in nums, there exists some index j such that |i - j| <= k and nums[j] == key, so every index is a k-distant index.
  Hence, we return [0,1,2,3,4].
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
