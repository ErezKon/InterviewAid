# 2325. Decode the Message

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/decode-the-message](https://leetcode.com/problems/decode-the-message)
**Companies:** Amazon, Coinbase, Google, Meta

---

## Problem Description

You are given the strings `key` and `message`, which represent a cipher key and a secret message, respectively. The steps to decode `message` are as follows:

- Use the **first** appearance of all 26 lowercase English letters in `key` as the **order** of the substitution table.
- Align the substitution table with the regular English alphabet.
- Each letter in `message` is then **substituted** using the table.
- Spaces `' '` are transformed to themselves.

- For example, given `key = "**hap**p**y** **bo**y"` (actual key would have **at least one** instance of each letter in the alphabet), we have the partial substitution table of (`'h' -> 'a'`, `'a' -> 'b'`, `'p' -> 'c'`, `'y' -> 'd'`, `'b' -> 'e'`, `'o' -> 'f'`).

Return *the decoded message*.

**Constraints:**
- `26 <= key.length <= 2000`
- `key` consists of lowercase English letters and `' '`.
- `key` contains every letter in the English alphabet (`'a'` to `'z'`) **at least once**.
- `1 <= message.length <= 2000`
- `message` consists of lowercase English letters and `' '`.

---

## Examples

**Example 1:**
```
Input: key = "the quick brown fox jumps over the lazy dog", message = "vkbs bs t suepuv"
Output: "this is a secret"
Explanation: The diagram above shows the substitution table.
It is obtained by taking the first appearance of each letter in "the quick brown fox jumps over the lazy dog".
```

**Example 2:**
```
Input: key = "eljuxhpwnyrdgtqkviszcfmabo", message = "zwx hnfx lqantp mnoeius ycgk vcnjrdb"
Output: "the five boxing wizards jump quickly"
Explanation: The diagram above shows the substitution table.
It is obtained by taking the first appearance of each letter in "eljuxhpwnyrdgtqkviszcfmabo".
```

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
| **Space** | O(1) — 26-char mapping |

---

## Follow-Up Questions

1. How would you modify the algorithm if the key could contain uppercase letters and you need case-preserving decoding?
2. Can the mapping be built in a single pass without storing the entire `key` string?
3. How would you handle non-alphabetic characters that should also be mapped uniquely?

---

## Key Takeaway

> **Substitution cipher: build mapping from first-occurrence order in the key, then translate each character. Spaces and non-letters pass through unchanged.**