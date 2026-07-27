# 2977. Minimum Cost to Convert String II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-cost-to-convert-string-ii](https://leetcode.com/problems/minimum-cost-to-convert-string-ii)
**Companies:** Amazon, Atlassian, Google, Microsoft

---

## Key Insight

> Unlike String I (single characters), conversions here are between **substrings**. Build a shortest-path graph between unique string IDs. Then use DP on the string positions with a trie/Aho-Corasick to find applicable conversions at each position.

---

## Approach: Shortest Path + DP with Trie ✅

```
FUNCTION minimumCost(source, target, original, changed, cost):
    // Map unique strings to IDs
    // Build shortest path between string IDs (Dijkstra or Floyd-Warshall)
    // dp[i] = min cost to convert source[0..i-1] to target[0..i-1]
    
    dp ← ARRAY(n + 1, INFINITY)
    dp[0] ← 0
    
    FOR i ← 0 TO n - 1 DO
        IF dp[i] = INFINITY THEN CONTINUE
        IF source[i] = target[i] THEN
            dp[i+1] ← MIN(dp[i+1], dp[i])
        // Try all conversion substrings starting at i
        FOR each original[k] matching source[i..i+len-1] DO
            IF changed[k] matches target[i..i+len-1] THEN
                dp[i+len] ← MIN(dp[i+len], dp[i] + shortestCost(k))
    
    RETURN dp[n] IF dp[n] ≠ INFINITY ELSE -1
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Shortest path + DP + trie | **O(n·L + V³)** | **O(V² + n)** |

---

## Key Takeaway

> **Substring conversion = graph shortest path + positional DP** — generalize the single-char version by treating substrings as graph nodes and using a trie for efficient matching.

---
