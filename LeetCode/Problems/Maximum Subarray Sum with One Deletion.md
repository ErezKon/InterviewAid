# 1186. Maximum Subarray Sum with One Deletion

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-subarray-sum-with-one-deletion](https://leetcode.com/problems/maximum-subarray-sum-with-one-deletion)
**Companies:** Amazon, Google, Microsoft, Two Sigma

---

```
FUNCTION maximumSum(arr):
    n = len(arr)
    // noDelete[i] = max subarray sum ending at i with no deletion
    // oneDelete[i] = max subarray sum ending at i with one deletion
    noDelete = arr[0]; oneDelete = -infinity
    result = arr[0]

    FOR i ← 1 TO n - 1:
        oneDelete = MAX(noDelete, oneDelete + arr[i])
        noDelete = MAX(arr[i], noDelete + arr[i])
        result = MAX(result, noDelete, oneDelete)

    RETURN result
```
