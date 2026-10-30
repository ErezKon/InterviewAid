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

You are given an integer array `nums` with no duplicates. A **maximum binary tree** can be built recursively from `nums` using the following algorithm:

- Create a root node whose value is the maximum value in `nums`.
- Recursively build the left subtree on the **subarray prefix** to the **left** of the maximum value.
- Recursively build the right subtree on the **subarray suffix** to the **right** of the maximum value.

Return *the **maximum binary tree** built from *`nums`.

**Constraints:**
- `1 <= nums.length <= 1000`
- `0 <= nums[i] <= 1000`
- All integers in `nums` are **unique**.

---

## Examples

**Example 1:**
```
Input: nums = [3,2,1,6,0,5]
Output: [6,3,5,null,2,0,null,null,1]
Explanation: The recursive calls are as follow:
- The largest value in [3,2,1,6,0,5] is 6. Left prefix is [3,2,1] and right suffix is [0,5].
    - The largest value in [3,2,1] is 3. Left prefix is [] and right suffix is [2,1].
        - Empty array, so no child.
        - The largest value in [2,1] is 2. Left prefix is [] and right suffix is [1].
            - Empty array, so no child.
            - Only one element, so child is a node with value 1.
    - The largest value in [0,5] is 5. Left prefix is [0] and right suffix is [].
        - Only one element, so child is a node with value 0.
        - Empty array, so no child.
```

**Example 2:**
```
Input: nums = [3,2,1]
Output: [3,null,2,null,1]
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
