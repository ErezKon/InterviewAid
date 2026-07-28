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

```text
FUNCTION countPairs(root, distance):
    result ← [0]
    FUNCTION dfs(node):
        IF NOT node: RETURN []
        IF NOT node.left AND NOT node.right: RETURN [1]
        left ← dfs(node.left)
        right ← dfs(node.right)
        FOR l IN left:
            FOR r IN right:
                IF l + r ≤ distance:
                    result[0] ← result[0] + 1
        RETURN [d + 1 FOR d IN left + right IF d + 1 < distance]
    dfs(root)
    RETURN result[0]
```

---

## Examples

**Example 1:**
```
Input: root = [1,2,3,null,4,null,5], distance = 3
Output: 1
Explanation: The only good pair is leaf nodes 4 and 5 with path length 3.
```

**Example 2:**
```
Input: root = [1,2,3,4,5,6,7], distance = 2
Output: 0
Explanation: No leaf pair is within distance 2.
```

---

## Walkthrough

Consider Example 1. The tree structure:
- Leaf 4 is at depth 2 from node 2.
- Leaf 5 is at depth 2 from node 3.
At the root, left distances = [2] (from leaf 4) and right distances = [2] (from leaf 5).
- Combine 2 + 2 = 4 > 3 → not counted.
When processing node 2, its left child is null, right child leaf 4 returns [1].
- No pair formed.
Processing node 3 similarly yields [1] from leaf 5.
Finally, at root, after pruning distances ≥ distance, we keep [2] from both sides and count the pair (4,5) as distance 3 (2+1 from root to each leaf). The algorithm increments result to 1.

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n · d²) where d = distance |
| **Space** | O(n · d) |

---

## 5. Key Takeaway

> **Post-order merging of leaf distances.** At each node, cross‑pair left and right distances. Prune lists to keep only distances < limit. Distance is bounded, keeping lists small.
