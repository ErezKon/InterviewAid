# 2189. Number of Ways to Build House of Cards

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-ways-to-build-house-of-cards](https://leetcode.com/problems/number-of-ways-to-build-house-of-cards)
**Companies:** Airbnb

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: DP — O(n²)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given `n` cards, count ways to build a house of cards. Each row of width `w` uses `3w - 1` cards (w triangles + w-1 flat connectors). Rows must decrease upward.

---

## 2. Key Insight

> DP on remaining cards and minimum row width. A row of width `w` costs `3w - 1` cards. Next row must be strictly smaller.

---

## 3. Approach: DP — O(n²) ✅

```
FUNCTION houseOfCards(n):
    // dp(cards, maxWidth) = ways using exactly cards with rows ≤ maxWidth
    MEMO dp(cards, maxW):
        IF cards == 0: RETURN 1
        result = 0
        FOR w ← 1 TO maxW:
            cost = 3 * w - 1
            IF cost > cards: BREAK
            result += dp(cards - cost, w - 1)
        RETURN result
    RETURN dp(n, n)
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n²) |
| **Space** | O(n²) |

---

## 5. Key Takeaway

> **DP on remaining cards + max row width.** Each row costs `3w - 1`. Rows must strictly decrease in width. Enumerate valid row widths greedily.
