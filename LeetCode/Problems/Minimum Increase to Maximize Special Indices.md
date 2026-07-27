# 3891. Minimum Increase to Maximize Special Indices

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-increase-to-maximize-special-indices](https://leetcode.com/problems/minimum-increase-to-maximize-special-indices)
**Companies:** Linkedin

---

## Problem Description

Given an array `nums`, an index `i` is **special** if `nums[i] > nums[i-1]` (for i > 0). You can increase elements. Find the **minimum total increase** to maximize the number of special indices.

## Key Insight

> Greedily process left-to-right. For each potential special index, if `nums[i] <= nums[i-1]`, increase `nums[i]` to `nums[i-1] + 1`. The cost is `nums[i-1] + 1 - nums[i]`. Alternatively, it may be cheaper to decrease the predecessor concept — but since we can only increase, always bump the current element.

## Approach: Greedy — O(n) ✅

```
FUNCTION minIncrease(nums):
    cost ← 0
    FOR i ← 1 TO n-1:
        IF nums[i] <= nums[i-1]:
            cost += nums[i-1] + 1 - nums[i]
            nums[i] ← nums[i-1] + 1
    RETURN cost
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

## Key Takeaway

> To maximize strictly-increasing adjacent pairs with only increases allowed, greedily bump each element to just exceed its predecessor.
