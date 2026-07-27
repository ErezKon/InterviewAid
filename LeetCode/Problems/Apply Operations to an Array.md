# 2460. Apply Operations to an Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/apply-operations-to-an-array](https://leetcode.com/problems/apply-operations-to-an-array)
**Companies:** Amazon, Bloomberg, Google, Meta

---

```
FUNCTION applyOperations(nums):
    FOR i ← 0 TO len(nums) - 2:
        IF nums[i] == nums[i+1]:
            nums[i] *= 2; nums[i+1] = 0
    // Move zeros to end
    nonzero = [x for x in nums if x != 0]
    RETURN nonzero + [0] * (len(nums) - len(nonzero))
```
