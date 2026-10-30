# 1120. Maximum Average Subtree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-average-subtree](https://leetcode.com/problems/maximum-average-subtree)
**Companies:** Amazon

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: DFS — O(n)](#approach-dfs--on-)
- [Examples](#examples)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

Given the `root` of a binary tree, return *the maximum **average** value of a **subtree** of that tree*. Answers within `10^-5` of the actual answer will be accepted.

A **subtree** of a tree is any node of that tree plus all its descendants.

The **average** value of a tree is the sum of its values, divided by the number of nodes.

**Constraints:**
- The number of nodes in the tree is in the range `[1, 10^4]`.
- `0 <= Node.val <= 10^5`

---

## Key Insight

> Post-order DFS returns `(sum, count)` for each subtree. At each node, compute average = sum / count and track the global maximum.

---

## Approach: DFS — O(n) ✅

```text
FUNCTION maximumAverageSubtree(root):
    maxAvg ← 0

    FUNCTION dfs(node):
        IF node IS NULL: RETURN (0, 0)
        leftSum, leftCnt ← dfs(node.left)
        rightSum, rightCnt ← dfs(node.right)
        totalSum ← leftSum + rightSum + node.val
        totalCnt ← leftCnt + rightCnt + 1
        avg ← totalSum / totalCnt
        maxAvg ← MAX(maxAvg, avg)
        RETURN (totalSum, totalCnt)

    dfs(root)
    RETURN maxAvg
```

---

## Examples

**Example 1:**
```
Input: root = [5,6,1]
Output: 6.00000
Explanation: For the node with value = 5 we have an average of (5 + 6 + 1) / 3 = 4.
For the node with value = 6 we have an average of 6 / 1 = 6.
For the node with value = 1 we have an average of 1 / 1 = 1.
So the answer is 6 which is the maximum.
```

**Example 2:**
```
Input: root = [0,null,1]
Output: 1.00000
```

---

## Walkthrough

Consider the tree `[[5],[1,8]]`.
1. DFS visits leaf 1 → returns (1,1).
2. DFS visits leaf 8 → returns (8,1).
3. At root 5: leftSum=1, leftCnt=1, rightSum=8, rightCnt=1 → totalSum=14, totalCnt=3, avg≈4.67.
4. Compare averages: 1, 8, 4.67 → maximum is 8.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| DFS | **O(n)** | O(h) |

---

## Key Takeaway

> **Post-order DFS returning (sum, count) pairs enables subtree average computation in O(n).** Classic tree aggregation pattern.
