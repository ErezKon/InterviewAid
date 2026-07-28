# 1807. Evaluate the Bracket Pairs of a String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/evaluate-the-bracket-pairs-of-a-string](https://leetcode.com/problems/evaluate-the-bracket-pairs-of-a-string)
**Companies:** Google, Remitly

---

## Problem Description

Given a string `s` containing bracket pairs like `(key)` and a list of `knowledge` pairs `[key, value]`, replace each `(key)` with its value, or `"?"` if the key is unknown.

---

## Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `s = "(name)is(age)years"`, `knowledge = [["name","bob"],["age","two"]]` | `"bobistwoyears"` | Replace `(name)` with `bob` and `(age)` with `two`. |
| `s = "(name)is(age)years"`, `knowledge = [["name","bob"]]` | `"bob?years"` | `(age)` is not in knowledge, so it becomes `?`. |
| `s = "(a)(b)(c)"`, `knowledge = []` | `"???"` | No keys are known, all become `?`. |

---

## Approach: HashMap + Linear Scan — O(n) ✅

```text
FUNCTION evaluate(s, knowledge):
    // Build lookup map from knowledge pairs
    SET lookup ← {k: v FOR EACH (k, v) IN knowledge}
    SET result ← []
    SET i ← 0
    WHILE i < LEN(s):
        IF s[i] == '(':
            SET j ← i + 1
            WHILE s[j] != ')':
                SET j ← j + 1
            SET key ← SUBSTRING(s, i+1, j-1)
            SET value ← lookup.GET(key, "?")
            APPEND value TO result
            SET i ← j + 1
        ELSE:
            APPEND s[i] TO result
            SET i ← i + 1
    RETURN JOIN(result)
```

---

## Walkthrough

Consider `s = "(name)is(age)years"` and `knowledge = [["name","bob"],["age","two"]]`.

| Step | i | char | Action | result so far |
|------|---|------|--------|--------------|
| 1 | 0 | `(` | start key collection | [] |
| 2 | 1‑4 | `name` | collect until `)` at index 5 | [] |
| 3 | 5 | `)` | lookup `name` → `bob`, append | [`bob`] |
| 4 | 6 | `i` | append literal | [`bob`,`i`] |
| 5 | 7 | `s` | append | [`bob`,`i`,`s`] |
| 6 | 8 | `(` | start second key | ... |
| 7 | 9‑11 | `age` | collect until `)` at 12 | ... |
| 8 | 12 | `)` | lookup `age` → `two`, append | [`bob`,`i`,`s`,`two`] |
| 9 | 13‑17 | `years` | append each char | [`bob`,`i`,`s`,`two`,`y`,`e`,`a`,`r`,`s`] |
| End | – | – | join list | `"bobistwoyears"` |

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| **Time** | O(n + k) — n = string length, k = total knowledge chars |
| **Space** | O(n + k) |

---

## Follow-Up Questions

1. How would you modify the algorithm to handle nested brackets? 
2. Can you solve the problem using a single pass without building an explicit hashmap?
3. How would you adapt the solution for streaming input where the string is received character by character?

---

## Key Takeaway

> **Template substitution: build a lookup map, scan for delimiters, replace keys with values. Straightforward string processing.**