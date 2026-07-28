# 282. Expression Add Operators

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/expression-add-operators](https://leetcode.com/problems/expression-add-operators)
**Companies:** Amazon, Bloomberg, Google, Linkedin, Meta, Pinterest, Tiktok

---

## Problem Description
Given a string `num` that contains only digits and an integer `target`, insert binary operators `'+'`, `'-'`, or `'*'` between the digits so that the resulting mathematical expression evaluates to `target`. Operands in the expression cannot have leading zeros. Return all possible valid expressions.

## Examples
**Example 1:**
```
Input: num = "123", target = 6
Output: ["1+2+3","1*2*3"]
Explanation: Both expressions evaluate to 6.
```
**Example 2:**
```
Input: num = "105", target = 5
Output: ["1*0+5","10-5"]
Explanation: "1*0+5" = 5 and "10-5" = 5.
```

## Approach
We use **backtracking** to explore every way of inserting operators. At each recursion step we choose the next substring as the current operand and try adding each of the three operators. To correctly handle multiplication precedence we keep track of the value of the previous operand (`prevOperand`). When we add a `'*'`, we undo the previous addition/subtraction and apply the multiplication.

```text
FUNCTION addOperators(num, target):
    result ← []
    FUNCTION backtrack(idx, expr, value, prevOperand):
        IF idx == LENGTH(num):
            IF value == target:
                APPEND expr TO result
            RETURN
        FOR i ← idx TO LENGTH(num) - 1:
            // avoid numbers with leading zeros
            IF i > idx AND num[idx] == '0':
                BREAK
            currStr ← SUBSTRING(num, idx, i+1)
            curr ← TO_INTEGER(currStr)
            IF idx == 0:
                // first operand, start the expression
                backtrack(i+1, currStr, curr, curr)
            ELSE:
                backtrack(i+1, expr + "+" + currStr, value + curr, curr)
                backtrack(i+1, expr + "-" + currStr, value - curr, -curr)
                // multiplication: revert previous operand effect
                newValue ← value - prevOperand + prevOperand * curr
                backtrack(i+1, expr + "*" + currStr, newValue, prevOperand * curr)
    backtrack(0, "", 0, 0)
    RETURN result
```

## Walkthrough
Consider `num = "123"`, `target = 6`.
| Step | idx | expr | value | prevOperand |
|------|-----|------|-------|-------------|
| 1 | 0 | "" | 0 | 0 |
| Choose "1" as first operand → backtrack(1, "1", 1, 1) |
| 2 | idx=1, try "+2" → expr="1+2", value=3, prev=2 |
| 3 | idx=2, try "+3" → expr="1+2+3", value=6 → add to result |
| 4 | idx=2, try "*3" → newValue=1+2*3=7 (not target) |
| 5 | Backtrack to idx=1, try "*2" → expr="1*2", value=2, prev=2 |
| 6 | idx=2, try "*3" → newValue=2*3=6 → expr="1*2*3" added |
The algorithm exhaustively explores all splits and operator placements, collecting the two valid expressions.

## Complexity Analysis
- **Time:** O(4ⁿ) in the worst case, where n is the length of `num`, because each position has up to 4 choices (concatenate or three operators).
- **Space:** O(n) recursion stack plus O(k) for each valid expression stored, where k is the number of results.

## Follow-Up Questions
1. How would you modify the algorithm to support division `/` while handling integer division and division by zero?
2. Can you adapt the solution to output expressions in lexicographic order without sorting at the end?
3. How would you extend this to handle parentheses for arbitrary precedence?

## Key Takeaway
Backtracking with careful bookkeeping of the previous operand enables correct handling of multiplication precedence while exploring all possible operator insertions.
