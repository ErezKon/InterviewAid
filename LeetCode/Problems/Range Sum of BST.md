# 938. Range Sum of BST

**Difficulty:** 🟢 Easy
**Acceptance:** 86.0%
**LeetCode:** [https://leetcode.com/problems/range-sum-of-bst](https://leetcode.com/problems/range-sum-of-bst)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Yandex

---

## Approach: DFS with BST Pruning — O(n) ✅

```
FUNCTION rangeSumBST(root, low, high):
    IF root == null: RETURN 0

    sum = 0
    IF low <= root.val <= high:
        sum += root.val
    IF root.val > low:
        sum += rangeSumBST(root.left, low, high)
    IF root.val < high:
        sum += rangeSumBST(root.right, low, high)

    RETURN sum
```

Exploit BST ordering to prune branches outside [low, high].
