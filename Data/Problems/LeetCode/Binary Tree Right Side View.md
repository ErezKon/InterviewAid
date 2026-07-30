# 199. Binary Tree Right Side View

**Difficulty:** 🟡 Medium
**Acceptance:** 65.0%
**LeetCode:** [https://leetcode.com/problems/binary-tree-right-side-view](https://leetcode.com/problems/binary-tree-right-side-view)
**Companies:** Accenture, Amazon, Apple, Bloomberg, Google, Meta, Microsoft, Oracle, Servicenow, Tiktok, Uber, Visa, Walmart Labs, Wix, Yandex

---

## 1. Problem Description

Given the root of a binary tree, return the values visible from the right side (last node at each level).

---

## 2. Examples

**Example 1:**
```
Input: root = [1,2,3,null,5,null,4]
Output: [1,3,4]
Explanation: The rightmost nodes at each depth are 1, 3, and 4.
```

**Example 2:**
```
Input: root = [1,null,2]
Output: [1,2]
```

---

## 3. Approach: BFS Level Order — O(n) ✅

```
FUNCTION rightSideView(root):
    IF root IS null: RETURN []
    result = []
    queue = [root]

    WHILE queue NOT EMPTY:
        levelSize = queue.SIZE()
        FOR i ← 0 TO levelSize - 1:
            node = queue.DEQUEUE()
            IF i == levelSize - 1:
                result.ADD(node.val)    // rightmost node
            IF node.left: queue.ENQUEUE(node.left)
            IF node.right: queue.ENQUEUE(node.right)
    RETURN result
```

---

## 4. Walkthrough

| Step | Queue before iteration | Processed node | Action | Result list |
|------|------------------------|----------------|--------|-------------|
| 1 | [1] | 1 (i=0, levelSize=1) | i == levelSize‑1 → add 1 | [1] |
| 2 | [2,3] | 2 (i=0) | enqueue children (none) | [1] |
|   |      | 3 (i=1) | i == levelSize‑1 → add 3; enqueue 4 | [1,3] |
| 3 | [4] | 4 (i=0) | i == levelSize‑1 → add 4 | [1,3,4] |

---

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(n) – each node visited once | O(w) – queue holds at most width of tree |

---

## 6. Follow-Up Questions

* How would you modify the algorithm to return the left‑side view?
* Can you solve it using DFS instead of BFS?
* What if the tree is extremely deep – how would you avoid stack overflow?

---

## Key Takeaway

> BFS level order, capture the last node of each level. A DFS that visits right children first can achieve the same result.
