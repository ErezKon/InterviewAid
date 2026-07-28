# String Parsing Pattern

---

## Problem Description
Implement a function that converts a string representing a signed integer into the corresponding 32‑bit signed integer value, following the same rules as the C/C++ `atoi` function. The function must handle leading whitespace, an optional sign, overflow/underflow, and stop parsing at the first non‑digit character.

## Examples
- **Input:** `"   -42"` **Output:** `-42`
- **Input:** `"4193 with words"` **Output:** `4193`
- **Input:** `"91283472332"` **Output:** `2147483647` // clamped to `INT_MAX`.

## Approach
**Algorithm:** Linear scan with state handling (skip spaces, detect sign, accumulate digits, overflow check).
- **Insight:** Process characters sequentially; maintain the current numeric value and stop as soon as a non‑digit is encountered.

### Pseudocode
```text
FUNCTION myAtoi(s):
    i ← 0
    n ← LENGTH(s)
    // Skip leading whitespace
    WHILE i < n AND s[i] = ' ':
        i ← i + 1
    // Determine sign
    sign ← 1
    IF i < n AND (s[i] = '+' OR s[i] = '-'):
        IF s[i] = '-': sign ← -1
        i ← i + 1
    // Convert digits
    result ← 0
    WHILE i < n AND IS_DIGIT(s[i]):
        digit ← CHAR_TO_INT(s[i])
        // Check overflow before multiplying
        IF result > (INT_MAX - digit) / 10:
            RETURN INT_MAX IF sign = 1 ELSE INT_MIN
        result ← result * 10 + digit
        i ← i + 1
    RETURN sign * result
```

## Walkthrough
For `s = "   -42"`:
1. Skip three spaces → `i = 3`.
2. Sign character `'-'` → `sign = -1`, `i = 4`.
3. Parse digits `4` and `2` → `result = 42`.
4. End of string → return `-1 * 42 = -42`.

## Complexity Analysis
- **Time:** O(n) where n is the length of the input string.
- **Space:** O(1) auxiliary space.

## Follow‑Up Questions
- How would you adapt the parser to handle hexadecimal or binary literals?
- Can you modify the algorithm to return the index of the first invalid character?
- What changes are needed to support arbitrary‑precision integers?

## Key Takeaway
A single pass with careful overflow checks converts a string to an integer while respecting all edge‑case rules of `atoi`.
