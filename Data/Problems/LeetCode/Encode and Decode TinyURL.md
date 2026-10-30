# 535. Encode and Decode TinyURL

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/encode-and-decode-tinyurl](https://leetcode.com/problems/encode-and-decode-tinyurl)
**Companies:** Amazon, Apple, Google, Meta, Microsoft, Revolut, Salesforce, Shopify, Uber

---

## Table of Contents
- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Hash Map with Random Key](#approach-hash-map-with-random-key--o1-)
- [Examples](#examples)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

**Note: This is a companion problem to the System Design problem: Design TinyURL.**

TinyURL is a URL shortening service where you enter a URL such as `https://leetcode.com/problems/design-tinyurl` and it returns a short URL such as `http://tinyurl.com/4e9iAk`. Design a class to encode a URL and decode a tiny URL.

There is no restriction on how your encode/decode algorithm should work. You just need to ensure that a URL can be encoded to a tiny URL and the tiny URL can be decoded to the original URL.

Implement the `Solution` class:

- `Solution()` Initializes the object of the system.
- `String encode(String longUrl)` Returns a tiny URL for the given `longUrl`.
- `String decode(String shortUrl)` Returns the original long URL for the given `shortUrl`. It is guaranteed that the given `shortUrl` was encoded by the same object.

**Constraints:**
- `1 <= url.length <= 10^4`
- `url` is guranteed to be a valid URL.

---

## Key Insight

> Generate a random 6-character key from `[a-zA-Z0-9]` (62⁶ ≈ 56 billion combinations). Store bidirectional mappings. Re‑generate on collision. For idempotency, cache `longUrl → shortUrl` so the same URL always gets the same short code.

---

## Approach: Hash Map with Random Key — O(1) ✅

```
CLASS Codec:
    CONSTRUCTOR:
        longToShort = {}
        shortToLong = {}
        chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

    FUNCTION encode(longUrl):
        IF longUrl IN longToShort: RETURN longToShort[longUrl]
        key = generate 6 random chars
        WHILE key IN shortToLong: key = generate 6 random chars
        short = "http://tinyurl.com/" + key
        longToShort[longUrl] = short
        shortToLong[short] = longUrl
        RETURN short

    FUNCTION decode(shortUrl):
        RETURN shortToLong[shortUrl]
```

---

## Examples

**Example 1:**
```
Input: url = "https://leetcode.com/problems/design-tinyurl"
Output: "https://leetcode.com/problems/design-tinyurl"
Explanation: Solution obj = new Solution();
string tiny = obj.encode(url); // returns the encoded tiny url.
string ans = obj.decode(tiny); // returns the original url after decoding it.
```

---

## Walkthrough

1. **First call to `encode`** with a new URL:
   - No entry in `longToShort`, generate a random 6‑char key.
   - Ensure the key is unique (check `shortToLong`).
   - Store mappings in both dictionaries.
2. **Subsequent call to `encode`** with the same URL:
   - Find the URL in `longToShort` and return the existing short code.
3. **Calling `decode`**:
   - Look up the short URL in `shortToLong` and return the associated long URL.
4. **Collision handling**:
   - If a generated key already exists, repeat generation until a free key is found (collision probability is negligible with 62⁶ space).

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| **Encode** | O(1) amortized (collision rare with 62⁶ space) |
| **Decode** | O(1) hash lookup |
| **Space** | O(n) for n URLs |

---

## Follow-Up Questions

**Q1: What about using an auto‑incrementing counter instead of random?**
> Counter → base62 encoding gives predictable, sequential short URLs. Simpler but URLs are guessable (security concern).

**Q2: How would you scale this for production?**
> Distributed key generation (e.g., ID ranges per server), database‑backed storage, caching layer, and 301/302 redirects.

**Q3: What if the same long URL is encoded twice?**
> The `longToShort` cache ensures idempotency — same long URL always returns the same short URL.

---

## Key Takeaway

> **URL shortening = bidirectional hash map + random key generation. In interviews, discuss trade‑offs: random vs counter, collision handling, and scaling to distributed systems.**