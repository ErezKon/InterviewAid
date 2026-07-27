# 3152. Special Array II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/special-array-ii](https://leetcode.com/problems/special-array-ii)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, National Payments Coorperation India

---

## Approach: Prefix Count — O(n + q) ✅

```
FUNCTION isArraySpecial(nums, queries):
    n = len(nums)
    // violations[i] = 1 if nums[i] and nums[i-1] have same parity
    prefix = [0] * n
    FOR i ← 1 TO n - 1:
        prefix[i] = prefix[i-1] + (1 IF nums[i] % 2 == nums[i-1] % 2 ELSE 0)

    result = []
    FOR [from, to] IN queries:
        // Special if no violations in range (from+1, to)
        violations = prefix[to] - prefix[from]
        result.ADD(violations == 0)

    RETURN result
```
