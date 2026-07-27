# 2148. Count Elements With Strictly Smaller and Greater Elements

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-elements-with-strictly-smaller-and-greater-elements](https://leetcode.com/problems/count-elements-with-strictly-smaller-and-greater-elements)
**Companies:** Google

---

## 1. Problem Description

Given an array `nums`, count elements that have both a strictly smaller and a strictly greater element in the array.

---

## 2. Approach: Find Min/Max — O(n) ✅

```
FUNCTION countElements(nums):
    minVal = MIN(nums)
    maxVal = MAX(nums)
    RETURN COUNT(x for x in nums if minVal < x < maxVal)
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## Key Takeaway

> An element has both a strictly smaller and greater neighbor iff it's strictly between the global min and max.
