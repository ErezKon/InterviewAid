# 2236. Root Equals Sum of Children

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/root-equals-sum-of-children](https://leetcode.com/problems/root-equals-sum-of-children)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description

You are given the `root` of a **binary tree** that consists of exactly `3` nodes: the root, its left child, and its right child.

Return `true` *if the value of the root is equal to the **sum** of the values of its two children, or* `false` *otherwise*.

**Constraints:**
- The tree consists only of the root, its left child, and its right child.
- `-100 <= Node.val <= 100`

---

## Approach

```
FUNCTION checkTree(root):
    RETURN root.val == root.left.val + root.right.val
```

---

## Examples

**Example 1:**
```
Input: root = [10,4,6]
Output: true
Explanation: The values of the root, its left child, and its right child are 10, 4, and 6, respectively.
10 is equal to 4 + 6, so we return true.
```

**Example 2:**
```
Input: root = [5,3,1]
Output: false
Explanation: The values of the root, its left child, and its right child are 5, 3, and 1, respectively.
5 is not equal to 3 + 1, so we return false.
```

---

## Walkthrough

1. Access `root.val`, `root.left.val`, and `root.right.val`.
2. Compute the sum of the two children values.
3. Compare the sum with `root.val` and return the boolean result.

---

## Complexity Analysis

| Time | Space |
|------|-------|
| O(1) | O(1) |

---

## Follow-Up Questions

* How would you modify the solution for a tree with more than two children per node?
* Can this check be performed iteratively without recursion for a larger tree?

---

## Key Takeaway

The problem reduces to a single equality check between the root value and the sum of its two children, requiring constant time and space.
