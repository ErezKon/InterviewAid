# 919. Complete Binary Tree Inserter

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/complete-binary-tree-inserter](https://leetcode.com/problems/complete-binary-tree-inserter)
**Companies:** Amazon, Google, Meta

---

## Problem Description
A **complete binary tree** is a binary tree in which every level, except possibly the last, is completely filled, and all nodes are as far left as possible.

Design an algorithm to insert a new node to a complete binary tree keeping it complete after the insertion.

Implement the `CBTInserter` class:

- `CBTInserter(TreeNode root)` Initializes the data structure with the `root` of the complete binary tree.
- `int insert(int v)` Inserts a `TreeNode` into the tree with value `Node.val == val` so that the tree remains complete, and returns the value of the parent of the inserted `TreeNode`.
- `TreeNode get_root()` Returns the root node of the tree.

**Constraints:**
- The number of nodes in the tree will be in the range `[1, 1000]`.
- `0 <= Node.val <= 5000`
- `root` is a complete binary tree.
- `0 <= val <= 5000`
- At most `10^4` calls will be made to `insert` and `get_root`.

## Examples
```
Example 1:
  Input:
    ["CBTInserter", "insert", "insert", "get_root"]
    [[[1, 2]], [3], [4], []]
  Output:
    [null, 1, 2, [1, 2, 3, 4]]
  Explanation:
    CBTInserter cBTInserter = new CBTInserter([1, 2]);
    cBTInserter.insert(3);  // return 1
    cBTInserter.insert(4);  // return 2
    cBTInserter.get_root(); // return [1, 2, 3, 4]
```

## Approach
Use **Breadth-First Search (BFS)** to store nodes level-order in an array. The parent of the next insertion is at index `(size-2)//2`. Insertion is O(1) and retrieving the root is O(1).

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

## Follow-Up Questions
1. How would you modify the structure to support deletion while keeping the tree complete?
2. Can you implement the same functionality without extra space, using only tree pointers?
3. How would you adapt this for a **complete k-ary tree**?

## Key Takeaway
Maintaining a level-order array of nodes lets you locate the insertion parent in constant time, enabling an efficient complete binary tree inserter.
