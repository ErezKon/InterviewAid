# 129. Sum Root to Leaf Numbers

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/sum-root-to-leaf-numbers](https://leetcode.com/problems/sum-root-to-leaf-numbers)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Oracle, Visa

---

## Problem Description

You are given the `root` of a binary tree containing digits from `0` to `9` only.

Each root-to-leaf path in the tree represents a number.

- For example, the root-to-leaf path `1 -> 2 -> 3` represents the number `123`.

Return *the total sum of all root-to-leaf numbers*. Test cases are generated so that the answer will fit in a **32-bit** integer.

A **leaf** node is a node with no children.

**Constraints:**
- The number of nodes in the tree is in the range `[1, 1000]`.
- `0 <= Node.val <= 9`
- The depth of the tree will not exceed `10`.

## Examples

**Example 1:**
```
Input: root = [1,2,3]
Output: 25
Explanation:
The root-to-leaf path 1->2 represents the number 12.
The root-to-leaf path 1->3 represents the number 13.
Therefore, sum = 12 + 13 = 25.
```

**Example 2:**
```
Input: root = [4,9,0,5,1]
Output: 1026
Explanation:
The root-to-leaf path 4->9->5 represents the number 495.
The root-to-leaf path 4->9->1 represents the number 491.
The root-to-leaf path 4->0 represents the number 40.
Therefore, sum = 495 + 491 + 40 = 1026.
```

## Approach
Perform a depth‑first traversal, carrying the number formed so far. At each node, update `currentNum = currentNum * 10 + node.val`. When a leaf is reached, add `currentNum` to the total.

```text
FUNCTION sumRootToLeaf(root):
    RETURN dfs(root, 0)

FUNCTION dfs(node, currentNum):
    IF node == NULL:
        RETURN 0
    currentNum ← currentNum * 10 + node.val
    IF node.left == NULL AND node.right == NULL:
        RETURN currentNum
    RETURN dfs(node.left, currentNum) + dfs(node.right, currentNum)
```

## Walkthrough
For tree `[4,9,0,5,1]`:
| Node | currentNum |
|------|------------|
| 4 (root) | 4 |
| 9 (left) | 49 |
| 5 (left‑left leaf) | 495 → add 495 |
| 1 (left‑right leaf) | 491 → add 491 |
| 0 (right leaf) | 40 → add 40 |
Total = 495 + 491 + 40 = 1026.

## Complexity Analysis
Time: `O(n)` – each node visited once. Space: `O(h)` recursion stack, where `h` is tree height.

## Follow-Up Questions
1. How would you solve it iteratively using a stack?
2. Can you modify the algorithm to return the maximum root‑to‑leaf number instead of the sum?
3. What changes are needed if nodes can contain multiple digits?

## Key Takeaway
A simple DFS that propagates the accumulated number yields the sum of all root‑to‑leaf values in linear time.
