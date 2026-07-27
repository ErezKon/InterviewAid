# 410. Split Array Largest Sum

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/split-array-largest-sum](https://leetcode.com/problems/split-array-largest-sum)
**Companies:** Amazon, Baidu, Bloomberg, De Shaw, Deloitte, Google, Infosys, Meta, Microsoft, Nutanix, Oracle, Phonepe, Pinterest, Salesforce, Samsung, Tekion, Uber, Yugabyte, Zeta

---

## Approach: Binary Search on Answer — O(n log S) ✅

```
FUNCTION splitArray(nums, k):
    lo = MAX(nums)
    hi = SUM(nums)

    WHILE lo < hi:
        mid = (lo + hi) / 2
        IF canSplit(nums, k, mid):
            hi = mid
        ELSE:
            lo = mid + 1

    RETURN lo

FUNCTION canSplit(nums, k, maxSum):
    parts = 1
    currentSum = 0
    FOR num IN nums:
        IF currentSum + num > maxSum:
            parts += 1
            currentSum = 0
        currentSum += num
    RETURN parts <= k
```

Same pattern as Capacity to Ship Packages (#1011) and Koko Eating Bananas (#875).
