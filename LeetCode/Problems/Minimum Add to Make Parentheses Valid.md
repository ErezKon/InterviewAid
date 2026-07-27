# 921. Minimum Add to Make Parentheses Valid

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-add-to-make-parentheses-valid](https://leetcode.com/problems/minimum-add-to-make-parentheses-valid)
**Companies:** Amazon, Bloomberg, Google, Ibm, Linkedin, Meta, Microsoft, Siemens

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a string of `(` and `)`, return the **minimum number of parentheses** to add to make it valid (every open has a matching close and vice versa).

---

## Key Insight

> Track unmatched `(` and `)` separately. A `)` matches an unmatched `(` if available. Otherwise it's an unmatched `)`. Answer = unmatched opens + unmatched closes.

---

## Approach: Counter — O(n) ✅

```
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
