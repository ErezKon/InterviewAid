# 2698. Find the Punishment Number of an Integer

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-the-punishment-number-of-an-integer](https://leetcode.com/problems/find-the-punishment-number-of-an-integer)
**Companies:** Amazon, Bloomberg, Google, Meta
---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Backtracking — O(n · 2^d) ✅](#4-approach-backtracking--on--2d-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)
---

## 1. Problem Description

Given a positive integer `n`, return *the **punishment number*** of `n`.

The **punishment number** of `n` is defined as the sum of the squares of all integers `i` such that:

- `1 <= i <= n`
- The decimal representation of `i * i` can be partitioned into contiguous substrings such that the sum of the integer values of these substrings equals `i`.

**Constraints:**
- `1 <= n <= 1000`

---

## 2. Examples

**Example 1:**
```
Input: n = 10
Output: 182
Explanation: There are exactly 3 integers i in the range [1, 10] that satisfy the conditions in the statement:
- 1 since 1 * 1 = 1
- 9 since 9 * 9 = 81 and 81 can be partitioned into 8 and 1 with a sum equal to 8 + 1 == 9.
- 10 since 10 * 10 = 100 and 100 can be partitioned into 10 and 0 with a sum equal to 10 + 0 == 10.
Hence, the punishment number of 10 is 1 + 81 + 100 = 182
```

**Example 2:**
```
Input: n = 37
Output: 1478
Explanation: There are exactly 4 integers i in the range [1, 37] that satisfy the conditions in the statement:
- 1 since 1 * 1 = 1.
- 9 since 9 * 9 = 81 and 81 can be partitioned into 8 + 1.
- 10 since 10 * 10 = 100 and 100 can be partitioned into 10 + 0.
- 36 since 36 * 36 = 1296 and 1296 can be partitioned into 1 + 29 + 6.
Hence, the punishment number of 37 is 1 + 81 + 100 + 1296 = 1478
```

---

## 3. Key Insight

> For each `i`, check if the string representation of `i²` can be split into contiguous parts summing to `i`. This is a backtracking/recursion problem on digit strings.
---

## 4. Approach: Backtracking — O(n · 2^d) ✅

```text
FUNCTION punishmentNumber(n):
    FUNCTION canPartition(s, target):
        IF target == 0 AND s == "": RETURN true
        IF target < 0 OR s == "": RETURN false
        FOR i ← 1 TO LENGTH(s) DO
            part ← INT(s[0:i])
            IF canPartition(s[i:], target - part): RETURN true
        RETURN false

    total ← 0
    FOR i ← 1 TO n DO
        IF canPartition(STR(i * i), i):
            total += i * i
    RETURN total
```
---

## 5. Walkthrough

Take `n = 7`:
1. `i = 1`: `1² = "1"`. `canPartition("1", 1)` → true (single part). Add `1`.
2. `i = 2`: `2² = "4"`. `canPartition("4", 2)` → false.
3. `i = 5`: `5² = "25"`. Try splits:
   - "2" + "5" = 7 → not 5.
   - "25" = 25 → >5.
   No valid partition, so skip.
4. `i = 6`: `6² = "36"`. Splits:
   - "3" + "6" = 9 → not 6.
   - "36" = 36 → >6.
   Skip.
5. `i = 7`: `7² = "49"`. Splits:
   - "4" + "9" = 13 → not 7.
   - "49" = 49 → >7.
   Skip.
Only `i = 1` contributes, total = 1.
---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n · 2^d) where d = digits of i² (≤ 7) |
| **Space** | O(d) — recursion depth |
---

## 7. Key Takeaway

> **Backtracking on digit partitions** — try all ways to split the squared number's string and check if parts sum to `i`. The small digit count (≤ 7) keeps it fast.
