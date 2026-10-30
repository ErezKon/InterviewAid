# 2476. Closest Nodes Queries in a Binary Search Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/closest-nodes-queries-in-a-binary-search-tree](https://leetcode.com/problems/closest-nodes-queries-in-a-binary-search-tree)
**Companies:** Google

---

## 1. Problem Description

You are given the `root` of a **binary search tree** and an array `queries` of size `n` consisting of positive integers.

Find a **2D** array `answer` of size `n` where `answer[i] = [min_i, max_i]`:

- `min_i` is the **largest** value in the tree that is smaller than or equal to `queries[i]`. If a such value does not exist, add `-1` instead.
- `max_i` is the **smallest** value in the tree that is greater than or equal to `queries[i]`. If a such value does not exist, add `-1` instead.

Return *the array* `answer`.

**Constraints:**
- The number of nodes in the tree is in the range `[2, 10^5]`.
- `1 <= Node.val <= 10^6`
- `n == queries.length`
- `1 <= n <= 10^5`
- `1 <= queries[i] <= 10^6`

---

## 2. Examples

```
Example 1:
  Input: root = [6,2,13,1,4,9,15,null,null,null,null,null,null,14], queries = [2,5,16]
  Output: [[2,2],[4,6],[15,-1]]
  Explanation: We answer the queries in the following way:
  - The largest number that is smaller or equal than 2 in the tree is 2, and the smallest number that is greater or equal than 2 is still 2. So the answer for the first query is [2,2].
  - The largest number that is smaller or equal than 5 in the tree is 4, and the smallest number that is greater or equal than 5 is 6. So the answer for the second query is [4,6].
  - The largest number that is smaller or equal than 16 in the tree is 15, and the smallest number that is greater or equal than 16 does not exist. So the answer for the third query is [15,-1].
```

```
Example 2:
  Input: root = [4,null,9], queries = [3]
  Output: [[-1,4]]
  Explanation: The largest number that is smaller or equal to 3 in the tree does not exist, and the smallest number that is greater or equal to 3 is 4. So the answer for the query is [-1,4].
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
