# 1973. Count Nodes Equal to Sum of Descendants

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-nodes-equal-to-sum-of-descendants](https://leetcode.com/problems/count-nodes-equal-to-sum-of-descendants)
**Companies:** Meta

---

## 1. Problem Description

Given a binary tree, count nodes whose value equals the sum of all values in its subtree (excluding itself).

---

## 2. Approach: Post-order DFS — O(n) ✅

```
FUNCTION equalToDescendants(root):
    count = 0
    
    FUNCTION dfs(node):
        IF node IS null: RETURN 0
        leftSum = dfs(node.left)
        rightSum = dfs(node.right)
        IF node.val == leftSum + rightSum:
            count += 1
        RETURN node.val + leftSum + rightSum
    
    dfs(root)
    RETURN count
```

| Time | Space |
|------|-------|
| O(n) | O(h) recursion depth |

---

## Key Takeaway

> Post-order traversal returns the subtree sum. At each node, compare the node's value to the sum of its children's subtree sums.
