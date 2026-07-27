# 1755. Closest Subsequence Sum

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/closest-subsequence-sum](https://leetcode.com/problems/closest-subsequence-sum)
**Companies:** Google, Lti, Sprinklr

---

## Approach: Meet in the Middle — O(2^(n/2) · log) ✅

```
FUNCTION minAbsDifference(nums, goal):
    n = len(nums)
    left = allSubsetSums(nums[:n//2])
    right = sorted(allSubsetSums(nums[n//2:]))

    result = infinity
    FOR s IN left:
        target = goal - s
        idx = bisect_left(right, target)
        FOR j IN [idx-1, idx]:
            IF 0 <= j < len(right):
                result = MIN(result, ABS(s + right[j] - goal))
    RETURN result
```
