# 1508. Range Sum of Sorted Subarray Sums

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/range-sum-of-sorted-subarray-sums](https://leetcode.com/problems/range-sum-of-sorted-subarray-sums)
**Companies:** Amazon, Bloomberg, Google

---

```
FUNCTION rangeSum(nums, n, left, right):
    MOD = 10^9 + 7
    sums = []
    FOR i ← 0 TO n - 1:
        s = 0
        FOR j ← i TO n - 1:
            s += nums[j]; sums.ADD(s)
    SORT sums
    RETURN SUM(sums[left-1:right]) % MOD
```
