# 654. Maximum Binary Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-binary-tree](https://leetcode.com/problems/maximum-binary-tree)
**Companies:** Google, Meta, Microsoft

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Divide & Conquer — O(n²) avg O(n log n)](#approach-divide--conquer--on²-avg-on-log-n-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an integer array `nums` with no duplicates, build a **maximum binary tree**:
1. Root is the maximum element.
2. Left subtree is built from elements left of the max.
3. Right subtree is built from elements right of the max.

---

## Examples

**Example 1:**
```
Input:  nums = [3,2,1,6,0,5]
Output: [6,3,5,null,2,0,null,null,1]
         6
        / \
       3   5
        \  /
         2 0
          \
           1
```

---

## Key Insight

> Recursively find the max, split, and build subtrees. This is a divide-and-conquer approach analogous to building a Cartesian tree.

---

## Approach: Divide & Conquer — O(n²) avg O(n log n) ✅

```
FUNCTION constructMaximumBinaryTree(nums):
    IF NOT nums: RETURN null
    maxIdx = nums.index(MAX(nums))
    node = TreeNode(nums[maxIdx])
    node.left = constructMaximumBinaryTree(nums[:maxIdx])
    node.right = constructMaximumBinaryTree(nums[maxIdx+1:])
    RETURN node
```

**Note:** Can be optimized to O(n) using a monotonic stack to build the Cartesian tree.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Divide & Conquer | **O(n²)** worst, O(n log n) avg | O(n) |
| Monotonic Stack | **O(n)** | O(n) |

---

## Key Takeaway

> **Maximum Binary Tree = Cartesian Tree.** Simple recursive D&C finds max and splits. For O(n), use a monotonic decreasing stack.
