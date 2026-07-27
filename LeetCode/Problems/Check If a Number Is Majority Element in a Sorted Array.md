# 1150. Check If a Number Is Majority Element in a Sorted Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/check-if-a-number-is-majority-element-in-a-sorted-array](https://leetcode.com/problems/check-if-a-number-is-majority-element-in-a-sorted-array)
**Companies:** Salesforce

---

## 1. Problem Description

Given a **sorted** array and a target, check if target appears more than `n/2` times.

---

## 2. Approach: Binary Search — O(log n) ✅

```
FUNCTION isMajorityElement(nums, target):
    left = bisect_left(nums, target)
    right = bisect_right(nums, target)
    RETURN (right - left) > len(nums) / 2
```

Or simply: if target is majority, `nums[n//2] == target` and use binary search to verify count.

| Time | Space |
|------|-------|
| O(log n) | O(1) |

---

## Key Takeaway

> In a sorted array, binary search for first/last occurrence gives count in O(log n). For majority element, can also just check the middle element.
