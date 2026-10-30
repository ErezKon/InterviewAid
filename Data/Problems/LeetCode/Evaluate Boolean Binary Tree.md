# 2331. Evaluate Boolean Binary Tree

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/evaluate-boolean-binary-tree](https://leetcode.com/problems/evaluate-boolean-binary-tree)
**Companies:** Google

---

## Problem Description

You are given the `root` of a **full binary tree** with the following properties:

- **Leaf nodes** have either the value `0` or `1`, where `0` represents `False` and `1` represents `True`.
- **Non-leaf nodes** have either the value `2` or `3`, where `2` represents the boolean `OR` and `3` represents the boolean `AND`.

The **evaluation** of a node is as follows:

- If the node is a leaf node, the evaluation is the **value** of the node, i.e. `True` or `False`.
- Otherwise, **evaluate** the node's two children and **apply** the boolean operation of its value with the children's evaluations.

Return *the boolean result of **evaluating** the* `root` *node.*

A **full binary tree** is a binary tree where each node has either `0` or `2` children.

A **leaf node** is a node that has zero children.

**Constraints:**
- The number of nodes in the tree is in the range `[1, 1000]`.
- `0 <= Node.val <= 3`
- Every node has either `0` or `2` children.
- Leaf nodes have a value of `0` or `1`.
- Non-leaf nodes have a value of `2` or `3`.

---

## Examples

```
Example 1:
  Input: root = [2,1,3,null,null,0,1]
  Output: true
  Explanation:
  The AND node evaluates to False AND True = False.
  The OR node evaluates to True OR False = True.
  The root node evaluates to True, so we return true.
```

```
Example 2:
  Input: root = [0]
  Output: false
  Explanation: The root node is a leaf node and it evaluates to false, so we return false.
```

---

## Approach: Recursive Evaluation — O(n) ✅

```text
FUNCTION evaluateTree(root):
    IF root IS leaf:
        RETURN root.val == 1
    left ← evaluateTree(root.left)
    right ← evaluateTree(root.right)
    IF root.val == 2:  // OR
        RETURN left OR right
    ELSE:              // AND (val == 3)
        RETURN left AND right
```

---

## Walkthrough

Consider the first example tree `[2,1,3,null,null,0,1]`:

1. Call `evaluateTree` on root (value 2 → OR).
2. Recurse left: node value `1` → leaf, returns `True`.
3. Recurse right: node value `3` → AND.
4. Right‑left child value `0` → leaf, returns `False`.
5. Right‑right child value `1` → leaf, returns `True`.
6. AND node combines `False` and `True` → `False`.
7. OR node combines `True` (left) and `False` (right) → `True`.

The final result is `True`.

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| **Time** | O(n) — visit each node once |
| **Space** | O(h) — recursion depth = tree height |

---

## Follow-Up Questions

- How would you evaluate the tree iteratively using a stack?
- Can you modify the algorithm to support additional logical operators (e.g., XOR)?
- What changes are needed if the tree is not full?

---

## Key Takeaway

> **Tree evaluation = post-order traversal. Leaves return values, internal nodes combine children with their operator. Clean recursive pattern.**