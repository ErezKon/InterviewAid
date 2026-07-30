# 230. Kth Smallest Element in a BST

**Difficulty:** 🟡 Medium
**Acceptance:** 74.0%
**LeetCode:** [https://leetcode.com/problems/kth-smallest-element-in-a-bst](https://leetcode.com/problems/kth-smallest-element-in-a-bst)
**Companies:** Amazon, Bloomberg, Cisco, Expedia, Google, Linkedin, Meta, Microsoft, Oracle, Tiktok, Uber

---

## 1. Problem Description

Given the root of a Binary Search Tree (BST) and an integer `k`, return the k‑th smallest value in the BST.

---

## 2. Approach: Inorder Traversal — O(H+k) ✅

BST inorder = sorted order. Stop at the k‑th element.

```text
FUNCTION kthSmallest(root, k):
    stack ← []
    curr ← root
    WHILE curr IS NOT NULL OR stack IS NOT EMPTY:
        WHILE curr IS NOT NULL:
            stack.PUSH(curr)
            curr ← curr.left
        curr ← stack.POP()
        k ← k - 1
        IF k = 0:
            RETURN curr.val
        curr ← curr.right
```

| Time | Space |
|------|-------|
| O(H + k) | O(H) |

---

## 3. Examples

| BST (inorder) | k | Output |
|---------------|---|--------|
| [1,2,3,4,5]   | 3 | 3 |
| [2,1,3]       | 2 | 2 |
| [5,3,6,2,4,null,null,1] | 4 | 4 |

*Explanation:* Inorder traversal of a BST yields sorted values; the k‑th element in that order is the answer.

---

## 4. Walkthrough

Consider BST `[3,1,4,null,2]`, `k = 1`.

1. **Push left chain:** push 3, then 1, then 2 (leftmost).
2. **Pop 2:** decrement k → 0, return 2 as the smallest.

---

## 5. Complexity Analysis

- **Time:** Each node is visited at most once until the k‑th is found → O(H + k).
- **Space:** Stack holds at most H nodes (height of tree) → O(H).

---

## 6. Follow-Up Questions

- How would you handle frequent insert/delete operations while still supporting O(log n) k‑th queries?
- Can you augment each node with the size of its left subtree to achieve O(log n) query time?
- What changes are needed if the tree is not a BST?

---

## 7. Key Takeaway

> Iterative inorder traversal with early termination at k. The stack‑based approach avoids a full traversal and runs in O(H + k) time.
