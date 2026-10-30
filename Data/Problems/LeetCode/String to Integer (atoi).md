# 8. String to Integer (atoi)

**Difficulty:** 🟡 Medium
**Acceptance:** 21.0%
**LeetCode:** [https://leetcode.com/problems/string-to-integer-atoi](https://leetcode.com/problems/string-to-integer-atoi)
**Companies:** Accenture, Adobe, Amazon, Apple, Bloomberg, Cadence, Databricks, Goldman Sachs, Google, Infosys, Meta, Microsoft, Netflix, Niantic, Nvidia, Qualcomm, Tcs, Uber, Valve, Zoho

---

## 1. Problem Description

Implement the `myAtoi(string s)` function, which converts a string to a 32-bit signed integer.

The algorithm for `myAtoi(string s)` is as follows:

- **Whitespace**: Ignore any leading whitespace (`" "`).
- **Signedness**: Determine the sign by checking if the next character is `'-'` or `'+'`, assuming positivity if neither present.
- **Conversion**: Read the integer by skipping leading zeros until a non-digit character is encountered or the end of the string is reached. If no digits were read, then the result is 0.
- **Rounding**: If the integer is out of the 32-bit signed integer range `[-2^31, 2^31 - 1]`, then round the integer to remain in the range. Specifically, integers less than `-2^31` should be rounded to `-2^31`, and integers greater than `2^31 - 1` should be rounded to `2^31 - 1`.

Return the integer as the final result.

**Note:** You must not use any built-in library function that converts a string to a number (for example, `atoi`, `stoi`, `Integer.parseInt`, `int()`, `parseInt`, `Number()`). Perform the conversion manually.

**Constraints:**
- `0 <= s.length <= 200`
- `s` consists of English letters (lower-case and upper-case), digits (`0 - 9`), `' '`, `'+'`, `'-'`, and `'.'`.

---

## 2. Examples

**Example 1:**
```
Input: s = "42"
Output: 42
Explanation: The underlined characters are what is read in and the caret is the current reader position.
Step 1: "42" (no characters read because there is no leading whitespace)
         ^
Step 2: "42" (no characters read because there is neither a '-' nor '+')
         ^
Step 3: "42" ("42" is read in)
           ^
```

**Example 2:**
```
Input: s = " -042"
Output: -42
Explanation: Step 1: "   -042" (leading whitespace is read and ignored)
            ^
Step 2: "   -042" ('-' is read, so the result should be negative)
             ^
Step 3: "   -042" ("042" is read in, leading zeros ignored in the result)
               ^
```

**Example 3:**
```
Input: s = "1337c0d3"
Output: 1337
Explanation: Step 1: "1337c0d3" (no characters read because there is no leading whitespace)
         ^
Step 2: "1337c0d3" (no characters read because there is neither a '-' nor '+')
         ^
Step 3: "1337c0d3" ("1337" is read in; reading stops because the next character is a non-digit)
             ^
```

**Example 4:**
```
Input: s = "0-1"
Output: 0
Explanation: Step 1: "0-1" (no characters read because there is no leading whitespace)
         ^
Step 2: "0-1" (no characters read because there is neither a '-' nor '+')
         ^
Step 3: "0-1" ("0" is read in; reading stops because the next character is a non-digit)
          ^
```

**Example 5:**
```
Input: s = "words and 987"
Output: 0
Explanation: Reading stops at the first non-digit character 'w'.
```

---

## 3. Approach: Sequential Parsing — O(n) ✅

```
FUNCTION myAtoi(s):
    i = 0, n = len(s)
    INT_MAX = 2^31 - 1
    INT_MIN = -2^31

    // Step 1: Skip whitespace
    WHILE i < n AND s[i] == ' ':
        i += 1

    // Step 2: Sign
    sign = 1
    IF i < n AND (s[i] == '+' OR s[i] == '-'):
        sign = -1 IF s[i] == '-' ELSE 1
        i += 1

    // Step 3: Digits
    result = 0
    WHILE i < n AND s[i] is digit:
        digit = int(s[i])

        // Overflow check
        IF result > INT_MAX / 10 OR (result == INT_MAX / 10 AND digit > 7):
            RETURN INT_MAX IF sign == 1 ELSE INT_MIN

        result = result * 10 + digit
        i += 1

    RETURN sign * result
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## 5. Follow-Up Questions

### 5.1 How would you handle this with a state machine?

States: `START`, `SIGNED`, `IN_NUMBER`, `END`. Transitions based on character type. Cleaner for complex parsing rules.

### 5.2 Reverse Integer (LeetCode #7)?

Same overflow checking pattern but applied while building the reversed number.

---

## Key Takeaway

> `atoi` is an **implementation/edge-case** problem. The core logic is simple but edge cases abound: whitespace, signs, overflow, non-digit characters, empty input. A deterministic finite automaton (DFA) approach is the cleanest way to handle all cases systematically.
