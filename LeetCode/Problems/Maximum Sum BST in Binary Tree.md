# 1373. Maximum Sum BST in Binary Tree

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-sum-bst-in-binary-tree](https://leetcode.com/problems/maximum-sum-bst-in-binary-tree)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

```
FUNCTION maxSumBST(root):
    maxSum = 0

    FUNCTION dfs(node):
        // Returns (isBST, min, max, sum)
        IF node == null: RETURN (true, infinity, -infinity, 0)

        lBST, lMin, lMax, lSum = dfs(node.left)
        rBST, rMin, rMax, rSum = dfs(node.right)

        IF lBST AND rBST AND lMax < node.val < rMin:
            s = lSum + rSum + node.val
            maxSum = MAX(maxSum, s)
            RETURN (true, MIN(lMin, node.val), MAX(rMax, node.val), s)

        RETURN (false, 0, 0, 0)

    dfs(root)
    RETURN maxSum
```
