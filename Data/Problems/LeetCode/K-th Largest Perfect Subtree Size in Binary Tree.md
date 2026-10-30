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

You are given the `root` of a **binary tree** and an integer `k`.

Return an integer denoting the size of the `k^th` **largest* *perfect binary*** *subtree, or `-1` if it doesn't exist.

A **perfect binary tree** is a tree where all leaves are on the same level, and every parent has two children.

**Constraints:**
- The number of nodes in the tree is in the range `[1, 2000]`.
- `1 <= Node.val <= 2000`
- `1 <= k <= 1024`

---

## Examples

**Example 1:**
```
Input: root = [5,3,6,5,2,5,7,1,8,null,null,6,8], k = 2
Output: 3
Explanation: The roots of the perfect binary subtrees are highlighted in black. Their sizes, in non-increasing order are [3, 3, 1, 1, 1, 1, 1, 1].
The 2^nd largest size is 3.
```

**Example 2:**
```
Input: root = [1,2,3,4,5,6,7], k = 1
Output: 7
Explanation: The sizes of the perfect binary subtrees in non-increasing order are [7, 3, 3, 1, 1, 1, 1]. The size of the largest perfect binary subtree is 7.
```

**Example 3:**
```
Input: root = [1,2,3,null,4], k = 3
Output: -1
Explanation: The sizes of the perfect binary subtrees in non-increasing order are [1, 1]. There are fewer than 3 perfect binary subtrees.
```

---

## 2. Key Insight

Use **post-order DFS**: a subtree rooted at a node is perfect if both children's subtrees are perfect and have equal height. Collect all perfect subtree sizes, sort, and return the k‑th largest.

---

## 3. Approach: Post-Order DFS — O(n) ✅

```text
FUNCTION kthLargestPerfectSubtree(root, k):
    sizes ← []

    FUNCTION dfs(node):
        IF node == null:
            RETURN 0
        leftH ← dfs(node.left)
        rightH ← dfs(node.right)
        IF leftH == -1 OR rightH == -1 OR leftH != rightH:
            RETURN -1    // not perfect
        size ← (1 << (leftH + 1)) - 1   // 2^(h+1) - 1
        sizes.APPEND(size)
        RETURN leftH + 1

    dfs(root)
    sizes.SORT(reverse=True)
    RETURN sizes[k-1] IF k <= LENGTH(sizes) ELSE -1
```

---

## Walkthrough

Consider the tree `[[1,2,3],[null,4,5],[null,null,null]]` and `k = 1`.

| Step | Node | leftH | rightH | Returned Height | Perfect? | Sizes Collected |
|------|------|-------|--------|-----------------|----------|-----------------|
| 1 | leaf 4 | 0 | 0 | 1 | Yes (size=1) | [1] |
| 2 | leaf 5 | 0 | 0 | 1 | Yes (size=1) | [1,1] |
| 3 | node 2 | 1 | 1 | 2 | Yes (size=3) | [1,1,3] |
| 4 | leaf 3 | 0 | 0 | 1 | Yes (size=1) | [1,1,3,1] |
| 5 | root 1 | 2 | 1 | -1 | No (unequal heights) | [1,1,3,1] |

After DFS, perfect subtree sizes are `[3,1,1,1]`. Sorted descending → `[3,1,1,1]`. The 1‑st largest is `3` (size of subtree rooted at node 2). Since the whole tree isn’t perfect, the answer is `3`.

---

## 4. Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| Time | O(n log n) | DFS O(n) + sorting the collected sizes |
| Space | O(n) | Sizes list + recursion stack |

---

## Follow-Up Questions

1. How would you modify the algorithm to return the **k‑th smallest** perfect subtree size?
2. Can you compute the answer in **O(n)** time without sorting, e.g., using a min‑heap of size k?
3. How would the solution change if the tree were not binary but an **n‑ary** tree?

---

## Key Takeaway

> Post‑order DFS returns the height of perfect subtrees (or -1 if imperfect). A subtree is perfect iff both children are perfect with equal height. Collect sizes, sort, and pick the k‑th largest.
