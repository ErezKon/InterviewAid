# 678. Valid Parenthesis String

**Difficulty:** 🟡 Medium
**Acceptance:** 37.0%
**LeetCode:** [https://leetcode.com/problems/valid-parenthesis-string](https://leetcode.com/problems/valid-parenthesis-string)
**Companies:** Alibaba, Amazon, Bloomberg, Goldman Sachs, Google, Jpmorgan, Linkedin, Meta, Microsoft, Motive, Pornhub, Roku, Salesforce, Tekion, Tiktok

---

## 1. Problem Description

Given a string containing `(`, `)`, and `*` (which can be `(`, `)`, or empty), determine if the string is valid.

---

## 2. Approach: Track Min/Max Open Count — O(n) ✅

```
FUNCTION checkValidString(s):
    minOpen = 0    // minimum possible open parens
    maxOpen = 0    // maximum possible open parens

    FOR char IN s:
        IF char == '(':
            minOpen += 1
            maxOpen += 1
        ELSE IF char == ')':
            minOpen -= 1
            maxOpen -= 1
        ELSE:   // '*'
            minOpen -= 1    // treat as ')'
            maxOpen += 1    // treat as '('

        IF maxOpen < 0: RETURN false    // too many ')'
        minOpen = MAX(minOpen, 0)       // can't have negative open

    RETURN minOpen == 0
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## Key Takeaway

> Track the **range** of possible open parenthesis counts. `*` expands the range. If 0 is within `[minOpen, maxOpen]` at the end, the string is valid.
