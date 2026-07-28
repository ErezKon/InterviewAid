# 831. Masking Personal Information

**Difficulty:** 🟡 Medium
**Companies:** Salesforce, Twitter

---

## 1. Problem Description

Mask an email or phone number according to specific formatting rules.

---

## 2. Approach: String Parsing — O(n) ✅

```
// Detect email vs phone (contains '@')
// Email: lowercase, mask middle of name with *****
// Phone: extract digits, mask all but last 4, format with country code
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## 3. Examples

| Input | Output |
|-------|--------|
| "LeetCode@LeetCode.com" | "l*****e@leetcode.com" |
| "1(234)567-890" | "***-***-890" |

---

## 4. Walkthrough

1. Detect if the string contains '@' → email case.
2. For email, keep first and last character of the name, replace middle characters with five asterisks, and convert the name to lowercase.
3. For phone, extract all digits, keep the last four digits, replace the preceding digits with asterisks, and format with a leading '+' and country code if length > 10.

---

## 5. Complexity Analysis

- **Time:** O(n) – single pass to identify type and construct masked string.
- **Space:** O(n) – output string storage.

---

## 6. Follow-Up Questions

- How would you handle international phone numbers with varying country code lengths?
- Can the masking be performed in-place without additional memory?

---

## Key Takeaway

> Pure string manipulation. Detect type by '@', then apply formatting rules. Handle country code for phones (10+ digits).