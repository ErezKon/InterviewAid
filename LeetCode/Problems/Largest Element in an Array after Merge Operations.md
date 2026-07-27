# 2789. Largest Element in an Array after Merge Operations

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/largest-element-in-an-array-after-merge-operations](https://leetcode.com/problems/largest-element-in-an-array-after-merge-operations)
**Companies:** Amazon, Google

---

## 1. Problem Description

You can merge `nums[i]` into `nums[i+1]` if `nums[i] <= nums[i+1]`, replacing both with their sum. Return the maximum possible value of the largest element.

---

## 2. Approach: Greedy (Right to Left) — O(n) ✅

Traverse from right to left, accumulating sums. If current ≤ running sum, merge (add). Otherwise start fresh.

```
FUNCTION maxArrayValue(nums):
    result = nums[-1]
    FOR i ← n-2 DOWN TO 0:
        IF nums[i] <= result:
            result += nums[i]
        ELSE:
            result = nums[i]
    RETURN result
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## 3. Key Takeaway

> Greedily merge from right to left — always merge if the current element is ≤ the accumulated sum, which maximizes the final value.
