# 1379. Find a Corresponding Node of a Binary Tree in a Clone of That Tree

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-a-corresponding-node-of-a-binary-tree-in-a-clone-of-that-tree](https://leetcode.com/problems/find-a-corresponding-node-of-a-binary-tree-in-a-clone-of-that-tree)
**Companies:** Amazon, Meta

---

## Problem Description
Given the root of a binary tree `original`, a copy of the tree `cloned`, and a reference node `target` in the original tree, return the node in `cloned` that corresponds to `target`. The two trees have identical structure and node values, but are distinct objects.

## Examples
| original (pre‑order) | cloned (pre‑order) | target node value | returned node value |
|----------------------|-------------------|-------------------|---------------------|
| `[7,4,3,null,null,6,19]` | same structure | node with value `3` | node with value `3` in cloned |
| `[1,null,2,3]` | same structure | node with value `2` | node with value `2` in cloned |

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
- What changes are needed if the trees are not binary but n‑ary?

## Key Takeaway
A synchronized depth‑first traversal of the original and cloned trees lets you locate the counterpart of any node in linear time without extra storage.
