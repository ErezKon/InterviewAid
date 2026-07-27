# 2476. Closest Nodes Queries in a Binary Search Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/closest-nodes-queries-in-a-binary-search-tree](https://leetcode.com/problems/closest-nodes-queries-in-a-binary-search-tree)
**Companies:** Google

---

## 1. Problem Description

Given a BST and a list of queries, for each query value find the largest value ≤ query and the smallest value ≥ query in the BST. Return `[-1, -1]` if not found.

---

## 2. Key Insight

> The BST may be unbalanced, so O(h) per query can be O(n). Flatten the BST via inorder traversal into a sorted array, then use binary search for each query.

---

## 3. Approach: Inorder + Binary Search — O(n + q log n) ✅

```
FUNCTION closestNodes(root, queries):
    sorted = inorderTraversal(root)
    result = []
    FOR q IN queries:
        // bisect for floor and ceil
        idx = bisect_right(sorted, q) - 1
        floor = sorted[idx] IF idx >= 0 ELSE -1
        idx2 = bisect_left(sorted, q)
        ceil = sorted[idx2] IF idx2 < len(sorted) ELSE -1
        result.ADD([floor, ceil])
    RETURN result
```

| Time | Space |
|------|-------|
| O(n + q log n) | O(n) |

---

## Key Takeaway

> For BSTs that may be skewed, flatten to a sorted array first. Binary search gives guaranteed O(log n) per query regardless of tree shape.
