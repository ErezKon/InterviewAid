# 250. Count Univalue Subtrees

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-univalue-subtrees](https://leetcode.com/problems/count-univalue-subtrees)
**Companies:** 6Sense, Amazon, Bloomberg, Google, Zeta

---

## Problem Description

Given the `root` of a binary tree, return *the number of **uni-value** subtrees*.

A **uni-value subtree** means all nodes of the subtree have the same value.

**Constraints:**
- The number of the node in the tree will be in the range `[0, 1000]`.
- `-1000 <= Node.val <= 1000`

---

## Examples

```
Example 1:
  Input: root = [5,1,5,5,5,null,5]
  Output: 4
  Explanation: The uni-value subtrees are the three leaves with value 5 and the right subtree [5,null,5].
```

```
Example 2:
  Input: root = []
  Output: 0
```

```
Example 3:
  Input: root = [5,5,5,5,5,null,5]
  Output: 6
```

---

## Approach

```
FUNCTION countUnivalSubtrees(root):
    SET count ← 0

    FUNCTION isUni(node):
        IF node == null: RETURN true
        SET leftUni ← isUni(node.left)
        SET rightUni ← isUni(node.right)
        IF NOT leftUni OR NOT rightUni: RETURN false
        IF node.left AND node.left.val != node.val: RETURN false
        IF node.right AND node.right.val != node.val: RETURN false
        SET count ← count + 1
        RETURN true

    isUni(root)
    RETURN count
```

---

## Walkthrough

Consider **Example 1** (`root = [5,1,5,5,5,null,5]`).

| Node | Left Child Uni? | Right Child Uni? | Same Value as Children? | Subtree Count Increment |
|------|-----------------|------------------|--------------------------|------------------------|
| 5 (leaf) | true | true | N/A | +1 |
| 1 (leaf) | true | true | N/A | +1 |
| 5 (leaf) | true | true | N/A | +1 |
| 5 (leaf) | true | true | N/A | +1 |
| null | true | true | N/A | 0 |
| 5 (right child of root) | true (left leaf) | true (right leaf) | values match root (5) | +1 |
| 5 (root) | false (left subtree not uni) | true (right subtree uni) | left mismatch prevents root uni | 0 |

Total uni-value subtrees counted: **4**.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) — visit each node once |
| **Space** | O(h) — recursion stack |

---

## Follow-Up Questions

1. How would you modify the algorithm to return the list of roots of all uni-value subtrees?
2. Can you count uni-value subtrees in a binary tree without recursion (iterative post-order)?
3. How would the solution change if the tree were an n-ary tree instead of binary?

---

## Key Takeaway

> **Post-order DFS with boolean return: a subtree is uni-value iff both subtrees are uni-value and share the same value as the root. Don't short-circuit — evaluate both sides to get accurate results.**