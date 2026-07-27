# 647. Palindromic Substrings

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/palindromic-substrings](https://leetcode.com/problems/palindromic-substrings)
**Companies:** Akamai, Amazon, Anduril, Apple, Arista Networks, Bloomberg, Bny Mellon, Capital One, Cisco, Citadel, Epic Systems, Goldman Sachs, Google, Hcl, Ibm, Intuit, Linkedin, Meta, Microsoft, Netskope, Oracle, Paypal, Pure Storage, Salesforce, Walmart Labs

---

## 1. Problem Description

Given a string `s`, return the number of palindromic substrings.

---

## 2. Approach: Expand Around Center — O(n²) ✅

```
FUNCTION countSubstrings(s):
    count = 0

    FUNCTION expand(l, r):
        WHILE l >= 0 AND r < n AND s[l] == s[r]:
            count += 1
            l -= 1
            r += 1

    FOR i ← 0 TO n - 1:
        expand(i, i)       // odd length
        expand(i, i + 1)   // even length

    RETURN count
```

| Time | Space |
|------|-------|
| O(n²) | O(1) |

---

## Key Takeaway

> Same technique as Longest Palindromic Substring (#5) but count instead of track max. 2n-1 centers, expand each.
