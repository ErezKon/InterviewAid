# 3659. Partition Array Into K-Distinct Groups

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/partition-array-into-k-distinct-groups](https://leetcode.com/problems/partition-array-into-k-distinct-groups)
**Companies:** Google

---

## Problem Description
You are given an integer array `nums` and an integer `k`.

Your task is to determine whether it is possible to partition all elements of `nums` into one or more groups such that:

- Each group contains **exactly** `k` elements.
- All elements in each group are **distinct**.
- Each element in `nums` must be assigned to **exactly** one group.

Return `true` if such a partition is possible, otherwise return `false`.

**Constraints:**

- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^5`
- `1 <= k <= nums.length`

## Examples

```
Example 1:
  Input: nums = [1,2,3,4], k = 2
  Output: true
  Explanation: One possible partition is to have 2 groups:
    - Group 1: [1, 2]
    - Group 2: [3, 4]
  Each group contains k = 2 distinct elements, and all elements are used exactly once.
```

```
Example 2:
  Input: nums = [3,5,2,2], k = 2
  Output: true
  Explanation: One possible partition is to have 2 groups:
    - Group 1: [2, 3]
    - Group 2: [2, 5]
  Each group contains k = 2 distinct elements, and all elements are used exactly once.
```

```
Example 3:
  Input: nums = [1,5,2,3], k = 3
  Output: false
  Explanation: We cannot form groups of k = 3 distinct elements using all values exactly once.
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

## Follow-Up Questions
1. How would you construct an explicit partition when it exists?
2. What if each group must have the same size?
3. Can the algorithm be adapted for a streaming input where the array is too large to store entirely?

## Key Takeaway
The feasibility of partitioning into `k` distinct groups hinges on the highest element frequency; ensuring enough groups to separate duplicates is sufficient.
