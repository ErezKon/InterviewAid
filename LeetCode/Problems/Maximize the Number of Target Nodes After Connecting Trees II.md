# 3373. Maximize the Number of Target Nodes After Connecting Trees II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximize-the-number-of-target-nodes-after-connecting-trees-ii](https://leetcode.com/problems/maximize-the-number-of-target-nodes-after-connecting-trees-ii)
**Companies:** Google, Jio

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Parity-Based Tree Coloring — O(n + m)](#approach-parity-based-tree-coloring--on--m-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Similar to Part I, but `k` is not given — instead, a node is a "target" if its distance from the source is **even**. Connect tree1 to tree2 with one edge and maximize the even-distance reachable count for each tree1 node.

**Constraints:**
- Up to 10⁵ nodes per tree.

---

## Examples

**Example 1:**
```
Input: tree1 = [[0,1],[1,2]], tree2 = [[0,1]]
Output: [3,3,3]
Explanation: Connecting node 0 of tree1 to node 0 of tree2 yields three even‑distance nodes (including the node itself) for each node in tree1.
```

**Example 2:**
```
Input: tree1 = [[0,1],[1,2],[2,3]], tree2 = [[0,1],[1,2]]
Output: [4,4,4,4]
Explanation: The best connection adds the larger bipartition size from tree2 to each node's own even‑distance count.
```

---

## Walkthrough

| Step | Action | Resulting even‑distance count for a sample node |
|------|--------|-----------------------------------------------|
| 1 | Color tree1 (even/odd depths) → partitions sizes 2 and 2 | Node 0 belongs to even partition size 2 |
| 2 | Color tree2 → partitions sizes 2 and 1, best = 2 | 
| 3 | For each node in tree1, answer = its partition size + bestTree2 | Node 0: 2 + 2 = 4, etc. |

---

## Key Insight

> In a tree, even-distance nodes from a root form one **bipartition** (2-coloring). All nodes at even depth from root = one color, odd depth = other color. For each tree1 node, its even-distance count is its bipartition group size. Connecting to tree2 adds tree2's best bipartition group.

---

## Approach: Parity-Based Tree Coloring — O(n + m) ✅

```text
FUNCTION maxTargetNodes(edges1, edges2):
    // Color each tree by bipartition (even/odd depth)
    color1, count1 = bipartition(edges1)    // count1[0], count1[1]
    color2, count2 = bipartition(edges2)

    // Best from tree2: max of the two partition sizes
    bestTree2 = MAX(count2[0], count2[1])

    result = []
    FOR i IN tree1:
        // Node i's even-distance count = its partition size
        result.APPEND(count1[color1[i]] + bestTree2)

    RETURN result
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| BFS bipartition | **O(n + m)** | O(n + m) |

---

## Follow-Up Questions

- How would the solution change if the connection edge could be added between any two nodes (not just one from each tree)?
- What if the definition of a target node used odd distances instead of even?
- Can the algorithm be extended to handle multiple connections between the trees?

---

## Key Takeaway

> **Even-distance reachability in a tree = bipartition.** The answer for each node is its partition size in tree1 plus the max partition size in tree2. Linear time via BFS/DFS coloring.
