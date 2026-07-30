# 742. Closest Leaf in a Binary Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/closest-leaf-in-a-binary-tree](https://leetcode.com/problems/closest-leaf-in-a-binary-tree)
**Companies:** Amazon, Databricks, Linkedin

---

## Problem Description
Given the root of a binary tree and a target node value `k`, return the value of the nearest leaf node to `k`. A leaf is a node with no children. The distance is measured by the number of edges traversed.

## Examples
**Example 1**
```
Input: root = [1,3,2], k = 1
Output: 2
Explanation: The leaf nodes are 3 and 2. Node 2 is one edge away from node 1, which is closer than node 3.
```
**Example 2**
```
Input: root = [1,2,3,4,null,null,null,5,6], k = 2
Output: 5
Explanation: The nearest leaf to node 2 is node 5 via the path 2→4→5.
```

## Approach
Use an undirected graph representation of the tree and perform a BFS from the target node until a leaf is encountered.

### Pseudocode
```text
FUNCTION findClosestLeaf(root, k):
    // Build undirected graph and record leaf nodes
    graph ← defaultdict(list)
    leaves ← SET()
    FUNCTION build(node, parent):
        IF node IS NULL: RETURN
        IF node.left IS NULL AND node.right IS NULL:
            leaves.ADD(node.val)
        IF parent IS NOT NULL:
            graph[node.val].ADD(parent.val)
            graph[parent.val].ADD(node.val)
        build(node.left, node)
        build(node.right, node)
    build(root, NULL)

    // BFS from target k
    queue ← [k]
    visited ← SET(k)
    WHILE queue IS NOT EMPTY:
        nextQueue ← []
        FOR val IN queue:
            IF val IN leaves: RETURN val
            FOR neighbor IN graph[val]:
                IF neighbor NOT IN visited:
                    visited.ADD(neighbor)
                    nextQueue.APPEND(neighbor)
        queue ← nextQueue
    RETURN -1  // should never happen
```

## Walkthrough
| Step | Queue | Visited | Action |
|------|-------|---------|--------|
| Start | [k] | {k} | Build graph, identify leaves |
| 1st level | neighbors of k | add to visited | check if any is leaf |
| … | … | … | Continue until leaf found |

## Complexity Analysis
- **Time:** O(N) to build the graph plus O(N) for BFS → O(N) overall, where N is the number of nodes.
- **Space:** O(N) for the adjacency list and visited set.

## Follow-Up Questions
1. How would you modify the solution to return the path to the closest leaf?
2. Can this be solved without converting the tree to a graph, using only parent pointers?
3. How would the algorithm change for a k‑ary tree?

## Key Takeaway
Transforming the tree into an undirected graph lets a simple BFS locate the nearest leaf efficiently.
