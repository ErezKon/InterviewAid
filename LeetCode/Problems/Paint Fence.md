# 276. Paint Fence

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/paint-fence](https://leetcode.com/problems/paint-fence)
**Companies:** Google, Meta, Rubrik, Snowflake

---

```
FUNCTION numWays(n, k):
    IF n == 0: RETURN 0
    IF n == 1: RETURN k
    same = k; diff = k * (k - 1)
    FOR i ← 3 TO n:
        same, diff = diff, (same + diff) * (k - 1)
    RETURN same + diff
```

same = ways ending with two same colors. diff = ways ending with two different colors.
