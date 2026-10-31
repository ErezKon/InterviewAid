# 1379. Find a Corresponding Node of a Binary Tree in a Clone of That Tree

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-a-corresponding-node-of-a-binary-tree-in-a-clone-of-that-tree](https://leetcode.com/problems/find-a-corresponding-node-of-a-binary-tree-in-a-clone-of-that-tree)
**Companies:** Amazon, Meta

---

## Problem Description

Given two binary trees `original` and `cloned` and given a reference to a node `target` in the original tree.

The `cloned` tree is a **copy of** the `original` tree.

Return *a reference to the same node* in the `cloned` tree.

**Note** that you are **not allowed** to change any of the two trees or the `target` node and the answer **must be** a reference to a node in the `cloned` tree.

**Follow up:** Could you solve the problem if repeated values on the tree are allowed?

**Constraints:**
- The number of nodes in the `tree` is in the range `[1, 10^4]`.
- The values of the nodes of the `tree` are unique.
- `target` node is a node from the `original` tree and is not `null`.

## Examples

**Example 1:**
```
Input: tree = [7,4,3,null,null,6,19], target = 3
Output: 3
Explanation: In all examples the original and cloned trees are shown. The target node is a green node from the original tree. The answer is the yellow node from the cloned tree.
```

**Example 2:**
```
Input: tree = [7], target =  7
Output: 7
```

**Example 3:**
```
Input: tree = [8,null,6,null,5,null,4,null,3,null,2,null,1], target = 4
Output: 4
```

## Approach
Perform a simultaneous DFS on both trees. When the node in `original` matches `target`, return the node from `cloned`.

```text
FUNCTION FindCorrespondingNode(original, cloned, target):
    // Helper recursive DFS
    FUNCTION DFS(nodeOrig, nodeClone):
        IF nodeOrig IS NULL: RETURN NULL
        IF nodeOrig IS target: RETURN nodeClone
        SET leftResult ← DFS(nodeOrig.left, nodeClone.left)
        IF leftResult IS NOT NULL: RETURN leftResult
        RETURN DFS(nodeOrig.right, nodeClone.right)
    END FUNCTION

    RETURN DFS(original, cloned)
```

## Walkthrough
| Step | nodeOrig | nodeClone | Action |
|------|----------|-----------|--------|
| 1 | root (7) | root (7) | not target, recurse left |
| 2 | left (4) | left (4) | not target, recurse both children (null) |
| 3 | back to root, recurse right |
| 4 | right (3) | right (3) | matches target → return this cloned node |

## Complexity Analysis
- **Time:** O(N) where N is the number of nodes, as each node may be visited once.
- **Space:** O(H) recursion stack, H = tree height (O(log N) balanced, O(N) worst).

## Follow-Up Questions
- How would you solve it iteratively using a stack or queue?
- Can you modify the algorithm to work when node values are not unique?
- What changes are needed if the trees are not binary but n-ary?

## Key Takeaway
A synchronized depth-first traversal of the original and cloned trees lets you locate the counterpart of any node in linear time without extra storage.
