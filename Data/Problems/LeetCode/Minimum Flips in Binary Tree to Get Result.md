# 2313. Minimum Flips in Binary Tree to Get Result

**Difficulty:** 🔴 Hard
**LeetCode:** https://leetcode.com/problems/minimum-flips-in-binary-tree-to-get-result
**Companies:** Google

---

## Problem Description

Given a binary tree where each leaf holds a boolean value (0 or 1) and each internal node holds a logical operator – AND (2), OR (3), XOR (4), or NOT (5) – determine the **minimum number of leaf flips** required so that the root of the tree evaluates to `true`.

## Examples

| Tree (pre‑order) | Minimum flips |
|------------------|---------------|
| `5(2(1,0),3(0,1))` | 1 |
| `2(5(1),4(0,1))`   | 0 |

*Explanation*: In the first tree flipping the leaf `0` under the NOT node makes the root true.

## Approach

**Tree DP with DFS** – For each node compute a pair `(costTrue, costFalse)` representing the minimum flips needed for the subtree to evaluate to true or false.

```text
FUNCTION minimumFlips(root, target):
    FUNCTION dfs(node):
        IF node is leaf:
            // leaf value already true? cost 0 else 1 to flip
            RETURN (0, 1) IF node.val == 1 ELSE (1, 0)
        IF node.val == NOT:
            (cTrue, cFalse) ← dfs(node.child)
            RETURN (cFalse, cTrue)
        (lt, lf) ← dfs(node.left)
        (rt, rf) ← dfs(node.right)
        IF node.val == OR:
            costTrue ← MIN(lt + rt, lt + rf, lf + rt)
            costFalse ← lf + rf
        ELSE IF node.val == AND:
            costTrue ← lt + rt
            costFalse ← MIN(lf + rf, lf + rt, lt + rf)
        ELSE: // XOR
            costTrue ← MIN(lt + rf, lf + rt)
            costFalse ← MIN(lt + rt, lf + rf)
        RETURN (costTrue, costFalse)
    (cTrue, cFalse) ← dfs(root)
    RETURN cTrue IF target == 1 ELSE cFalse
```

## Walkthrough

Consider the tree `5(2(1,0),3(0,1))`:
1. Leaves: `(1,0)` → `(0,1)` and `(0,1)` → `(1,0)`.
2. NOT node (`5`) flips its child pair → `(1,0)`.
3. AND node (`2`) combines left `(0,1)` and right `(1,0)` → `costTrue = 0+1 = 1`, `costFalse = MIN(1+0,1+1,0+0)=0`.
4. OR node (`3`) combines left result `(1,0)` and right leaf `(0,1)` → `costTrue = MIN(1+0,1+1,0+0)=0`, `costFalse = 0+1=1`.
5. Root is NOT, so final `(costTrue, costFalse) = (1,0)`. Minimum flips to make root true = **1**.

## Complexity Analysis

| Time | Space |
|------|-------|
| O(n) | O(h) — recursion depth where *h* is tree height |

## Follow‑Up Questions

* How would you adapt the solution for trees with more than two children?
* Can you extend the DP to return the actual set of leaves to flip?
* What changes if the operators include NAND or NOR?

## Key Takeaway

> For boolean expression trees, a DFS that returns `(costTrue, costFalse)` for each node combines children according to the operator’s truth table, yielding the minimum leaf flips in linear time.
