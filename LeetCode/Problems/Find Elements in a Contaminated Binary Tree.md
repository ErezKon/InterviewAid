# 1261. Find Elements in a Contaminated Binary Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-elements-in-a-contaminated-binary-tree](https://leetcode.com/problems/find-elements-in-a-contaminated-binary-tree)
**Companies:** Amazon, Google

---

## Problem Description

A binary tree has all values set to -1. Recover values: root = 0, left child = 2*x+1, right child = 2*x+2. Support `find(target)` queries.

---

## Examples

**Example 1:**
```
Input: root = [-1,null,-1]
Operations: find(1) → true, find(2) → false
Explanation: After recovery, the tree values are [0,null,2].
```

**Example 2:**
```
Input: root = [-1,-1,-1,-1,-1]
Operations: find(3) → true, find(5) → false
Explanation: Recovered values are [0,1,2,3,4].
```

---

## Approach: DFS Recovery + HashSet — O(n) init, O(1) find ✅

```text
CLASS FindElements:
    INIT(root):
        self.values ← SET()
        FUNCTION dfs(node, val):
            IF node IS null: RETURN
            self.values.ADD(val)
            dfs(node.left, 2 * val + 1)
            dfs(node.right, 2 * val + 2)
        dfs(root, 0)

    FUNCTION find(target):
        RETURN target IN self.values
```

---

## Walkthrough

1. Start at root with value 0 and add to set.
2. Recursively assign left child `2*0+1 = 1` and right child `2*0+2 = 2`.
3. Continue DFS, populating all node values.
4. `find(3)` checks if 3 is in the set → true; `find(5)` → false.

---

## Complexity Analysis

- **Time:** O(n) to traverse the tree once during initialization; O(1) per `find` query.
- **Space:** O(n) for the hash set storing all node values.

---

## Follow-Up Questions

1. How would you modify the solution to support dynamic insertion of new nodes?
2. Can you achieve `find` in O(log n)` without extra space?
3. What if the tree is extremely deep—how would you avoid recursion stack overflow?

---

## Key Takeaway

> **DFS to recover all values using the parent-child formula. Store in a set for O(1) lookup.**