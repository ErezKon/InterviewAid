# 1586. Binary Search Tree Iterator II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/binary-search-tree-iterator-ii](https://leetcode.com/problems/binary-search-tree-iterator-ii)
**Companies:** Meta

---

## 1. Problem Description

Implement a BST iterator that supports `next()`, `prev()`, and `hasNext()`/`hasPrev()`. The iterator should allow bidirectional traversal of the BST in sorted order.

---

## 2. Key Insight

> Flatten the BST into a sorted list via inorder traversal, then use an index pointer to navigate forward and backward.

---

## 3. Approach: Inorder List + Pointer — O(n) init ✅

```
CLASS BSTIterator:
    INIT(root):
        self.sorted = inorder(root)  // flatten to sorted list
        self.idx = -1  // pointer before first element
    
    FUNCTION hasNext(): RETURN self.idx < len(self.sorted) - 1
    FUNCTION hasPrev(): RETURN self.idx > 0
    
    FUNCTION next():
        self.idx += 1
        RETURN self.sorted[self.idx]
    
    FUNCTION prev():
        self.idx -= 1
        RETURN self.sorted[self.idx]
```

| Operation | Time |
|-----------|------|
| Init | O(n) |
| next/prev | O(1) |
| Space | O(n) |

---

## Key Takeaway

> For bidirectional BST iteration, the simplest approach is to flatten to a sorted array. For lazy evaluation, use a stack + cached list that grows on demand.
