# 559. Maximum Depth of N-ary Tree

**Difficulty:** 🟢 Easy
**Acceptance:** 73.0%
**LeetCode:** [https://leetcode.com/problems/maximum-depth-of-n-ary-tree](https://leetcode.com/problems/maximum-depth-of-n-ary-tree)
**Companies:** Amazon, Datadog

---

## 1. Problem Description

Given an N‑ary tree, return its maximum depth (the length of the longest root‑to‑leaf path).

---

## 2. Approach: DFS — O(n) ✅

```text
FUNCTION maxDepth(root):
    IF root = null:
        RETURN 0
    IF root.children IS EMPTY:
        RETURN 1
    maxChildDepth ← 0
    FOR child IN root.children:
        childDepth ← maxDepth(child)
        maxChildDepth ← MAX(maxChildDepth, childDepth)
    RETURN 1 + maxChildDepth
```

---

## Examples

**Example 1:**
```
Input: root = [1,null,2,3,4,null,5,6]
Output: 3
Explanation: The longest path is 1 → 3 → 6.
```

**Example 2:**
```
Input: root = [1]
Output: 1
Explanation: Single node tree has depth 1.
```

---

## Walkthrough

For the first example, the recursion explores each child:
| Node | Children Depths | Returned Depth |
|------|----------------|----------------|
| 5,6  | [] → 0         | 1 |
| 2,4  | [] → 0         | 1 |
| 3    | [5,6] → max(1,1)=1 | 2 |
| 1    | [2,3,4] → max(1,2,1)=2 | 3 |
The root aggregates the maximum child depth plus one.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| DFS | O(n) | O(h) where h is tree height |

---

## Follow-Up Questions
- How would you compute the minimum depth of an N‑ary tree?
- Can you solve it iteratively using a queue (BFS) instead of recursion?
- How does the solution change if the tree is represented as an adjacency list?

---

## Key Takeaway

> Generalization of binary tree max depth. Same recursion, iterate over all children instead of just left/right.
