# 65. Valid Number

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/valid-number](https://leetcode.com/problems/valid-number)
**Companies:** Amazon, Bloomberg, Google, Linkedin, Meta, Microsoft, Nutanix

---

## Problem Description
Given a string `s` consisting of digits, signs, decimal points, and exponent symbols (`e`/`E`), determine whether it represents a valid decimal number. The string may contain leading/trailing spaces (which should be ignored). Valid numbers follow typical scientific notation rules: optional sign, optional integer part, optional fractional part, optional exponent with its own optional sign and integer part.

## Examples
| s | Output |
|---|--------|
| "0" | true |
| " 0.1 " | true |
| "abc" | false |
| "1 a" | false |
| "2e10" | true |
| "." | false |
*The function must accept numbers with optional decimal and exponent parts, and reject malformed strings.*

## Approach
Implement a deterministic finite automaton (DFA) that tracks which components have been seen (digit, dot, exponent, sign). Process the trimmed string character by character, updating state flags and validating transitions.

```text
FUNCTION IsValidNumber(s):
    // Trim whitespace
    SET str ← TRIM(s)
    SET seenDigit ← false
    SET seenDot ← false
    SET seenExp ← false
    FOR i FROM 0 TO LENGTH(str)-1:
        SET ch ← str[i]
        IF ch IS DIGIT:
            SET seenDigit ← true
        ELSE IF ch == '.':
            IF seenDot OR seenExp: RETURN false
            SET seenDot ← true
        ELSE IF ch == 'e' OR ch == 'E':
            IF seenExp OR NOT seenDigit: RETURN false
            SET seenExp ← true
            SET seenDigit ← false   // need digit after exponent
        ELSE IF ch == '+' OR ch == '-':
            IF i != 0 AND str[i-1] NOT IN ['e','E']: RETURN false
        ELSE:
            RETURN false
    RETURN seenDigit
```

## Walkthrough
| Step | Action |
|------|--------|
| 1 | Remove leading/trailing spaces. |
| 2 | Iterate over each character, updating flags for digits, dot, exponent, and sign. |
| 3 | Reject a dot if it appears after an exponent or a second time. |
| 4 | Reject an exponent if it appears twice or without a preceding digit. |
| 5 | After an exponent, reset `seenDigit` to require at least one digit following it. |
| 6 | At the end, ensure a digit was seen (either before or after the exponent). |

## Complexity Analysis
- **Time:** O(n) where n is the length of the trimmed string – a single pass.
- **Space:** O(1) – only a few boolean flags are used.

## Follow-Up Questions
1. How would you modify the DFA to support hexadecimal or binary literals? |
2. Can you extend the solution to return the parsed numeric value as a floating‑point number? |
3. What changes are needed to handle locale‑specific formats (e.g., commas as thousand separators)? |

## Key Takeaway
A small DFA with flags for digit, dot, exponent, and sign efficiently validates complex numeric strings in linear time.
