# 1367. Linked List in Binary Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/linked-list-in-binary-tree](https://leetcode.com/problems/linked-list-in-binary-tree)
**Companies:** Amazon, Bloomberg, Google, Meta, Soundhound

---

## 1. Problem Description

Given a binary tree `root` and a linked list with `head` as the first node.

Return True if all the elements in the linked list starting from the `head` correspond to some *downward path* connected in the binary tree otherwise return False.

In this context downward path means a path that starts at some node and goes downwards.

**Constraints:**
- The number of nodes in the tree will be in the range `[1, 2500]`.
- The number of nodes in the list will be in the range `[1, 100]`.
- `1 <= Node.val <= 100` for each node in the linked list and binary tree.

---

## 2. Examples

**Example 1:**
```
![img](https://assets.leetcode.com/uploads/2020/02/12/sample_1_1720.png)
Input: head = [4,2,8], root = [1,4,4,null,2,2,null,1,null,6,8,null,null,null,null,1,3]
Output: true
Explanation: Nodes in blue form a subpath in the binary Tree.
```

**Example 2:**
```
![img](https://assets.leetcode.com/uploads/2020/02/12/sample_2_1720.png)
Input: head = [1,4,2,6], root = [1,4,4,null,2,2,null,1,null,6,8,null,null,null,null,1,3]
Output: true
```

**Example 3:**
```
Input: head = [1,4,2,6,8], root = [1,4,4,null,2,2,null,1,null,6,8,null,null,null,null,1,3]
Output: false
Explanation: There is no path in the binary tree that contains all the elements of the linked list from head.
```

---

## 3. Approach

**Depth‑First Search (DFS) with two‑level recursion** – For each tree node, try to match the linked list starting there; if it fails, recurse on left and right children.

```text
FUNCTION isSubPath(head, root):
    IF root == null:
        RETURN false
    RETURN dfs(head, root) OR isSubPath(head, root.left) OR isSubPath(head, root.right)

FUNCTION dfs(listNode, treeNode):
    IF listNode == null:
        RETURN true
    IF treeNode == null:
        RETURN false
    IF listNode.val != treeNode.val:
        RETURN false
    RETURN dfs(listNode.next, treeNode.left) OR dfs(listNode.next, treeNode.right)
```

---

## 4. Walkthrough

Consider linked list `1 → 4 → 2` and the tree:

```
      1
     / \
    4   5
   / \
  2   3
```

| Step | treeNode.val | listNode.val | Action |
|------|--------------|--------------|--------|
| 1 | 1 (root) | 1 | values match, recurse on children |
| 2 | 4 (left child) | 4 | match, recurse |
| 3 | 2 (left‑left) | 2 | match, list exhausted → return true |

Thus `isSubPath` returns `true`.

---

## 5. Complexity Analysis

| Metric | Complexity |
|--------|------------|
| Time | O(n·m) – for each of the `n` tree nodes we may traverse up to `m` list nodes |
| Space | O(h₁ + h₂) – recursion depth of tree (`h₁`) and list (`h₂`) |

---

## 6. Follow‑Up Questions

1. How can you improve the time complexity using KMP preprocessing on the linked list?
2. What changes are needed if the path can go upwards as well as downwards?
3. How would you handle multiple queries on the same tree efficiently?

---

## Key Takeaway

> Two‑level DFS checks every possible starting point in the tree while matching the linked list along a downward path.
