# 988. Smallest String Starting From Leaf

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/smallest-string-starting-from-leaf](https://leetcode.com/problems/smallest-string-starting-from-leaf)
**Companies:** Amazon, Google

---

## Problem Description

Given a binary tree where each node has a value 0–25 (mapping to 'a'–'z'), find the lexicographically smallest string that starts at a leaf and ends at the root.

### Examples

- **Input:** `root = [0,1,2,3,4,3,4]` → **Output:** `"dba"` (path 3→1→0 = "dba")
- **Input:** `root = [25,1,3]` → **Output:** `"bz"`

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
