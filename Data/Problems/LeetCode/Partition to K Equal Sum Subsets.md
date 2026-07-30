# 698. Partition to K Equal Sum Subsets

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/partition-to-k-equal-sum-subsets](https://leetcode.com/problems/partition-to-k-equal-sum-subsets)
**Companies:** Amazon, Bloomberg, Google, Linkedin, Meta, Microsoft, Tiktok, Zeta

---

## Problem Description
Given an integer array `nums` and an integer `k`, determine whether it is possible to split `nums` into `k` non‑empty subsets whose sums are all equal.

## Examples
| Input | Output | Explanation |
|-------|--------|-------------|
| `nums = [4,3,2,3,5,2,1]`, `k = 4` | `true` | The array can be partitioned into subsets `{5}`, `{1,4}`, `{2,3}`, `{2,3}` each summing to 5. |
| `nums = [1,2,3,4]`, `k = 3` | `false` | No way to form three equal‑sum subsets. |

## Approach
Use backtracking with pruning:
1. Compute total sum; if not divisible by `k`, return false.
2. Sort `nums` descending to place large numbers first.
3. Maintain `k` bucket sums. Recursively try to put each number into a bucket without exceeding the target sum. Skip identical bucket states to avoid symmetry.

```text
FUNCTION canPartitionKSubsets(nums, k):
    SET total ← SUM(nums)
    IF total MOD k ≠ 0: RETURN false
    SET target ← total / k
    SORT nums IN descending order
    IF nums[0] > target: RETURN false

    SET buckets ← ARRAY of k zeros
    RETURN backtrack(nums, 0, buckets, target)

FUNCTION backtrack(nums, idx, buckets, target):
    IF idx = LENGTH(nums): RETURN true
    SET current ← nums[idx]
    FOR i ← 0 TO k-1:
        IF buckets[i] + current > target: CONTINUE
        // skip same bucket sums to prune symmetry
        IF i > 0 AND buckets[i] = buckets[i-1]: CONTINUE
        buckets[i] ← buckets[i] + current
        IF backtrack(nums, idx + 1, buckets, target): RETURN true
        buckets[i] ← buckets[i] - current
    ENDFOR
    RETURN false
```

## Walkthrough
For `nums = [4,3,2,3,5,2,1]`, `k = 4`:

| Step | idx | current | Buckets before | Action | Buckets after |
|------|-----|---------|----------------|--------|---------------|
| 1 | 0 | 5 | [0,0,0,0] | place in bucket0 | [5,0,0,0] |
| 2 | 1 | 4 | [5,0,0,0] | bucket0 full, try bucket1 | [5,4,0,0] |
| 3 | 2 | 3 | [5,4,0,0] | bucket1 → [5,7] exceeds target, try bucket2 | [5,4,3,0] |
| … | … | … | … | … | … |
| End | 7 | – | – | all numbers placed, each bucket = 5 | success |

## Complexity Analysis
- **Time:** O(k·2ⁿ) in the worst case due to exponential backtracking, but pruning (sorting, symmetry skip) reduces practical runtime.
- **Space:** O(k) for bucket sums plus recursion stack O(n).

## Follow‑Up Questions
1. How would you solve the problem using DP with bitmasking?
2. Can the algorithm be adapted to return the actual subsets?
3. What changes are needed if `k` is very large relative to `n`?

## Key Takeaway
Backtracking with descending order and symmetry pruning efficiently explores ways to fill `k` equal‑sum buckets.
