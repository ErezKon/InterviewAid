# 1249. Minimum Remove to Make Valid Parentheses

**Difficulty:** 🟡 Medium
**Acceptance:** 67.0%
**LeetCode:** [https://leetcode.com/problems/minimum-remove-to-make-valid-parentheses](https://leetcode.com/problems/minimum-remove-to-make-valid-parentheses)
**Companies:** Amazon, Apple, Bloomberg, Ge Digital, Google, Meta, Microsoft, Oracle, Snapchat, Tiktok, Walmart Labs

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Two Pass — O(n)](#4-approach-two-pass--on)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given a string `s` of `'('`, `')'`, and lowercase letters, remove the **minimum** number of parentheses so the resulting string is valid (every open has a matching close).

**Constraints:**
- `1 <= s.length <= 10⁵`
- `s[i]` is `'('`, `')'`, or lowercase letter

---

## 2. Examples

```
Example 1:
  Input: s = "lee(t(c)o)de)"
  Output: "lee(t(c)o)de"
  Explanation: Remove the last ')'.

Example 2:
  Input: s = "a)b(c)d"
  Output: "ab(c)d"
  Explanation: Remove the first ')'.

Example 3:
  Input: s = "))(("
  Output: ""
  Explanation: Remove all parentheses.
```

---

## 3. Key Insight

> An unmatched `)` is detected during a left-to-right scan (no open `(` to match). An unmatched `(` is detected during a right-to-left scan (excess opens remaining). Two passes handle both directions.

---

## 4. Approach: Two Pass — O(n) ✅

```
FUNCTION minRemoveToMakeValid(s):
    // Pass 1: Remove unmatched ')'
    result = []
    openCount = 0
    FOR char IN s:
        IF char == '(':
            openCount += 1
            result.ADD(char)
        ELSE IF char == ')':
            IF openCount > 0:
                openCount -= 1
                result.ADD(char)
            // else: skip unmatched ')'
        ELSE:
            result.ADD(char)

    // Pass 2: Remove extra '(' from the right
    finalResult = []
    FOR char IN REVERSE(result):
        IF char == '(' AND openCount > 0:
            openCount -= 1
            CONTINUE
        finalResult.ADD(char)

    RETURN REVERSE(finalResult) as string
```

---

## 5. Walkthrough

```
s = "lee(t(c)o)de)"

Pass 1 (remove unmatched ')'):
  l,e,e → add, openCount=0
  '(' → add, openCount=1
  t → add
  '(' → add, openCount=2
  c → add
  ')' → openCount=2>0, add, openCount=1
  o → add
  ')' → openCount=1>0, add, openCount=0
  d,e → add
  ')' → openCount=0, SKIP

  result = "lee(t(c)o)de", openCount=0

Pass 2: openCount=0, nothing to remove.

Answer = "lee(t(c)o)de" ✅
```

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) — two passes over the string |
| **Space** | O(n) — for the result arrays |

---

## 7. Follow-Up Questions

**Q1: Can we do this with a stack instead?**
Yes — push indices of `(` onto stack. For `)`, pop if stack non-empty, else mark for removal. After scanning, remaining stack indices are unmatched `(`. Build result by skipping all marked indices.

**Q2: What if we need to return all valid results?**
This problem asks for any valid result with minimum removals. Finding all would require backtracking.

**Q3: How does this compare to "Valid Parentheses" (#20)?**
#20 checks validity; this actively fixes invalidity by removing minimum characters.

---

## 8. Key Takeaway

> Two passes: left-to-right removes unmatched `)`, right-to-left removes unmatched `(`. Alternatively, use a stack to track indices of unmatched parentheses, then rebuild.
