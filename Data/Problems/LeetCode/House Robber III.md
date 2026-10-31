# 337. House Robber III

**Difficulty:** 🟡 Medium
**Acceptance:** 54.0%
**LeetCode:** [https://leetcode.com/problems/house-robber-iii](https://leetcode.com/problems/house-robber-iii)
**Companies:** Amazon, Bloomberg, Docusign, Google, Linkedin, Meta, Microsoft, Oyo, Phonepe, Salesforce, Sprinklr, Tiktok, Two Sigma, Uber, Zip

---

## 1. Problem Description

The thief has found himself a new place for his thievery again. There is only one entrance to this area, called `root`.

Besides the `root`, each house has one and only one parent house. After a tour, the smart thief realized that all houses in this place form a binary tree. It will automatically contact the police if **two directly-linked houses were broken into on the same night**.

Given the `root` of the binary tree, return *the maximum amount of money the thief can rob **without alerting the police***.

**Constraints:**
- The number of nodes in the tree is in the range `[1, 10^4]`.
- `0 <= Node.val <= 10^4`

---

## 2. Examples

**Example 1:**
```
Input: root = [3,2,3,null,3,null,1]
Output: 7
Explanation: Maximum amount of money the thief can rob = 3 + 3 + 1 = 7.
```

**Example 2:**
```
Input: root = [3,4,5,1,3,null,1]
Output: 9
Explanation: Maximum amount of money the thief can rob = 4 + 5 = 9.
```

---

## 2. Approach: DFS with Rob/Not-Rob — O(n) ✅

```
FUNCTION rob(root):
    (robRoot, skipRoot) = dfs(root)
    RETURN MAX(robRoot, skipRoot)

FUNCTION dfs(node):
    IF node == null: RETURN (0, 0)

    (robLeft, skipLeft) = dfs(node.left)
    (robRight, skipRight) = dfs(node.right)

    // Rob this node: can't rob children
    robNode = node.val + skipLeft + skipRight

    // Skip this node: take best of each child
    skipNode = MAX(robLeft, skipLeft) + MAX(robRight, skipRight)

    RETURN (robNode, skipNode)
```

---

## 3. Walkthrough

Consider the tree `[3,2,3,null,3,null,1]`.
| Node | robNode | skipNode |
|------|---------|----------|
| 3 (leaf) | 3 | 0 |
| 1 (leaf) | 1 | 0 |
| 3 (right) | 3 + 0 + 0 = 3 | max(1,0)+max(0,0)=1 |
| 2 (left) | 2 + 0 + 0 = 2 | max(3,0)+max(0,0)=3 |
| 3 (root) | 3 + 3 + 1 = 7 | max(2,3)+max(3,1)=6 |
Result = max(7,6) = 7.

---

## 4. Complexity Analysis

| Time | Space |
|------|-------|
| O(n) | O(h) |

---

## 5. Follow-Up Questions

1. How would you modify the solution for a k-ary tree?
2. Can you solve it iteratively using post-order traversal?
3. What if each house has a cooldown of two levels instead of one?

---

## Key Takeaway

> Return two values per node: (max if robbed, max if skipped). This avoids recomputation and gives a clean O(n) solution.
