# 3606. Coupon Code Validator

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/coupon-code-validator](https://leetcode.com/problems/coupon-code-validator)
**Companies:** Google, Meta

---

## Problem Description

Validate a coupon code string based on given rules (length, character types, prefix/suffix checks, etc.).

---

## Approach

```
FUNCTION isValid(code):
    // Check all validation rules:
    // 1. Length constraints
    // 2. Character composition (alphanumeric, uppercase, digits, etc.)
    // 3. Prefix/suffix patterns
    // 4. Any checksum or structural rules
    // Apply each rule sequentially, return false on first failure
    RETURN true if all rules pass
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) where n = code length |
| **Space** | O(1) |

---

## Key Takeaway

> **String validation: apply each rule in sequence. Early return on first failure for efficiency.**
