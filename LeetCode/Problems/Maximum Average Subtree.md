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

Given a binary tree, find the subtree with the **maximum average value** (sum / count of nodes).

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

| Tree | Maximum Average |
|------|-----------------|
| `[[5],[1,8]]` | 6.5 |
| `[[1],[2,3],[4,null,null,5]]` | 4 |

*Explanation*: In the first tree, the subtree rooted at node 8 has average 8, but the whole tree average is (5+1+8)/3 ≈ 4.67, so the maximum is 8.

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
