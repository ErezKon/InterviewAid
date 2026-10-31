# 623. Add One Row to Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/add-one-row-to-tree](https://leetcode.com/problems/add-one-row-to-tree)
**Companies:** Bloomberg, Gilt Groupe, Google

---

## Problem Description
Given the `root` of a binary tree and two integers `val` and `depth`, add a row of nodes with value `val` at the given depth `depth`.

Note that the `root` node is at depth `1`.

The adding rule is:

- Given the integer `depth`, for each not null tree node `cur` at the depth `depth - 1`, create two tree nodes with value `val` as `cur`'s left subtree root and right subtree root.
- `cur`'s original left subtree should be the left subtree of the new left subtree root.
- `cur`'s original right subtree should be the right subtree of the new right subtree root.
- If `depth == 1` that means there is no depth `depth - 1` at all, then create a tree node with value `val` as the new root of the whole original tree, and the original tree is the new root's left subtree.

**Constraints:**
- The number of nodes in the tree is in the range `[1, 10^4]`.
- The depth of the tree is in the range `[1, 10^4]`.
- `-100 <= Node.val <= 100`
- `-10^5 <= val <= 10^5`
- `1 <= depth <= the depth of tree + 1`

## Examples
```
Example 1:
  Input: root = [4,2,6,3,1,5], val = 1, depth = 2
  Output: [4,1,1,2,null,null,6,3,1,5]
  Explanation: New nodes with value 1 are inserted between the root and its original children
  (2 becomes the left child of the new left node, 6 the right child of the new right node).
```
```
Example 2:
  Input: root = [4,2,null,3,1], val = 1, depth = 3
  Output: [4,2,null,1,1,3,null,null,1]
  Explanation: Node 2 (at depth 2) gets two new children with value 1; its original left child 3
  hangs under the new left node and its original right child 1 under the new right node.
```

## Approach
**Algorithm:** Breadth-First Search (level order) or recursion to reach the level just above the target depth, then insert new nodes.
1. If `depth == 1`, create a new node with `val` and set the original root as its left child.
2. Perform BFS until reaching level `depth-1`.
3. For each node at that level, create two new nodes with `val` and attach the original left/right subtrees as children of the new nodes.

## Walkthrough
| Step | Action | Tree Structure |
|------|--------|----------------|
| 1 | Start at root (depth 1) | 4 |
| 2 | BFS to depth 2 (target depth-1) | nodes: 2,6 |
| 3 | Insert new nodes under 2 and 6 | 2 gets left=1, right=1; 6 gets left=1, right=1 |
| 4 | Attach original children to new nodes | original subtrees become children of the new nodes |

## Complexity Analysis
- **Time:** O(N) where N is the number of nodes (each node visited at most once).
- **Space:** O(W) for the BFS queue, where W is the maximum width of the tree (worst-case O(N)).

## Follow-Up Questions
1. How would you modify the algorithm to insert a row only on the left side of each node?
2. Can you perform the insertion in place using recursion without an explicit queue?
3. How would you handle very deep trees where recursion depth might cause a stack overflow?

## Key Takeaway
Inserting a row at a specific depth is a straightforward level-order operation: locate the parent level and splice new nodes between the parent and its children.

---

```text
FUNCTION addOneRow(root, val, depth):
    IF depth == 1:
        newRoot ← TreeNode(val)
        newRoot.left ← root
        RETURN newRoot
    queue ← [root]
    currentDepth ← 1
    WHILE currentDepth < depth - 1:
        nextQueue ← []
        FOR node IN queue:
            IF node.left != null: APPEND node.left TO nextQueue
            IF node.right != null: APPEND node.right TO nextQueue
        queue ← nextQueue
        currentDepth ← currentDepth + 1
    FOR node IN queue:
        oldLeft ← node.left
        oldRight ← node.right
        node.left ← TreeNode(val)
        node.left.left ← oldLeft
        node.right ← TreeNode(val)
        node.right.right ← oldRight
    RETURN root
```