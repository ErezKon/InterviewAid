# 2325. Decode the Message

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/decode-the-message](https://leetcode.com/problems/decode-the-message)
**Companies:** Amazon, Coinbase, Google, Meta

---

## Problem Description

Given a `key` string, build a substitution cipher by mapping first occurrence of each letter to `a, b, c, ...`. Decode `message` using this mapping.

---

## Approach

```
FUNCTION decodeMessage(key, message):
    mapping = {}; idx = 0
    FOR c IN key:
        IF c != ' ' AND c NOT IN mapping:
            mapping[c] = chr(ord('a') + idx)
            idx += 1
    RETURN JOIN(mapping.get(c, c) for c in message)
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n + m) |
| **Space** | O(1) — 26-char mapping |

---

## Key Takeaway

> **Substitution cipher: build mapping from first-occurrence order in the key, then translate each character. Spaces and non-letters pass through unchanged.**
