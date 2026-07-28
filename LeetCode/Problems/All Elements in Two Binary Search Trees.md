# 1305. All Elements in Two Binary Search Trees

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/all-elements-in-two-binary-search-trees](https://leetcode.com/problems/all-elements-in-two-binary-search-trees)
**Companies:** Amazon, Meta

---

## 1. Problem Description

Given two binary search trees `root1` and `root2`, return a **sorted** list containing all node values from both trees.

---

## 2. Examples

**Example 1**
```
Input: root1 = [2,1,4], root2 = [1,0,3]
Output: [0,1,1,2,3,4]
```

**Example 2**
```
Input: root1 = [], root2 = [5,1,7,0,2]
Output: [0,1,2,5,7]
```

---

## 3. Approach: Inorder + Merge ✅

```text
FUNCTION getAllElements(root1, root2):
    list1 ← inorder(root1)    // sorted list from first BST
    list2 ← inorder(root2)    // sorted list from second BST
    RETURN merge(list1, list2)

FUNCTION inorder(node):
    IF node IS NULL: RETURN []
    RETURN inorder(node.left) + [node.val] + inorder(node.right)

FUNCTION merge(a, b):
    i ← 0; j ← 0; result ← []
    WHILE i < len(a) AND j < len(b):
        IF a[i] ≤ b[j]:
            APPEND a[i] TO result; i ← i + 1
        ELSE:
            APPEND b[j] TO result; j ← j + 1
    WHILE i < len(a): APPEND a[i] TO result; i ← i + 1
    WHILE j < len(b): APPEND b[j] TO result; j ← j + 1
    RETURN result
```

---

## 4. Walkthrough

| Step | Action |
|------|--------|
| 1 | Perform an inorder traversal on `root1` to obtain `list1` (sorted). |
| 2 | Perform an inorder traversal on `root2` to obtain `list2` (sorted). |
| 3 | Merge `list1` and `list2` using the two‑pointer technique, always taking the smaller current element. |
| 4 | The merged list is the final sorted collection of all node values. |

---

## 5. Complexity Analysis

- **Time:** O(n + m) – each node is visited once and the merge scans both lists once.
- **Space:** O(n + m) – storing the two inorder lists (or O(h₁+h₂) if done iteratively with stacks).

---

## 6. Follow-Up Questions

1. How would you modify the algorithm to use O(h₁+h₂) extra space by traversing both trees lazily? |
2. Can you solve the problem without storing the full inorder lists, outputting values on the fly? |
3. How would the solution change if the trees were not BSTs?

---

## Key Takeaway

> Inorder traversal yields a sorted list for a BST. Merging two sorted lists gives the combined sorted output in linear time.
