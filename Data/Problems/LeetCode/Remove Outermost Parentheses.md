# 1021. Remove Outermost Parentheses

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/remove-outermost-parentheses](https://leetcode.com/problems/remove-outermost-parentheses)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Tcs

---

## Problem Description
Given a valid parentheses string `s`, the string is composed of one or more primitive valid parentheses substrings. A primitive substring is a non‑empty substring that cannot be split into two non‑empty valid parentheses strings. Remove the outermost pair of parentheses from each primitive substring and return the resulting string.

## Examples
- **Input:** `s = "(()())(())"`
  **Output:** `"()()()"`
  *Explanation:* The primitives are "(()())" and "(())". Removing the outermost parentheses yields "()()" and "()", which concatenate to "()()()".
- **Input:** `s = "(()())(())(()(()))"`
  **Output:** `"()()()()(())"`
- **Input:** `s = "()()"`
  **Output:** `""`
  *All primitives consist of a single pair, which is removed entirely.*

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
