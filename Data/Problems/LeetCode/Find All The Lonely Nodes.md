# 1469. Find All The Lonely Nodes

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-all-the-lonely-nodes](https://leetcode.com/problems/find-all-the-lonely-nodes)
**Companies:** Microsoft

---

## Problem Description

In a binary tree, a **lonely** node is a node that is the only child of its parent node. The root of the tree is not lonely because it does not have a parent node.

Given the `root` of a binary tree, return *an array containing the values of all lonely nodes* in the tree. Return the list **in any order**.

**Constraints:**

- The number of nodes in the `tree` is in the range `[1, 1000]`.
- `1 <= Node.val <= 10^6`

---

## Examples

```
Example 1:
  Input: root = [1,2,3,null,4]
  Output: [4]
  Explanation: Node 4 (highlighted in the official image) is the only lonely node.
  Node 1 is the root and is not lonely.
  Nodes 2 and 3 have the same parent and are not lonely.
```

```
Example 2:
  Input: root = [7,1,4,6,null,5,3,null,null,null,null,null,2]
  Output: [6,2]
  Explanation: Nodes 6 and 2 are lonely nodes.
  Please remember that order doesn't matter, [2,6] is also an acceptable answer.
```

```
Example 3:
  Input: root = [11,99,88,77,null,null,66,55,null,null,44,33,null,null,22]
  Output: [77,55,33,66,44,22]
  Explanation: Nodes 99 and 88 share the same parent. Node 11 is the root.
  All other nodes are lonely.
```

---

## Approach: DFS — O(n) ✅

```
FUNCTION getLonelyNodes(root):
    result = []
    FUNCTION dfs(node):
        IF node IS null: RETURN
        IF node.left AND NOT node.right: result.ADD(node.left.val)
        IF node.right AND NOT node.left: result.ADD(node.right.val)
        dfs(node.left); dfs(node.right)
    dfs(root)
    RETURN result
```

---

## Walkthrough

Consider the tree `[1,2,3,null,4]`.

| Node | Left Child | Right Child | Lonely Child |
|------|------------|-------------|--------------|
| 1    | 2          | 3           | none |
| 2    | null       | 4           | 4 |
| 3    | null       | null        | none |
| 4    | null       | null        | none |

DFS visits node 1, then node 2 (detects right child 4 as lonely), then node 4, then node 3. Result `[4]`.

---

## Complexity Analysis

- **Time:** O(n) – each node visited once.
- **Space:** O(h) – recursion stack, where h is tree height (worst-case O(n)).

---

## Follow-Up Questions

1. How would you modify the algorithm to return lonely nodes in preorder without recursion?
2. Can you solve it iteratively using a stack?
3. What if you need to count lonely nodes instead of listing them?

---

## Key Takeaway

> **DFS: at each parent, if exactly one child exists, that child is lonely. Check `left XOR right` at every node.**