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
- [Examples](#examples)
- [Walkthrough](#walkthrough)

---

## Problem Description

Given a rooted tree with node values and queries `(node, val)`, for each query find the maximum XOR of `val` with any ancestor (including the node itself) on the path from root to `node`.

---

## Key Insight

> DFS through the tree. Maintain a **bitwise trie** of ancestor values on the current path. At each node, insert its value into the trie, answer all queries for that node, then remove on backtrack. This gives O(B) per insertion/query (B = 18 bits).

---

## Approach: DFS + Persistent Trie — O((n + q) · B) ✅

```text
FUNCTION maxGeneticDifference(parents, queries):
    // Build adjacency list from parent array
    SET tree ← BUILD_TREE(parents)
    // Group queries by target node
    SET queriesAt ← GROUP_QUERIES_BY_NODE(queries)
    SET trie ← BITWISE_TRIE()
    SET result ← ARRAY_OF_ZEROES(LENGTH(queries))

    FUNCTION dfs(node):
        trie.INSERT(node.value)
        FOR (val, idx) IN queriesAt[node]:
            result[idx] ← trie.MAX_XOR(val)
        FOR child IN tree[node]:
            dfs(child)
        trie.REMOVE(node.value)   // backtrack

    dfs(root)
    RETURN result
```

---

## Examples

**Example 1:**
```
parents = [-1,0,0,2]
values  = [0,1,2,3]
queries = [[3,2],[2,1]]
```
- Query (3,2): ancestors of node 3 are [0,2,3] with values [0,2,3]; max XOR with 2 is 3 (2 XOR 1 = 3).
- Query (2,1): ancestors of node 2 are [0,2] with values [0,2]; max XOR with 1 is 3 (1 XOR 2 = 3).
**Output:** `[3,3]`

**Example 2:**
```
parents = [-1,0,1,2]
values  = [5,2,7,1]
queries = [[3,4]]
```
- Ancestors of node 3: [0,1,2,3] values [5,2,7,1]; max XOR with 4 is 7 (4 XOR 3 = 7).
**Output:** `[7]`

---

## Walkthrough

| Step | Action | Trie State (binary) | Query Answer |
|------|--------|---------------------|--------------|
| 1 | Start DFS at root (node 0, value 5) | Insert 5 → `00000101` | – |
| 2 | Process queries at node 0 (none) | – | – |
| 3 | Recurse to child node 1 (value 2) | Insert 2 → `00000010` | – |
| 4 | No query at node 1 | – | – |
| 5 | Recurse to child node 2 (value 7) | Insert 7 → `00000111` | – |
| 6 | No query at node 2 | – | – |
| 7 | Recurse to child node 3 (value 1) | Insert 1 → `00000001` | Query (3,4): trie contains {5,2,7,1}. Max XOR with 4 (`00000100`) is 7 (`00000111`). |
| 8 | Backtrack: remove 1, then 7, then 2, then 5 as recursion unwinds. |

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| DFS + Trie | **O((n + q) · 18)** | O(n · 18) |

---

## Key Takeaway

> **Euler-tour DFS + insertable/removable bitwise trie for path XOR queries.** Insert on enter, remove on backtrack, query at each node.
