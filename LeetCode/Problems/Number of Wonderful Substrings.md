# 1915. Number of Wonderful Substrings

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-wonderful-substrings](https://leetcode.com/problems/number-of-wonderful-substrings)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Bitmask Prefix XOR — O(n · 10)](#4-approach)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Count substrings where at most one character has odd frequency. String uses first 10 lowercase letters.

---

## 2. Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| "aba" | 4 | Substrings: "a", "b", "a", "aba" ("aba" has only one odd count) |
| "aabb" | 9 | All substrings except those with two odd counts |

---

## 3. Key Insight

> Track character parity as a 10-bit bitmask. A "wonderful" substring has XOR of parities = 0 (all even) or has exactly one bit set. Check prefix XOR against all seen prefixes with same or 1-bit-different mask.

---

## 4. Approach: Bitmask Prefix XOR — O(n · 10) ✅

```text
FUNCTION wonderfulSubstrings(word):
    count ← {0: 1}    // prefix parity bitmask → frequency
    mask ← 0; result ← 0
    FOR c IN word:
        mask ^= (1 << (c - 'a'))
        result += count.get(mask, 0)    // all even
        FOR i ← 0 TO 9:
            result += count.get(mask ^ (1 << i), 0)    // one odd
        count[mask] ← count.get(mask, 0) + 1
    RETURN result
```

---

## 5. Walkthrough

Consider "aba":

1. Start with mask=0, count{0}=1.
2. Char 'a' → mask=1. Add count[1]=0 and count[1^1<<i] for i=0..9 → only i=0 gives count[0]=1 → result=1. Update count[1]=1.
3. Char 'b' → mask=1^2=3. Add count[3]=0 and check masks differing by one bit: mask^1=2 (0), mask^2=1 (1) → result+=1 → total=2. Update count[3]=1.
4. Char 'a' → mask=3^1=2. Add count[2]=0 and masks differing by one bit: mask^2=0 (1) → result+=1 → total=3. Also mask^1=3 (1) → total=4. Update count[2]=1.
All 4 wonderful substrings counted.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n · 10) |
| **Space** | O(2^10) = O(1024) |

---

## 7. Key Takeaway

> **Bitmask parity + prefix XOR.** "At most one odd" = same mask OR differ by one bit. Check 11 masks per position (same + 10 single-bit flips).