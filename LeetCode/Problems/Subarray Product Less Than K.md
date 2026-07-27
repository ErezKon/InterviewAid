# 713. Subarray Product Less Than K

**Difficulty:** 🟡 Medium
**Acceptance:** 48.0%
**LeetCode:** [https://leetcode.com/problems/subarray-product-less-than-k](https://leetcode.com/problems/subarray-product-less-than-k)
**Companies:** Agoda, Airbnb, Amazon, Apple, Bloomberg, Flexport, Google, Meta, Microsoft, Oracle, Salesforce, Samsung, Squarepoint Capital, Tcs, Tekion, Walmart Labs, Wise, Workday, Yatra

---

## Approach: Sliding Window — O(n) ✅

```
FUNCTION numSubarrayProductLessThanK(nums, k):
    IF k <= 1: RETURN 0
    product = 1
    left = 0
    count = 0

    FOR right ← 0 TO n - 1:
        product *= nums[right]
        WHILE product >= k:
            product /= nums[left]
            left += 1
        count += right - left + 1

    RETURN count
```

Each valid window `[left, right]` contributes `right - left + 1` new subarrays (those ending at `right`).
