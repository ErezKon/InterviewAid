# 3173. Bitwise OR of Adjacent Elements

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/bitwise-or-of-adjacent-elements](https://leetcode.com/problems/bitwise-or-of-adjacent-elements)
**Companies:** Adobe

---

## 1. Problem Description

Given an array `nums` of length `n` (even), return a new array of length `n/2` where each element is the bitwise OR of two consecutive elements: `result[i] = nums[2*i] | nums[2*i + 1]`.

---

## 2. Approach: Linear Scan — O(n) ✅

```
FUNCTION orArray(nums):
    result = []
    FOR i FROM 0 TO len(nums) - 1 STEP 2:
        result.ADD(nums[i] | nums[i+1])
    RETURN result
```

| Time | Space |
|------|-------|
| O(n) | O(n/2) |

---

## Key Takeaway

> Simple pairwise reduction: iterate with step 2 and OR adjacent pairs.
