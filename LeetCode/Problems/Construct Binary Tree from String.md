# 536. Construct Binary Tree from String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/construct-binary-tree-from-string](https://leetcode.com/problems/construct-binary-tree-from-string)
**Companies:** Amazon, Bloomberg, Meta

---

```
FUNCTION str2tree(s):
    IF NOT s: RETURN null
    // Find the number (may be negative)
    i = 0
    WHILE i < len(s) AND (s[i].isdigit() OR s[i] == '-'): i += 1
    node = TreeNode(int(s[:i]))
    IF i < len(s):
        // Find matching closing paren for left child
        start = i + 1; count = 1
        i += 1
        WHILE count > 0:
            IF s[i] == '(': count += 1
            IF s[i] == ')': count -= 1
            i += 1
        node.left = str2tree(s[start:i-1])
    IF i < len(s):
        node.right = str2tree(s[i+1:-1])
    RETURN node
```
