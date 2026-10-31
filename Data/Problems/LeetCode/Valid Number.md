# 65. Valid Number

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/valid-number](https://leetcode.com/problems/valid-number)
**Companies:** Amazon, Bloomberg, Google, Linkedin, Meta, Microsoft, Nutanix

---

## Problem Description

> *Note: the current official version contains no spaces (the old description's whitespace trimming in the Approach is harmless but unnecessary).*

Given a string `s`, return whether `s` is a **valid number**.

For example, all the following are valid numbers: `"2", "0089", "-0.1", "+3.14", "4.", "-.9", "2e10", "-90E3", "3e+7", "+6e-1", "53.5e93", "-123.456e789"`, while the following are not valid numbers: `"abc", "1a", "1e", "e3", "99e2.5", "--6", "-+3", "95a54e53"`.

Formally, a **valid number** is defined using one of the following definitions:

1. An **integer number** followed by an **optional exponent**.
2. A **decimal number** followed by an **optional exponent**.

An **integer number** is defined with an **optional sign** `'-'` or `'+'` followed by **digits**.

A **decimal number** is defined with an **optional sign** `'-'` or `'+'` followed by one of the following definitions:

1. **Digits** followed by a **dot** `'.'`.
2. **Digits** followed by a **dot** `'.'` followed by **digits**.
3. A **dot** `'.'` followed by **digits**.

An **exponent** is defined with an **exponent notation** `'e'` or `'E'` followed by an **integer number**.

The **digits** are defined as one or more digits.

**Constraints:**
- `1 <= s.length <= 20`
- `s` consists of only English letters (both uppercase and lowercase), digits (`0-9`), plus `'+'`, minus `'-'`, or dot `'.'`.

## Examples

**Example 1:**
```
Input: s = "0"
Output: true
```

**Example 2:**
```
Input: s = "e"
Output: false
```

**Example 3:**
```
Input: s = "."
Output: false
```

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
2. Can you extend the solution to return the parsed numeric value as a floating-point number? |
3. What changes are needed to handle locale-specific formats (e.g., commas as thousand separators)? |

## Key Takeaway
A small DFA with flags for digit, dot, exponent, and sign efficiently validates complex numeric strings in linear time.
