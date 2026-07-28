# 129. Sum Root to Leaf Numbers

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/sum-root-to-leaf-numbers](https://leetcode.com/problems/sum-root-to-leaf-numbers)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Oracle, Visa

---

## Problem Description
Given the root of a binary tree where each node contains a single digit (0‑9), each root‑to‑leaf path represents a number formed by concatenating the digits. Return the total sum of all such numbers.

## Examples
- Input: `[1,2,3]` (root 1 with children 2 and 3) → Paths 12 and 13 → Output `25`.
- Input: `[4,9,0,5,1]` → Paths 495, 491, 40 → Output `1026`.

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
