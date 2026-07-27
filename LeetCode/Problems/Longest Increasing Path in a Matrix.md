# 329. Longest Increasing Path in a Matrix

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/longest-increasing-path-in-a-matrix](https://leetcode.com/problems/longest-increasing-path-in-a-matrix)
**Companies:** Adobe, Amazon, Apple, Bloomberg, Doordash, Duolingo, Epic Systems, Google, Meta, Microsoft, Nutanix, Phonepe, Salesforce, Tiktok, Uber, Weride

---

## Approach: DFS + Memoization — O(m·n) ✅

```
FUNCTION longestIncreasingPath(matrix):
    memo = m×n matrix of zeros

    FUNCTION dfs(r, c):
        IF memo[r][c] != 0: RETURN memo[r][c]
        maxLen = 1
        FOR (dr, dc) IN directions:
            nr, nc = r+dr, c+dc
            IF in bounds AND matrix[nr][nc] > matrix[r][c]:
                maxLen = MAX(maxLen, 1 + dfs(nr, nc))
        memo[r][c] = maxLen
        RETURN maxLen

    result = 0
    FOR r, c in all cells:
        result = MAX(result, dfs(r, c))
    RETURN result
```

No visited set needed — strictly increasing ensures no cycles.

| Time | Space |
|------|-------|
| O(m·n) | O(m·n) |

---

## Key Takeaway

> DFS + memoization on a matrix. Each cell computed once. Strictly increasing constraint guarantees no cycles, so no visited set needed. Can also solve with topological sort.
