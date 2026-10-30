# 205. Isomorphic Strings

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/isomorphic-strings](https://leetcode.com/problems/isomorphic-strings)
**Companies:** Amazon, American Express, Bloomberg, Goldman Sachs, Google, Hashedin, Linkedin, Meta, Microsoft, Oracle, Remitly, Sprinklr, Yandex, Zoho, Zomato

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Two Maps — O(n) ✅](#4-approach-two-maps--on-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given two strings `s` and `t`, *determine if they are isomorphic*.

Two strings `s` and `t` are isomorphic if the characters in `s` can be replaced to get `t`.

All occurrences of a character must be replaced with another character while preserving the order of characters. No two characters may map to the same character, but a character may map to itself.

**Constraints:**
- `1 <= s.length <= 5 * 10^4`
- `t.length == s.length`
- `s` and `t` consist of any valid ascii character.

---

## 2. Examples

**Example 1:**
```
Input: s = "egg", t = "add"
Output: true
Explanation: The strings s and t can be made identical by:
- Mapping 'e' to 'a'.
- Mapping 'g' to 'd'.
```

**Example 2:**
```
Input: s = "f11", t = "b23"
Output: false
Explanation: The strings s and t can not be made identical as '1' needs to be mapped to both '2' and '3'.
```

**Example 3:**
```
Input: s = "paper", t = "title"
Output: true
```

---

## 3. Key Insight

Maintain **two maps** (s→t and t→s) to enforce the bijection. A single map only checks one direction and misses cases like `s="ab"`, `t="aa"` where two different characters map to the same one.

---

## 4. Approach: Two Maps — O(n) ✅

```
FUNCTION isIsomorphic(s, t):
    IF len(s) != len(t): RETURN false
    sToT = {}
    tToS = {}

    FOR i ← 0 TO n - 1:
        IF s[i] IN sToT AND sToT[s[i]] != t[i]: RETURN false
        IF t[i] IN tToS AND tToS[t[i]] != s[i]: RETURN false
        sToT[s[i]] = t[i]
        tToS[t[i]] = s[i]

    RETURN true
```

Same bijection pattern as Word Pattern (#290).

---

## 5. Walkthrough

```
s = "egg", t = "add"
```

| i | s[i] | t[i] | sToT | tToS | Valid? |
|---|------|------|------|------|--------|
| 0 | e | a | {e:a} | {a:e} | ✅ |
| 1 | g | d | {e:a, g:d} | {a:e, d:g} | ✅ |
| 2 | g | d | g→d matches ✅ | d→g matches ✅ | ✅ |

**Result:** `true` ✅

---

## 6. Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| Time | O(n) | Single pass |
| Space | O(1) | At most 256 entries (ASCII characters) |

---

## 7. Follow-Up Questions

### 7.1 Why do we need two maps?

One map `s→t` catches conflicts in the forward direction but misses many-to-one mappings like `"ab"→"aa"`.

### 7.2 What about Word Pattern (#290)?

Identical bijection logic — just map words to characters instead of characters to characters.

---

## 8. Key Takeaway

> **Bijection = two maps**. One map enforces forward uniqueness (each s char maps to one t char), the other enforces reverse uniqueness (each t char maps to one s char). This pattern applies to all isomorphism-style problems.
