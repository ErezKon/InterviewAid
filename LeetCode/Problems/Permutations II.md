# 47. Permutations II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/permutations-ii](https://leetcode.com/problems/permutations-ii)
**Companies:** Amazon, Apple, Bloomberg, Goldman Sachs, Google, Linkedin, Meta, Microsoft, Tiktok

---

## Approach: Backtracking with Dedup — O(n!) ✅

```
FUNCTION permuteUnique(nums):
    SORT nums
    result = []
    used = [false] * n
    backtrack(nums, [], used, result)
    RETURN result

FUNCTION backtrack(nums, path, used, result):
    IF len(path) == n:
        result.ADD(copy of path)
        RETURN

    FOR i ← 0 TO n - 1:
        IF used[i]: CONTINUE
        IF i > 0 AND nums[i] == nums[i-1] AND NOT used[i-1]: CONTINUE
        used[i] = true
        path.ADD(nums[i])
        backtrack(nums, path, used, result)
        path.REMOVE_LAST()
        used[i] = false
```

Skip duplicates: if `nums[i] == nums[i-1]` and `nums[i-1]` wasn't used, skip (ensures duplicates are used in order).
