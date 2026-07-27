# 2583. Kth Largest Sum in a Binary Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/kth-largest-sum-in-a-binary-tree](https://leetcode.com/problems/kth-largest-sum-in-a-binary-tree)
**Companies:** Amazon, Bloomberg, Google, Microsoft

---

## 1. Problem Description

Given a binary tree, return the **k-th largest** level sum. Return -1 if fewer than k levels exist.

---

## 2. Approach: BFS + Sort — O(n log n) ✅

```
FUNCTION kthLargestLevelSum(root, k):
    levelSums = []
    queue = [root]
    WHILE queue:
        levelSums.ADD(SUM(node.val for node in queue))
        queue = [child for node in queue for child in [node.left, node.right] if child]
    IF k > len(levelSums): RETURN -1
    levelSums.SORT(reverse=True)
    RETURN levelSums[k - 1]
```

| Time | Space |
|------|-------|
| O(n + L log L) where L = levels | O(n) |

---

## 3. Key Takeaway

> BFS to compute level sums, sort the sums, return the k-th largest. Straightforward combination of level-order traversal and selection.
