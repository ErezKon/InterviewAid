# 3067. Count Pairs of Connectable Servers in a Weighted Tree Network

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-pairs-of-connectable-servers-in-a-weighted-tree-network](https://leetcode.com/problems/count-pairs-of-connectable-servers-in-a-weighted-tree-network)
**Companies:** Thoughtspot, Ubs

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given a weighted tree with `n` nodes (servers) and `n-1` edges. For each node `c`, count how many pairs of other nodes `(a, b)` are **connectable through `c`**, meaning:
- `a` and `b` are in **different subtrees** of `c`
- The distance from `a` to `c` is divisible by `signalSpeed`
- The distance from `b` to `c` is divisible by `signalSpeed`

Return an array `count` where `count[c]` is the number of connectable pairs through server `c`.

**Constraints:**
- `2 <= n <= 1000`
- `1 <= edges[i][2], signalSpeed <= 10^5`

---

## Examples

**Example 1:**
- **Input:** `edges = [[0,1,1],[1,2,5],[2,3,13],[3,4,9],[4,5,2]], signalSpeed = 1`
- **Output:** `[0,4,6,6,4,0]`
- **Explanation:** With signalSpeed=1, all distances are divisible. Count pairs in different subtrees for each node.

---

## Key Insight

For each node `c`, perform DFS into each of its subtrees. Count how many nodes in each subtree have a distance to `c` divisible by `signalSpeed`. Then, pairs from different subtrees can be combined: if subtrees have counts `[k1, k2, k3, ...]`, the number of valid pairs = sum of `ki * (sum of previous kj)`.

Since `n ≤ 1000`, we can afford O(n²) per node in the worst case.

---

## Approach

```
FUNCTION countPairs(edges, signalSpeed):
    n = LENGTH(edges) + 1
    Build adjacency list graph

    result = [0] * n
    FOR each node c ← 0 TO n-1 DO
        // DFS into each neighbor subtree of c
        prevTotal = 0
        FOR each neighbor v of c DO
            // Count nodes in subtree rooted at v (away from c) 
            // with dist to c divisible by signalSpeed
            cnt = DFS(v, c, edgeWeight(c,v), signalSpeed)
            result[c] += prevTotal * cnt
            prevTotal += cnt

    RETURN result

FUNCTION DFS(node, parent, distFromRoot, signalSpeed):
    count = 0
    IF distFromRoot % signalSpeed == 0 THEN
        count = 1
    FOR each neighbor v of node, v ≠ parent DO
        count += DFS(v, node, distFromRoot + edgeWeight(node,v), signalSpeed)
    RETURN count
```

---

## Walkthrough

**Input:** Linear tree `0-1-2-3-4-5`, all weights=1, signalSpeed=1

For node `c=2` (connected to nodes 1 and 3):
- Left subtree (through node 1): nodes {0, 1}, distances {2, 1}. Both % 1 == 0 → count=2
- Right subtree (through node 3): nodes {3, 4, 5}, distances {1, 2, 3}. All % 1 == 0 → count=3
- Pairs = 2 × 3 = **6** ✅

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n²) — DFS from each node visits all other nodes |
| **Space** | O(n) — recursion stack depth |

---

## Follow-Up Questions

**Q1: Why combine subtree counts multiplicatively?**
Each pair must come from different subtrees (different branches off `c`). The number of cross-subtree pairs is the product of their counts, accumulated as we process each subtree.

**Q2: Could this be optimized for larger n?**
For larger trees, you could root the tree once and use centroid decomposition, but with n ≤ 1000 the brute force is sufficient.

**Q3: What if signalSpeed = 1?**
Every distance is divisible by 1, so every node counts. The problem reduces to counting pairs in different subtrees for each node.

---

## Key Takeaway

> **For tree problems counting pairs through a pivot node, DFS into each subtree independently, then combine counts across subtrees multiplicatively. The "accumulate previous total" pattern avoids double-counting.**
