# 1485. Clone Binary Tree With Random Pointer

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/clone-binary-tree-with-random-pointer](https://leetcode.com/problems/clone-binary-tree-with-random-pointer)
**Companies:** Amazon, Meta

---

## 1. Problem Description

A binary tree is given such that each node contains an additional random pointer which could point to any node in the tree or null.

Return a **deep copy** of the tree.

The tree is represented in the same input/output way as normal binary trees where each node is represented as a pair of `[val, random_index]` where:

- `val`: an integer representing `Node.val`
- `random_index`: the index of the node (in the input) where the random pointer points to, or `null` if it does not point to any node.

You will be given the tree in class `Node` and you should return the cloned tree in class `NodeCopy`. `NodeCopy` class is just a clone of `Node` class with the same attributes and constructors.

**Constraints:**
- The number of nodes in the `tree` is in the range `[0, 1000]`.
- `1 <= Node.val <= 10^6`

---

## 2. Key Insight

> Use a hashmap to map original nodes to their clones. First pass: clone the tree structure (left/right). Second pass (or inline): wire up the `random` pointers using the map.

---

## 3. Approach: DFS + HashMap — O(n) ✅

```text
FUNCTION copyRandomBinaryTree(root):
    IF root IS null: RETURN null
    map ← {}  // original → clone
    
    FUNCTION clone(node):
        IF node IS null: RETURN null
        IF node IN map: RETURN map[node]
        copy ← new Node(node.val)
        map[node] ← copy
        copy.left ← clone(node.left)
        copy.right ← clone(node.right)
        copy.random ← clone(node.random)
        RETURN copy
    
    RETURN clone(root)
```

---

## 4. Examples

```
Example 1:
  Input: root = [[1,null],null,[4,3],[7,0]]
  Output: [[1,null],null,[4,3],[7,0]]
  Explanation: The original binary tree is [1,null,4,7].
  The random pointer of node one is null, so it is represented as [1, null].
  The random pointer of node 4 is node 7, so it is represented as [4, 3] where 3 is the index of node 7 in the array representing the tree.
  The random pointer of node 7 is node 1, so it is represented as [7, 0] where 0 is the index of node 1 in the array representing the tree.
```

```
Example 2:
  Input: root = [[1,4],null,[1,0],null,[1,5],[1,5]]
  Output: [[1,4],null,[1,0],null,[1,5],[1,5]]
  Explanation: The random pointer of a node can be the node itself.
```

```
Example 3:
  Input: root = [[1,6],[2,5],[3,4],[4,3],[5,2],[6,1],[7,0]]
  Output: [[1,6],[2,5],[3,4],[4,3],[5,2],[6,1],[7,0]]
```

---

## 5. Walkthrough

Consider the tree `1 -> 2 -> 3` where `1.random = 3`, `2.random = 1`, `3.random = null`.

1. Call `clone(root)` on node `1`. Since `1` not in map, create `copy1`.
2. Recursively clone left (`null`) → `null`; right child `2` → create `copy2`.
3. For `copy2`, clone its left child `3` → create `copy3`.
4. `copy3`'s children are `null`; return `copy3`.
5. Wire `copy2.random = clone(1)` → returns `copy1` from map.
6. Wire `copy1.random = clone(3)` → returns `copy3`.
7. Final cloned tree mirrors original with correct random pointers.

---

## 6. Complexity Analysis

- **Time:** O(n) – each node visited once.
- **Space:** O(n) – hashmap stores a mapping for each node plus recursion stack.

---

## 7. Follow-Up Questions

- How would you modify the algorithm to work iteratively?
- Can you clone the tree using O(1) extra space (excluding output) by interleaving nodes?

---

## Key Takeaway

> Same pattern as cloning a linked list with random pointers: hashmap from original to clone, then recursively build and wire all pointers.
