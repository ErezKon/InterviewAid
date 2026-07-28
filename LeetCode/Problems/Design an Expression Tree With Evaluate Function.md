# 1628. Design an Expression Tree With Evaluate Function

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-an-expression-tree-with-evaluate-function](https://leetcode.com/problems/design-an-expression-tree-with-evaluate-function)
**Companies:** Amazon

---

## Problem Description

Build an expression tree from postfix tokens and implement `evaluate()` that returns the result.

---

## Examples

| Input (postfix) | Output |
|-----------------|--------|
| `["3","4","+","2","*","7","/"]` | `2` |
| `["2","3","*","5","+","9","-"]` | `2` |

*Explanation*: The first example builds the tree for `(3 + 4) * 2 / 7` which evaluates to `2`.

---

## Approach

```
FUNCTION buildTree(postfix):
    SET stack ← []
    FOR token IN postfix:
        IF token IS number:
            PUSH NumNode(token) ONTO stack
        ELSE:
            SET right ← POP stack
            SET left ← POP stack
            PUSH OpNode(token, left, right) ONTO stack
    RETURN POP stack

CLASS Node:
    FUNCTION evaluate(): abstract

CLASS NumNode(Node):
    CONSTRUCTOR(value):
        SET self.val ← value
    FUNCTION evaluate():
        RETURN self.val

CLASS OpNode(Node):
    CONSTRUCTOR(op, left, right):
        SET self.op ← op
        SET self.left ← left
        SET self.right ← right
    FUNCTION evaluate():
        SET leftVal ← self.left.evaluate()
        SET rightVal ← self.right.evaluate()
        RETURN apply(self.op, leftVal, rightVal)
```

---

## Walkthrough

**Example:** `["3","4","+","2","*","7","/"]`

| Step | Action | Stack (top → bottom) |
|------|--------|----------------------|
| 1 | Push `3` | `3` |
| 2 | Push `4` | `4, 3` |
| 3 | `+` → pop `4` & `3`, create `+` node, push | `+Node` |
| 4 | Push `2` | `2, +Node` |
| 5 | `*` → pop `2` & `+Node`, create `*` node, push | `*Node` |
| 6 | Push `7` | `7, *Node` |
| 7 | `/` → pop `7` & `*Node`, create `/` node (root) | `/Root` |

Evaluating `/Root` recursively yields `2`.

---

## Complexity Analysis

- **Time:** `O(n)` – each token is processed once.
- **Space:** `O(n)` – stack holds at most `n` nodes.

---

## Follow-Up Questions

1. How would you modify the tree to support variables and a symbol table?
2. Can you extend the evaluator to handle unary operators like negation?
3. How would you serialize and deserialize the expression tree?

---

## Key Takeaway

> **Expression tree: build from postfix using a stack (operands push, operators pop two and create a node). Evaluate recursively — leaves return values, operators combine children.**
