# 549. Binary Tree Longest Consecutive Sequence II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/binary-tree-longest-consecutive-sequence-ii](https://leetcode.com/problems/binary-tree-longest-consecutive-sequence-ii)
**Companies:** Google, Meta, Uber

---

```
FUNCTION longestConsecutive(root):
    maxLen = [0]
    FUNCTION dfs(node):
        IF NOT node: RETURN (0, 0)    // (increasing, decreasing)
        inc = dec = 1
        FOR child IN [node.left, node.right]:
            IF child:
                ci, cd = dfs(child)
                IF child.val == node.val + 1: inc = MAX(inc, ci + 1)
                IF child.val == node.val - 1: dec = MAX(dec, cd + 1)
        maxLen[0] = MAX(maxLen[0], inc + dec - 1)
        RETURN (inc, dec)
    dfs(root)
    RETURN maxLen[0]
```
