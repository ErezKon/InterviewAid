# 2210. Count Hills and Valleys in an Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-hills-and-valleys-in-an-array](https://leetcode.com/problems/count-hills-and-valleys-in-an-array)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

```
FUNCTION countHillValley(nums):
    // Remove consecutive duplicates first
    unique = [nums[0]]
    FOR i ← 1 TO n - 1:
        IF nums[i] != nums[i-1]: unique.ADD(nums[i])

    count = 0
    FOR i ← 1 TO len(unique) - 2:
        IF (unique[i] > unique[i-1] AND unique[i] > unique[i+1]) OR
           (unique[i] < unique[i-1] AND unique[i] < unique[i+1]):
            count += 1
    RETURN count
```
