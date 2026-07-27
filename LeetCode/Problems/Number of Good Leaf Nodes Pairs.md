# 1530. Number of Good Leaf Nodes Pairs

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-good-leaf-nodes-pairs](https://leetcode.com/problems/number-of-good-leaf-nodes-pairs)
**Companies:** Bytedance, Google, Tiktok

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Post-order DFS — O(n · d²)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Count pairs of leaf nodes whose shortest path through the tree has length ≤ `distance`.

---

## 2. Key Insight

> Post-order DFS: each node returns a list of distances from its leaves. At each internal node, cross-check left and right leaf distances. Prune distances ≥ `distance`.

---

## 3. Approach: Post-order DFS — O(n · d²) ✅

```
FUNCTION countPairs(root, distance):
    result = [0]
    FUNCTION dfs(node):
        IF NOT node: RETURN []
        IF NOT node.left AND NOT node.right: RETURN [1]
        left = dfs(node.left); right = dfs(node.right)
        FOR l IN left:
            FOR r IN right:
                IF l + r <= distance: result[0] += 1
        RETURN [d + 1 for d in left + right if d + 1 < distance]
    dfs(root)
    RETURN result[0]
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n · d²) where d = distance |
| **Space** | O(n · d) |

---

## 5. Key Takeaway

> **Post-order merging of leaf distances.** At each node, cross-pair left and right distances. Prune lists to keep only distances < limit. Distance is bounded, keeping lists small.
