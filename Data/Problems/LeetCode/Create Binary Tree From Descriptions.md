# 2196. Create Binary Tree From Descriptions

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/create-binary-tree-from-descriptions](https://leetcode.com/problems/create-binary-tree-from-descriptions)
**Companies:** Amazon, Clari, Google, Linkedin, Uber

---

## Problem Description

You are given a 2D integer array `descriptions` where `descriptions[i] = [parent_i, child_i, isLeft_i]` indicates that `parent_i` is the **parent** of `child_i` in a **binary** tree of **unique** values. Furthermore,

- If `isLeft_i == 1`, then `child_i` is the left child of `parent_i`.
- If `isLeft_i == 0`, then `child_i` is the right child of `parent_i`.

Construct the binary tree described by `descriptions` and return *its **root***.

The test cases will be generated such that the binary tree is **valid**.

**Constraints:**
- `1 <= descriptions.length <= 10^4`
- `descriptions[i].length == 3`
- `1 <= parent_i, child_i <= 10^5`
- `0 <= isLeft_i <= 1`
- The binary tree described by `descriptions` is valid.

## Examples

```
Example 1:
  Input: descriptions = [[20,15,1],[20,17,0],[50,20,1],[50,80,0],[80,19,1]]
  Output: [50,20,80,15,17,19]
  Explanation: The root node is the node with value 50 since it has no parent.
```

```
Example 2:
  Input: descriptions = [[1,2,1],[2,3,0],[3,4,1]]
  Output: [1,2,null,null,3,4]
  Explanation: The root node is the node with value 1 since it has no parent.
```

---

## Approach

```
FUNCTION createBinaryTree(descriptions):
    nodes = {}               // map value -> TreeNode
    children = SET()
    FOR [parent, child, isLeft] IN descriptions:
        IF parent NOT IN nodes: nodes[parent] = TreeNode(parent)
        IF child NOT IN nodes: nodes[child] = TreeNode(child)
        IF isLeft:
            nodes[parent].left = nodes[child]
        ELSE:
            nodes[parent].right = nodes[child]
        children.ADD(child)
    // root is the node never appearing as a child
    FOR val IN nodes:
        IF val NOT IN children: RETURN nodes[val]
```

## Walkthrough

Consider the first example step by step:

| Step | Description               | Action                              |
|------|---------------------------|-------------------------------------|
| 1    | [20,15,1]                 | Create nodes 20,15; set 15 as left child of 20 |
| 2    | [20,17,0]                 | Create node 17; set 17 as right child of 20 |
| 3    | [15,13,1]                 | Create node 13; set 13 as left child of 15 |
| 4    | [13,12,1]                 | Create node 12; set 12 as left child of 13 |

After processing, node 20 never appears as a child, so it is the root.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) where n is number of descriptions |
| **Space** | O(n) for node map and child set |

---

## Key Takeaway

> **Build a map of nodes and track child values; the root is the unique node that never appears as a child.**