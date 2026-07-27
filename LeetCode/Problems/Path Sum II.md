# 113. Path Sum II

**Difficulty:** 🟡 Medium
**Acceptance:** 60.0%
**LeetCode:** [https://leetcode.com/problems/path-sum-ii](https://leetcode.com/problems/path-sum-ii)
**Companies:** Amazon, Arista Networks, Bloomberg, Flipkart, Google, Meta, Microsoft, Oracle, Palo Alto Networks, Tiktok

---

## 1. Problem Description

Given a binary tree and `targetSum`, find all root-to-leaf paths where the sum of node values equals `targetSum`.

---

## 2. Approach: DFS Backtracking — O(n²) ✅

```
FUNCTION pathSum(root, targetSum):
    result = []
    dfs(root, targetSum, [], result)
    RETURN result

FUNCTION dfs(node, remaining, path, result):
    IF node == null: RETURN

    path.ADD(node.val)

    IF node.left == null AND node.right == null AND remaining == node.val:
        result.ADD(copy of path)
    ELSE:
        dfs(node.left, remaining - node.val, path, result)
        dfs(node.right, remaining - node.val, path, result)

    path.REMOVE_LAST()     // backtrack
```

| Time | Space |
|------|-------|
| O(n²) worst (copying paths) | O(n) |

---

## Key Takeaway

> Standard tree DFS with path tracking and backtracking. Check the sum condition only at leaf nodes.
