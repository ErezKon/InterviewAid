# 3024. Type of Triangle

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/type-of-triangle](https://leetcode.com/problems/type-of-triangle)
**Companies:** Bloomberg, Google, Ibm, Meta, Microsoft

---

```
FUNCTION triangleType(nums):
    SORT nums
    IF nums[0] + nums[1] <= nums[2]: RETURN "none"
    IF nums[0] == nums[2]: RETURN "equilateral"
    IF nums[0] == nums[1] OR nums[1] == nums[2]: RETURN "isosceles"
    RETURN "scalene"
```
