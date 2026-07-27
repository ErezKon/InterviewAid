# 1250. Check If It Is a Good Array

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/check-if-it-is-a-good-array](https://leetcode.com/problems/check-if-it-is-a-good-array)
**Companies:** Dropbox, Google, Microsoft, Nokia

---

```
FUNCTION isGoodArray(nums):
    g = nums[0]
    FOR num IN nums[1:]:
        g = GCD(g, num)
    RETURN g == 1
```

By Bezout's identity, subset sums to 1 iff GCD of all elements is 1.
