# 3229. Minimum Operations to Make Array Equal to Target

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-operations-to-make-array-equal-to-target](https://leetcode.com/problems/minimum-operations-to-make-array-equal-to-target)
**Companies:** Amazon, Bloomberg, Google, Microsoft

---

```
FUNCTION minimumOperations(nums, target):
    diff = [t - n for n, t in zip(nums, target)]
    ops = ABS(diff[0])
    FOR i ← 1 TO len(diff) - 1:
        IF diff[i] > 0 AND diff[i-1] > 0:
            ops += MAX(0, diff[i] - diff[i-1])
        ELSE IF diff[i] < 0 AND diff[i-1] < 0:
            ops += MAX(0, ABS(diff[i]) - ABS(diff[i-1]))
        ELSE:
            ops += ABS(diff[i])
    RETURN ops
```
