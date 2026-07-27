# 213. House Robber II

**Difficulty:** 🟡 Medium
**Acceptance:** 43.0%
**LeetCode:** [https://leetcode.com/problems/house-robber-ii](https://leetcode.com/problems/house-robber-ii)
**Companies:** Amazon, Apple, Bloomberg, Databricks, Datadog, De Shaw, Docusign, Google, Infosys, Linkedin, Makemytrip, Meta, Microsoft, Salesforce, Servicenow, Tiktok, Uber, Visa, Zoho

---

## 1. Problem Description

Houses are arranged in a **circle**. You can't rob two adjacent houses. Return the maximum amount you can rob.

---

## 2. Approach: Two House Robber I Calls — O(n) ✅

Since houses form a circle, house 0 and house n-1 are adjacent. Either skip the first or skip the last.

```
FUNCTION rob(nums):
    IF len(nums) == 1: RETURN nums[0]
    RETURN MAX(robLinear(nums[0..n-2]), robLinear(nums[1..n-1]))

FUNCTION robLinear(nums):
    prev2 = 0, prev1 = 0
    FOR num IN nums:
        curr = MAX(prev1, prev2 + num)
        prev2 = prev1
        prev1 = curr
    RETURN prev1
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## Key Takeaway

> Circular constraint → run House Robber I twice: once excluding the first house, once excluding the last. Take the maximum.
