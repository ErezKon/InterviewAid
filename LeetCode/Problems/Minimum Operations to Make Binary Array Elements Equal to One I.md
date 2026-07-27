# 3191. Minimum Operations to Make Binary Array Elements Equal to One I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-operations-to-make-binary-array-elements-equal-to-one-i](https://leetcode.com/problems/minimum-operations-to-make-binary-array-elements-equal-to-one-i)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Uber

---

```
FUNCTION minOperations(nums):
    ops = 0
    FOR i ← 0 TO n - 3:
        IF nums[i] == 0:
            nums[i] ^= 1
            nums[i+1] ^= 1
            nums[i+2] ^= 1
            ops += 1
    RETURN ops IF nums[-1] == 1 AND nums[-2] == 1 ELSE -1
```

Greedy: flip from left whenever we see a 0. Each flip toggles 3 consecutive elements.
