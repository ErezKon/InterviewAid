# 1161. Maximum Level Sum of a Binary Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-level-sum-of-a-binary-tree](https://leetcode.com/problems/maximum-level-sum-of-a-binary-tree)
**Companies:** Amazon, Google, Meta, Microsoft

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

Given the `root` of a binary tree, return the **1-indexed level** with the **maximum sum** of node values. If there are ties, return the **smallest** level number.

**Constraints:**
- The number of nodes is in range `[1, 10^4]`
- `-10^5 <= Node.val <= 10^5`

---

## Examples

**Example 1:**
```
Input:  root = [1, 7, 0, 7, -8, null, null]
         1          ← Level 1, sum = 1
        / \
       7   0        ← Level 2, sum = 7
      / \
     7  -8          ← Level 3, sum = -1
Output: 2
Explanation: Level 2 has the maximum sum of 7.
```

**Example 2:**
```
Input:  root = [989, null, 10250, 98693, -89388, null, null, null, -32127]
Output: 2
```

---

## Key Insight

> Use **BFS (level-order traversal)** to compute the sum of each level. Track which level has the highest sum. BFS naturally processes one level at a time.

---

## Approach

```
FUNCTION maxLevelSum(root)
    queue ← [root]
    maxSum ← -INFINITY
    maxLevel ← 1
    level ← 1

    WHILE queue IS NOT EMPTY DO
        levelSum ← 0
        nextQueue ← []

        FOR each node IN queue DO
            levelSum ← levelSum + node.val
            IF node.left ≠ NULL THEN APPEND node.left TO nextQueue
            IF node.right ≠ NULL THEN APPEND node.right TO nextQueue

        IF levelSum > maxSum THEN
            maxSum ← levelSum
            maxLevel ← level

        queue ← nextQueue
        level ← level + 1

    RETURN maxLevel
END FUNCTION
```

---

## Walkthrough

```
Tree:      1
          / \
         7   0
        / \
       7  -8
```

| Level | Nodes   | Sum  | maxSum | maxLevel |
|-------|---------|------|--------|----------|
| 1     | [1]     | 1    | 1      | 1        |
| 2     | [7, 0]  | 7    | 7      | **2**    |
| 3     | [7, -8] | -1   | 7      | 2        |

**Result: 2** ✅

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(n)** — visit every node exactly once |
| Space  | **O(w)** — where w is the maximum width of the tree (queue size) |

---

## Follow-Up Questions

1. **Could you solve this with DFS instead of BFS?**
   Yes — use DFS with a level parameter and accumulate sums in a hash map or array indexed by level.

2. **What if we need the minimum level sum?**
   Same BFS, but track `minSum` and update with `<` instead of `>`.

3. **What if node values can be very large and overflow?**
   Use `long` type for the level sum accumulator.

4. **What if there are ties and we want all levels with max sum?**
   Store all levels in a list and filter those equal to `maxSum`.

---

## Key Takeaway

> **BFS level-order traversal** is the natural fit for any problem asking about per-level properties of a binary tree — sum, average, max, min, or width.
