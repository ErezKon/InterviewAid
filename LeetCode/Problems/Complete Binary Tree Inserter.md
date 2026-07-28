# 919. Complete Binary Tree Inserter

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/complete-binary-tree-inserter](https://leetcode.com/problems/complete-binary-tree-inserter)
**Companies:** Amazon, Google, Meta

---

## Problem Description
Design a data structure that supports inserting a new node into a **complete binary tree** such that the tree remains complete after each insertion. The structure should also provide access to the root of the tree.

## Examples
**Example 1:**
```
CBTInserter inserter = new CBTInserter(root);
inserter.insert(5); // returns parent value 2
inserter.get_root(); // returns the updated tree root
```
**Example 2:**
```
inserter.insert(6); // returns parent value 3
```
Both insertions keep the tree complete.

## Approach
Use **Breadth‑First Search (BFS)** to store nodes level‑order in an array. The parent of the next insertion is at index `(size‑2)//2`. Insertion is O(1) and retrieving the root is O(1).

```text
FUNCTION initialize(root):
    SET queue ← [root]
    SET nodes ← []
    WHILE queue NOT EMPTY:
        SET node ← POPLEFT(queue)
        APPEND node TO nodes
        IF node.left: APPEND node.left TO queue
        IF node.right: APPEND node.right TO queue
    RETURN nodes

FUNCTION insert(nodes, val):
    SET newNode ← TreeNode(val)
    APPEND newNode TO nodes
    SET parentIdx ← (LEN(nodes) - 2) // 2
    SET parent ← nodes[parentIdx]
    IF NOT parent.left:
        SET parent.left ← newNode
    ELSE:
        SET parent.right ← newNode
    RETURN parent.val

FUNCTION get_root(nodes):
    RETURN nodes[0]
```

## Walkthrough
| Step | Action | Tree (level order) |
|------|--------|--------------------|
| 1 | Initialize with root `1` | [1]
| 2 | Insert `2` | parent=1, left child → [1,2]
| 3 | Insert `3` | parent=1, right child → [1,2,3]
| 4 | Insert `4` | parent=2, left child → [1,2,3,4]

## Complexity Analysis
- **Time:** `O(1)` per `insert`, `O(n)` for initialization where `n` is number of existing nodes.
- **Space:** `O(n)` to store the node list.

## Follow‑Up Questions
1. How would you modify the structure to support deletion while keeping the tree complete?
2. Can you implement the same functionality without extra space, using only tree pointers?
3. How would you adapt this for a **complete k‑ary tree**?

## Key Takeaway
Maintaining a level‑order array of nodes lets you locate the insertion parent in constant time, enabling an efficient complete binary tree inserter.
