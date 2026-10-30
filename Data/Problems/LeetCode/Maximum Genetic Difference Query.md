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

There is a rooted tree consisting of `n` nodes numbered `0` to `n - 1`. Each node's number denotes its **unique genetic value** (i.e. the genetic value of node `x` is `x`). The **genetic difference** between two genetic values is defined as the **bitwise-****XOR** of their values. You are given the integer array `parents`, where `parents[i]` is the parent for node `i`. If node `x` is the **root** of the tree, then `parents[x] == -1`.

You are also given the array `queries` where `queries[i] = [node_i, val_i]`. For each query `i`, find the **maximum genetic difference** between `val_i` and `p_i`, where `p_i` is the genetic value of any node that is on the path between `node_i` and the root (including `node_i` and the root). More formally, you want to maximize `val_i XOR p_i`.

Return *an array *`ans`* where *`ans[i]`* is the answer to the *`i^th`* query*.

**Constraints:**
- `2 <= parents.length <= 10^5`
- `0 <= parents[i] <= parents.length - 1` for every node `i` that is **not** the root.
- `parents[root] == -1`
- `1 <= queries.length <= 3 * 10^4`
- `0 <= node_i <= parents.length - 1`
- `0 <= val_i <= 2 * 10^5`

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
Input: parents = [-1,0,1,1], queries = [[0,2],[3,2],[2,5]]
Output: [2,3,7]
Explanation: The queries are processed as follows:
- [0,2]: The node with the maximum genetic difference is 0, with a difference of 2 XOR 0 = 2.
- [3,2]: The node with the maximum genetic difference is 1, with a difference of 2 XOR 1 = 3.
- [2,5]: The node with the maximum genetic difference is 2, with a difference of 5 XOR 2 = 7.
```

**Example 2:**
```
Input: parents = [3,7,-1,2,0,7,0,2], queries = [[4,6],[1,15],[0,5]]
Output: [6,14,7]
Explanation: The queries are processed as follows:
- [4,6]: The node with the maximum genetic difference is 0, with a difference of 6 XOR 0 = 6.
- [1,15]: The node with the maximum genetic difference is 1, with a difference of 15 XOR 1 = 14.
- [0,5]: The node with the maximum genetic difference is 2, with a difference of 5 XOR 2 = 7.
```

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
