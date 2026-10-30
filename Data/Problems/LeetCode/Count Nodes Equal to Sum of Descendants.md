# 1973. Count Nodes Equal to Sum of Descendants

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-nodes-equal-to-sum-of-descendants](https://leetcode.com/problems/count-nodes-equal-to-sum-of-descendants)
**Companies:** Meta

---

## 1. Problem Description

Given the `root` of a binary tree, return *the number of nodes where the value of the node is equal to the **sum** of the values of its descendants*.

A **descendant** of a node `x` is any node that is on the path from node `x` to some leaf node. The sum is considered to be `0` if the node has no descendants.

**Constraints:**
- The number of nodes in the tree is in the range `[1, 10^5]`.
- `0 <= Node.val <= 10^5`

---

## 2. Examples

```
Example 1:
  Input: root = [10,3,4,2,1]
  Output: 2
  Explanation:
  For the node with value 10: The sum of its descendants is 3+4+2+1 = 10.
  For the node with value 3: The sum of its descendants is 2+1 = 3.
```

```
Example 2:
  Input: root = [2,3,null,2,null]
  Output: 0
  Explanation:
  No node has a value that is equal to the sum of its descendants.
```

```
Example 3:
  Input: root = [0]
  Output: 1
  Explanation: For the node with value 0: The sum of its descendants is 0 since it has no descendants.
```

---

## 3. Approach: Post-order DFS — O(n) ✅

```text
FUNCTION equalToDescendants(root):
    SET count ← 0
    
    FUNCTION dfs(node):
        IF node IS null: RETURN 0
        SET leftSum ← dfs(node.left)
        SET rightSum ← dfs(node.right)
        IF node.val == leftSum + rightSum:
            SET count ← count + 1
        RETURN node.val + leftSum + rightSum
    
    CALL dfs(root)
    RETURN count
```

---

## 4. Walkthrough

Consider the tree `[5,2,3]`.

| Step | Node | leftSum | rightSum | node.val | Condition | count |
|------|------|---------|----------|----------|-----------|-------|
| 1 | leaf 2 | 0 | 0 | 2 | 2 == 0+0? No | 0 |
| 2 | leaf 3 | 0 | 0 | 3 | 3 == 0+0? No | 0 |
| 3 | root 5 | 2 | 3 | 5 | 5 == 2+3? Yes | 1 |

The algorithm returns `1` for this tree.

---

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(n) where n is number of nodes (each visited once) | O(h) recursion stack, h = tree height |

---

## 6. Follow-Up Questions

1. How would you modify the algorithm to return the list of matching node values?
2. Can you solve the problem iteratively using a stack?
3. How does the solution change if the tree is a binary search tree and you need to maintain BST properties?

---

## Key Takeaway

> Post-order traversal returns the subtree sum. At each node, compare the node's value to the sum of its children's subtree sums.
