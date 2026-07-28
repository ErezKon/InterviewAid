# Tree Depth/Height Patterns

---

## Problem Description
These notes summarize common patterns for computing depth, height, and related metrics in binary trees. The patterns apply to classic LeetCode problems such as Maximum Depth (#104), Minimum Depth (#111), Balanced Binary Tree (#110), Diameter of Binary Tree (#543), and Maximum Path Sum (#124). Each problem can be solved with a bottom‑up depth‑first traversal that returns a value for each subtree and updates a global answer.

## Examples
| Problem | Goal |
|---------|------|
| Max Depth (#104) | Return the length of the longest root‑to‑leaf path.
| Min Depth (#111) | Return the length of the shortest root‑to‑leaf path (leaf‑only).
| Balanced (#110) | Determine if for every node the heights of left and right subtrees differ by at most 1.
| Diameter (#543) | Return the length of the longest path between any two nodes (may not pass through root).
| Max Path Sum (#124) | Return the maximum sum of values along any path (can start and end anywhere).

## Approach
Use a recursive DFS that returns the height (or depth) of a subtree. While unwinding, compute the required metric using the children's returned values.

```text
FUNCTION dfs(node):
    IF node IS NULL:
        RETURN 0               // height of empty subtree
    leftHeight ← dfs(node.left)
    rightHeight ← dfs(node.right)
    // Example for Max Depth:
    RETURN 1 + MAX(leftHeight, rightHeight)
```
For other problems, replace the return expression and update a global variable as needed (e.g., diameter = MAX(diameter, leftHeight + rightHeight)).

## Walkthrough (Max Depth Example)
Consider the tree `[3,9,20,null,null,15,7]`:
1. Recurse to leaf `9` → left/right heights = 0 → return 1.
2. Recurse to leaf `15` → return 1; leaf `7` → return 1.
3. Node `20` receives leftHeight=1, rightHeight=1 → returns `1+MAX(1,1)=2`.
4. Root `3` receives leftHeight=1, rightHeight=2 → returns `1+MAX(1,2)=3`.
Result: maximum depth = 3.

## Complexity Analysis
*Time*: **O(n)** – each node visited once.
*Space*: **O(h)** recursion stack, where *h* is tree height (worst‑case O(n)).

## Follow‑Up Questions
1. How would you convert the recursive DFS to an iterative version using a stack?
2. Can you compute both height and diameter in a single traversal?
3. How does the algorithm change for an N‑ary tree?

## Key Takeaway
A single post‑order DFS that returns subtree heights can be adapted to solve many tree‑depth related problems by tweaking the combine step and maintaining a global metric.
