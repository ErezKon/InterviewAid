# 2974. Minimum Number Game

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/minimum-number-game](https://leetcode.com/problems/minimum-number-game)
**Companies:** Bloomberg, Bt Group, Google, Meta, Microsoft

---

```
FUNCTION numberGame(nums):
    SORT nums
    result = []
    FOR i ← 0 TO len(nums) - 1 STEP 2:
        result.ADD(nums[i+1])
        result.ADD(nums[i])
    RETURN result
```
