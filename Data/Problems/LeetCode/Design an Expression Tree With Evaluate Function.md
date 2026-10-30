# 1628. Design an Expression Tree With Evaluate Function

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-an-expression-tree-with-evaluate-function](https://leetcode.com/problems/design-an-expression-tree-with-evaluate-function)
**Companies:** Amazon

---

## Problem Description

Given the `postfix` tokens of an arithmetic expression, build and return *the binary expression tree that represents this expression.*

**Postfix** notation is a notation for writing arithmetic expressions in which the operands (numbers) appear before their operators. For example, the postfix tokens of the expression `4*(5-(7+2))` are represented in the array `postfix = ["4","5","7","2","+","-","*"]`.

The class `Node` is an interface you should use to implement the binary expression tree. The returned tree will be tested using the `evaluate` function, which is supposed to evaluate the tree's value. You should not remove the `Node` class; however, you can modify it as you wish, and you can define other classes to implement it if needed.

A **binary expression tree** is a kind of binary tree used to represent arithmetic expressions. Each node of a binary expression tree has either zero or two children. Leaf nodes (nodes with 0 children) correspond to operands (numbers), and internal nodes (nodes with two children) correspond to the operators `'+'` (addition), `'-'` (subtraction), `'*'` (multiplication), and `'/'` (division).

It's guaranteed that no subtree will yield a value that exceeds `10^9` in absolute value, and all the operations are valid (i.e., no division by zero).

**Follow up:** Could you design the expression tree such that it is more modular? For example, is your design able to support additional operators without making changes to your existing `evaluate` implementation?

**Constraints:**
- `1 <= s.length < 100`
- `s.length` is odd.
- `s` consists of numbers and the characters `'+'`, `'-'`, `'*'`, and `'/'`.
- If `s[i]` is a number, its integer representation is no more than `10^5`.
- It is guaranteed that `s` is a valid expression.
- The absolute value of the result and intermediate values will not exceed `10^9`.
- It is guaranteed that no expression will include division by zero.

---

## Examples

```
Example 1:
  Input: s = ["3","4","+","2","*","7","/"]
  Output: 2
  Explanation: this expression evaluates to the above binary tree with expression ((3+4)*2)/7) = 14/7 = 2.
```

```
Example 2:
  Input: s = ["4","5","2","7","+","-","*"]
  Output: -16
  Explanation: this expression evaluates to the above binary tree with expression 4*(5-(2+7)) = 4*(-4) = -16.
```

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
