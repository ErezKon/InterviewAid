# 736. Parse Lisp Expression

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/parse-lisp-expression](https://leetcode.com/problems/parse-lisp-expression)
**Companies:** Affirm, Attentive, Google

---

```
// Recursive parser with scope chain
FUNCTION evaluate(expression):
    FUNCTION parse(expr, scope):
        IF expr starts with '(let':
            // Parse variable bindings, evaluate body
        ELSE IF expr starts with '(add':
            RETURN parse(e1, scope) + parse(e2, scope)
        ELSE IF expr starts with '(mult':
            RETURN parse(e1, scope) * parse(e2, scope)
        ELSE IF expr is variable: RETURN scope[expr]
        ELSE: RETURN int(expr)
```
