# 1628. Design an Expression Tree With Evaluate Function

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-an-expression-tree-with-evaluate-function](https://leetcode.com/problems/design-an-expression-tree-with-evaluate-function)
**Companies:** Amazon

---

## Problem Description

Build an expression tree from postfix tokens and implement `evaluate()` that returns the result.

---

## Approach

```
CLASS Node:
    FUNCTION evaluate(): abstract

CLASS NumNode(Node):
    FUNCTION evaluate(): RETURN self.val

CLASS OpNode(Node):
    FUNCTION evaluate():
        left = self.left.evaluate()
        right = self.right.evaluate()
        RETURN apply(self.op, left, right)

FUNCTION buildTree(postfix):
    stack = []
    FOR token IN postfix:
        IF token is a number: stack.PUSH(NumNode(token))
        ELSE:
            right = stack.POP(); left = stack.POP()
            stack.PUSH(OpNode(token, left, right))
    RETURN stack[0]
```

---

## Key Takeaway

> **Expression tree: build from postfix using a stack (operands push, operators pop two and create a node). Evaluate recursively — leaves return values, operators combine children.**
