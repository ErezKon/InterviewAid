# 230. Kth Smallest Element in a BST

**Difficulty:** 🟡 Medium
**Acceptance:** 74.0%
**LeetCode:** [https://leetcode.com/problems/kth-smallest-element-in-a-bst](https://leetcode.com/problems/kth-smallest-element-in-a-bst)
**Companies:** Amazon, Bloomberg, Cisco, Expedia, Google, Linkedin, Meta, Microsoft, Oracle, Tiktok, Uber

---

## 1. Problem Description

Given the root of a BST and integer `k`, return the kth smallest value.

---

## 2. Approach: Inorder Traversal — O(H+k) ✅

BST inorder = sorted order. Stop at the kth element.

```
FUNCTION kthSmallest(root, k):
    stack = []
    curr = root

    WHILE curr OR stack:
        WHILE curr:
            stack.PUSH(curr)
            curr = curr.left

        curr = stack.POP()
        k -= 1
        IF k == 0: RETURN curr.val
        curr = curr.right
```

| Time | Space |
|------|-------|
| O(H + k) | O(H) |

---

## Follow-Up: Frequent queries with modifications?

Augment BST nodes with left subtree size. Finding kth element becomes O(H). On insert/delete, update counts along the path.

---

## Key Takeaway

> Iterative inorder traversal with early termination at k. The stack-based approach avoids full traversal.
