# 671. Second Minimum Node In a Binary Tree

**Difficulty:** 🟢 Easy
**Companies:** Linkedin, Meta

---

## Problem Description

Given a special binary tree where each node has 0 or 2 children and `root.val = min(root.left.val, root.right.val)`, find the **second minimum** value. Return `-1` if none.

---

## Examples

| Tree | Output | Explanation |
|------|--------|-------------|
| ` [2,2,5,null,null,5,7] ` | `5` | Root value is 2. The smallest value greater than 2 is 5. |
| ` [2,2,2] ` | `-1` | All nodes have the same value, so no second minimum exists. |
| ` [1,null,1] ` | `-1` | Single‑branch tree with identical values.

---

## Approach

```
CLASS Solution:
    FUNCTION findSecondMinimumValue(root):
        IF root IS NULL: RETURN -1
        min1 ← root.val
        result ← INFINITY
        
        FUNCTION dfs(node):
            IF node IS NULL: RETURN
            IF min1 < node.val < result:
                result ← node.val
            IF node.val == min1:
                dfs(node.left)
                dfs(node.right)
        
        dfs(root)
        RETURN result IF result < INFINITY ELSE -1
```

---

## Walkthrough

**Example 1:** Tree `[2,2,5,null,null,5,7]`
1. `min1 = 2`. Start DFS at root.
2. Left child value `2` equals `min1` → recurse further (its children are `null`).
3. Right child value `5` > `min1` and < `result` → `result = 5`.
4. Continue DFS on right child's children: left child `5` (equal to current `result`, no change), right child `7` (> `result`).
5. DFS finishes; `result = 5` is the second minimum.

---

## Complexity Analysis

- **Time Complexity:** Each node is visited at most once → `O(n)` where `n` is the number of nodes.
- **Space Complexity:** Recursion stack depth is the height `h` of the tree → `O(h)`.

---

## Follow‑Up Questions

1. How would you solve the problem iteratively without recursion?
2. Can you extend the solution to find the *k*‑th minimum value?
3. How would the algorithm change if the tree were not guaranteed to have the special property?

---

## Key Takeaway

> By only recursing into subtrees whose root equals the minimum value, we prune larger branches and efficiently locate the second smallest value.
