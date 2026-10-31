# 2116. Check if a Parentheses String Can Be Valid

**Difficulty:** 🟡 Medium
**LeetCode:** https://leetcode.com/problems/check-if-a-parentheses-string-can-be-valid
**Companies:** Amazon, Bloomberg, Google, Ibm, Meta, Moloco, Servicenow
---
## Problem Description

A parentheses string is a **non-empty** string consisting only of `'('` and `')'`. It is valid if **any** of the following conditions is **true**:

- It is `()`.
- It can be written as `AB` (`A` concatenated with `B`), where `A` and `B` are valid parentheses strings.
- It can be written as `(A)`, where `A` is a valid parentheses string.

You are given a parentheses string `s` and a string `locked`, both of length `n`. `locked` is a binary string consisting only of `'0'`s and `'1'`s. For **each** index `i` of `locked`,

- If `locked[i]` is `'1'`, you **cannot** change `s[i]`.
- But if `locked[i]` is `'0'`, you **can** change `s[i]` to either `'('` or `')'`.

Return `true` *if you can make `s` a valid parentheses string*. Otherwise, return `false`.

**Constraints:**
- `n == s.length == locked.length`
- `1 <= n <= 10^5`
- `s[i]` is either `'('` or `')'`.
- `locked[i]` is either `'0'` or `'1'`.

## Examples

**Example 1:**
```
Input: s = "))()))", locked = "010100"
Output: true
Explanation: locked[1] == '1' and locked[3] == '1', so we cannot change s[1] or s[3].
We change s[0] and s[4] to '(' while leaving s[2] and s[5] unchanged to make s valid.
```

**Example 2:**
```
Input: s = "()()", locked = "0000"
Output: true
Explanation: We do not need to make any changes because s is already valid.
```

**Example 3:**
```
Input: s = ")", locked = "0"
Output: false
Explanation: locked permits us to change s[0].
Changing s[0] to either '(' or ')' will not make s valid.
```

**Example 4:**
```
Input: s = "(((())(((())", locked = "111111010111"
Output: true
Explanation: locked permits us to change s[6] and s[8].
We change s[6] and s[8] to ')' to make s valid.
```

## Approach
Use a two-pass greedy scan. The first left-to-right pass ensures we never have more closing brackets than possible openings, treating unlocked positions as potential '(' . The second right-to-left pass ensures we never have more opening brackets than possible closings, treating unlocked positions as potential ')' . If both passes succeed, a valid assignment exists.

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

## Follow-Up Questions
- How would the solution change if each unlocked position could be changed to any character, not just parentheses?
- Can you extend the approach to handle multiple types of brackets (e.g., {}, [], ())?
- What if a cost is associated with changing an unlocked character?

## Key Takeaway
A string with locked and unlocked parentheses is validable iff a left-to-right and right-to-left greedy scan never sees a deficit, treating unlocked positions as flexible brackets.