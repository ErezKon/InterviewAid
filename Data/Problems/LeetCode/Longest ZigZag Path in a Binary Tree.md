# 1372. Longest ZigZag Path in a Binary Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-zigzag-path-in-a-binary-tree](https://leetcode.com/problems/longest-zigzag-path-in-a-binary-tree)
**Companies:** Amazon, Microsoft

---

## 1. Problem Description

You are given the `root` of a binary tree.

A ZigZag path for a binary tree is defined as follow:

- Choose **any **node in the binary tree and a direction (right or left).
- If the current direction is right, move to the right child of the current node; otherwise, move to the left child.
- Change the direction from right to left or from left to right.
- Repeat the second and third steps until you can't move in the tree.

Zigzag length is defined as the number of nodes visited - 1. (A single node has a length of 0).

Return *the longest **ZigZag** path contained in that tree*.

**Constraints:**
- The number of nodes in the tree is in the range `[1, 5 * 10^4]`.
- `1 <= Node.val <= 100`

---

## 2. Examples

**Example 1:**
```
Input: root = [1,null,1,1,1,null,null,1,1,null,1,null,null,null,1]
Output: 3
Explanation: Longest ZigZag path in blue nodes (right -> left -> right).
```

**Example 2:**
```
Input: root = [1,1,1,null,1,null,null,1,1,null,1]
Output: 4
Explanation: Longest ZigZag path in blue nodes (left -> right -> left -> right).
```

**Example 3:**
```
Input: root = [1]
Output: 0
```

---

## 3. Approach: DFS with Two States — O(n) ✅

```text
FUNCTION longestZigZag(root):
    maxLen ← 0

    FUNCTION dfs(node, goLeft, length):
        IF node == null: RETURN
        maxLen ← MAX(maxLen, length)
        IF goLeft:
            dfs(node.left, false, length + 1)   // continue alternating
            dfs(node.right, true, 1)            // restart from right child
        ELSE:
            dfs(node.right, true, length + 1)
            dfs(node.left, false, 1)

    dfs(root, true, 0)
    dfs(root, false, 0)
    RETURN maxLen
```

---

## 4. Walkthrough

Consider the tree where node `2` has right child `3`, which has left child `4`, which has right child `5`.
1. Start DFS at root with `goLeft = true` and `length = 0`.
2. At node `2`, go left is true, so we recurse to left child (null) and right child `3` with `length = 1` and `goLeft = true` (restart).
3. At node `3`, go left is true, recurse left to `4` with `length = 2`.
4. At node `4`, go left is false, recurse right to `5` with `length = 3`.
5. No further children; `maxLen` becomes 3, which is returned.

---

## 5. Complexity Analysis

- **Time:** Each node visited a constant number of times → `O(n)`.
- **Space:** Recursion stack depth equals tree height → `O(h)`.

---

## 6. Follow-Up Questions

- How would you modify the algorithm to also return the actual zigzag path nodes?
- Can this be solved iteratively using a stack or queue?

---

## 7. Key Takeaway

> Track direction and current length at each node. Continue the zigzag when alternating, otherwise restart. The maximum length encountered is the answer.
