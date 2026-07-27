# 3355. Zero Array Transformation I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/zero-array-transformation-i](https://leetcode.com/problems/zero-array-transformation-i)
**Companies:** Amazon, Bloomberg, Chubb, Google, Microsoft

---

```
FUNCTION isZeroArray(nums, queries):
    n = len(nums)
    diff = [0] * (n + 1)
    FOR [l, r] IN queries:
        diff[l] += 1
        diff[r + 1] -= 1

    curr = 0
    FOR i ← 0 TO n - 1:
        curr += diff[i]
        IF curr < nums[i]: RETURN false
    RETURN true
```
