# 1938. Maximum Genetic Difference Query

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-genetic-difference-query](https://leetcode.com/problems/maximum-genetic-difference-query)
**Companies:** Medianet

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: DFS + Persistent Trie — O((n + q) · B)](#approach-dfs--persistent-trie--on--q--b-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a rooted tree with node values and queries `(node, val)`, for each query find the maximum XOR of `val` with any ancestor (including the node itself) on the path from root to `node`.

---

## Key Insight

> DFS through the tree. Maintain a **bitwise trie** of ancestor values on the current path. At each node, insert its value into the trie, answer all queries for that node, then remove on backtrack. This gives O(B) per insertion/query (B = 18 bits).

---

## Approach: DFS + Persistent Trie — O((n + q) · B) ✅

```
FUNCTION maxGeneticDifference(parents, queries):
    Build tree from parents
    Group queries by node
    trie = BitwiseTrie()
    result = [0] * len(queries)

    FUNCTION dfs(node):
        trie.INSERT(node)
        FOR (val, queryIdx) IN queriesAt[node]:
            result[queryIdx] = trie.MAX_XOR(val)
        FOR child IN children[node]:
            dfs(child)
        trie.REMOVE(node)    // backtrack

    dfs(root)
    RETURN result
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| DFS + Trie | **O((n + q) · 18)** | O(n · 18) |

---

## Key Takeaway

> **Euler-tour DFS + insertable/removable bitwise trie for path XOR queries.** Insert on enter, remove on backtrack, query at each node.
