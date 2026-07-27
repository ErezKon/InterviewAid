# 2222. Number of Ways to Select Buildings

**Difficulty:** 🟡 Medium

**Companies:** Amazon, De Shaw, Dream11

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Counting Sequences — O(n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Select 3 buildings from a binary string such that no two adjacent selected buildings have the same type. Count valid selections ("010" and "101" patterns).

---

## 2. Key Insight

> Track prefix counts of '0' and '1', and two-char sequences "01" and "10". When seeing '0', it extends all "x1" sequences; when seeing '1', it extends all "x0" sequences.

---

## 3. Approach: Counting Sequences — O(n) ✅

```
FUNCTION numberOfWays(s):
    count0 = count1 = 0; seq01 = seq10 = 0; result = 0
    FOR c IN s:
        IF c == '0':
            seq10 += count1
            result += seq01
            count0 += 1
        ELSE:
            seq01 += count0
            result += seq10
            count1 += 1
    RETURN result
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## 5. Key Takeaway

> **Build sequences incrementally.** Track 1-length and 2-length alternating subsequences. Each new character completes a 3-length sequence from the opposite 2-length count.
