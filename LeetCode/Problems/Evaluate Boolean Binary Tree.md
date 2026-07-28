# 2331. Evaluate Boolean Binary Tree

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/evaluate-boolean-binary-tree](https://leetcode.com/problems/evaluate-boolean-binary-tree)
**Companies:** Google

---

## Problem Description

Given a full binary tree where leaf nodes have values `0` (False) or `1` (True), and internal nodes have values `2` (OR) or `3` (AND), evaluate the tree and return the root's boolean result.

---

## Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `[2,1,3,null,null,0,1]` | `true` | Root is OR (2). Left child is leaf `1` (True). Right subtree evaluates to `false` (AND of `0` and `1`). OR of True and False is True. |
| `[3,0,1]` | `false` | Root is AND (3). Children are leaves `0` (False) and `1` (True). AND yields False.

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