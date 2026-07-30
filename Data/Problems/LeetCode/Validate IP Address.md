# 468. Validate IP Address

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/validate-ip-address](https://leetcode.com/problems/validate-ip-address)
**Companies:** Adobe, Amazon, Apple, Flexport, Google, Intuit, Meta, Microsoft, Oracle, Tiktok, Turing, Twitter

---

## Problem Description
Given a string `queryIP`, return "IPv4" if it is a valid IPv4 address, "IPv6" if it is a valid IPv6 address, or "Neither" if it is not a valid IP address. IPv4 addresses consist of four decimal numbers, each ranging from 0 to 255, separated by dots (`.`). IPv6 addresses consist of eight groups of four hexadecimal digits, separated by colons (`:`). Leading zeros are not allowed in IPv4, and each group in IPv6 may contain 1 to 4 hexadecimal characters.

## Examples
| Input | Output | Explanation |
|-------|--------|-------------|
| "172.16.254.1" | "IPv4" | Four decimal numbers within range, no leading zeros. |
| "2001:0db8:85a3:0:0:8A2E:0370:7334" | "IPv6" | Eight groups of valid hexadecimal numbers. |
| "256.256.256.256" | "Neither" | Numbers exceed 255, invalid IPv4. |

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