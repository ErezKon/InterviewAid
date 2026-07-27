# 270. Closest Binary Search Tree Value

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/closest-binary-search-tree-value](https://leetcode.com/problems/closest-binary-search-tree-value)
**Companies:** Bloomberg, Fractal Analytics, Google, Meta, Microsoft, Snapchat, Uber

---

```
FUNCTION closestValue(root, target):
    closest = root.val
    WHILE root:
        IF ABS(root.val - target) < ABS(closest - target):
            closest = root.val
        root = root.left IF target < root.val ELSE root.right
    RETURN closest
```

BST binary search, tracking closest value seen. O(h) time.
