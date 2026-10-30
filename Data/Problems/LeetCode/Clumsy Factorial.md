# 1006. Clumsy Factorial

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/clumsy-factorial](https://leetcode.com/problems/clumsy-factorial)
**Companies:** Amazon, Bloomberg, Meta, Microsoft
---

## Problem Description
The **factorial** of a positive integer `n` is the product of all positive integers less than or equal to `n`.

- For example, `factorial(10) = 10 * 9 * 8 * 7 * 6 * 5 * 4 * 3 * 2 * 1`.

We make a **clumsy factorial** using the integers in decreasing order by swapping out the multiply operations for a fixed rotation of operations with multiply `'*'`, divide `'/'`, add `'+'`, and subtract `'-'` in this order.

- For example, `clumsy(10) = 10 * 9 / 8 + 7 - 6 * 5 / 4 + 3 - 2 * 1`.

However, these operations are still applied using the usual order of operations of arithmetic. We do all multiplication and division steps before any addition or subtraction steps, and multiplication and division steps are processed left to right.

Additionally, the division that we use is floor division such that `10 * 9 / 8 = 90 / 8 = 11`.

Given an integer `n`, return *the clumsy factorial of* `n`.

**Constraints:**
- `1 <= n <= 10^4`

## Examples
```
Example 1:
  Input: n = 4
  Output: 7
  Explanation: 7 = 4 * 3 / 2 + 1
```

```
Example 2:
  Input: n = 10
  Output: 12
  Explanation: 12 = 10 * 9 / 8 + 7 - 6 * 5 / 4 + 3 - 2 * 1
```

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
