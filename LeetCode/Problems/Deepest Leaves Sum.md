# 1302. Deepest Leaves Sum

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/deepest-leaves-sum](https://leetcode.com/problems/deepest-leaves-sum)
**Companies:** Amazon, Google, Myntra, Tiktok

---

## Problem Description

Return the sum of values of the deepest leaves in a binary tree.

---

## Examples

**Example 1:**
```
Input: root = [1,2,3,4,5,null,6,7,null,null,null,null,8]
Output: 15
Explanation: The deepest leaves are nodes with values 7 and 8. Their sum is 7 + 8 = 15.
```

**Example 2:**
```
Input: root = [6,7,8,2,7,1,3,9,null,1,4,null,null,null,5]
Output: 19
Explanation: The deepest level contains nodes 9, 1, 4, and 5. Their sum is 9+1+4+5 = 19.
```

---

## Approach

```
FUNCTION deepestLeavesSum(root):
    queue ← [root]
    WHILE queue IS NOT EMPTY:
        levelSum ← 0
        nextQueue ← []
        FOR node IN queue:
            levelSum ← levelSum + node.val
            IF node.left IS NOT NULL: APPEND node.left TO nextQueue
            IF node.right IS NOT NULL: APPEND node.right TO nextQueue
        queue ← nextQueue
    RETURN levelSum
```

---

## Walkthrough

**Example 1:** Tree levels
- Level 0: [1] → sum = 1
- Level 1: [2,3] → sum = 5
- Level 2: [4,5,6] → sum = 15
- Level 3: [7,8] → sum = 15 (deepest)
The algorithm overwrites `levelSum` each iteration; after the final level it holds 15, which is returned.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) – each node visited once |
| **Space** | O(n) – BFS queue may hold a full level of nodes |

---

## Follow-Up Questions

- How would you solve the problem using depth‑first search instead of BFS?
- Can you compute the sum in a single recursive pass without storing an entire level?
- How would you modify the algorithm to also return the list of deepest leaf values?

---

## Key Takeaway

> **BFS level‑by‑level: compute sum at each level, the last computed sum corresponds to the deepest leaves.**