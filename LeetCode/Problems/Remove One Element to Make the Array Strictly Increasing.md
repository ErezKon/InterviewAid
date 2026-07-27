# 1909. Remove One Element to Make the Array Strictly Increasing

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/remove-one-element-to-make-the-array-strictly-increasing](https://leetcode.com/problems/remove-one-element-to-make-the-array-strictly-increasing)
**Companies:** Amazon, Ebay, Goldman Sachs

---

```
FUNCTION canBeIncreasing(nums):
    FOR i ← 0 TO len(nums) - 1:
        temp = nums[:i] + nums[i+1:]
        IF all(temp[j] < temp[j+1] for j in range(len(temp)-1)): RETURN true
    RETURN false
```
