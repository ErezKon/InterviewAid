# 669. Trim a Binary Search Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/trim-a-binary-search-tree](https://leetcode.com/problems/trim-a-binary-search-tree)
**Companies:** Adobe, Amazon, Bloomberg, Flipkart, Google

---

```
FUNCTION trimBST(root, low, high):
    IF root == null: RETURN null
    IF root.val < low: RETURN trimBST(root.right, low, high)
    IF root.val > high: RETURN trimBST(root.left, low, high)
    root.left = trimBST(root.left, low, high)
    root.right = trimBST(root.right, low, high)
    RETURN root
```
