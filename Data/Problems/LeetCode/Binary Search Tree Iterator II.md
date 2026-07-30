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

## 4. Examples

**Example 1:**
```
Input: BST = [7,3,15,null,null,9,20], operations = ["next","next","prev","next","hasPrev"]
Output: [3,7,3,7,true]
Explanation:
- After init, iterator points before the smallest element.
- next() → 3, next() → 7, prev() → 3, next() → 7, hasPrev() → true.
```

**Example 2:**
```
Input: BST = [5,3,6,2,4,null,null,1], operations = ["next","next","next","prev","prev","hasPrev"]
Output: [1,2,3,2,1,false]
```

---

## 5. Walkthrough

| Step | Operation | idx | Returned Value |
|------|-----------|-----|----------------|
| 1 | init | -1 | - |
| 2 | next() | 0 | 1 |
| 3 | next() | 1 | 2 |
| 4 | next() | 2 | 3 |
| 5 | prev() | 1 | 2 |
| 6 | prev() | 0 | 1 |
| 7 | hasPrev() | 0 | false |

The table shows how the pointer moves through the flattened sorted list `[1,2,3,4,5,6,7]`.

---

## 6. Complexity Analysis

- **Time:** O(n) to build the inorder list during initialization; each `next`, `prev`, `hasNext`, `hasPrev` runs in O(1).
- **Space:** O(n) to store the sorted values.

---

## 7. Follow-Up Questions

- How would you implement the iterator with O(h) space using a controlled stack instead of flattening the entire tree?
- Can you support `remove()` operation to delete the current node?
- How does the design change for a self‑balancing BST like AVL or Red‑Black tree?

---

## Key Takeaway

> For bidirectional BST iteration, the simplest approach is to flatten to a sorted array. For lazy evaluation, use a stack + cached list that grows on demand.
