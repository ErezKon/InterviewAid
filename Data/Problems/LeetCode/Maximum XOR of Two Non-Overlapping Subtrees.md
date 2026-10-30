# 2479. Maximum XOR of Two Non-Overlapping Subtrees

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-xor-of-two-non-overlapping-subtrees](https://leetcode.com/problems/maximum-xor-of-two-non-overlapping-subtrees)
**Companies:** Directi, Medianet

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

There is an undirected tree with `n` nodes labeled from `0` to `n - 1`. You are given the integer `n` and a 2D integer array `edges` of length `n - 1`, where `edges[i] = [a_i, b_i]` indicates that there is an edge between nodes `a_i` and `b_i` in the tree. The root of the tree is the node labeled `0`.

Each node has an associated **value**. You are given an array `values` of length `n`, where `values[i]` is the **value** of the `i^th` node.

Select any two **non-overlapping** subtrees. Your **score** is the bitwise XOR of the sum of the values within those subtrees.

Return *the* ***maximum*** *possible **score** you can achieve*. *If it is impossible to find two nonoverlapping subtrees*, return `0`.

**Note** that:

- The **subtree** of a node is the tree consisting of that node and all of its descendants.
- Two subtrees are **non-overlapping **if they do not share **any common** node.

**Constraints:**
- `2 <= n <= 5 * 10^4`
- `edges.length == n - 1`
- `0 <= a_i, b_i < n`
- `values.length == n`
- `1 <= values[i] <= 10^9`
- It is guaranteed that `edges` represents a valid tree.

---

## Examples

**Example 1:**
```
Input: n = 6, edges = [[0,1],[0,2],[1,3],[1,4],[2,5]], values = [2,8,3,6,2,5]
Output: 24
Explanation: Node 1's subtree has sum of values 16, while node 2's subtree has sum of values 8, so choosing these nodes will yield a score of 16 XOR 8 = 24. It can be proved that is the maximum possible score we can obtain.
```

**Example 2:**
```
Input: n = 3, edges = [[0,1],[1,2]], values = [4,6,1]
Output: 0
Explanation: There is no possible way to select two non-overlapping subtrees, so we just return 0.
```

---

## Key Insight

> Compute the XOR score of every subtree via DFS. Then, find two non-overlapping subtrees with maximum XOR of their scores. Use a **Trie** to efficiently find the max XOR pair, processing nodes in a DFS order where we only insert subtree scores after fully processing the subtree (ensuring non-overlap).

---

## Approach

```
FUNCTION maxXor(n, edges, values):
    // Step 1: Build adjacency list and compute subtree XOR scores via DFS
    subtreeXOR ← ARRAY[n]
    
    FUNCTION dfs(node, parent):
        subtreeXOR[node] ← values[node]
        FOR child IN adj[node] DO
            IF child ≠ parent THEN
                dfs(child, node)
                subtreeXOR[node] ← subtreeXOR[node] XOR subtreeXOR[child]
    
    dfs(0, -1)
    
    // Step 2: Use Trie to find max XOR of two non-overlapping subtree scores
    // Process in DFS order; insert a subtree's score only after leaving it
    // This ensures the Trie only contains scores of non-overlapping subtrees
    
    result ← 0
    trie ← new BinaryTrie()
    
    FUNCTION dfs2(node, parent):
        // Before processing children, query trie for best XOR with current subtree
        IF trie NOT EMPTY THEN
            result ← MAX(result, trie.maxXorWith(subtreeXOR[node]))
        
        FOR child IN adj[node] DO
            IF child ≠ parent THEN
                dfs2(child, node)
        
        // Insert this subtree's score after processing (post-order)
        trie.INSERT(subtreeXOR[node])
    
    dfs2(0, -1)
    RETURN result
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| DFS + Trie | **O(n · 30)** | **O(n · 30)** |

---

## Follow-Up Questions

1. **How do we ensure non-overlap?** By inserting subtree scores in post-order and querying before processing children, we guarantee the trie only contains scores from non-overlapping subtrees.
2. **Why a Trie for max XOR?** A binary trie allows greedy bit-by-bit maximization of XOR in O(30) per query.
3. **Can we use sorting instead?** Sorting subtree scores doesn't account for the non-overlap constraint.

---

## Key Takeaway

> **Subtree XOR + Binary Trie** — compute subtree aggregate values via DFS, then use a trie with careful insertion ordering to find the maximum XOR pair respecting tree structural constraints.

---
