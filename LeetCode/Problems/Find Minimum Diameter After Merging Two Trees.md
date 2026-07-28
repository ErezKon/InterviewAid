# 3203. Find Minimum Diameter After Merging Two Trees

**Difficulty:** 🔴 Hard
**Companies:** Google, Microsoft, Servicenow

---

## Problem Description
You are given two rooted trees `T1` and `T2`. You may connect any node of `T1` to any node of `T2` with a single new edge, merging the two trees into one. The diameter of a tree is the length (in edges) of the longest shortest path between any two nodes. Determine the minimum possible diameter of the resulting merged tree.

## Examples
**Example 1**
```
T1: diameter d1 = 4
T2: diameter d2 = 3
Connecting the centers yields merged diameter = max(4, 3, ceil(4/2) + ceil(3/2) + 1) = 5
```
**Example 2**
```
T1: a line of 5 nodes (d1 = 4)
T2: a single node (d2 = 0)
Connecting the middle of T1 to the lone node gives diameter = max(4, 0, ceil(4/2) + ceil(0/2) + 1) = 3
```

## Approach
The optimal connection is always between the **centers** of the two trees (nodes that minimize the farthest distance to any other node). The diameter after merging can be expressed as:
```
answer = max(d1, d2, ceil(d1/2) + ceil(d2/2) + 1)
```
where `d1` and `d2` are the original diameters. To compute `d1` and `d2` we perform two BFS/DFS traversals per tree:
1. Pick an arbitrary node, find the farthest node `a`.
2. From `a`, find the farthest node `b`; the distance `dist(a,b)` is the diameter.
3. The center(s) lie on the path from `a` to `b` at distance `⌊diameter/2⌋` from `a`.
The formula already accounts for connecting the two centers, so no further search is needed.

### Pseudocode
```text
FUNCTION treeDiameter(adj):
    // adj: adjacency list of the tree
    a ← BFS_farthest(0, adj)          // any start node
    (b, diam) ← BFS_farthest(a, adj) // returns farthest node and distance
    RETURN diam

FUNCTION minMergedDiameter(tree1, tree2):
    d1 ← treeDiameter(tree1.adj)
    d2 ← treeDiameter(tree2.adj)
    cand1 ← d1
    cand2 ← d2
    cand3 ← CEIL(d1 / 2) + CEIL(d2 / 2) + 1
    RETURN MAX(cand1, cand2, cand3)
```

## Walkthrough
Consider `T1` a line of 5 nodes (0‑4). BFS from node 0 finds farthest node 4, distance 4 → `d1 = 4`. `T2` is a single node, `d2 = 0`. Compute `cand3 = ceil(4/2) + ceil(0/2) + 1 = 2 + 0 + 1 = 3`. The maximum of `{4,0,3}` is `4`, but connecting the middle node (index 2) of `T1` to the lone node reduces the longest path to `3`, which matches `cand3`. Hence the minimal possible diameter is `3`.

## Complexity Analysis
*Time*: O(n1 + n2) for two BFS traversals on each tree (linear in total nodes). 
*Space*: O(n1 + n2) for adjacency lists and BFS queues.

## Follow‑Up Questions
1. How would the answer change if you could add more than one edge between the trees?
2. Can the method be extended to merge `k` trees into a single tree with minimal diameter?
3. What if the trees are weighted (edge lengths differ); how does the formula adapt?

## Key Takeaway
The minimal diameter after merging two trees is achieved by linking their centers, and can be computed directly from the original diameters using a simple closed‑form expression.
