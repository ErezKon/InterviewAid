# 856. Score of Parentheses

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/score-of-parentheses](https://leetcode.com/problems/score-of-parentheses)
**Companies:** Bloomberg, Google, Meta, Snapchat, Tiktok

---

## Problem Description

Given a balanced parentheses string `s`, return *the **score** of the string*.

The **score** of a balanced parentheses string is based on the following rule:

- `"()"` has score `1`.
- `AB` has score `A + B`, where `A` and `B` are balanced parentheses strings.
- `(A)` has score `2 * A`, where `A` is a balanced parentheses string.

**Constraints:**

- `2 <= s.length <= 50`
- `s` consists of only `'('` and `')'`.
- `s` is a balanced parentheses string.

---

## Approach

```text
FUNCTION scoreOfParentheses(s):
    // Use a stack to keep scores of nested levels
    stack ← [0]
    FOR c IN s:
        IF c == '(':
            stack.PUSH(0)
        ELSE:
            inner ← stack.POP()
            // If inner is 0, it means "()" which scores 1
            SET score ← MAX(2 * inner, 1)
            stack[-1] ← stack[-1] + score
    RETURN stack[0]
```

The stack bottom accumulates the total score while each new '(' starts a new scope.

---

## Examples

```
Example 1:
  Input: s = "()"
  Output: 1
```

```
Example 2:
  Input: s = "(())"
  Output: 2
```

```
Example 3:
  Input: s = "()()"
  Output: 2
```

```
Additional example (used in the walkthrough):
  Input: s = "(()(()))"
  Output: 6
  Explanation: 2 * (1 + 2 * 1) = 6
```

---

## Walkthrough

Example 2: `s = "(())"`

1. Initialize `stack = [0]`.
2. `'('` → push 0 → `[0,0]`.
3. `'('` → push 0 → `[0,0,0]`.
4. `')'` → pop inner 0 → score = 1 → `[0,1]`.
5. `')'` → pop inner 1 → score = 2*1 = 2 → `[2]`.
6. Return `2`, matching the expected output. (Example 3 `"()()"` adds 1 + 1 at the bottom level → `2`.)

A deeper input, `"(()(()))"`:

1. Initialize `stack = [0]`.
2. `'('` → push 0 → `[0,0]`.
3. `'('` → push 0 → `[0,0,0]`.
4. `')'` → pop inner 0 → score = 1 → stack becomes `[0,1]`.
5. `'('` → push 0 → `[0,1,0]`.
6. `'('` → push 0 → `[0,1,0,0]`.
7. `')'` → pop 0 → score = 1 → `[0,1,1]`.
8. `')'` → pop inner 1 → score = 2*1 = 2 → `[0,3]`.
9. `')'` → pop inner 3 → score = 2*3 = 6 → `[6]`.
10. End of string, return `6`.

---

## Complexity Analysis

| Time | Space |
|------|-------|
| O(n) | O(n) |

The algorithm scans the string once and uses a stack proportional to the nesting depth.

---

## Follow-Up Questions

- How would you modify the algorithm to compute the score modulo a large prime?
- Can you solve the problem using only O(1) extra space?
- How would you extend the scoring rules to include other bracket types?

---

## Key Takeaway

> Stack-based expression evaluation: `(` pushes a new scope, `)` pops and doubles (or uses 1 if empty). The stack bottom accumulates the final answer.
