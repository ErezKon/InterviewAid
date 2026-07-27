# 108. Convert Sorted Array to Binary Search Tree

**Difficulty:** 🟢 Easy
**Acceptance:** 74.0%
**LeetCode:** [https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree](https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree)
**Companies:** Accenture, Airbnb, Amazon, Apple, Bloomberg, Google, Meta, Microsoft, Tiktok

---

## Approach: Recursive Mid-Point — O(n) ✅

```
FUNCTION sortedArrayToBST(nums):
    RETURN build(nums, 0, len(nums) - 1)

FUNCTION build(nums, lo, hi):
    IF lo > hi: RETURN null
    mid = (lo + hi) / 2
    node = new TreeNode(nums[mid])
    node.left = build(nums, lo, mid - 1)
    node.right = build(nums, mid + 1, hi)
    RETURN node
```

Choosing the middle element ensures the tree is height-balanced.
