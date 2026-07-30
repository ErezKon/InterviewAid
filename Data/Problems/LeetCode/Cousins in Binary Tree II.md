# 2641. Cousins in Binary Tree II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/cousins-in-binary-tree-ii](https://leetcode.com/problems/cousins-in-binary-tree-ii)
**Companies:** Amazon, Google

---

## Problem Description

Replace each node's value with the **sum of its cousins' values** (nodes at the same depth but different parents).

---

## Examples

**Example 1:**
```
Input: root = [5,4,9,1,10,null,7]
Output: [0,0,0,7,11,null,15]
Explanation:
- Level 0 sum = 5 → root becomes 0.
- Level 1 sum = 4 + 9 = 13 → children of 5 become 13 - (4+9) = 0.
- Level 2 sum = 1 + 10 + 7 = 18 →
  * Node 4's children (1,10) become 18 - (1+10) = 7.
  * Node 9's child (7) becomes 18 - 7 = 11.
```

**Example 2:**
```
Input: root = [1,2,3,4,null,5,6]
Output: [0,0,0,5,null,6,7]
Explanation:
- Level 0 sum = 1 → root becomes 0.
- Level 1 sum = 2 + 3 = 5 → children of 1 become 5 - (2+3) = 0.
- Level 2 sum = 4 + 5 + 6 = 15 →
  * Node 2's child (4) becomes 15 - 4 = 11 (but since its sibling is null, cousin sum = 15 - 4 = 11).
  * Node 3's children (5,6) become 15 - (5+6) = 4.
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
