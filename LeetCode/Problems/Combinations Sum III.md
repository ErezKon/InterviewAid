# 216. Combination Sum III

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/combination-sum-iii](https://leetcode.com/problems/combination-sum-iii)
**Companies:** Amazon, Bloomberg, Google, Microsoft

---

## Approach: Backtracking — O(C(9,k)) ✅

```
FUNCTION combinationSum3(k, n):
    result = []
    backtrack(1, k, n, [], result)
    RETURN result

FUNCTION backtrack(start, k, remain, path, result):
    IF len(path) == k:
        IF remain == 0: result.ADD(copy of path)
        RETURN

    FOR i ← start TO 9:
        IF i > remain: BREAK
        path.ADD(i)
        backtrack(i + 1, k, remain - i, path, result)
        path.REMOVE_LAST()
```

Use digits 1-9, each at most once. Standard combination backtracking with sum constraint.
