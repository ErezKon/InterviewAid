# 1915. Number of Wonderful Substrings

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-wonderful-substrings](https://leetcode.com/problems/number-of-wonderful-substrings)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Bitmask Prefix XOR — O(n · 10)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Count substrings where at most one character has odd frequency. String uses first 10 lowercase letters.

---

## 2. Key Insight

> Track character parity as a 10-bit bitmask. A "wonderful" substring has XOR of parities = 0 (all even) or has exactly one bit set. Check prefix XOR against all seen prefixes with same or 1-bit-different mask.

---

## 3. Approach: Bitmask Prefix XOR — O(n · 10) ✅

```
FUNCTION wonderfulSubstrings(word):
    count = {0: 1}    // prefix parity bitmask → frequency
    mask = 0; result = 0
    FOR c IN word:
        mask ^= (1 << (c - 'a'))
        result += count.get(mask, 0)    // all even
        FOR i ← 0 TO 9:
            result += count.get(mask ^ (1 << i), 0)    // one odd
        count[mask] = count.get(mask, 0) + 1
    RETURN result
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n · 10) |
| **Space** | O(2^10) = O(1024) |

---

## 5. Key Takeaway

> **Bitmask parity + prefix XOR.** "At most one odd" = same mask OR differ by one bit. Check 11 masks per position (same + 10 single-bit flips).
