# 1541. Minimum Insertions to Balance a Parentheses String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-insertions-to-balance-a-parentheses-string](https://leetcode.com/problems/minimum-insertions-to-balance-a-parentheses-string)
**Companies:** Amazon, Google, Meta, Tiktok

---

## Problem Description

Each `'('` must be matched by `'))'` (two closing parentheses). Given a string `s` consisting of `'('` and `')'`, return the **minimum number of insertions** required to make the string balanced under this rule.

## Key Insight

> Track open count. When encountering `)`, check for `))` pair. If only one `)`, insert another. If no open `(` to match, insert one. At end, each remaining open `(` needs 2 insertions.

## Approach: Greedy Scan — O(n) ✅

```text
FUNCTION minInsertions(s):
    SET insertions ← 0
    SET open ← 0
    SET i ← 0
    WHILE i < LENGTH(s):
        IF s[i] == '(':
            SET open ← open + 1
        ELSE: // s[i] == ')'
            // Check if next char forms a pair '))'
            IF i + 1 < LENGTH(s) AND s[i+1] == ')':
                // Consumes a valid pair
                SET i ← i + 1
            ELSE:
                // Need to insert a second ')'
                SET insertions ← insertions + 1
            END IF
            IF open > 0:
                SET open ← open - 1
            ELSE:
                // No matching '('; insert one
                SET insertions ← insertions + 1
            END IF
        END IF
        SET i ← i + 1
    END WHILE
    // Each remaining '(' needs two ')'
    RETURN insertions + 2 * open
```

## Examples

**Example 1:**
```
Input: s = "(()))"
Output: 1
Explanation: Insert one '(' at the beginning to get "((()))" which is balanced.
```

**Example 2:**
```
Input: s = "())"
Output: 0
Explanation: The string is already balanced: "())" → "(())" after interpreting the first ')' as part of a pair.
```

## Walkthrough

Take `s = "(()))"`.
1. i=0 `'('`: open=1.
2. i=1 `'('`: open=2.
3. i=2 `')'`: next char is `')'`, consume pair, open>0 so open=1.
4. i=4 `')'`: no next char, insert one `')'` (insertions=1), open>0 so open=0.
5. End of string, open=0, total insertions = 1.

## Complexity Analysis

| Time | Space |
|------|-------|
| O(n) – single pass through the string | O(1) – constant extra variables |

## Follow-Up Questions

- How would the algorithm change if each `'('` required exactly three `')'` to balance?
- Can you extend the solution to handle other types of brackets like `{}` and `[]` with custom matching rules?
- What is the effect on runtime if the input string length can be up to 10⁶?

## Key Takeaway

> By scanning once and handling pairs of `')'` greedily, we can compute the minimal insertions needed to satisfy the unusual `('` → `'))'` balancing rule.
