# 3606. Coupon Code Validator

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/coupon-code-validator](https://leetcode.com/problems/coupon-code-validator)
**Companies:** Google, Meta

---

## Problem Description

Validate a coupon code string based on given rules (length, character types, prefix/suffix checks, etc.).

---

## Examples

| code | Output | Explanation |
|------|--------|-------------|
| `"SAVE20"` | `true` | Length 6, all uppercase letters, meets all rules. |
| `"save20"` | `false` | Contains lowercase letters, violates uppercase rule. |
| `"SAVE"` | `false` | Too short if minimum length is 5. |

---

## Approach

```text
FUNCTION isValid(code):
    // 1. Check length constraints
    IF LENGTH(code) < MIN_LEN OR LENGTH(code) > MAX_LEN:
        RETURN false
    // 2. Check allowed characters (e.g., alphanumeric uppercase only)
    FOR ch IN code:
        IF NOT (ch IS UPPERCASE LETTER OR ch IS DIGIT):
            RETURN false
    // 3. Check required prefix/suffix patterns
    IF NOT code STARTS WITH REQUIRED_PREFIX:
        RETURN false
    IF NOT code ENDS WITH REQUIRED_SUFFIX:
        RETURN false
    // 4. Optional checksum or structural rule
    IF NOT passesChecksum(code):
        RETURN false
    RETURN true
```

---

## Walkthrough

For `code = "SAVE20"` with `MIN_LEN=5`, `MAX_LEN=10`, `REQUIRED_PREFIX="SAVE"`:

1. Length 6 → within bounds.
2. Characters `S A V E 2 0` are all uppercase letters or digits.
3. Starts with `"SAVE"` → passes.
4. No suffix rule → passes.
5. Assume checksum passes → return `true`.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) where n = code length |
| **Space** | O(1) |

---

## Follow-Up Questions

1. How would you extend the validator to support multiple optional prefixes?
2. Can you design a regex that captures all validation rules in a single expression?
3. How would you handle Unicode characters in the coupon code?

---

## Key Takeaway

> **String validation: apply each rule in sequence. Early return on first failure for efficiency.**