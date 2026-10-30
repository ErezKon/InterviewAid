# 1586. Binary Search Tree Iterator II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/binary-search-tree-iterator-ii](https://leetcode.com/problems/binary-search-tree-iterator-ii)
**Companies:** Meta

---

## 1. Problem Description

Implement the `BSTIterator` class that represents an iterator over the **in-order traversal** of a binary search tree (BST):

- `BSTIterator(TreeNode root)` Initializes an object of the `BSTIterator` class. The `root` of the BST is given as part of the constructor. The pointer should be initialized to a non-existent number smaller than any element in the BST.
- `boolean hasNext()` Returns `true` if there exists a number in the traversal to the right of the pointer, otherwise returns `false`.
- `int next()` Moves the pointer to the right, then returns the number at the pointer.
- `boolean hasPrev()` Returns `true` if there exists a number in the traversal to the left of the pointer, otherwise returns `false`.
- `int prev()` Moves the pointer to the left, then returns the number at the pointer.

Notice that by initializing the pointer to a non-existent smallest number, the first call to `next()` will return the smallest element in the BST.

You may assume that `next()` and `prev()` calls will always be valid. That is, there will be at least a next/previous number in the in-order traversal when `next()`/`prev()` is called.

**Constraints:**
- The number of nodes in the tree is in the range `[1, 10⁵]`.
- `0 ≤ Node.val ≤ 10⁶`
- At most `10⁵` calls will be made to `hasNext`, `next`, `hasPrev`, and `prev`.

**Follow up:** Could you solve the problem without precalculating the values of the tree?

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

```
Example 1:
  Input
  ["BSTIterator", "next", "next", "prev", "next", "hasNext", "next", "next", "next", "hasNext", "hasPrev", "prev", "prev"]
  [[[7, 3, 15, null, null, 9, 20]], [null], [null], [null], [null], [null], [null], [null], [null], [null], [null], [null], [null]]
  Output
  [null, 3, 7, 3, 7, true, 9, 15, 20, false, true, 15, 9]

  Explanation
  // The element in [brackets] is where the pointer currently is.
  BSTIterator bSTIterator = new BSTIterator([7, 3, 15, null, null, 9, 20]); // state is   [3, 7, 9, 15, 20]
  bSTIterator.next(); // state becomes [[3], 7, 9, 15, 20], return 3
  bSTIterator.next(); // state becomes [3, [7], 9, 15, 20], return 7
  bSTIterator.prev(); // state becomes [[3], 7, 9, 15, 20], return 3
  bSTIterator.next(); // state becomes [3, [7], 9, 15, 20], return 7
  bSTIterator.hasNext(); // return true
  bSTIterator.next(); // state becomes [3, 7, [9], 15, 20], return 9
  bSTIterator.next(); // state becomes [3, 7, 9, [15], 20], return 15
  bSTIterator.next(); // state becomes [3, 7, 9, 15, [20]], return 20
  bSTIterator.hasNext(); // return false
  bSTIterator.hasPrev(); // return true
  bSTIterator.prev(); // state becomes [3, 7, 9, [15], 20], return 15
  bSTIterator.prev(); // state becomes [3, 7, [9], 15, 20], return 9
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
