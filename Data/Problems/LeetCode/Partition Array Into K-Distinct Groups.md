# 3659. Partition Array Into K-Distinct Groups

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/partition-array-into-k-distinct-groups](https://leetcode.com/problems/partition-array-into-k-distinct-groups)
**Companies:** Google

---

## Problem Description
Given an integer array `nums` and an integer `k`, determine whether it is possible to partition `nums` into exactly `k` non‑empty groups such that each group contains only distinct values (no duplicates within a group). Return `true` if such a partition exists, otherwise `false`.

## Examples
**Example 1:**
```
Input: nums = [1,2,3,4,5], k = 3
Output: true
Explanation: One possible partition is {1,2}, {3,4}, {5} – each group has distinct elements.
```
**Example 2:**
```
Input: nums = [1,1,2,2,3], k = 2
Output: false
Explanation: The element `1` appears twice, so at least two groups would need `1`, violating distinctness within a group.
```

## Approach
Greedy frequency check — O(n) ✅

```text
FUNCTION canPartition(nums, k):
    freq ← MAP of element → count
    FOR x IN nums:
        freq[x] ← freq.get(x, 0) + 1
    maxFreq ← MAXIMUM value in freq
    // At least maxFreq groups are needed to separate duplicates
    RETURN maxFreq ≤ k
```
If the most frequent element appears `maxFreq` times, we need at least that many groups to place each occurrence in a different group. Hence a partition exists iff `maxFreq` ≤ `k`.

## Walkthrough
| Element | Frequency |
|---------|-----------|
| 1 | 2 |
| 2 | 2 |
| 3 | 1 |
Maximum frequency = 2. Since `k = 2`, condition holds → partition possible.

## Complexity Analysis
- **Time:** O(n) – single pass to count frequencies.
- **Space:** O(m) – map storing frequencies of distinct elements (`m` ≤ n).

## Follow‑Up Questions
1. How would you construct an explicit partition when it exists?
2. What if each group must have the same size?
3. Can the algorithm be adapted for a streaming input where the array is too large to store entirely?

## Key Takeaway
The feasibility of partitioning into `k` distinct groups hinges on the highest element frequency; ensuring enough groups to separate duplicates is sufficient.
