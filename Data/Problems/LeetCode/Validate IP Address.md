# 468. Validate IP Address

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/validate-ip-address](https://leetcode.com/problems/validate-ip-address)
**Companies:** Adobe, Amazon, Apple, Flexport, Google, Intuit, Meta, Microsoft, Oracle, Tiktok, Turing, Twitter

---

## Problem Description

Given a string `queryIP`, return `"IPv4"` if IP is a valid IPv4 address, `"IPv6"` if IP is a valid IPv6 address or `"Neither"` if IP is not a correct IP of any type.

**A valid IPv4** address is an IP in the form `"x1.x2.x3.x4"` where `0 <= xi <= 255` and `xi` **cannot contain** leading zeros. For example, `"192.168.1.1"` and `"192.168.1.0"` are valid IPv4 addresses while `"192.168.01.1"`, `"192.168.1.00"`, and `"192.168@1.1"` are invalid IPv4 addresses.

**A valid IPv6** address is an IP in the form `"x1:x2:x3:x4:x5:x6:x7:x8"` where:

- `1 <= xi.length <= 4`
- `xi` is a **hexadecimal string** which may contain digits, lowercase English letter (`'a'` to `'f'`) and upper-case English letters (`'A'` to `'F'`).
- Leading zeros are allowed in `xi`.

For example, `"2001:0db8:85a3:0000:0000:8a2e:0370:7334"` and `"2001:db8:85a3:0:0:8A2E:0370:7334"` are valid IPv6 addresses, while `"2001:0db8:85a3::8A2E:037j:7334"` and `"02001:0db8:85a3:0000:0000:8a2e:0370:7334"` are invalid IPv6 addresses.

**Constraints:**
- `queryIP` consists only of English letters, digits and the characters `'.'` and `':'`.

## Examples

**Example 1:**
```
Input: queryIP = "172.16.254.1"
Output: "IPv4"
Explanation: This is a valid IPv4 address, return "IPv4".
```

**Example 2:**
```
Input: queryIP = "2001:0db8:85a3:0:0:8A2E:0370:7334"
Output: "IPv6"
Explanation: This is a valid IPv6 address, return "IPv6".
```

**Example 3:**
```
Input: queryIP = "256.256.256.256"
Output: "Neither"
Explanation: This is neither a IPv4 address nor a IPv6 address.
```

## Approach
Use string splitting and validation rules for each IP version.

```text
FUNCTION validIPAddress(queryIP):
    IF '.' IN queryIP:
        RETURN validateIPv4(queryIP)
    ELSE IF ':' IN queryIP:
        RETURN validateIPv6(queryIP)
    RETURN "Neither"

FUNCTION validateIPv4(ip):
    parts ← ip.SPLIT('.')
    IF LENGTH(parts) ≠ 4: RETURN "Neither"
    FOR part IN parts:
        IF part IS EMPTY OR LENGTH(part) > 3: RETURN "Neither"
        IF NOT part.ALL_DIGITS(): RETURN "Neither"
        IF part[0] = '0' AND LENGTH(part) > 1: RETURN "Neither"
        IF INTEGER(part) > 255: RETURN "Neither"
    RETURN "IPv4"

FUNCTION validateIPv6(ip):
    parts ← ip.SPLIT(':')
    IF LENGTH(parts) ≠ 8: RETURN "Neither"
    FOR part IN parts:
        IF part IS EMPTY OR LENGTH(part) > 4: RETURN "Neither"
        IF NOT part.ALL_CHAR_IN('0123456789abcdefABCDEF'): RETURN "Neither"
    RETURN "IPv6"
```

## Walkthrough
Consider `"172.16.254.1"`:
1. Contains `.` → IPv4 path.
2. Split → ["172", "16", "254", "1"].
3. Each part passes digit check, no leading zero, ≤255.
4. All checks succeed → return "IPv4".

## Complexity Analysis
- Time: O(n) where n is length of `queryIP` (single pass for splitting and validation).
- Space: O(1) extra space aside from split parts (at most 8 groups).

## Follow-Up Questions
- How would you extend validation to support CIDR notation?
- Can you validate IP addresses without using built‑in split functions?
- How would you handle IPv6 shorthand notation like `::`?

## Key Takeaway
Validate an IP address by parsing it into its components and applying strict format rules for IPv4 and IPv6 separately.