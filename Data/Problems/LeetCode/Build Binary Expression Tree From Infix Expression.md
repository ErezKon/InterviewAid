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

```text
FUNCTION expTree(s):
    nodeStack ← []
    opStack ← []
    precedence ← {'+': 1, '-': 1, '*': 2, '/': 2}
    
    FOR ch IN s:
        IF ch IS DIGIT:
            nodeStack.PUSH(new Node(ch))
        ELSE IF ch == '(':
            opStack.PUSH(ch)
        ELSE IF ch == ')':
            WHILE opStack.TOP != '(':
                buildNode()
            opStack.POP()  // discard '('
        ELSE:  // operator
            WHILE opStack NOT EMPTY AND opStack.TOP != '(' AND
                  precedence[opStack.TOP] >= precedence[ch]:
                buildNode()
            opStack.PUSH(ch)
    
    WHILE opStack NOT EMPTY:
        buildNode()
    
    RETURN nodeStack.TOP
    
    FUNCTION buildNode():
        op ← opStack.POP()
        right ← nodeStack.POP()
        left ← nodeStack.POP()
        node ← new Node(op, left, right)
        nodeStack.PUSH(node)
```

---

## 4. Examples

| Input | Output (preorder) |
|-------|-------------------|
| `"3+2*2"` | `"+"` root with left child `3` and right subtree `*` (2,2) |
| `"(1+(4+5+2)-3)+(6+8)"` | Tree representing the full arithmetic expression with proper grouping |

---

## 5. Walkthrough

Expression: `"3+2*2"`
1. Read `3` → push node `3` onto `nodeStack`.
2. Read `+` → `opStack` empty, push `+`.
3. Read `2` → push node `2`.
4. Read `*` → precedence `*` (2) > top `+` (1), push `*`.
5. Read `2` → push node `2`.
6. End of string → pop remaining operators:
   - Pop `*`: pop right `2`, left `2`, create `*` node, push.
   - Pop `+`: pop right `*` node, left `3`, create `+` node, push.
Resulting root is `+` with left child `3` and right child `*`.

---

## 6. Complexity Analysis

- **Time:** O(n) – each character is processed a constant number of times.
- **Space:** O(n) – stacks store at most n nodes/operators.

---

## 7. Follow‑Up Questions

- How would you modify the algorithm to support unary operators (e.g., negative numbers)?
- Can you build the tree in a single pass without explicit stacks using recursion?
- How would you evaluate the constructed expression tree efficiently?

---

## Key Takeaway

> Building an expression tree from infix notation is the classic shunting-yard algorithm: two stacks, operator precedence, and parenthesis handling.
