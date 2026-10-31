# 2313. Minimum Flips in Binary Tree to Get Result

**Difficulty:** 🔴 Hard
**LeetCode:** https://leetcode.com/problems/minimum-flips-in-binary-tree-to-get-result
**Companies:** Google

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

You are given the `root` of a **binary tree** with the following properties:

- **Leaf nodes** have either the value `0` or `1`, representing `false` and `true` respectively.
- **Non-leaf nodes** have either the value `2`, `3`, `4`, or `5`, representing the boolean operations `OR`, `AND`, `XOR`, and `NOT`, respectively.

You are also given a boolean `result`, which is the desired result of the **evaluation** of the `root` node.

The evaluation of a node is as follows:

- If the node is a leaf node, the evaluation is the **value** of the node, i.e. `true` or `false`.
- Otherwise, **evaluate** the node's children and **apply** the boolean operation of its value with the children's evaluations.

In one operation, you can **flip** a leaf node, which causes a `false` node to become `true`, and a `true` node to become `false`.

Return* the minimum number of operations that need to be performed such that the evaluation of *`root`* yields *`result`. It can be shown that there is always a way to achieve `result`.

A **leaf node** is a node that has zero children.

Note: `NOT` nodes have either a left child or a right child, but other non-leaf nodes have both a left child and a right child.

**Constraints:**
- The number of nodes in the tree is in the range `[1, 10^5]`.
- `0 <= Node.val <= 5`
- `OR`, `AND`, and `XOR` nodes have `2` children.
- `NOT` nodes have `1` child.
- Leaf nodes have a value of `0` or `1`.
- Non-leaf nodes have a value of `2`, `3`, `4`, or `5`.

## Examples

**Example 1:**
```
Input: root = [3,5,4,2,null,1,1,1,0], result = true
Output: 2
Explanation: It can be shown that a minimum of 2 nodes have to be flipped to make the root of the tree
evaluate to true. One way to achieve this is shown in the diagram above.
```

**Example 2:**
```
Input: root = [0], result = false
Output: 0
Explanation: The root of the tree already evaluates to false, so 0 nodes have to be flipped.
```

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

## Follow-Up Questions

* How would you adapt the solution for trees with more than two children?
* Can you extend the DP to return the actual set of leaves to flip?
* What changes if the operators include NAND or NOR?

## Key Takeaway

> For boolean expression trees, a DFS that returns `(costTrue, costFalse)` for each node combines children according to the operator’s truth table, yielding the minimum leaf flips in linear time.
