# 2265. Count Nodes Equal to Average of Subtree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-nodes-equal-to-average-of-subtree](https://leetcode.com/problems/count-nodes-equal-to-average-of-subtree)
**Companies:** Amazon, Google, Meta, Microsoft, Snowflake

---

```
FUNCTION averageOfSubtree(root):
    count = [0]

    FUNCTION dfs(node):
        IF node == null: RETURN (0, 0)
        lSum, lCount = dfs(node.left)
        rSum, rCount = dfs(node.right)
        total = lSum + rSum + node.val
        n = lCount + rCount + 1
        IF total // n == node.val: count[0] += 1
        RETURN (total, n)

    dfs(root)
    RETURN count[0]
```
