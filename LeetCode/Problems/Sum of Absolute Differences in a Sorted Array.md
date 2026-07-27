# 1685. Sum of Absolute Differences in a Sorted Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/sum-of-absolute-differences-in-a-sorted-array](https://leetcode.com/problems/sum-of-absolute-differences-in-a-sorted-array)
**Companies:** Amazon, Google, Ibm, Meta

---

```
FUNCTION getSumAbsoluteDifferences(nums):
    n = len(nums); total = SUM(nums)
    prefix = 0; result = []
    FOR i, num IN enumerate(nums):
        leftSum = prefix
        rightSum = total - prefix - num
        res = num * i - leftSum + rightSum - num * (n - i - 1)
        result.ADD(res)
        prefix += num
    RETURN result
```
