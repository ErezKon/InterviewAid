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

## 3. Key Takeaway

> Pure string manipulation. Detect type by '@', then apply formatting rules. Handle country code for phones (10+ digits).
