# 2035. Partition Array Into Two Arrays to Minimize Sum Difference

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/partition-array-into-two-arrays-to-minimize-sum-difference](https://leetcode.com/problems/partition-array-into-two-arrays-to-minimize-sum-difference)
**Companies:** Amazon, Arcesium, Bloomberg, Google, Meta, Microsoft, Samsung, Texas Instruments

---

## Approach: Meet in the Middle — O(2^(n/2) · n) ✅

```
FUNCTION minimumDifference(nums):
    n = len(nums) / 2
    total = SUM(nums)
    half = total / 2

    // Split into two halves, enumerate all subset sums
    left = nums[:n]
    right = nums[n:]

    // For each half, group subset sums by subset size
    leftSums = {k: sorted list of sums for subsets of size k}
    rightSums = {k: sorted list of sums for subsets of size k}

    minDiff = infinity
    FOR k ← 0 TO n:
        // Pick k from left, n-k from right
        FOR lSum IN leftSums[k]:
            // Binary search in rightSums[n-k] for value closest to half - lSum
            target = half - lSum
            idx = bisect_left(rightSums[n-k], target)
            // Check idx and idx-1
            FOR rSum IN candidates at idx:
                partSum = lSum + rSum
                diff = ABS(total - 2 * partSum)
                minDiff = MIN(minDiff, diff)

    RETURN minDiff
```
