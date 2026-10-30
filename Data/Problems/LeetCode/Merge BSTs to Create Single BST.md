# 1932. Merge BSTs to Create Single BST

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/merge-bsts-to-create-single-bst](https://leetcode.com/problems/merge-bsts-to-create-single-bst)
**Companies:** Amazon, Bloomberg, Google, Microsoft

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given `n` **BST (binary search tree) root nodes** for `n` separate BSTs stored in an array `trees` (**0-indexed**). Each BST in `trees` has **at most 3 nodes**, and no two roots have the same value. In one operation, you can:

- Select two **distinct** indices `i` and `j` such that the value stored at one of the **leaves** of `trees[i]` is equal to the **root value** of `trees[j]`.
- Replace the leaf node in `trees[i]` with `trees[j]`.
- Remove `trees[j]` from `trees`.

Return *the **root** of the resulting BST if it is possible to form a valid BST after performing* `n - 1` *operations, or* `null` *if it is impossible to create a valid BST*.

A BST (binary search tree) is a binary tree where each node satisfies the following property:

- Every node in the node's left subtree has a value **strictly less** than the node's value.
- Every node in the node's right subtree has a value **strictly greater** than the node's value.

A leaf is a node that has no children.

**Constraints:**
- `n == trees.length`
- `1 ≤ n ≤ 5 × 10⁴`
- The number of nodes in each tree is in the range `[1, 3]`.
- Each node in the input may have children but no grandchildren.
- No two roots of `trees` have the same value.
- All the trees in the input are **valid BSTs**.
- `1 ≤ TreeNode.val ≤ 5 × 10⁴`.

---

## Examples

```
Example 1:
  Input: trees = [[2,1],[3,2,5],[5,4]]
  Output: [3,2,5,1,null,4]
  Explanation:
  In the first operation, pick i=1 and j=0, and merge trees[0] into trees[1].
  Delete trees[0], so trees = [[3,2,5,1],[5,4]].
  In the second operation, pick i=0 and j=1, and merge trees[1] into trees[0].
  Delete trees[1], so trees = [[3,2,5,1,null,4]].
  The resulting tree is a valid BST, so return its root.

         2       3       5              3
        /       / \     /              / \
       1       2   5   4     ──►      2   5
                                     /   /
                                    1   4
```

```
Example 2:
  Input: trees = [[5,3,8],[3,2,6]]
  Output: []
  Explanation:
  Pick i=0 and j=1 and merge trees[1] into trees[0].
  Delete trees[1], so trees = [[5,3,8,2,6]].
  This is the only valid operation that can be performed, but the resulting tree is not a valid BST, so return null.
```

```
Example 3:
  Input: trees = [[5,4],[3]]
  Output: []
  Explanation: It is impossible to perform any operations.
```

---

## Key Insight

> 1. Map each root value to its tree.
> 2. The **final root** is the tree whose root value is NOT a leaf in any other tree.
> 3. DFS from the root: whenever a leaf matches another tree's root value, graft that tree in.
> 4. After merging, validate that the result is a valid BST.

---

## Approach

```
FUNCTION canMerge(trees):
    rootMap ← MAP(tree.val → tree) FOR each tree IN trees
    leafCount ← COUNT occurrences of each leaf value across all trees
    
    // Find the root: value that appears as a root but NOT as a leaf
    root ← NULL
    FOR tree IN trees DO
        IF tree.val NOT IN leafCount THEN
            root ← tree
            BREAK
    IF root = NULL THEN RETURN NULL
    
    // DFS: graft trees at matching leaves
    FUNCTION graft(node):
        IF node = NULL THEN RETURN
        IF node.left AND node.left.val IN rootMap AND node.left is leaf THEN
            node.left ← rootMap.REMOVE(node.left.val)
        IF node.right AND node.right.val IN rootMap AND node.right is leaf THEN
            node.right ← rootMap.REMOVE(node.right.val)
        graft(node.left)
        graft(node.right)
    
    graft(root)
    
    // All trees must be consumed
    IF rootMap.SIZE ≠ 1 THEN RETURN NULL
    
    // Validate BST
    IF isValidBST(root) THEN RETURN root
    RETURN NULL
```

---

## Walkthrough

```
trees = [2→(1), 3→(2,5), 5→(4)]
rootMap = {2: tree1, 3: tree2, 5: tree3}
leafCount = {1:1, 2:1, 5:1, 4:1}

Root = 3 (not a leaf anywhere)

Graft from tree rooted at 3:
  Left child = 2 (leaf, matches rootMap[2]) → replace with tree1 (2→1)
  Right child = 5 (leaf, matches rootMap[5]) → replace with tree3 (5→4)

Result:    3
          / \
         2   5
        /   /
       1   4

rootMap = {3: ...} (only root remains) ✅
Validate BST: 1 < 2 < 3 < 4 < 5 ✅

Return root ✅
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Map + DFS + BST validation | **O(n)** | **O(n)** |

---

## Follow-Up Questions

1. **Why check leafCount?** A root that's also a leaf of another tree should be grafted, not be the final root.
2. **Why validate BST at the end?** Grafting doesn't guarantee BST property — two trees might have compatible roots but incompatible subtree ranges.
3. **What if multiple roots are not leaves?** Then we can't merge into a single BST — return null.

---

## Key Takeaway

> **Tree merging = map roots, find the true root, graft at leaves, then validate.** The key challenge is identifying the correct root and ensuring BST validity after grafting.

---
