# 1597. Build Binary Expression Tree From Infix Expression

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/build-binary-expression-tree-from-infix-expression](https://leetcode.com/problems/build-binary-expression-tree-from-infix-expression)
**Companies:** Amazon

---

## 1. Problem Description

Given a valid infix expression string `s` (with `+`, `-`, `*`, `/`, digits, and parentheses), build and return the corresponding binary expression tree.

---

## 2. Key Insight

> Use the classic two-stack approach (operand stack + operator stack) with operator precedence. When encountering a closing paren or a lower-precedence operator, pop and build tree nodes.

---

## 3. Approach: Two-Stack Parsing — O(n) ✅

```
FUNCTION expTree(s):
    nodeStack = []
    opStack = []
    precedence = {'+': 1, '-': 1, '*': 2, '/': 2}
    
    FOR ch IN s:
        IF ch is digit:
            nodeStack.PUSH(new Node(ch))
        ELSE IF ch == '(':
            opStack.PUSH(ch)
        ELSE IF ch == ')':
            WHILE opStack.TOP != '(':
                buildNode()
            opStack.POP()  // remove '('
        ELSE:  // operator
            WHILE opStack not empty AND opStack.TOP != '(' AND
                  precedence[opStack.TOP] >= precedence[ch]:
                buildNode()
            opStack.PUSH(ch)
    
    WHILE opStack not empty:
        buildNode()
    
    RETURN nodeStack.TOP
    
    FUNCTION buildNode():
        op = opStack.POP()
        right = nodeStack.POP()
        left = nodeStack.POP()
        node = new Node(op, left, right)
        nodeStack.PUSH(node)
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## Key Takeaway

> Building an expression tree from infix notation is the classic shunting-yard algorithm: two stacks, operator precedence, and parenthesis handling.
