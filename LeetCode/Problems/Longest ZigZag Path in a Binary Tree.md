# 1372. Longest ZigZag Path in a Binary Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-zigzag-path-in-a-binary-tree](https://leetcode.com/problems/longest-zigzag-path-in-a-binary-tree)
**Companies:** Amazon, Microsoft

---

## 1. Problem Description

Find the longest zigzag path (alternating left‑right‑left…) in a binary tree.

---

## 2. Examples

| Tree | Output | Explanation |
|------|--------|-------------|
| `[[1,null,2,3,null,null,4,5,null,null,null,6]]` | 3 | The longest zigzag is `2 → 3 → 4 → 5` (right, left, right). |
| `[]` | 0 | Empty tree has no zigzag path.

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
