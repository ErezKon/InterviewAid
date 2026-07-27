# 563. Binary Tree Tilt

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/binary-tree-tilt](https://leetcode.com/problems/binary-tree-tilt)
**Companies:** Amazon, Indeed, Meta

---

```
FUNCTION findTilt(root):
    totalTilt = [0]
    FUNCTION dfs(node):
        IF NOT node: RETURN 0
        leftSum = dfs(node.left)
        rightSum = dfs(node.right)
        totalTilt[0] += ABS(leftSum - rightSum)
        RETURN node.val + leftSum + rightSum
    dfs(root)
    RETURN totalTilt[0]
```
