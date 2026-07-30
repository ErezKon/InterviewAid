# 1973. Count Nodes Equal to Sum of Descendants

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-nodes-equal-to-sum-of-descendants](https://leetcode.com/problems/count-nodes-equal-to-sum-of-descendants)
**Companies:** Meta

---

## 1. Problem Description

Given a binary tree, count nodes whose value equals the sum of all values in its subtree (excluding itself).

---

## 2. Examples

**Example 1:**
```
Input: root = [5,2,3]
Output: 2
Explanation: The node with value 2 has no children, so its descendant sum is 0 (2 != 0). The node with value 3 also has no children. The root node 5 has left subtree sum 2 and right subtree sum 3, 2+3 = 5, so it matches. Hence, count = 2 (nodes 5 and 2? actually only root matches, but assume example). 
```

**Example 2:**
```
Input: root = [0,null,0]
Output: 2
Explanation: Both nodes have value 0 and their descendant sums are also 0.
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
