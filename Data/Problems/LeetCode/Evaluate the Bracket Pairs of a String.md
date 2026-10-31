# 1807. Evaluate the Bracket Pairs of a String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/evaluate-the-bracket-pairs-of-a-string](https://leetcode.com/problems/evaluate-the-bracket-pairs-of-a-string)
**Companies:** Google, Remitly

---

## Problem Description

You are given a string `s` that contains some bracket pairs, with each pair containing a **non-empty** key.

- For example, in the string `"(name)is(age)yearsold"`, there are **two** bracket pairs that contain the keys `"name"` and `"age"`.

You know the values of a wide range of keys. This is represented by a 2D string array `knowledge` where each `knowledge[i] = [key_i, value_i]` indicates that key `key_i` has a value of `value_i`.

You are tasked to evaluate **all** of the bracket pairs. When you evaluate a bracket pair that contains some key `key_i`, you will:

- Replace `key_i` and the bracket pair with the key's corresponding `value_i`.
- If you do not know the value of the key, you will replace `key_i` and the bracket pair with a question mark `"?"` (without the quotation marks).

Each key will appear at most once in your `knowledge`. There will not be any nested brackets in `s`.

Return *the resulting string after evaluating **all** of the bracket pairs.*

**Constraints:**
- `1 <= s.length <= 10^5`
- `0 <= knowledge.length <= 10^5`
- `knowledge[i].length == 2`
- `1 <= key_i.length, value_i.length <= 10`
- `s` consists of lowercase English letters and round brackets `'('` and `')'`.
- Every open bracket `'('` in `s` will have a corresponding close bracket `')'`.
- The key in each bracket pair of `s` will be non-empty.
- There will not be any nested bracket pairs in `s`.
- `key_i` and `value_i` consist of lowercase English letters.
- Each `key_i` in `knowledge` is unique.

---

## Examples

```
Example 1:
  Input: s = "(name)is(age)yearsold", knowledge = [["name","bob"],["age","two"]]
  Output: "bobistwoyearsold"
  Explanation:
  The key "name" has a value of "bob", so replace "(name)" with "bob".
  The key "age" has a value of "two", so replace "(age)" with "two".
```

```
Example 2:
  Input: s = "hi(name)", knowledge = [["a","b"]]
  Output: "hi?"
  Explanation: As you do not know the value of the key "name", replace "(name)" with "?".
```

```
Example 3:
  Input: s = "(a)(a)(a)aaa", knowledge = [["a","yes"]]
  Output: "yesyesyesaaa"
  Explanation: The same key can appear multiple times.
  The key "a" has a value of "yes", so replace all occurrences of "(a)" with "yes".
  Notice that the "a"s not in a bracket pair are not evaluated.
```

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
| 2 | 1-4 | `name` | collect until `)` at index 5 | [] |
| 3 | 5 | `)` | lookup `name` → `bob`, append | [`bob`] |
| 4 | 6 | `i` | append literal | [`bob`,`i`] |
| 5 | 7 | `s` | append | [`bob`,`i`,`s`] |
| 6 | 8 | `(` | start second key | ... |
| 7 | 9-11 | `age` | collect until `)` at 12 | ... |
| 8 | 12 | `)` | lookup `age` → `two`, append | [`bob`,`i`,`s`,`two`] |
| 9 | 13-17 | `years` | append each char | [`bob`,`i`,`s`,`two`,`y`,`e`,`a`,`r`,`s`] |
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