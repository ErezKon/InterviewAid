# 77. Combinations

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/combinations](https://leetcode.com/problems/combinations)
**Companies:** Amazon, Bloomberg, Google, Infosys, Meta, Microsoft, Tiktok

---

## Approach: Backtracking — O(C(n,k)) ✅

```
FUNCTION combine(n, k):
    result = []
    backtrack(1, [], result, n, k)
    RETURN result

FUNCTION backtrack(start, path, result, n, k):
    IF len(path) == k:
        result.ADD(copy of path)
        RETURN

    FOR i ← start TO n - (k - len(path)) + 1:    // pruning
        path.ADD(i)
        backtrack(i + 1, path, result, n, k)
        path.REMOVE_LAST()
```

The upper bound `n - (k - len(path)) + 1` prunes branches that can't fill the remaining slots.
