
# 297. Serialize and Deserialize Binary Tree

**Difficulty:** 🔴 Hard
**Acceptance:** 59.3%
**LeetCode:** [https://leetcode.com/problems/serialize-and-deserialize-binary-tree](https://leetcode.com/problems/serialize-and-deserialize-binary-tree)
**Companies:** Amazon, Apple, Atlassian, Bloomberg, Citadel, Doordash, Flipkart, General Motors, Google, Hive, Linkedin, Meta, Microsoft, Nutanix, Nvidia, Oracle, Paypal, Qualcomm, Quora, Tcs, Tiktok, Uber, Workday, Yahoo

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach 1: BFS (Level Order) — O(n) ✅](#3-approach-1-bfs-level-order--on-)
4. [Approach 2: DFS (Preorder) — O(n) ✅](#4-approach-2-dfs-preorder--on-)
5. [Walkthrough (Preorder DFS)](#5-walkthrough-preorder-dfs)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)

---

## 1. Problem Description

Design an algorithm to serialize and deserialize a binary tree. Serialization converts the tree to a string; deserialization reconstructs the tree from the string.

There is no restriction on how the serialization/deserialization algorithm should work — you just need to ensure that a binary tree can be serialized to a string and this string can be deserialized back to the **exact same** tree structure.

---

## 2. Examples

```
Example:
      1
     / \
    2   3
       / \
      4   5

  Serialized (preorder): "1,2,#,#,3,4,#,#,5,#,#"
  Serialized (level):    "1,2,3,#,#,4,5"
```

---

## 3. Approach 1: BFS (Level Order) — O(n) ✅

```
FUNCTION serialize(root):
    IF root IS NULL: RETURN ""

    result = []
    queue = [root]

    WHILE queue IS NOT EMPTY:
        node = queue.DEQUEUE()

        IF node IS NULL:
            result.ADD("#")
        ELSE:
            result.ADD(STRING(node.val))
            queue.ENQUEUE(node.left)
            queue.ENQUEUE(node.right)

    RETURN JOIN(result, ",")


FUNCTION deserialize(data):
    IF data IS EMPTY: RETURN NULL

    values = SPLIT(data, ",")
    root = new TreeNode(INT(values[0]))
    queue = [root]
    i = 1

    WHILE queue IS NOT EMPTY:
        node = queue.DEQUEUE()

        // Left child
        IF values[i] != "#":
            node.left = new TreeNode(INT(values[i]))
            queue.ENQUEUE(node.left)
        i += 1

        // Right child
        IF values[i] != "#":
            node.right = new TreeNode(INT(values[i]))
            queue.ENQUEUE(node.right)
        i += 1

    RETURN root
```

---

## 4. Approach 2: DFS (Preorder) — O(n) ✅

### Serialize

```
FUNCTION serialize(root):
    result = []

    FUNCTION dfs(node):
        IF node IS NULL:
            result.ADD("#")
            RETURN

        result.ADD(STRING(node.val))
        dfs(node.left)
        dfs(node.right)

    dfs(root)
    RETURN JOIN(result, ",")
```

### Deserialize

```
FUNCTION deserialize(data):
    values = SPLIT(data, ",")
    index = [0]                    // use list for mutable reference

    FUNCTION dfs():
        IF values[index[0]] == "#":
            index[0] += 1
            RETURN NULL

        node = new TreeNode(INT(values[index[0]]))
        index[0] += 1

        node.left  = dfs()
        node.right = dfs()

        RETURN node

    RETURN dfs()
```

### Why Preorder Works

Preorder visits: **root → left → right**. The `#` markers tell us where NULL children are, which allows us to reconstruct the exact tree structure without ambiguity.

---

## 5. Walkthrough (Preorder DFS)

```
Tree:
      1
     / \
    2   3
       / \
      4   5

Serialize:
  visit 1 → "1"
  visit 2 → "1,2"
  visit NULL (2.left) → "1,2,#"
  visit NULL (2.right) → "1,2,#,#"
  visit 3 → "1,2,#,#,3"
  visit 4 → "1,2,#,#,3,4"
  visit NULL (4.left) → "1,2,#,#,3,4,#"
  visit NULL (4.right) → "1,2,#,#,3,4,#,#"
  visit 5 → "1,2,#,#,3,4,#,#,5"
  visit NULL (5.left) → "1,2,#,#,3,4,#,#,5,#"
  visit NULL (5.right) → "1,2,#,#,3,4,#,#,5,#,#"

Result: "1,2,#,#,3,4,#,#,5,#,#"

Deserialize:
  values = ["1","2","#","#","3","4","#","#","5","#","#"]
  idx=0: create 1
    idx=1: create 2 (left of 1)
      idx=2: "#" → NULL (left of 2)
      idx=3: "#" → NULL (right of 2)
    idx=4: create 3 (right of 1)
      idx=5: create 4 (left of 3)
        idx=6: "#" → NULL
        idx=7: "#" → NULL
      idx=8: create 5 (right of 3)
        idx=9: "#" → NULL
        idx=10: "#" → NULL

Reconstructed tree matches original ✅
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) for both serialize and deserialize |
| **Space** | O(n) for the string and recursion/queue |

---

## 7. Follow-Up Questions

### 7.1 Serialize BST (LeetCode #449)

For a BST, you don't need `#` markers. Preorder alone is sufficient — use value bounds to determine where left subtree ends and right begins during deserialization.

```
FUNCTION deserializeBST(preorder, minVal, maxVal):
    IF index >= LENGTH(preorder): RETURN NULL
    IF preorder[index] < minVal OR preorder[index] > maxVal: RETURN NULL

    val = preorder[index]
    index += 1
    node = new TreeNode(val)
    node.left  = deserializeBST(preorder, minVal, val)
    node.right = deserializeBST(preorder, val, maxVal)
    RETURN node
```

This is more compact since no `#` markers are needed.

### 7.2 Serialize N-ary Tree (LeetCode #428)

Record the number of children or use a sentinel to mark end of children:

```
Serialize: "1[3[5,6],2,4[7]]"
Or: "1,3,5,#,6,#,#,2,#,4,7,#,#,#"
```

### 7.3 What about cyclic graphs?

Trees are acyclic by definition. For general graphs:
- Assign unique IDs to nodes.
- Serialize as an adjacency list with IDs.
- During deserialization, use a map to handle shared references.

### 7.4 How to handle very large trees?

- **Streaming:** Serialize/deserialize incrementally without loading the entire string.
- **Compression:** Use binary encoding instead of text.
- **Chunking:** Split the tree at certain levels and serialize subtrees independently.

---

## Key Takeaway

> Serialize/Deserialize tests your understanding of **tree traversals** and **encoding schemes**. The preorder DFS approach is the most elegant — the `#` null markers provide the structural information needed for unambiguous reconstruction. The key insight is that preorder + null markers = complete structural encoding.
