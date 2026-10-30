# 988. Smallest String Starting From Leaf

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/smallest-string-starting-from-leaf](https://leetcode.com/problems/smallest-string-starting-from-leaf)
**Companies:** Amazon, Google

---

## Problem Description

You are given the `root` of a binary tree where each node has a value in the range `[0, 25]` representing the letters `'a'` to `'z'`.

Return *the **lexicographically smallest** string that starts at a leaf of this tree and ends at the root*.

As a reminder, any shorter prefix of a string is **lexicographically smaller**.

- For example, `"ab"` is lexicographically smaller than `"aba"`.

A leaf of a node is a node that has no children.

**Constraints:**
- The number of nodes in the tree is in the range `[1, 8500]`.
- `0 <= Node.val <= 25`

### Examples

```
Example 1:
  Input: root = [0,1,2,3,4,3,4]
  Output: "dba"
  Explanation: Leaf-to-root path 3 -> 1 -> 0 spells "dba".
```

```
Example 2:
  Input: root = [25,1,3,1,3,0,2]
  Output: "adz"
```

```
Example 3:
  Input: root = [2,2,1,null,1,0,null,0]
  Output: "abc"
```

## Approach: DFS — O(n · L) ✅

**Key Insight:** Build the string by prepending characters during DFS (leaf-to-root order). Compare at leaf nodes to track the smallest.

```
FUNCTION smallestFromLeaf(root):
    result = null

    FUNCTION dfs(node, path):
        IF node == null: RETURN
        path = chr(node.val + ord('a')) + path    // prepend

        IF node.left == null AND node.right == null:
            IF result == null OR path < result:
                result = path
            RETURN

        dfs(node.left, path)
        dfs(node.right, path)

    dfs(root, "")
    RETURN result
```

### Complexity

| | |
|---|---|
| **Time** | O(n · L) — L = max path length |
| **Space** | O(n) |
