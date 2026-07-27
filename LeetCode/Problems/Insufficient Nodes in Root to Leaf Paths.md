# 1080. Insufficient Nodes in Root to Leaf Paths

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/insufficient-nodes-in-root-to-leaf-paths](https://leetcode.com/problems/insufficient-nodes-in-root-to-leaf-paths)
**Companies:** Amazon

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: DFS with Remaining Sum — O(n) ✅](#4-approach-dfs-with-remaining-sum--on-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given a binary tree `root` and an integer `limit`, delete all **insufficient nodes** simultaneously and return the root. A node is **insufficient** if every root-to-leaf path passing through it has a sum strictly less than `limit`.

**Constraints:**
- Number of nodes: `[1, 5000]`
- `-10⁵ <= Node.val <= 10⁵`
- `-10⁹ <= limit <= 10⁹`

---

## 2. Examples

**Example 1:**
```
Input:  root = [1,2,3,4,-99,-99,7,8,9,-99,-99,12,13,-99,14], limit = 1

         1
        / \
       2    3
      / \  / \
     4 -99 -99  7

Output: [1,2,3,4,null,null,7,8,9,null,14]
(Removed nodes whose every path sum < 1)
```

**Example 2:**
```
Input:  root = [5,-6,-6], limit = 0
Output: [5,null,null] → but both children removed → just [5]? 
Actually: 5+(-6) = -1 < 0 for both paths, so both children removed.
Output: []  (root itself is insufficient if all paths through it are < limit)
```

---

## 3. Key Insight

Pass the **remaining limit** down the tree. At each leaf, check if `remaining - leaf.val >= 0` (i.e., path sum ≥ limit). Recursively prune: a node is removed if **both** its children are removed (or it's a leaf with insufficient sum). Post-order traversal naturally handles this.

---

## 4. Approach: DFS with Remaining Sum — O(n) ✅

```
FUNCTION sufficientSubset(root, limit):
    RETURN dfs(root, limit)

FUNCTION dfs(node, limit):
    IF node IS null:
        RETURN null

    IF node IS leaf:
        IF node.val < limit:
            RETURN null         // insufficient leaf
        RETURN node

    node.left = dfs(node.left, limit - node.val)
    node.right = dfs(node.right, limit - node.val)

    // If both children pruned, this node is also insufficient
    IF node.left IS null AND node.right IS null:
        RETURN null

    RETURN node
```

---

## 5. Walkthrough

```
Tree:     1 (limit=1)
         / \
        2    3
       /      \
      4        7

Paths: 1→2→4 = 7 (≥1 ✅), 1→3→7 = 11 (≥1 ✅)
```

| Call | Node | Remaining Limit | Result |
|------|------|----------------|--------|
| dfs(4, limit=1-1-2=-2) | 4 (leaf) | 4 ≥ -2 | Keep ✅ |
| dfs(2, limit=1-1=0) | 2 | left=4 kept | Keep ✅ |
| dfs(7, limit=1-1-3=-3) | 7 (leaf) | 7 ≥ -3 | Keep ✅ |
| dfs(3, limit=1-1=0) | 3 | right=7 kept | Keep ✅ |
| dfs(1, limit=1) | 1 | both children kept | Keep ✅ |

**Result:** Full tree preserved (all paths ≥ limit) ✅

---

## 6. Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| Time | O(n) | Visit every node exactly once |
| Space | O(h) | Recursion stack depth |

---

## 7. Follow-Up Questions

### 7.1 What if we only need to count insufficient nodes without deleting?

Same DFS, but instead of returning null, increment a counter and return the node.

### 7.2 What if we want the maximum path sum passing through each node?

This becomes a different problem — track both max and min path sums via DFS.

### 7.3 What about n-ary trees?

Same logic: recurse on all children, remove child if it returns null, then remove self if all children are removed and it's now a leaf with insufficient sum.

---

## 8. Key Takeaway

> Use post-order DFS passing the **remaining limit** downward. A leaf is insufficient if its value < remaining limit. An internal node is insufficient if both children are pruned away. This bottom-up pruning naturally handles the "every path through this node" condition.
