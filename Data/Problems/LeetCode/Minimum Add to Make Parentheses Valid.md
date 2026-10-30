# 921. Minimum Add to Make Parentheses Valid

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-add-to-make-parentheses-valid](https://leetcode.com/problems/minimum-add-to-make-parentheses-valid)
**Companies:** Amazon, Bloomberg, Google, Ibm, Linkedin, Meta, Microsoft, Siemens

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

A parentheses string is valid if and only if:
- It is the empty string,
- It can be written as `AB` (`A` concatenated with `B`), where `A` and `B` are valid strings, or
- It can be written as `(A)`, where `A` is a valid string.

You are given a parentheses string `s`. In one move, you can insert a parenthesis at any position of the string.
- For example, if `s = "()))"`, you can insert an opening parenthesis to be `"(()))"` or a closing parenthesis to be `"())))"`.

Return *the minimum number of moves required to make* `s` *valid*.

**Constraints:**
- `1 <= s.length <= 1000`
- `s[i]` is either `'('` or `')'`.

---

## Examples

```
Example 1:
  Input: s = "())"
  Output: 1
  Explanation: Insert one '(' to match the unmatched ')'.
```

```
Example 2:
  Input: s = "((("
  Output: 3
  Explanation: Insert three ')' to close the three unmatched '('.
```

---

## Key Insight

> Track unmatched `(` and `)` separately. A `)` matches an unmatched `(` if available. Otherwise it's an unmatched `)`. Answer = unmatched opens + unmatched closes.

---

## Approach: Counter — O(n) ✅

```text
FUNCTION minAddToMakeValid(s):
    open ← 0     // unmatched '('
    close ← 0    // unmatched ')'

    FOR char IN s DO
        IF char = '(' THEN
            open ← open + 1
        ELSE
            IF open > 0 THEN
                open ← open - 1
            ELSE
                close ← close + 1

    RETURN open + close
```

---

## Walkthrough

```
s = "())"
'(' → open=1
')' → open>0, open=0
')' → open=0, close=1

Return 0 + 1 = 1 ✅ (need one '(')
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Single pass counter | **O(n)** | **O(1)** |

---

## Key Takeaway

> **Two counters for unmatched parens** — greedily match `)` with available `(`, count leftover unmatched of each type.

---