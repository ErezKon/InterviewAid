# 3319. K-th Largest Perfect Subtree Size in Binary Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/k-th-largest-perfect-subtree-size-in-binary-tree](https://leetcode.com/problems/k-th-largest-perfect-subtree-size-in-binary-tree)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Post-Order DFS — O(n) ✅](#3-approach-post-order-dfs--on-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given a binary tree, find the size of the **k-th largest perfect subtree**. A perfect subtree has all leaves at the same depth and every non-leaf has two children. Return -1 if fewer than k perfect subtrees exist.

---

## 2. Key Insight

Use **post-order DFS**: a subtree rooted at a node is perfect if both children's subtrees are perfect and have equal height. Collect all perfect subtree sizes, sort, and return the k-th largest.

---

## 3. Approach: Post-Order DFS — O(n) ✅

```
FUNCTION kthLargestPerfectSubtree(root, k):
    sizes = []

    FUNCTION dfs(node):
        IF node == null: RETURN 0
        leftH = dfs(node.left)
        rightH = dfs(node.right)
        IF leftH == -1 OR rightH == -1 OR leftH != rightH:
            RETURN -1    // not perfect
        size = (1 << (leftH + 1)) - 1   // 2^(h+1) - 1
        sizes.ADD(size)
        RETURN leftH + 1

    dfs(root)
    sizes.SORT(reverse=True)
    RETURN sizes[k-1] IF k <= len(sizes) ELSE -1
```

---

## 4. Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| Time | O(n log n) | DFS O(n) + sort |
| Space | O(n) | Sizes list + recursion stack |

---

## 5. Key Takeaway

> Post-order DFS returns height of perfect subtrees (or -1 if imperfect). A subtree is perfect iff both children are perfect with equal height. Collect sizes, sort, pick k-th.
