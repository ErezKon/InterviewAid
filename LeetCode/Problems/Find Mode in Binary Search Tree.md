# 501. Find Mode in Binary Search Tree

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-mode-in-binary-search-tree](https://leetcode.com/problems/find-mode-in-binary-search-tree)
**Companies:** Amazon, Bloomberg, Google, Meta

---

```
FUNCTION findMode(root):
    count = Counter()
    FUNCTION inorder(node):
        IF NOT node: RETURN
        inorder(node.left)
        count[node.val] += 1
        inorder(node.right)
    inorder(root)
    maxFreq = MAX(count.values())
    RETURN [k for k, v in count.items() if v == maxFreq]
```
