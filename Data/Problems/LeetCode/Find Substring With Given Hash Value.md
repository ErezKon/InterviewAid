# 2156. Find Substring With Given Hash Value

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-substring-with-given-hash-value](https://leetcode.com/problems/find-substring-with-given-hash-value)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Reverse Rolling Hash — O(n) ✅](#4-approach-reverse-rolling-hash--on-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given a string `s`, integers `power`, `modulo`, `k`, and `hashValue`, find the **first substring** of length `k` whose hash equals `hashValue`. The hash function is:

`hash(s, p, m) = (val(s[0]) * p⁰ + val(s[1]) * p¹ + ... + val(s[k-1]) * p^(k-1)) mod m`

where `val(c) = c - 'a' + 1`.

**Constraints:**
- `1 <= k <= s.length <= 2 * 10⁴`
- `1 <= power, modulo <= 10⁹`

---

## 2. Examples

```
Example 1:
  Input:  s = "leetcode", power = 7, modulo = 20, k = 2, hashValue = 0
  Output: "ee"
  Reason: hash("ee") = (5*1 + 5*7) % 20 = 40 % 20 = 0.
```

---

## 3. Key Insight

> Slide **right to left** to avoid computing modular inverse. When moving the window left by one character, the hash update only requires multiplication (not division): `hash = (hash * power + val(s[i])) mod modulo`, and subtract the leaving character times `power^k`.

---

## 4. Approach: Reverse Rolling Hash — O(n) ✅

```
FUNCTION subStrHash(s, power, modulo, k, hashValue):
    n ← LENGTH(s)
    hash ← 0
    pk ← 1    // power^k mod modulo
    result ← 0

    // Build initial window from the right
    FOR i ← n - 1 DOWNTO 0 DO
        hash ← (hash * power + VAL(s[i])) MOD modulo
        IF i >= n - k THEN
            IF i == n - k THEN pk ← 1
            // still building the first window
        IF i <= n - k THEN
            IF i < n - k THEN
                // Remove rightmost character of previous window
                hash ← (hash - VAL(s[i + k]) * pk) MOD modulo
                hash ← (hash + modulo) MOD modulo
            IF hash == hashValue THEN
                result ← i

    RETURN s[result : result + k]
```

---

## 5. Walkthrough

```
s = "leetcode", power=7, modulo=20, k=2

Scanning right to left, compute rolling hash for each window of length 2:
  "de": hash = (4*1 + 5*7) % 20 = 39 % 20 = 19
  "od": hash = (15*1 + 4*7) % 20 = 43 % 20 = 3
  "co": hash = (3*1 + 15*7) % 20 = 108 % 20 = 8
  "ec": hash = (5*1 + 3*7) % 20 = 26 % 20 = 6
  "te": hash = (20*1 + 5*7) % 20 = 55 % 20 = 15
  "et": hash = (5*1 + 20*7) % 20 = 145 % 20 = 5
  "ee": hash = (5*1 + 5*7) % 20 = 40 % 20 = 0 ✅
  "le": hash = (12*1 + 5*7) % 20 = 47 % 20 = 7

First (leftmost) match: "ee" at index 1. Result: "ee" ✅
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) — single reverse pass |
| **Space** | O(1) |

---

## 7. Follow-Up Questions

### 7.1 Why iterate right to left?

The hash formula uses increasing powers from left to right. Sliding left-to-right would require dividing by `power` (modular inverse), which may not exist. Right-to-left avoids this entirely.

### 7.2 What if we need all matching substrings?

Collect all indices where the hash matches instead of just tracking the leftmost.

### 7.3 How does this relate to Rabin-Karp?

Same concept — rolling polynomial hash. Rabin-Karp is typically used for string matching; this problem directly asks for the hash value.

---

## 8. Key Takeaway

> **Reverse rolling hash** avoids modular inverse by scanning right to left. The hash update only needs multiplication and addition, making it both simpler and numerically safer.
