# 1608. Special Array With X Elements Greater Than or Equal X

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/special-array-with-x-elements-greater-than-or-equal-x](https://leetcode.com/problems/special-array-with-x-elements-greater-than-or-equal-x)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

```
FUNCTION specialArray(nums):
    SORT nums
    FOR x ← 0 TO len(nums):
        // Count elements >= x using binary search
        count = len(nums) - bisect_left(nums, x)
        IF count == x: RETURN x
    RETURN -1
```
