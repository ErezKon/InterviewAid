# 698. Partition to K Equal Sum Subsets

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/partition-to-k-equal-sum-subsets](https://leetcode.com/problems/partition-to-k-equal-sum-subsets)
**Companies:** Amazon, Bloomberg, Google, Linkedin, Meta, Microsoft, Tiktok, Zeta

---

## Approach: Backtracking — O(k·2ⁿ) ✅

```
FUNCTION canPartitionKSubsets(nums, k):
    total = SUM(nums)
    IF total % k != 0: RETURN false
    target = total / k
    SORT nums in reverse
    IF nums[0] > target: RETURN false

    buckets = [0] * k
    RETURN backtrack(nums, buckets, 0, target)

FUNCTION backtrack(nums, buckets, idx, target):
    IF idx == len(nums): RETURN true

    FOR i ← 0 TO len(buckets) - 1:
        IF buckets[i] + nums[idx] > target: CONTINUE
        IF i > 0 AND buckets[i] == buckets[i-1]: CONTINUE    // symmetry

        buckets[i] += nums[idx]
        IF backtrack(nums, buckets, idx + 1, target): RETURN true
        buckets[i] -= nums[idx]

    RETURN false
```
