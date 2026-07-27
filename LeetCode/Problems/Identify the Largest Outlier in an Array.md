# 3371. Identify the Largest Outlier in an Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/identify-the-largest-outlier-in-an-array](https://leetcode.com/problems/identify-the-largest-outlier-in-an-array)
**Companies:** Amazon, Goldman Sachs, Google, Meta

---

```
FUNCTION getLargestOutlier(nums):
    total = SUM(nums); count = Counter(nums)
    result = -infinity
    FOR num IN nums:
        rest = total - num
        IF rest % 2 == 0:
            half = rest // 2
            count[num] -= 1
            IF count[half] > 0: result = MAX(result, num)
            count[num] += 1
    RETURN result
```
