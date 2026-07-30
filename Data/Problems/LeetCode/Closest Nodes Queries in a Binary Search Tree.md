# 2476. Closest Nodes Queries in a Binary Search Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/closest-nodes-queries-in-a-binary-search-tree](https://leetcode.com/problems/closest-nodes-queries-in-a-binary-search-tree)
**Companies:** Google

---

## 1. Problem Description

Given a BST and a list of queries, for each query value find the largest value ≤ query and the smallest value ≥ query in the BST. Return `[-1, -1]` if not found.

---

## 2. Examples

**Example 1:**
```
Input: root = [4,2,6,1,3,5,7], queries = [2,5,8]
Output: [[2,2],[5,5],[-1,7]]
Explanation:
- For query 2, floor and ceil are both 2.
- For query 5, floor is 5 (node 5) and ceil is also 5.
- For query 8, no value ≥ 8, so ceil = -1; floor is the maximum node 7.
```

**Example 2:**
```
Input: root = [2,1,3], queries = [0,4]
Output: [[-1,1],[3,-1]]
Explanation:
- Query 0 has no floor, ceil is the smallest node 1.
- Query 4 has floor 3 and no ceil.
```

---

## 3. Approach: Inorder + Binary Search — O(n + q log n) ✅

```text
FUNCTION closestNodes(root, queries):
    // Flatten BST into sorted array via inorder traversal
    sorted ← []
    CALL inorder(root, sorted)
    result ← []
    FOR each q IN queries:
        // Find floor (largest ≤ q)
        idxFloor ← BINARY_SEARCH_RIGHT(sorted, q) - 1
        floor ← sorted[idxFloor] IF idxFloor ≥ 0 ELSE -1
        // Find ceil (smallest ≥ q)
        idxCeil ← BINARY_SEARCH_LEFT(sorted, q)
        ceil ← sorted[idxCeil] IF idxCeil < LENGTH(sorted) ELSE -1
        APPEND [floor, ceil] TO result
    RETURN result

FUNCTION inorder(node, arr):
    IF node IS NULL: RETURN
    CALL inorder(node.left, arr)
    APPEND node.val TO arr
    CALL inorder(node.right, arr)
```

---

## 4. Walkthrough

| Step | Action | Details |
|------|--------|---------|
| 1 | Inorder traversal | Produces sorted list `[1,2,3,4,5,6,7]` for the example tree. |
| 2 | Query 2 | `BINARY_SEARCH_RIGHT` returns index 2, floor = `sorted[1]=2`; `BINARY_SEARCH_LEFT` returns 1, ceil = `sorted[1]=2`. |
| 3 | Query 5 | Floor index = 5 → `5`; Ceil index = 4 → `5`. |
| 4 | Query 8 | Floor index = 7 → `7`; Ceil index = 7 (out of range) → `-1`. |

---

## 5. Complexity Analysis

- **Time:** O(n) to flatten the BST plus O(q log n) for binary searches.
- **Space:** O(n) for the sorted array and O(h) recursion stack (h = tree height).

---

## 6. Follow-Up Questions

- How would you handle dynamic updates (insertions/deletions) to the BST while still answering queries efficiently?
- Can you answer queries in O(log n) without flattening the tree, using augmented BST nodes?
- How would the solution change if queries were streamed online?

---

## Key Takeaway

> Flattening a BST into a sorted array enables fast floor/ceil queries via binary search, guaranteeing O(log n) per query regardless of tree balance.
