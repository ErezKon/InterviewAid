# 2595. Number of Even and Odd Bits

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/number-of-even-and-odd-bits](https://leetcode.com/problems/number-of-even-and-odd-bits)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: Bit Iteration — O(log n)](#2-approach)
3. [Complexity Analysis](#3-complexity-analysis)
4. [Key Takeaway](#4-key-takeaway)

---

## 1. Problem Description

Return `[even, odd]` where `even` = count of set bits at even indices and `odd` = count at odd indices (0-indexed from LSB).

---

## 2. Approach: Bit Iteration — O(log n) ✅

```
FUNCTION evenOddBit(n):
    even = odd = 0
    i = 0
    WHILE n > 0:
        IF n & 1:
            IF i % 2 == 0: even++
            ELSE: odd++
        n >>= 1; i++
    RETURN [even, odd]
```

---

## 3. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(log n) |
| **Space** | O(1) |

---

## 4. Key Takeaway

> **Iterate bits, track position parity.** Simple bit extraction with position tracking.
