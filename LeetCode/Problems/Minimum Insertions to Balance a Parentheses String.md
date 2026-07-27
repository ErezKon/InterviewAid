# 1541. Minimum Insertions to Balance a Parentheses String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-insertions-to-balance-a-parentheses-string](https://leetcode.com/problems/minimum-insertions-to-balance-a-parentheses-string)
**Companies:** Amazon, Google, Meta, Tiktok

---

## Problem Description

Each `'('` must be matched by `'))'` (two closing parens). Return the **minimum insertions** to balance the string.

## Key Insight

> Track open count. When encountering `)`, check for `))` pair. If only one `)`, insert another. If no open `(` to match, insert one. At end, each remaining open `(` needs 2 insertions.

## Approach: Greedy Scan — O(n) ✅

```
FUNCTION minInsertions(s):
    insertions = 0; open = 0; i = 0
    WHILE i < len(s):
        IF s[i] == '(':
            open += 1
        ELSE:
            IF i + 1 < len(s) AND s[i+1] == ')':
                i += 1    // consume '))'
            ELSE:
                insertions += 1    // need extra ')'
            IF open > 0: open -= 1
            ELSE: insertions += 1    // need '('
        i += 1
    RETURN insertions + 2 * open    // remaining open need '))'
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

## Key Takeaway

> Variant of balanced parentheses where `(` needs `))`. Process greedily: pair closing brackets, insert missing ones, and handle unmatched opens at the end.
