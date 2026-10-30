# 1740. Find Distance in a Binary Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-distance-in-a-binary-tree](https://leetcode.com/problems/find-distance-in-a-binary-tree)
**Companies:** Amazon

---

## Problem Description

Given the root of a binary tree and two integers `p` and `q`, return *the **distance** between the nodes of value* `p` *and value* `q` *in the tree*.

The **distance** between two nodes is the number of edges on the path from one to the other.

**Constraints:**

- The number of nodes in the tree is in the range `[1, 10^4]`.
- `0 <= Node.val <= 10^9`
- All `Node.val` are **unique**.
- `p` and `q` are values in the tree.

---

## Approach: LCA + Depth — O(n) ✅

```text
FUNCTION findDistance(root, p, q):
    lca = findLCA(root, p, q)
    RETURN depth(lca, p, 0) + depth(lca, q, 0)

FUNCTION depth(node, target, d):
    IF node IS null: RETURN -1
    IF node.val == target: RETURN d
    left = depth(node.left, target, d + 1)
    IF left != -1: RETURN left
    RETURN depth(node.right, target, d + 1)
```

---

## Examples

```
Example 1:
  Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 0
  Output: 3
  Explanation: There are 3 edges between 5 and 0: 5-3-1-0.
```

```
Example 2:
  Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 7
  Output: 2
  Explanation: There are 2 edges between 5 and 7: 5-2-7.
```

```
Example 3:
  Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 5
  Output: 0
  Explanation: The distance between a node and itself is 0.
```

---

## Walkthrough

Consider the tree `[1,2,3,null,4]` with `p = 2` and `q = 3`.
1. Find LCA of 2 and 3 → node `1`.
2. Compute depth from LCA to `p` (2): one edge → depth = 1.
3. Compute depth from LCA to `q` (3): one edge → depth = 1.
4. Distance = 1 + 1 = 2.

---

## Complexity Analysis

- **Time:** O(n) – each node visited at most once during LCA and depth searches.
- **Space:** O(h) – recursion stack depth `h` equals tree height.

---

## Key Takeaway

> **Distance = depth(LCA→p) + depth(LCA→q). Find LCA first, then compute depths from LCA to both nodes.**