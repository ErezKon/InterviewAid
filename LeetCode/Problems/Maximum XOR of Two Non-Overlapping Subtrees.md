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

Given a tree with `n` nodes (0-indexed), each node has a value. Two subtrees are **non-overlapping** if neither is an ancestor of the other. The **XOR score** of a subtree is the XOR of all node values in it. Return the **maximum XOR** of the scores of two non-overlapping subtrees.

**Constraints:**
- `2 ≤ n ≤ 5 × 10⁴`
- `0 ≤ values[i] ≤ 10⁹`

---

## Examples

**Example 1:**
```
Input:  n=6, edges=[[0,1],[0,2],[1,3],[1,4],[2,5]], values=[2,8,3,6,2,5]
Output: 24
Explanation: Subtree rooted at 1 (XOR=8^6^2=12), subtree rooted at 2 (XOR=3^5=6). 
But the maximum may come from different subtree pairs.
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
