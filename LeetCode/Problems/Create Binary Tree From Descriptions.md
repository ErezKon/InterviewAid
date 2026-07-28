# 2196. Create Binary Tree From Descriptions

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/create-binary-tree-from-descriptions](https://leetcode.com/problems/create-binary-tree-from-descriptions)
**Companies:** Amazon, Clari, Google, Linkedin, Uber

---

## Problem Description

Given a list of descriptions `[parent, child, isLeft]` where `isLeft` indicates whether `child` is a left child of `parent`, construct the binary tree and return its root.

## Examples

```text
Input: descriptions = [[20,15,1],[20,17,0],[15,13,1],[13,12,1]]
Output: [20,15,17,13,null,null,null,12]
Explanation: The tree built from the descriptions matches the output representation.

Input: descriptions = [[1,2,1],[2,3,0],[3,4,1]]
Output: [1,2,null,3,4]
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