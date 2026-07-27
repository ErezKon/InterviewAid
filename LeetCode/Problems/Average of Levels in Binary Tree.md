# 637. Average of Levels in Binary Tree

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/average-of-levels-in-binary-tree](https://leetcode.com/problems/average-of-levels-in-binary-tree)
**Companies:** Amazon, Google, Meta, Microsoft

---

```
FUNCTION averageOfLevels(root):
    result = []; queue = [root]
    WHILE queue:
        result.ADD(SUM(node.val for node in queue) / len(queue))
        queue = [child for node in queue for child in [node.left, node.right] if child]
    RETURN result
```
