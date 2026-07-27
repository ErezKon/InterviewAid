# 3151. Special Array I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/special-array-i](https://leetcode.com/problems/special-array-i)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, National Payments Coorperation India

---

```
FUNCTION isArraySpecial(nums):
    FOR i ← 1 TO n - 1:
        IF nums[i] % 2 == nums[i-1] % 2:
            RETURN false
    RETURN true
```

Check that adjacent elements have different parities.
