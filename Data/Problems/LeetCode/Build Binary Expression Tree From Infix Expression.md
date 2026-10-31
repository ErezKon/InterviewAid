# 1597. Build Binary Expression Tree From Infix Expression

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/build-binary-expression-tree-from-infix-expression](https://leetcode.com/problems/build-binary-expression-tree-from-infix-expression)
**Companies:** Amazon

---

## 1. Problem Description

A **binary expression tree** is a kind of binary tree used to represent arithmetic expressions. Each node of a binary expression tree has either zero or two children. Leaf nodes (nodes with 0 children) correspond to operands (numbers), and internal nodes (nodes with 2 children) correspond to the operators `'+'` (addition), `'-'` (subtraction), `'*'` (multiplication), and `'/'` (division).

For each internal node with operator `o`, the **infix expression** it represents is `(A o B)`, where `A` is the expression the left subtree represents and `B` is the expression the right subtree represents.

You are given a string `s`, an **infix expression** containing operands, the operators described above, and parentheses `'('` and `')'`.

Return *any valid **binary expression tree**, whose **in-order traversal** reproduces* `s` *after omitting the parenthesis from it.*

**Please note that order of operations applies in** `s`**.** That is, expressions in parentheses are evaluated first, and multiplication and division happen before addition and subtraction.

Operands must also appear in the **same order** in both `s` and the in-order traversal of the tree.

**Constraints:**
- `1 ≤ s.length ≤ 100`
- `s` consists of digits and the characters `'('`, `')'`, `'+'`, `'-'`, `'*'`, and `'/'`.
- Operands in `s` are **exactly** 1 digit.
- It is guaranteed that `s` is a valid expression.

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

```
Example 1:
  Input: s = "3*4-2*5"
  Output: [-,*,*,3,4,2,5]
  Explanation: The tree above is the only valid tree whose inorder traversal produces s.

Example 2:
  Input: s = "2-3/(5*2)+1"
  Output: [+,-,1,2,/,null,null,null,null,3,*,null,null,5,2]
  Explanation: The inorder traversal of the tree above is 2-3/5*2+1 which is the same as s without the parenthesis. The tree also produces the correct result and its operands are in the same order as they appear in s.
  The tree below is also a valid binary expression tree with the same inorder traversal as s, but it not a valid answer because it does not evaluate to the same value.
  The third tree below is also not valid. Although it produces the same result and is equivalent to the above trees, its inorder traversal does not produce s and its operands are not in the same order as s.

Example 3:
  Input: s = "1+2+3+4+5"
  Output: [+,+,5,+,4,null,null,+,3,null,null,1,2]
  Explanation: The tree [+,+,5,+,+,null,null,1,2,3,4] is also one of many other valid trees.
```

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

## 7. Follow-Up Questions

- How would you modify the algorithm to support unary operators (e.g., negative numbers)?
- Can you build the tree in a single pass without explicit stacks using recursion?
- How would you evaluate the constructed expression tree efficiently?

---

## Key Takeaway

> Building an expression tree from infix notation is the classic shunting-yard algorithm: two stacks, operator precedence, and parenthesis handling.
