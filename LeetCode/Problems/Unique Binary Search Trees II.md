# 95. Unique Binary Search Trees II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/unique-binary-search-trees-ii](https://leetcode.com/problems/unique-binary-search-trees-ii)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

```
FUNCTION generateTrees(n):
    IF n == 0: RETURN []
    RETURN build(1, n)

FUNCTION build(lo, hi):
    IF lo > hi: RETURN [null]
    result = []
    FOR root ← lo TO hi:
        leftTrees = build(lo, root - 1)
        rightTrees = build(root + 1, hi)
        FOR l IN leftTrees:
            FOR r IN rightTrees:
                node = TreeNode(root, l, r)
                result.ADD(node)
    RETURN result
```

Catalan number of trees. Try each value as root, recursively build left and right subtrees.
