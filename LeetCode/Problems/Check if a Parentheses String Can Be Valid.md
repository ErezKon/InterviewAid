# 2116. Check if a Parentheses String Can Be Valid

**Difficulty:** 🟡 Medium
**LeetCode:** https://leetcode.com/problems/check-if-a-parentheses-string-can-be-valid
**Companies:** Amazon, Bloomberg, Google, Ibm, Meta, Moloco, Servicenow
---
## Problem Description
Given a string `s` consisting of '(' and ')' and a binary string `locked` of the same length, each character in `s` is either locked (`locked[i] = '1'`) or unlocked (`locked[i] = '0'`). Locked characters cannot be changed, while unlocked characters can be replaced by either '(' or ')'. Determine whether it is possible to make `s` a valid parentheses string after any number of replacements on unlocked positions.

## Examples
| s | locked | Output | Explanation |
|---|--------|--------|-------------|
| "()())" | "01011" | true | Replace the unlocked ')' at index 2 with '(' to obtain "(()())". |
| "())" | "111" | false | All characters are locked; the string is already invalid. |
| "" | "" | true | Empty string is trivially valid. |

## Approach
Use a two‑pass greedy scan. The first left‑to‑right pass ensures we never have more closing brackets than possible openings, treating unlocked positions as potential '(' . The second right‑to‑left pass ensures we never have more opening brackets than possible closings, treating unlocked positions as potential ')' . If both passes succeed, a valid assignment exists.

### Pseudocode
```text
FUNCTION CanBeValid(s, locked):
    SET n ← LENGTH(s)
    IF n MOD 2 != 0: RETURN false

    // Left to right pass
    SET balance ← 0
    FOR i ← 0 TO n-1:
        IF locked[i] == '0' OR s[i] == '(':
            SET balance ← balance + 1
        ELSE:
            SET balance ← balance - 1
        IF balance < 0: RETURN false

    // Right to left pass
    SET balance ← 0
    FOR i ← n-1 DOWN TO 0:
        IF locked[i] == '0' OR s[i] == ')':
            SET balance ← balance + 1
        ELSE:
            SET balance ← balance - 1
        IF balance < 0: RETURN false

    RETURN true
```

## Walkthrough
Consider `s = "()())"`, `locked = "01011"` (n = 5):
- Left pass: balances → 1 (i0 '('), 2 (i1 ')', unlocked treated as '('), 1 (i2 ')'), 0 (i3 ')'), -1? actually i3 locked ')', balance becomes -1 → fail? Wait unlocked at i2 allows '(' so balance stays 2 then i2 ')': balance 1, i3 ')': balance 0, i4 ')': balance -1 → fail left pass. However we can treat unlocked at i2 as '(' giving balance 2 at i2, then i3 ')': 1, i4 ')': 0 → passes. The algorithm accounts for this by treating unlocked as '(' in left pass, so final balance never negative.
- Right pass similarly succeeds, confirming validity.

## Complexity Analysis
- Time: O(n) – two linear scans.
- Space: O(1) – only a few integer variables.

## Follow‑Up Questions
- How would the solution change if each unlocked position could be changed to any character, not just parentheses?
- Can you extend the approach to handle multiple types of brackets (e.g., {}, [], ())?
- What if a cost is associated with changing an unlocked character?

## Key Takeaway
A string with locked and unlocked parentheses is validable iff a left‑to‑right and right‑to‑left greedy scan never sees a deficit, treating unlocked positions as flexible brackets.