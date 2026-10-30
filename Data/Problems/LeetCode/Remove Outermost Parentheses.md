# 1021. Remove Outermost Parentheses

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/remove-outermost-parentheses](https://leetcode.com/problems/remove-outermost-parentheses)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Tcs

---

## Problem Description

A valid parentheses string is either empty `""`, `"(" + A + ")"`, or `A + B`, where `A` and `B` are valid parentheses strings, and `+` represents string concatenation.

- For example, `""`, `"()"`, `"(())()"`, and `"(()(()))"` are all valid parentheses strings.

A valid parentheses string `s` is primitive if it is nonempty, and there does not exist a way to split it into `s = A + B`, with `A` and `B` nonempty valid parentheses strings.

Given a valid parentheses string `s`, consider its primitive decomposition: `s = P_1 + P_2 + ... + P_k`, where `P_i` are primitive valid parentheses strings.

Return `s` *after removing the outermost parentheses of every primitive string in the primitive decomposition of* `s`.

**Constraints:**
- `1 <= s.length <= 10^5`
- `s[i]` is either `'('` or `')'`.
- `s` is a valid parentheses string.

## Examples

**Example 1:**
```
Input: s = "(()())(())"
Output: "()()()"
Explanation:
The input string is "(()())(())", with primitive decomposition "(()())" + "(())".
After removing outer parentheses of each part, this is "()()" + "()" = "()()()".
```

**Example 2:**
```
Input: s = "(()())(())(()(()))"
Output: "()()()()(())"
Explanation:
The input string is "(()())(())(()(()))", with primitive decomposition "(()())" + "(())" + "(()(()))".
After removing outer parentheses of each part, this is "()()" + "()" + "()(())" = "()()()()(())".
```

**Example 3:**
```
Input: s = "()()"
Output: ""
Explanation:
The input string is "()()", with primitive decomposition "()" + "()".
After removing outer parentheses of each part, this is "" + "" = "".
```

## Approach
Use a depth counter while iterating through the characters. Increment depth on '(' and decrement on ')'. Append a character to the result only when the current depth is greater than 1 (i.e., we are inside the outermost pair).

```text
FUNCTION RemoveOuterParentheses(s):
    SET result ← []
    SET depth ← 0
    FOR c ← EACH character IN s:
        IF c = '(':
            IF depth > 0:
                APPEND c TO result
            SET depth ← depth + 1
        ELSE: // c = ')'
            SET depth ← depth - 1
            IF depth > 0:
                APPEND c TO result
    RETURN JOIN(result)
```

## Walkthrough
| Step | Char | Depth before | Action | Result |
|------|------|--------------|--------|--------|
| 1 | '(' | 0 | depth becomes 1, not added | "" |
| 2 | '(' | 1 | depth becomes 2, add '(' | "(" |
| 3 | ')' | 2 | depth becomes 1, add ')' | "()" |
| 4 | '(' | 1 | depth becomes 2, add '(' | "()(" |
| ... | ... | ... | ... | ... |

The table continues until the string is fully processed, demonstrating that only inner characters are kept.

## Complexity Analysis
- **Time:** O(n), where n is the length of `s`, each character is visited once.
- **Space:** O(n) for the output string (in‑place modification is not required).

## Follow‑Up Questions
1. How would you modify the algorithm to return the list of primitive substrings instead of the concatenated result?
2. Can this be solved using an explicit stack data structure instead of a depth counter?
3. How would you handle malformed input where the parentheses are not balanced?

## Key Takeaway
By tracking nesting depth, you can easily identify and discard the outermost parentheses of each primitive substring in a single linear pass.
