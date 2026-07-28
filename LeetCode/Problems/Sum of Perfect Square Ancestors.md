# 3715. Sum of Perfect Square Ancestors

**Difficulty:** 🔴 Hard
**Companies:** Amazon, Google, Meesho

---

## Problem Description
Given a rooted tree with `n` nodes numbered `1..n`. Each node `i` has an integer value `val[i]`. For every node, consider all its ancestors (nodes on the path from the root to its parent). If an ancestor's value is a perfect square, add that value to the node's contribution. Return the sum of contributions of all nodes.

## Examples
**Example 1:**
Input: `val = [1,2,4,3]`, edges = `[[1,2],[1,3],[3,4]]` (root = 1)
Ancestors with perfect‑square values: node 2 → {1 (1)} sum=1; node 3 → {1 (1)} sum=1; node 4 → {1 (1),3 (3 is not square)} sum=1. Total = 1+1+1 = 3.

**Example 2:**
Input: `val = [16,5,9]`, edges = `[[1,2],[2,3]]`
Node 2 ancestors: {16} (perfect square) → 16; node 3 ancestors: {16,5} → 16 (only 16). Total = 32.

## Approach
Perform a DFS from the root while maintaining a running list (or multiset) of perfect‑square ancestor values.
1. Before recursing to a child, if the current node's value is a perfect square, push it onto the list.
2. At a node, the contribution is the sum of values in the list.
3. After processing children, pop the current value if it was added.
Checking perfect square: compute integer `r ← FLOOR(SQRT(v))`; if `r * r == v` then square.

```text
FUNCTION sumPerfectSquareAncestors(root):
    SET total ← 0
    SET stack ← []  // holds perfect‑square values of ancestors
    FUNCTION dfs(node):
        // contribution of current node
        SET contrib ← SUM(stack)
        SET total ← total + contrib
        // possibly add current node to stack for children
        IF isPerfectSquare(node.val):
            PUSH node.val ONTO stack
        FOR child IN node.children:
            dfs(child)
        IF isPerfectSquare(node.val):
            POP stack
    dfs(root)
    RETURN total

FUNCTION isPerfectSquare(v):
    IF v < 0: RETURN false
    SET r ← FLOOR(SQRT(v))
    RETURN r * r == v
```

## Walkthrough
Consider Example 2 (`val = [16,5,9]`).
| Step | Node | Stack before | Contribution | Stack after |
|------|------|--------------|--------------|-------------|
| 1 | 1 (16) | [] | 0 | [16] |
| 2 | 2 (5)  | [16] | 16 | [16] |
| 3 | 3 (9)  | [16] | 16 | [16,9] |
After returning from node 3, pop 9; after node 2, stack back to [16]; finally pop 16. Total = 0+16+16 = 32.

## Complexity Analysis
Time: O(n) – each node visited once, perfect‑square check O(1).
Space: O(h) for recursion stack plus O(k) for stored perfect‑square ancestors, where h is tree height and k ≤ h.

## Follow‑Up Questions
- How would you modify the solution to count ancestors whose values are prime numbers?
- Can the problem be solved iteratively using an explicit stack?
- What if the tree is given as a parent array instead of adjacency lists?

## Key Takeaway
Maintaining a dynamic list of qualifying ancestors during DFS lets you compute per‑node contributions in linear time.
