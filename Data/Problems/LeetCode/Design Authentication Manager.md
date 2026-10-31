# 1797. Design Authentication Manager

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-authentication-manager](https://leetcode.com/problems/design-authentication-manager)
**Companies:** Atlassian, Confluent, Deliveroo, Docusign, Microsoft, Ncr, Oracle, Twitter

---

## Problem Description

There is an authentication system that works with authentication tokens. For each session, the user will receive a new authentication token that will expire `timeToLive` seconds after the `currentTime`. If the token is renewed, the expiry time will be **extended** to expire `timeToLive` seconds after the (potentially different) `currentTime`.

Implement the `AuthenticationManager` class:

- `AuthenticationManager(int timeToLive)` constructs the `AuthenticationManager` and sets the `timeToLive`.
- `generate(string tokenId, int currentTime)` generates a new token with the given `tokenId` at the given `currentTime` in seconds.
- `renew(string tokenId, int currentTime)` renews the **unexpired** token with the given `tokenId` at the given `currentTime` in seconds. If there are no unexpired tokens with the given `tokenId`, the request is ignored, and nothing happens.
- `countUnexpiredTokens(int currentTime)` returns the number of **unexpired** tokens at the given currentTime.

Note that if a token expires at time `t`, and another action happens on time `t` (`renew` or `countUnexpiredTokens`), the expiration takes place **before** the other actions.

**Constraints:**

- `1 <= timeToLive <= 10^8`
- `1 <= currentTime <= 10^8`
- `1 <= tokenId.length <= 5`
- `tokenId` consists only of lowercase letters.
- All calls to `generate` will contain unique values of `tokenId`.
- The values of `currentTime` across all the function calls will be **strictly increasing**.
- At most `2000` calls will be made to all functions combined.

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

```
Example 1:
  Input:
  ["AuthenticationManager", "renew", "generate", "countUnexpiredTokens", "generate", "renew", "renew", "countUnexpiredTokens"]
  [[5], ["aaa", 1], ["aaa", 2], [6], ["bbb", 7], ["aaa", 8], ["bbb", 10], [15]]
  Output:
  [null, null, null, 1, null, null, null, 0]
  Explanation:
  AuthenticationManager authenticationManager = new AuthenticationManager(5); // Constructs the AuthenticationManager with timeToLive = 5 seconds.
  authenticationManager.renew("aaa", 1); // No token exists with tokenId "aaa" at time 1, so nothing happens.
  authenticationManager.generate("aaa", 2); // Generates a new token with tokenId "aaa" at time 2.
  authenticationManager.countUnexpiredTokens(6); // The token with tokenId "aaa" is the only unexpired one at time 6, so return 1.
  authenticationManager.generate("bbb", 7); // Generates a new token with tokenId "bbb" at time 7.
  authenticationManager.renew("aaa", 8); // The token with tokenId "aaa" expired at time 7, and 8 >= 7, so at time 8 the renew request is ignored, and nothing happens.
  authenticationManager.renew("bbb", 10); // The token with tokenId "bbb" is unexpired at time 10, so the renew request is fulfilled and now the token will expire at time 15.
  authenticationManager.countUnexpiredTokens(15); // The token with tokenId "bbb" expires at time 15, and the token with tokenId "aaa" expired at time 7, so currently no token is unexpired, so return 0.
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

> **A hash map tracks token expiry; renew only unexpired tokens. For faster counting, combine with a min-heap of expiries for O(1) queries.**