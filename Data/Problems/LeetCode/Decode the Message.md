# 2325. Decode the Message

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/decode-the-message](https://leetcode.com/problems/decode-the-message)
**Companies:** Amazon, Coinbase, Google, Meta

---

## Problem Description

Given a `key` string, build a substitution cipher by mapping first occurrence of each letter to `a, b, c, ...`. Decode `message` using this mapping.

---

## Examples

| key | message | output |
|---|---|---|
| "the quick brown fox jumps over the lazy dog" | "vkbs bs t suepuv" | "this is a secret" |
| "elj a" | "elj a" | "abc d" |

*Explanation*: In the first example, the mapping starts with `t→a, h→b, e→c, …`. Applying it to the message yields the decoded string.

---

## Approach

```
FUNCTION decodeMessage(key, message):
    mapping ← {}
    idx ← 0
    FOR c IN key:
        IF c ≠ ' ' AND c NOT IN mapping:
            mapping[c] ← CHAR('a' + idx)
            idx ← idx + 1
    result ← ''
    FOR c IN message:
        result ← result + (mapping[c] IF c IN mapping ELSE c)
    RETURN result
```

---

## Walkthrough

**Example 1** – key: "the quick brown fox jumps over the lazy dog", message: "vkbs bs t suepuv"
1. Build mapping while scanning key:
   - `t→a`, `h→b`, `e→c`, `q→d`, `u→e`, `i→f`, `c→g`, `k→h`, `b→i`, `r→j`, `o→k`, `w→l`, `n→m`, `f→n`, `x→o`, `j→p`, `m→q`, `p→r`, `s→s`, `v→t`, `l→u`, `a→v`, `z→w`, `y→x`, `d→y`, `g→z`.
2. Decode each character of the message using the mapping:
   - `v→t`, `k→h`, `b→i`, `s→s` → "this"
   - space remains space, repeat for the rest → "this is a secret".

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n + m) |
| **Space** | O(1) — 26‑char mapping |

---

## Follow-Up Questions

1. How would you modify the algorithm if the key could contain uppercase letters and you need case‑preserving decoding?
2. Can the mapping be built in a single pass without storing the entire `key` string?
3. How would you handle non‑alphabetic characters that should also be mapped uniquely?

---

## Key Takeaway

> **Substitution cipher: build mapping from first‑occurrence order in the key, then translate each character. Spaces and non‑letters pass through unchanged.**