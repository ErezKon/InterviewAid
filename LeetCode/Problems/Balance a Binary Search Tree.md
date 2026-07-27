# 1382. Balance a Binary Search Tree

**Difficulty:** 🟡 Medium
**LeetCode:** https://leetcode.com/problems/balance-a-binary-search-tree
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft
---

## Problem Description
Given the root of a binary search tree (BST), rebalance it so that the depth of the tree is minimal. Return the root of a height‑balanced BST containing the same node values.

## Examples
**Example 1**
```
Input: root = [1,null,2,null,3,null,4,null,5]
Output: [3,2,4,1,null,null,5]
Explanation: The original tree is a right‑skewed chain. Rebalancing yields a balanced BST with root 3.
```
**Example 2**
```
Input: root = [2,1,3]
Output: [2,1,3]
Explanation: The tree is already balanced.
```

## Approach
1. Perform an in‑order traversal to collect nodes in a sorted list.
2. Build a balanced BST recursively by selecting the middle element as the root of each subtree.

```text
FUNCTION balanceBST(root):
    nodes ← []
    // In‑order traversal to fill nodes in ascending order
    FUNCTION inorder(node):
        IF node == NULL: RETURN
        inorder(node.left)
        APPEND node TO nodes
        inorder(node.right)
    END FUNCTION
    inorder(root)

    // Build balanced tree from sorted nodes
    FUNCTION build(lo, hi):
        IF lo > hi: RETURN NULL
        mid ← (lo + hi) DIV 2
        node ← nodes[mid]
        node.left ← build(lo, mid-1)
        node.right ← build(mid+1, hi)
        RETURN node
    END FUNCTION
    RETURN build(0, LENGTH(nodes)-1)
```

## Walkthrough
For the chain `[1,null,2,null,3,null,4,null,5]`:
- In‑order yields nodes `[1,2,3,4,5]`.
- `build(0,4)` picks mid=2 → node 3 as root.
- Left subtree `build(0,1)` picks mid=0 → node 1, then its right child node 2.
- Right subtree `build(3,4)` picks mid=3 → node 4 with right child node 5.
Resulting tree is balanced.

## Complexity Analysis
*Time*: O(n) – one traversal and one recursive build.
*Space*: O(n) – list of nodes; recursion depth O(log n).

## Follow‑Up Questions
1. How would you balance the tree iteratively without extra storage?
2. Can you perform the rebalancing in‑place by modifying pointers only?
3. What if the input tree is not a BST – how would you approach balancing?

## Key Takeaway
Collecting nodes via in‑order traversal gives a sorted sequence, from which a perfectly balanced BST can be constructed by repeatedly choosing middle elements.
