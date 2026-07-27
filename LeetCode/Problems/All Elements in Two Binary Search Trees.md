# 1305. All Elements in Two Binary Search Trees

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/all-elements-in-two-binary-search-trees](https://leetcode.com/problems/all-elements-in-two-binary-search-trees)
**Companies:** Amazon, Meta

---

## 1. Problem Description

Given two BSTs `root1` and `root2`, return a sorted list of **all** integers from both trees.

**Constraints:**
- Total nodes: up to 5000
- `-10⁵ ≤ Node.val ≤ 10⁵`

---

## 2. Key Insight

> In-order traversal of a BST produces a sorted list. Traverse both BSTs to get two sorted lists, then merge them — classic merge step from merge sort.

---

## 3. Approach: Inorder + Merge — O(n + m) ✅

```
FUNCTION getAllElements(root1, root2):
    list1 = inorder(root1)    // sorted
    list2 = inorder(root2)    // sorted
    RETURN merge(list1, list2)

FUNCTION inorder(node):
    IF node IS NULL: RETURN []
    RETURN inorder(node.left) + [node.val] + inorder(node.right)
```

**Optimization:** Use iterative in-order with stacks to avoid building full lists, yielding elements lazily during merge.

| Time | Space |
|------|-------|
| O(n + m) | O(n + m) |

---

## Key Takeaway

> BST in-order gives sorted output. Merging two sorted lists is O(n+m). This combines two fundamental operations: BST traversal and merge sort's merge step.
