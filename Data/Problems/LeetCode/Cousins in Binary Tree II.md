# 2641. Cousins in Binary Tree II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/cousins-in-binary-tree-ii](https://leetcode.com/problems/cousins-in-binary-tree-ii)
**Companies:** Amazon, Google

---

## Problem Description

Given the `root` of a binary tree, replace the value of each node in the tree with the **sum of all its cousins' values**.

Two nodes of a binary tree are **cousins** if they have the same depth with different parents.

Return *the* `root` *of the modified tree*.

**Note** that the depth of a node is the number of edges in the path from the root node to it.

**Constraints:**
- The number of nodes in the tree is in the range `[1, 10^5]`.
- `1 <= Node.val <= 10^4`

---

## Examples

```
Example 1:
  Input: root = [5,4,9,1,10,null,7]
  Output: [0,0,0,7,7,null,11]
  Explanation:
  - Node with value 5 does not have any cousins so its sum is 0.
  - Node with value 4 does not have any cousins so its sum is 0.
  - Node with value 9 does not have any cousins so its sum is 0.
  - Node with value 1 has a cousin with value 7 so its sum is 7.
  - Node with value 10 has a cousin with value 7 so its sum is 7.
  - Node with value 7 has cousins with values 1 and 10 so its sum is 11.
```

```
Example 2:
  Input: root = [3,1,2]
  Output: [0,0,0]
  Explanation:
  - Node with value 3 does not have any cousins so its sum is 0.
  - Node with value 1 does not have any cousins so its sum is 0.
  - Node with value 2 does not have any cousins so its sum is 0.
```

---

## Approach

Two‑pass BFS:
1. **First pass** – traverse level by level, recording the total sum of node values for each depth.
2. **Second pass** – for each parent, compute the sum of its children (sibling sum). The cousin sum for a child is `levelSum[depth+1] - siblingSum`. Assign this value to the child.

```text
FUNCTION replaceValueInTree(root):
    // Pass 1: collect level sums
    levelSums ← []
    queue ← [root]
    WHILE queue NOT EMPTY:
        levelSum ← 0
        nextQueue ← []
        FOR node IN queue:
            levelSum ← levelSum + node.val
            IF node.left: nextQueue.ADD(node.left)
            IF node.right: nextQueue.ADD(node.right)
        levelSums.ADD(levelSum)
        queue ← nextQueue

    // Pass 2: set cousin sums
    root.val ← 0
    queue ← [root]
    depth ← 0
    WHILE queue NOT EMPTY:
        nextQueue ← []
        FOR parent IN queue:
            siblingSum ← (parent.left.val IF parent.left ELSE 0) +
                         (parent.right.val IF parent.right ELSE 0)
            IF parent.left:
                parent.left.val ← levelSums[depth+1] - siblingSum
                nextQueue.ADD(parent.left)
            IF parent.right:
                parent.right.val ← levelSums[depth+1] - siblingSum
                nextQueue.ADD(parent.right)
        queue ← nextQueue
        depth ← depth + 1
    RETURN root
```

---

## Walkthrough

| Step | Queue (nodes) | Level Sum | Action |
|------|---------------|-----------|--------|
| 1 (Pass 1) | [5] | 5 | Record level 0 sum = 5.
| 2 (Pass 1) | [4,9] | 13 | Record level 1 sum = 13.
| 3 (Pass 1) | [1,10,7] | 18 | Record level 2 sum = 18.
| 4 (Pass 2) | [5] (depth 0) | – | Set root.val = 0.
| 5 (Pass 2) | [4,9] (depth 1) | – | siblingSum = 4+9 = 13 → children get 0.
| 6 (Pass 2) | [1,10,7] (depth 2) | – | For parent 4, siblingSum = 1+10 = 11 → child 1 gets 18‑11 = 7, child 10 gets 7. For parent 9, siblingSum = 7 → child 7 gets 18‑7 = 11.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) – each node visited twice |
| **Space** | O(w) – queue size equals maximum width of the tree |

---

## Follow-Up Questions

1. How would you modify the algorithm to return the original tree while also providing the cousin sums as a separate structure?
2. Can this approach be adapted to compute cousin products instead of sums?
3. How would you handle the problem if the tree were given as a list of parent‑child edges rather than a node‑based structure?

---

## Key Takeaway

> **Cousin sum = level sum – sibling sum.** Two BFS passes—first collect per‑level totals, then assign each child the difference between its level’s total and its parent’s sibling sum.
