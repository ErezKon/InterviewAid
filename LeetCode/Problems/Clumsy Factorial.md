# 1006. Clumsy Factorial

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/clumsy-factorial](https://leetcode.com/problems/clumsy-factorial)
**Companies:** Amazon, Bloomberg, Meta, Microsoft
---

## Problem Description
Given an integer `n`, compute the **clumsy factorial** defined by applying the operations `*`, `/`, `+`, `-` in a repeating cycle to the decreasing sequence `n, n-1, ..., 1`. The division is integer division truncating toward zero.

## Examples
- **Example 1:** `n = 4` → `4 * 3 / 2 + 1 = 7`.
- **Example 2:** `n = 10` → `10 * 9 / 8 + 7 - 6 * 5 / 4 + 3 - 2 * 1 = 12`.

## Approach
Simulate the sequence using a stack to handle the precedence of `*` and `/`. For each number, apply the current operation:
1. `*` or `/` → combine with the top of the stack.
2. `+` → push the number.
3. `-` → push the negated number.
After processing all numbers, sum the stack.

### Pseudocode
```text
FUNCTION clumsy(n):
    ops ← ['*', '/', '+', '-']
    stack ← [n]
    opIdx ← 0
    FOR i ← n-1 DOWN TO 1:
        op ← ops[opIdx MOD 4]
        IF op = '*':
            stack[-1] ← stack[-1] * i
        ELSE IF op = '/':
            stack[-1] ← INT_DIVIDE(stack[-1], i)   // truncate toward zero
        ELSE IF op = '+':
            PUSH i TO stack
        ELSE:   // '-'
            PUSH -i TO stack
        opIdx ← opIdx + 1
    RETURN SUM(stack)
```

## Walkthrough
For `n = 4`:
1. Stack `[4]`, op `*` with `3` → `[12]`.
2. Next op `/` with `2` → `[6]`.
3. Next op `+` with `1` → `[6, 1]`.
4. Sum → `7`.

## Complexity Analysis
Time: O(n) – one pass over the numbers.
Space: O(n) in the worst case for the stack (alternating `+`/`-`).

## Follow-Up Questions
- Can the algorithm be optimized to O(1) space?
- How does the result behave for very large `n` (e.g., >10⁶)?
- What if the operation order were changed to `+ - * /`?

---

## Key Takeaway

> Using a stack to respect the higher precedence of multiplication and division lets you evaluate the clumsy factorial in a single linear scan.
