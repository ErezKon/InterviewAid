# 250. Count Univalue Subtrees

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-univalue-subtrees](https://leetcode.com/problems/count-univalue-subtrees)
**Companies:** 6Sense, Amazon, Bloomberg, Google, Zeta

---

## Problem Description

Count the number of **uni-value subtrees** — subtrees where all nodes have the same value.

---

## Key Insight

Post-order traversal: a subtree is uni-value if both children are uni-value AND both children's values equal the root's value. Null children count as uni-value.

---

## Approach

```
FUNCTION countUnivalSubtrees(root):
    count = 0

    FUNCTION isUni(node):
        IF node == null: RETURN true
        l = isUni(node.left)
        r = isUni(node.right)
        IF NOT l OR NOT r: RETURN false
        IF node.left AND node.left.val != node.val: RETURN false
        IF node.right AND node.right.val != node.val: RETURN false
        count += 1
        RETURN true

    isUni(root)
    RETURN count
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) — visit each node once |
| **Space** | O(h) — recursion stack |

---

## Key Takeaway

> **Post-order DFS with boolean return: a subtree is uni-value iff both subtrees are uni-value and share the same value as the root. Don't short-circuit — evaluate both sides to get accurate results.**
