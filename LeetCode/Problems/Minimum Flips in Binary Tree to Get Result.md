# 2313. Minimum Flips in Binary Tree to Get Result

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-flips-in-binary-tree-to-get-result](https://leetcode.com/problems/minimum-flips-in-binary-tree-to-get-result)
**Companies:** Google

---

## Problem Description

Given a binary tree where leaves are 0 or 1, and internal nodes are AND (2), OR (3), XOR (4), or NOT (5), return the **minimum number of leaf flips** to make the root evaluate to `true`.

## Key Insight

> DFS returning `(cost_to_make_true, cost_to_make_false)` for each subtree. Leaves: flip cost = 0 if already the desired value, 1 otherwise. Internal nodes combine children based on their operator.

## Approach: Tree DP — O(n) ✅

```
FUNCTION minimumFlips(root, result):
    FUNCTION dfs(node):
        IF node is leaf:
            RETURN (0, 1) IF node.val == 1 ELSE (1, 0)
            // (cost for true, cost for false)

        IF node.val == NOT:
            (ct, cf) ← dfs(child)
            RETURN (cf, ct)

        (lt, lf) ← dfs(left)
        (rt, rf) ← dfs(right)

        IF node.val == OR:
            costTrue ← MIN(lt + rt, lt + rf, lf + rt)   // at least one true
            costFalse ← lf + rf                           // both false
        ELSE IF node.val == AND:
            costTrue ← lt + rt                             // both true
            costFalse ← MIN(lf + rf, lf + rt, lt + rf)   // at least one false
        ELSE:  // XOR
            costTrue ← MIN(lt + rf, lf + rt)              // exactly one true
            costFalse ← MIN(lt + rt, lf + rf)             // same value

        RETURN (costTrue, costFalse)

    (ct, cf) ← dfs(root)
    RETURN ct IF result == 1 ELSE cf
```

| Time | Space |
|------|-------|
| O(n) | O(h) — recursion depth |

## Key Takeaway

> For boolean expression trees, DFS with `(cost_true, cost_false)` pairs propagates optimally — each operator combines children's costs according to its truth table.
