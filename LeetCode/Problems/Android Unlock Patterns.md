# 351. Android Unlock Patterns

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/android-unlock-patterns](https://leetcode.com/problems/android-unlock-patterns)
**Companies:** Google

---

## 1. Problem Description

Given an Android 3×3 grid (keys 1–9), count the number of valid unlock patterns of length between `m` and `n`. A pattern is valid if it visits each key at most once and doesn't skip over an unvisited key that lies directly between two keys.

---

## 2. Key Insight

> Use backtracking with a precomputed "skip" table. `skip[i][j]` = the key between `i` and `j` (if any). A move from `i` to `j` is valid if `skip[i][j]` is 0 or already visited. Exploit symmetry: patterns starting from corners (1,3,7,9) are equivalent, as are those from edges (2,4,6,8).

---

## 3. Approach: DFS + Symmetry — O(1) ✅

```
FUNCTION numberOfPatterns(m, n):
    skip = 10×10 array, all 0
    skip[1][3] = skip[3][1] = 2
    skip[1][7] = skip[7][1] = 4
    skip[3][9] = skip[9][3] = 6
    skip[7][9] = skip[9][7] = 8
    skip[1][9] = skip[9][1] = skip[3][7] = skip[7][3] = 5
    skip[2][8] = skip[8][2] = skip[4][6] = skip[6][4] = 5
    
    visited = set()
    
    FUNCTION dfs(cur, remaining):
        IF remaining == 0: RETURN 1
        visited.ADD(cur)
        count = 0
        FOR next FROM 1 TO 9:
            IF next NOT IN visited:
                IF skip[cur][next] == 0 OR skip[cur][next] IN visited:
                    count += dfs(next, remaining - 1)
        visited.REMOVE(cur)
        RETURN count
    
    result = 0
    FOR length FROM m TO n:
        result += dfs(1, length-1) * 4  // corners
        result += dfs(2, length-1) * 4  // edges
        result += dfs(5, length-1) * 1  // center
    RETURN result
```

| Time | Space |
|------|-------|
| O(1) — bounded by 9! | O(9) |

---

## Key Takeaway

> The skip table encodes which intermediate keys must be visited before a move is legal. Symmetry reduces 9 starting positions to 3 groups.
