# 671. Second Minimum Node In a Binary Tree

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/second-minimum-node-in-a-binary-tree](https://leetcode.com/problems/second-minimum-node-in-a-binary-tree)
**Companies:** Linkedin, Meta

---

## Problem Description

Given a non-empty special binary tree consisting of nodes with the non-negative value, where each node in this tree has exactly `two` or `zero` sub-node. If the node has two sub-nodes, then this node's value is the smaller value among its two sub-nodes. More formally, the property `root.val = min(root.left.val, root.right.val)` always holds.

Given such a binary tree, you need to output the **second minimum** value in the set made of all the nodes' value in the whole tree.

If no such second minimum value exists, output `-1` instead.

**Constraints:**

- The number of nodes in the tree is in the range `[1, 25]`.
- `1 <= Node.val <= 2^31 - 1`
- `root.val == min(root.left.val, root.right.val)` for each internal node of the tree.

---

## Examples

```
Example 1:
  Input: root = [2,2,5,null,null,5,7]
  Output: 5
  Explanation: The smallest value is 2, the second smallest value is 5.
```

```
Example 2:
  Input: root = [2,2,2]
  Output: -1
  Explanation: The smallest value is 2, but there isn't any second smallest value.
```

---

## Approach

```
CLASS Solution:
    FUNCTION findSecondMinimumValue(root):
        IF root IS NULL: RETURN -1
        min1 ← root.val
        result ← INFINITY
        
        FUNCTION dfs(node):
            IF node IS NULL: RETURN
            IF min1 < node.val < result:
                result ← node.val
            IF node.val == min1:
                dfs(node.left)
                dfs(node.right)
        
        dfs(root)
        RETURN result IF result < INFINITY ELSE -1
```

---

## Walkthrough

**Example 1:** Tree `[2,2,5,null,null,5,7]`
1. `min1 = 2`. Start DFS at root.
2. Left child value `2` equals `min1` → recurse further (its children are `null`).
3. Right child value `5` > `min1` and < `result` → `result = 5`.
4. Continue DFS on right child's children: left child `5` (equal to current `result`, no change), right child `7` (> `result`).
5. DFS finishes; `result = 5` is the second minimum.

---

## Complexity Analysis

- **Time Complexity:** Each node is visited at most once → `O(n)` where `n` is the number of nodes.
- **Space Complexity:** Recursion stack depth is the height `h` of the tree → `O(h)`.

---

## Follow-Up Questions

1. How would you solve the problem iteratively without recursion?
2. Can you extend the solution to find the *k*-th minimum value?
3. How would the algorithm change if the tree were not guaranteed to have the special property?

---

## Key Takeaway

> By only recursing into subtrees whose root equals the minimum value, we prune larger branches and efficiently locate the second smallest value.
