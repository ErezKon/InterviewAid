# 3379. Transformed Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/transformed-array](https://leetcode.com/problems/transformed-array)
**Companies:** Amazon, Google, Meta, Microsoft

---

```
FUNCTION constructTransformedArray(nums):
    n = len(nums)
    result = [0] * n
    FOR i ← 0 TO n - 1:
        IF nums[i] > 0: result[i] = nums[(i + nums[i]) % n]
        ELSE IF nums[i] < 0: result[i] = nums[((i + nums[i]) % n + n) % n]
        ELSE: result[i] = nums[i]
    RETURN result
```
