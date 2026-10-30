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

You are given an unrooted weighted tree with `n` vertices representing servers numbered from `0` to `n - 1`, an array `edges` where `edges[i] = [a_i, b_i, weight_i]` represents a bidirectional edge between vertices `a_i` and `b_i` of weight `weight_i`. You are also given an integer `signalSpeed`.

Two servers `a` and `b` are **connectable** through a server `c` if:

- `a < b`, `a != c` and `b != c`.
- The distance from `c` to `a` is divisible by `signalSpeed`.
- The distance from `c` to `b` is divisible by `signalSpeed`.
- The path from `c` to `b` and the path from `c` to `a` do not share any edges.

Return *an integer array* `count` *of length* `n` *where* `count[i]` *is the **number** of server pairs that are **connectable** through* *the server* `i`.

**Constraints:**
- `2 <= n <= 1000`
- `edges.length == n - 1`
- `edges[i].length == 3`
- `0 <= a_i, b_i < n`
- `edges[i] = [a_i, b_i, weight_i]`
- `1 <= weight_i <= 10^6`
- `1 <= signalSpeed <= 10^6`
- The input is generated such that `edges` represents a valid tree.

---

## Examples

**Example 1:**
```
Input: edges = [[0,1,1],[1,2,5],[2,3,13],[3,4,9],[4,5,2]], signalSpeed = 1
Output: [0,4,6,6,4,0]
Explanation: Since signalSpeed is 1, count[c] is equal to the number of pairs of paths that start at c and do not share any edges.
In the case of the given path graph, count[c] is equal to the number of servers to the left of c multiplied by the servers to the right of c.
```

**Example 2:**
```
Input: edges = [[0,6,3],[6,5,3],[0,3,1],[3,2,7],[3,1,6],[3,4,2]], signalSpeed = 3
Output: [2,0,0,0,0,0,2]
Explanation: Through server 0, there are 2 pairs of connectable servers: (4, 5) and (4, 6).
Through server 6, there are 2 pairs of connectable servers: (4, 5) and (0, 5).
It can be shown that no two servers are connectable through servers other than 0 and 6.
```

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
