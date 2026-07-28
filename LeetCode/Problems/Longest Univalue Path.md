# 687. Longest Univalue Path

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-univalue-path](https://leetcode.com/problems/longest-univalue-path)
**Companies:** Amazon, Bloomberg, Google, Meta, Snowflake, Sprinklr, Zepto

---

## 1. Problem Description

Find the longest path in a binary tree where all nodes have the same value. Path length = number of edges.

---

## 2. Approach: DFS — O(n) ✅

Same pattern as Diameter of Binary Tree (#543) but only extend path if values match.

```text
FUNCTION longestUnivaluePath(root):
    maxLen ← 0
    FUNCTION dfs(node):
        IF node == null:
            RETURN 0
        left ← dfs(node.left)
        right ← dfs(node.right)
        leftPath ← left + 1 IF node.left AND node.left.val == node.val ELSE 0
        rightPath ← right + 1 IF node.right AND node.right.val == node.val ELSE 0
        maxLen ← MAX(maxLen, leftPath + rightPath)
        RETURN MAX(leftPath, rightPath)
    dfs(root)
    RETURN maxLen
```

| Time | Space |
|------|-------|
| O(n) | O(h) |

---

## 3. Examples

**Example 1:**
```
Input: root = [5,4,5,1,1,null,5]
Output: 2
Explanation: The longest univalue path is the two edges connecting the three nodes with value 5.
```

**Example 2:**
```
Input: root = [1,4,5,4,4,null,5]
Output: 2
Explanation: The longest path with the same value (4) has length 2.
```

---

## 4. Walkthrough

Consider Example 1:
| Node | Value | leftPath | rightPath | maxLen after node |
|------|-------|----------|-----------|-------------------|
| 1 (leaf) | 1 | 0 | 0 | 0 |
| 1 (leaf) | 1 | 0 | 0 | 0 |
| 4 (leaf) | 4 | 0 | 0 | 0 |
| 4 (leaf) | 4 | 0 | 0 | 0 |
| 5 (leaf) | 5 | 0 | 0 | 0 |
| 4 (parent) | 4 | 1 (from left child) | 1 (from right child) | maxLen = 2 |
| 5 (root) | 5 | 0 (left child value 4) | 2 (right subtree chain of 5s) | maxLen remains 2 |
The global maximum `maxLen` becomes 2, representing two edges.

---

## 5. Complexity Analysis

- **Time:** O(n) – each node visited once.
- **Space:** O(h) – recursion stack depth equals tree height.

---

## 6. Follow-Up Questions

1. How would you modify the algorithm to return the actual longest univalue path nodes?
2. Can the solution be adapted for n-ary trees?
3. What changes are needed if the path length is defined by number of nodes instead of edges?

---

## Key Takeaway

> Use a post‑order DFS to compute longest same‑value arms from each child, combine them to update a global maximum, and return the longer arm upward.
