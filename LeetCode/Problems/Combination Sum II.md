# 40. Combination Sum II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/combination-sum-ii](https://leetcode.com/problems/combination-sum-ii)
**Companies:** Adobe, Amazon, Bloomberg, Bytedance, Google, Infosys, Linkedin, Meta, Microsoft, Oracle, Rakuten, Snapchat, Tiktok, Walmart Labs, Zoho

---

## Approach: Backtracking with Duplicate Skipping — O(2ⁿ) ✅

```
FUNCTION combinationSum2(candidates, target):
    SORT candidates
    result = []
    backtrack(candidates, target, 0, [], result)
    RETURN result

FUNCTION backtrack(nums, remain, start, path, result):
    IF remain == 0:
        result.ADD(copy of path)
        RETURN
    FOR i ← start TO len(nums) - 1:
        IF nums[i] > remain: BREAK
        IF i > start AND nums[i] == nums[i-1]: CONTINUE    // skip duplicates
        path.ADD(nums[i])
        backtrack(nums, remain - nums[i], i + 1, path, result)
        path.REMOVE_LAST()
```

Key difference from Combination Sum I: use each element at most once (`i+1` not `i`), skip duplicates at the same level.
