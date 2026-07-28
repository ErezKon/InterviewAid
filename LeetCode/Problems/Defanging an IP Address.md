# 1108. Defanging an IP Address

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/defanging-an-ip-address](https://leetcode.com/problems/defanging-an-ip-address)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Robinhood, Zoho

---

## Problem Description

Replace every `"."` in an IP address with `"[.]"`.

---

## Examples

| Input | Output |
|-------|--------|
| "1.1.1.1" | "1[.]1[.]1[.]1" |
| "255.100.50.0" | "255[.]100[.]50[.]0" |

---

## Approach

```
FUNCTION defangIPaddr(address):
    RETURN address.REPLACE(".", "[.]")
```

---

## Walkthrough

1. Start with the original string `"1.1.1.1"`.
2. Scan each character; when a dot `'.'` is encountered, replace it with the substring `'[.]'`.
3. Concatenate the characters and replacements to form `"1[.]1[.]1[.]1"`.
4. Return the transformed string.

---

## Complexity Analysis

- **Time:** O(n) – each character of the input string is visited once.
- **Space:** O(n) – a new string of the same length (plus extra characters for each dot) is created.

---

## Follow-Up Questions

- How would you handle IPv6 addresses with colons `:` instead of dots?
- Can you perform the transformation in-place without allocating a new string?

---

## Key Takeaway

> **Simple string replacement. One-liner using built-in replace.**