# 2189. Number of Ways to Build House of Cards

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-ways-to-build-house-of-cards](https://leetcode.com/problems/number-of-ways-to-build-house-of-cards)
**Companies:** Airbnb

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: DP — O(n²)](#3-approach)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

You are given an integer `n` representing the number of playing cards you have. A **house of cards** meets the following conditions:

- A **house of cards** consists of one or more rows of **triangles** and horizontal cards.
- **Triangles** are created by leaning two cards against each other.
- One card must be placed horizontally between **all adjacent** triangles in a row.
- Any triangle on a row higher than the first must be placed on a horizontal card from the previous row.
- Each triangle is placed in the **leftmost** available spot in the row.

Return *the number of **distinct** **house of cards** you can build using **all*** `n`* cards.* Two houses of cards are considered distinct if there exists a row where the two houses contain a different number of cards.

**Constraints:**
- `1 <= n <= 500`

---

## 2. Key Insight

> DP on remaining cards and minimum row width. A row of width `w` costs `3w - 1` cards. Next row must be strictly smaller.

---

## 3. Approach: DP — O(n²) ✅

```text
FUNCTION houseOfCards(n):
    // dp(cards, maxWidth) = ways using exactly cards with rows ≤ maxWidth
    MEMO dp(cards, maxW):
        IF cards == 0: RETURN 1
        result ← 0
        FOR w ← 1 TO maxW:
            cost ← 3 * w - 1
            IF cost > cards: BREAK
            result ← result + dp(cards - cost, w - 1)
        RETURN result
    RETURN dp(n, n)
```

---

## 4. Examples

**Example 1:**
```
Input: n = 16
Output: 2
Explanation: The two valid houses of cards are shown.
The third house of cards in the diagram is not valid because the rightmost triangle on the top row is not placed on top of a horizontal card.
```

**Example 2:**
```
Input: n = 2
Output: 1
Explanation: The one valid house of cards is shown.
```

**Example 3:**
```
Input: n = 4
Output: 0
Explanation: The three houses of cards in the diagram are not valid.
The first house of cards needs a horizontal card placed between the two triangles.
The second house of cards uses 5 cards.
The third house of cards uses 2 cards.
```

---

## 5. Walkthrough

**Example `n = 7`**:
1. Start with `dp(7,7)`. Try widths `w = 1..2` (since `3*3-1=8` > 7).
2. `w = 1` uses `2` cards, recurse `dp(5,0)` → 0 (no width left).
3. `w = 2` uses `5` cards, recurse `dp(2,1)`.
4. `dp(2,1)` tries `w = 1` (cost 2) → `dp(0,0)` = 1.
5. Sum = 1, so total ways = 1.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n²) |
| **Space** | O(n²) |

---

## 7. Key Takeaway

> **DP on remaining cards + max row width.** Each row costs `3w - 1`. Rows must strictly decrease in width. Enumerate valid row widths greedily.
