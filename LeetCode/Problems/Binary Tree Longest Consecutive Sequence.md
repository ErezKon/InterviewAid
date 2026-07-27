# 298. Binary Tree Longest Consecutive Sequence

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/binary-tree-longest-consecutive-sequence](https://leetcode.com/problems/binary-tree-longest-consecutive-sequence)
**Companies:** Amazon, Google, Meta, Tiktok

---

```
FUNCTION longestConsecutive(root):
    maxLen = [0]
    FUNCTION dfs(node, parent, length):
        IF node == null: RETURN
        IF parent AND node.val == parent.val + 1: length += 1
        ELSE: length = 1
        maxLen[0] = MAX(maxLen[0], length)
        dfs(node.left, node, length)
        dfs(node.right, node, length)
    dfs(root, null, 0)
    RETURN maxLen[0]
```
