# 1896. Minimum Cost to Change the Final Value of Expression

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-cost-to-change-the-final-value-of-expression](https://leetcode.com/problems/minimum-cost-to-change-the-final-value-of-expression)
**Companies:** Google

---

## Key Insight

> Parse the expression recursively. For each subexpression, compute `(value, minFlips)` — the current value and the minimum changes to flip it. When combining `a OP b`, derive the min flips to change the combined result based on the operator and children's flip costs.

---

## Approach: Stack-based Expression Evaluation ✅

```
FUNCTION minOperationsToFlip(expression):
    // Use stack to evaluate: each entry = (value, minFlipsToChange)
    // For leaf '0': (0, 1), for '1': (1, 1)
    // For a OP b:
    //   AND: if result=1, flip = min(flipA, flipB). if result=0, flip = min(change one to 1, change op)
    //   OR:  if result=0, flip = min(flipA, flipB). if result=1, flip = min(change one to 0, change op)
    
    valStack ← []
    opStack ← []
    
    FOR token IN expression DO
        IF token = '(' THEN opStack.PUSH('(')
        ELSE IF token = ')' THEN
            opStack.POP()  // remove '('
            // combine if needed
        ELSE IF token IN '&|' THEN
            opStack.PUSH(token)
        ELSE  // '0' or '1'
            valStack.PUSH((INT(token), 1))
        
        // Combine top two values when operator is ready
        ...
    
    RETURN valStack.TOP().minFlips
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Stack parsing | **O(n)** | **O(n)** |

---

## Key Takeaway

> **Expression tree DP** — for each node, track both the value and the minimum cost to flip it. Combine using AND/OR truth tables.

---
