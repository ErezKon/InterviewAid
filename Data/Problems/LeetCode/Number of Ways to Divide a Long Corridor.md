# 2147. Number of Ways to Divide a Long Corridor

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/number-of-ways-to-divide-a-long-corridor](https://leetcode.com/problems/number-of-ways-to-divide-a-long-corridor)

**Companies:** Bloomberg, Microsoft, Zomato

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Multiply Gaps — O(n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Along a long library corridor, there is a line of seats and decorative plants. You are given a **0-indexed** string `corridor` of length `n` consisting of letters `'S'` and `'P'` where each `'S'` represents a seat and each `'P'` represents a plant.

One room divider has **already** been installed to the left of index `0`, and **another** to the right of index `n - 1`. Additional room dividers can be installed. For each position between indices `i - 1` and `i` (`1 <= i <= n - 1`), at most one divider can be installed.

Divide the corridor into non-overlapping sections, where each section has **exactly two seats** with any number of plants. There may be multiple ways to perform the division. Two ways are **different** if there is a position with a room divider installed in the first way but not in the second way.

Return *the number of ways to divide the corridor*. Since the answer may be very large, return it **modulo** `10^9 + 7`. If there is no way, return `0`.

**Constraints:**
- `n == corridor.length`
- `1 <= n <= 10^5`
- `corridor[i]` is either `'S'` or `'P'`.

---

## Examples

**Example 1:**
```
Input: corridor = "SSPPSPS"
Output: 3
Explanation: There are 3 different ways to divide the corridor.
The black bars in the above image indicate the two room dividers already installed.
Note that in each of the ways, each section has exactly two seats.
```

**Example 2:**
```
Input: corridor = "PPSPSP"
Output: 1
Explanation: There is only 1 way to divide the corridor, by not installing any additional dividers.
Installing any would create some section that does not have exactly two seats.
```

**Example 3:**
```
Input: corridor = "S"
Output: 0
Explanation: There is no way to divide the corridor because there will always be a section that does not have exactly two seats.
```

---

## 2. Key Insight

> Between each pair of sections (2nd seat of one group and 1st seat of next), the divider can go in any of the plant positions between them. Multiply the gaps.

---

## 3. Approach: Multiply Gaps — O(n) ✅

```text
FUNCTION numberOfWays(corridor):
    MOD ← 10^9 + 7
    seats ← [i FOR i, c IN ENUMERATE(corridor) IF c = 'S']
    IF LENGTH(seats) = 0 OR LENGTH(seats) MOD 2 ≠ 0: RETURN 0
    result ← 1
    FOR i ← 2 TO LENGTH(seats) - 1 STEP 2:
        gap ← seats[i] - seats[i-1]
        result ← (result * gap) MOD MOD
    RETURN result
```

---

## Walkthrough

Consider the corridor "S P S P S" (spaces for readability):
1. Seat indices = [0,2,4]
2. Pairs: (0,2) and (2,4) → gaps = 2-0 = 2 and 4-2 = 2
3. Multiply gaps: 2 * 2 = 4 → 4 possible divider placements.
4. Apply modulo if needed.

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(S) where S = seat count |

---

## Follow-Up Questions

1. How would the solution change if each section must contain exactly **k** seats?
2. Can you extend the approach to handle multiple types of dividers with different constraints?

---

## 5. Key Takeaway

> **Multiply gap sizes between seat pairs.** Each gap between the 2nd seat of one pair and the 1st of the next offers `gap_size` divider positions. Product of all gaps = answer.
