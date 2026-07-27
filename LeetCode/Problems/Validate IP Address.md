# 468. Validate IP Address

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/validate-ip-address](https://leetcode.com/problems/validate-ip-address)
**Companies:** Adobe, Amazon, Apple, Flexport, Google, Intuit, Meta, Microsoft, Oracle, Tiktok, Turing, Twitter

---

## Approach: Split and Validate — O(n) ✅

```
FUNCTION validIPAddress(queryIP):
    IF '.' IN queryIP:
        return validateIPv4(queryIP)
    ELSE IF ':' IN queryIP:
        return validateIPv6(queryIP)
    RETURN "Neither"

FUNCTION validateIPv4(ip):
    parts = ip.SPLIT('.')
    IF len(parts) != 4: RETURN "Neither"
    FOR part IN parts:
        IF NOT part OR len(part) > 3: RETURN "Neither"
        IF NOT part.isdigit(): RETURN "Neither"
        IF part[0] == '0' AND len(part) > 1: RETURN "Neither"    // leading zeros
        IF int(part) > 255: RETURN "Neither"
    RETURN "IPv4"

FUNCTION validateIPv6(ip):
    parts = ip.SPLIT(':')
    IF len(parts) != 8: RETURN "Neither"
    FOR part IN parts:
        IF NOT part OR len(part) > 4: RETURN "Neither"
        IF NOT all(c in '0123456789abcdefABCDEF' for c in part): RETURN "Neither"
    RETURN "IPv6"
```
