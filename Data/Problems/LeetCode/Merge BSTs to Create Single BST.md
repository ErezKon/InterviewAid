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

Given `n` BSTs represented by their root nodes, merge them into a **single valid BST** if possible. You can replace any leaf node with another BST whose root value equals the leaf's value. Return the root of the merged BST, or `null` if it's impossible.

**Constraints:**
- `1 ≤ n ≤ 5 × 10⁴`
- Each tree has between 1 and 3 nodes
- No two roots have the same value
- All values are distinct across all trees

---

## Examples

**Example 1:**
```
Input:  trees = [[2,1], [3,2,5], [5,4]]
         2       3       5
        /       / \     /
       1       2   5   4
Output:     3
           / \
          2   5
         /   /
        1   4
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
