# 129. Sum Root to Leaf Numbers

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/sum-root-to-leaf-numbers](https://leetcode.com/problems/sum-root-to-leaf-numbers)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Oracle, Visa

---

## Approach: DFS — O(n) ✅

```
FUNCTION sumNumbers(root):
    RETURN dfs(root, 0)

FUNCTION dfs(node, currentNum):
    IF node == null: RETURN 0
    currentNum = currentNum * 10 + node.val
    IF node.left == null AND node.right == null:
        RETURN currentNum
    RETURN dfs(node.left, currentNum) + dfs(node.right, currentNum)
```

Build the number as you descend. Return it at leaf nodes.
