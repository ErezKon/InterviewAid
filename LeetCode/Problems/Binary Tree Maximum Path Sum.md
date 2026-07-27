
# 124. Binary Tree Maximum Path Sum

**Difficulty:** 🔴 Hard
**Acceptance:** 41.2%
**LeetCode:** [https://leetcode.com/problems/binary-tree-maximum-path-sum](https://leetcode.com/problems/binary-tree-maximum-path-sum)
**Companies:** Adobe, Amazon, Apple, Baidu, Bloomberg, Citadel, Datadog, Doordash, Flipkart, Goldman Sachs, Google, Meta, Microsoft, Nutanix, Oracle, Paypal, Salesforce, Snapchat, Tcs, Tiktok, Uber, Wix, Yandex

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Solution: DFS — O(n) ✅](#4-solution-dfs--on-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)

---

## 1. Problem Description

Given the `root` of a binary tree, return the **maximum path sum** of any non-empty path.

A **path** is a sequence of nodes where each pair of adjacent nodes has an edge. A node can only appear **at most once** in the path. The path does **not** need to pass through the root.

---

## 2. Examples

```
Example 1:
      1
     / \
    2   3
  Output: 6 (path: 2 → 1 → 3)

Example 2:
     -10
     /  \
    9    20
        /  \
       15   7
  Output: 42 (path: 15 → 20 → 7)
```

---

## 3. Key Insight

At each node, we consider two things:

1. **Path through this node** (for the global answer): The best path that **includes this node as the turning point** (connecting left and right subtrees).
   ```
   pathSum = node.val + MAX(0, leftGain) + MAX(0, rightGain)
   ```

2. **Path extending upward** (for the recursive return): The best path that starts at this node and goes **down to one child only** (because a path can't fork when extending upward).
   ```
   returnValue = node.val + MAX(0, MAX(leftGain, rightGain))
   ```

---

## 4. Solution: DFS — O(n) ✅

```
FUNCTION maxPathSum(root):
    maxSum = -INFINITY

    FUNCTION dfs(node):
        IF node IS NULL:
            RETURN 0

        // Max gain from left and right subtrees (ignore negative gains)
        leftGain  = MAX(0, dfs(node.left))
        rightGain = MAX(0, dfs(node.right))

        // Path through this node as the "root" of the path
        pathSum = node.val + leftGain + rightGain
        maxSum  = MAX(maxSum, pathSum)

        // Return max gain extending to one side only
        RETURN node.val + MAX(leftGain, rightGain)

    dfs(root)
    RETURN maxSum
```

### Why MAX(0, ...)?

If a subtree's gain is negative, we're better off not including it at all. A negative contribution can only reduce the total.

---

## 5. Walkthrough

```
Tree:
     -10
     /  \
    9    20
        /  \
       15   7

dfs(9):   left=0, right=0
          pathSum = 9+0+0 = 9    → maxSum = 9
          return 9

dfs(15):  left=0, right=0
          pathSum = 15           → maxSum = 15
          return 15

dfs(7):   left=0, right=0
          pathSum = 7            → maxSum = 15
          return 7

dfs(20):  leftGain=15, rightGain=7
          pathSum = 20+15+7 = 42 → maxSum = 42  ★
          return 20 + MAX(15,7) = 35

dfs(-10): leftGain=MAX(0,9)=9, rightGain=MAX(0,35)=35
          pathSum = -10+9+35 = 34 → maxSum = 42
          return -10 + MAX(9,35) = 25

Result: 42 ✅ (path: 15 → 20 → 7)
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) — visit every node once |
| **Space** | O(h) — recursion stack depth |

---

## 7. Follow-Up Questions

### 7.1 What if the path must go through the root?

Simply compute `root.val + maxGainLeft + maxGainRight` without the global maximum tracking.

### 7.2 Diameter of Binary Tree (LeetCode #543)

Same structure! Instead of tracking sum, track path length (number of edges):

```
FUNCTION diameterOfBinaryTree(root):
    maxDiameter = 0

    FUNCTION dfs(node):
        IF node IS NULL: RETURN 0
        leftDepth  = dfs(node.left)
        rightDepth = dfs(node.right)
        maxDiameter = MAX(maxDiameter, leftDepth + rightDepth)
        RETURN 1 + MAX(leftDepth, rightDepth)

    dfs(root)
    RETURN maxDiameter
```

### 7.3 Path Sum (LeetCode #112) — Does a root-to-leaf path with target sum exist?

```
FUNCTION hasPathSum(root, target):
    IF root IS NULL: RETURN FALSE
    IF root IS LEAF AND root.val == target: RETURN TRUE
    RETURN hasPathSum(root.left, target - root.val) OR
           hasPathSum(root.right, target - root.val)
```

### 7.4 Path Sum III (LeetCode #437) — Count all paths summing to target

Any node to any descendant. Use **prefix sums** with a hash map:

```
FUNCTION pathSumIII(root, targetSum):
    prefixMap = {0: 1}
    count = 0

    FUNCTION dfs(node, currentSum):
        IF node IS NULL: RETURN
        currentSum += node.val
        count += prefixMap.GET(currentSum - targetSum, 0)
        prefixMap[currentSum] = prefixMap.GET(currentSum, 0) + 1

        dfs(node.left, currentSum)
        dfs(node.right, currentSum)

        prefixMap[currentSum] -= 1    // backtrack

    dfs(root, 0)
    RETURN count
```

---

## Key Takeaway

> The "two responsibilities" pattern — computing a **global optimum** while returning a **constrained value** to the parent — is the heart of many tree problems. The DFS function returns what the parent needs (single-branch gain), while updating a global variable with the full answer (both-branch path). This separation of concerns is elegant and reusable.
