# 2696. Minimum String Length After Removing Substrings

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/minimum-string-length-after-removing-substrings](https://leetcode.com/problems/minimum-string-length-after-removing-substrings)
**Companies:** Amazon, Bolt, Google, Ibm, Wells Fargo

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Stack — O(n)](#4-approach-stack--on)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given a string `s`, repeatedly remove substrings `"AB"` and `"CD"` until none remain. Return the **minimum** length of the resulting string.

**Constraints:**
- `1 <= s.length <= 100`
- `s` consists of uppercase English letters

---

## 2. Examples

```
Example 1:
  Input: s = "ABFCACDB"
  Output: 2
  Explanation: "ABFCACDB" → remove "AB" → "FCACDB" → remove "CD" → "FCAB" → remove "AB" → "FC"

Example 2:
  Input: s = "ACBBD"
  Output: 5
  Explanation: No "AB" or "CD" substrings exist.
```

---

## 3. Key Insight

> Use a **stack**: when pushing a character, check if it forms `"AB"` or `"CD"` with the stack top. If so, pop instead of push. This handles nested and chained removals in one pass.

---

## 4. Approach: Stack — O(n) ✅

```
FUNCTION minLength(s):
    stack = []
    FOR c IN s:
        IF stack AND ((stack[-1] == 'A' AND c == 'B') OR (stack[-1] == 'C' AND c == 'D')):
            stack.POP()
        ELSE:
            stack.PUSH(c)
    RETURN len(stack)
```

---

## 5. Walkthrough

```
s = "ABFCACDB"

c='A': stack=['A']
c='B': top='A', pair! POP → stack=[]
c='F': stack=['F']
c='C': stack=['F','C']
c='A': stack=['F','C','A']
c='C': stack=['F','C','A','C']
c='D': top='C', pair! POP → stack=['F','C','A']
c='B': top='A', pair! POP → stack=['F','C']

Length = 2 ✅
```

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) — single pass, each char pushed/popped at most once |
| **Space** | O(n) — stack |

---

## 7. Key Takeaway

> **Stack-based string reduction** — whenever removing adjacent pairs can cascade (like parentheses matching), a stack handles it in one pass. Same pattern as valid parentheses and duplicate removal.
