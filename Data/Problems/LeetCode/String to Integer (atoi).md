# 8. String to Integer (atoi)

**Difficulty:** 🟡 Medium
**Acceptance:** 21.0%
**LeetCode:** [https://leetcode.com/problems/string-to-integer-atoi](https://leetcode.com/problems/string-to-integer-atoi)
**Companies:** Accenture, Adobe, Amazon, Apple, Bloomberg, Cadence, Databricks, Goldman Sachs, Google, Infosys, Meta, Microsoft, Netflix, Niantic, Nvidia, Qualcomm, Tcs, Uber, Valve, Zoho

---

## 1. Problem Description

Implement `myAtoi(string s)` which converts a string to a 32-bit signed integer.

Algorithm:
1. Ignore leading whitespace.
2. Determine the sign (`+` or `-`).
3. Read digits until a non-digit or end of string.
4. Clamp to `[-2³¹, 2³¹ - 1]` on overflow.

---

## 2. Examples

```
Example 1: "42"           → 42
Example 2: "   -042"      → -42
Example 3: "1337c0d3"     → 1337
Example 4: "0-1"          → 0
Example 5: "words and 987"→ 0
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
