# 2574. Left and Right Sum Differences

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/left-and-right-sum-differences](https://leetcode.com/problems/left-and-right-sum-differences)
**Companies:** Bloomberg, Google

---

## 1. Problem Description

For each index, compute `|leftSum[i] - rightSum[i]|` where leftSum = sum of elements to the left, rightSum = sum to the right.

---

## 2. Approach: Prefix Sum — O(n) ✅

```
FUNCTION leftRightDifference(nums):
    total = SUM(nums)
    leftSum = 0
    result = []
    FOR num IN nums:
        rightSum = total - leftSum - num
        result.ADD(ABS(leftSum - rightSum))
        leftSum += num
    RETURN result
```

| Time | Space |
|------|-------|
| O(n) | O(n) output |

---

## 3. Key Takeaway

> Track running left sum; right sum = total - left - current. Single pass, O(1) extra space.
