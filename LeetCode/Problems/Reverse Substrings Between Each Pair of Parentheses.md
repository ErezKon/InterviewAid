# 1190. Reverse Substrings Between Each Pair of Parentheses

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/reverse-substrings-between-each-pair-of-parentheses](https://leetcode.com/problems/reverse-substrings-between-each-pair-of-parentheses)
**Companies:** Adobe, Agoda, Amazon, Bloomberg, Flipkart, Google, Microsoft, Okta, Oracle

---

## Problem Description

Given a string `s` with lowercase letters and parentheses, reverse the substrings in each pair of matching parentheses from innermost out, then remove all parentheses.

**Example:**
- **Input:** `s = "(u(love)i)"` → **Output:** `"iloveu"`
- **Explanation:** "love" → "evol", then "uevoli" → "iloveu"

---

## Key Insight

> **Stack approach:** each `(` starts a new level; each `)` pops, reverses, and merges into the level below. **Wormhole approach (O(n)):** pre-pair parentheses, then traverse linearly, flipping direction at each parenthesis.

---

## Approach: Stack — O(n²) / Wormhole O(n) ✅

### Stack approach:
```
FUNCTION reverseParentheses(s):
    stack = [[]]

    FOR char IN s:
        IF char == '(':
            stack.PUSH([])
        ELSE IF char == ')':
            inner = stack.POP()
            inner.REVERSE()
            stack.TOP().EXTEND(inner)
        ELSE:
            stack.TOP().APPEND(char)

    RETURN JOIN(stack[0])
```

### O(n) Wormhole approach:
```
FUNCTION reverseParentheses(s):
    n ← LENGTH(s)
    pair ← ARRAY[n]
    openStack ← []
    FOR i ← 0 TO n-1:
        IF s[i] == '(': openStack.PUSH(i)
        IF s[i] == ')':
            j ← openStack.POP()
            pair[i] ← j; pair[j] ← i

    result ← []
    i ← 0; direction ← 1
    WHILE i >= 0 AND i < n:
        IF s[i] == '(' OR s[i] == ')':
            i ← pair[i]
            direction ← -direction
        ELSE:
            result.APPEND(s[i])
        i ← i + direction
    RETURN JOIN(result)
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Stack    | O(n²) — reversals can repeat characters | O(n) |
| Wormhole | O(n) — each character visited once | O(n) |

---

## Key Takeaway

> The "wormhole" technique pairs parentheses and jumps through them while flipping traversal direction — converting nested reversals into a single linear pass.
