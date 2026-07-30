# 1797. Design Authentication Manager

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-authentication-manager](https://leetcode.com/problems/design-authentication-manager)
**Companies:** Atlassian, Confluent, Deliveroo, Docusign, Microsoft, Ncr, Oracle, Twitter

---

## Problem Description

Design an authentication manager that issues tokens with a time‑to‑live (TTL). It must support generating a token, renewing a token only if it hasn't expired, and counting how many tokens are still valid at a given time.

---

## Approach

```text
CLASS AuthenticationManager:
    SET ttl ← given timeToLive
    SET tokens ← empty map   // tokenId → expiryTime

    FUNCTION generate(tokenId, currentTime):
        SET tokens[tokenId] ← currentTime + ttl

    FUNCTION renew(tokenId, currentTime):
        IF tokenId IN tokens AND tokens[tokenId] > currentTime:
            SET tokens[tokenId] ← currentTime + ttl

    FUNCTION countUnexpiredTokens(currentTime):
        SET count ← 0
        FOR each expiry IN tokens.values():
            IF expiry > currentTime:
                INCREMENT count
        RETURN count
```

---

## Examples

**Example 1:**
```
Input: ["AuthenticationManager","generate","renew","countUnexpiredTokens","renew","countUnexpiredTokens"],
       [[5],["aaa",1],["aaa",2],[2],["aaa",6],[7]]
Output: [null,null,null,1,null,0]
Explanation:
AuthenticationManager am = new AuthenticationManager(5);
am.generate("aaa", 1); // token "aaa" expires at time 6
am.renew("aaa", 2);   // token "aaa" now expires at time 7
am.countUnexpiredTokens(2); // returns 1
am.renew("aaa", 6);   // token "aaa" expired at time 7, renewal ignored
am.countUnexpiredTokens(7); // returns 0
```

---

## Walkthrough

| Step | Operation | Tokens Map | Explanation |
|------|-----------|------------|-------------|
| 1 | `generate("aaa",1)` | {"aaa":6} | Token expires at 1+5 |
| 2 | `renew("aaa",2)` | {"aaa":7} | Still valid, extend expiry |
| 3 | `countUnexpiredTokens(2)` | – | Only "aaa" > 2, count = 1 |
| 4 | `renew("aaa",6)` | {"aaa":7} | Expiry (7) > 6, renewal allowed |
| 5 | `countUnexpiredTokens(7)` | – | No token > 7, count = 0 |

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(1) for `generate`/`renew`; O(n) for `countUnexpiredTokens` where n is number of stored tokens |
| **Space** | O(n) to store token expiry times |

---

## Follow-Up Questions

1. How can you achieve O(1) `countUnexpiredTokens` using a priority queue to lazily remove expired tokens?
2. How would you handle token revocation before its TTL expires?
3. How can you scale the manager across multiple servers while keeping token state consistent?

---

## Key Takeaway

> **A hash map tracks token expiry; renew only unexpired tokens. For faster counting, combine with a min‑heap of expiries for O(1) queries.**