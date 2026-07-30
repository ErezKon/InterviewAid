# 872. Leaf-Similar Trees

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/leaf-similar-trees](https://leetcode.com/problems/leaf-similar-trees)
**Companies:** Amazon, Google, Meta, Microsoft, Oracle, Snowflake

---

## Problem Description

Two binary trees are **leaf-similar** if their leaf value sequences (from left to right) are identical.

## Examples

| Input Trees | Output | Explanation |
|-------------|--------|-------------|
| `root1 = [3,5,1,6,2,null,9,null,null,7,4]`<br>`root2 = [3,5,1,6,7,4,null,null,null,2,null,9]` | `true` | Both trees produce leaf sequence `[6,7,4,9]`.
| `root1 = [1,2,3]`<br>`root2 = [1,3,2]` | `false` | Leaf sequences are `[2,3]` vs `[3,2]`.

## Approach

**Depth‑First Search (DFS)** – Collect leaves of each tree in order, then compare the two lists.

```text
FUNCTION leafSimilar(root1, root2):
    RETURN getLeaves(root1) == getLeaves(root2)

FUNCTION getLeaves(node):
    IF node == null: RETURN []
    IF node.left == null AND node.right == null:
        RETURN [node.val]
    RETURN getLeaves(node.left) + getLeaves(node.right)
```

## Walkthrough

For the first example:
1. Traverse `root1` DFS left‑to‑right, collecting leaves: `6, 7, 4, 9`.
2. Traverse `root2` similarly, also obtaining `6, 7, 4, 9`.
3. Compare the two sequences – they match, so return `true`.

## Complexity Analysis

| Time | Space |
|------|-------|
| O(n₁ + n₂) | O(h₁ + h₂) |

`n₁, n₂` are node counts; `h₁, h₂` are tree heights (recursion stack).

## Follow‑Up Questions

* How would you solve this iteratively using a stack?
* Can you modify the algorithm to handle very large trees without storing the full leaf sequences?
* What changes are needed if the trees are not binary?

## Key Takeaway

> DFS collects leaves in left‑to‑right order. Comparing the two leaf sequences determines leaf similarity.
