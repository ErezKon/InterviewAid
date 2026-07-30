# 2609. Find the Longest Balanced Substring of a Binary String

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-the-longest-balanced-substring-of-a-binary-string](https://leetcode.com/problems/find-the-longest-balanced-substring-of-a-binary-string)
**Companies:** Tinkoff

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Count Consecutive 0s and 1s — O(n) ✅](#4-approach-count-consecutive-0s-and-1s--on-)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Key Takeaway](#6-key-takeaway)

---

## 1. Problem Description

Given a binary string `s`, find the length of the **longest balanced substring** — a substring of consecutive 0s followed by an equal number of consecutive 1s (e.g., "0011", "000111").

**Constraints:**
- `1 <= s.length <= 50`

---

## 2. Examples

```
Example 1:
  Input:  s = "01000111"
  Output: 6
  Reason: "000111" is balanced with 3 zeros and 3 ones.

Example 2:
  Input:  s = "00111"
  Output: 4
  Reason: "0011" is balanced.
```

---

## 3. Key Insight

> Track consecutive counts of 0s and 1s. When transitioning from 0→1, the balanced length is `2 × min(zeros, ones)`. Reset zero count when a new group of 0s starts.

---

## 4. Approach: Count Consecutive 0s and 1s — O(n) ✅

```
FUNCTION findTheLongestBalancedSubstring(s):
    zeros ← 0; ones ← 0; maxLen ← 0
    FOR i ← 0 TO LENGTH(s) - 1 DO
        IF s[i] == '0' THEN
            IF i > 0 AND s[i-1] == '1' THEN
                zeros ← 0    // reset after a 1→0 transition
            zeros += 1
        ELSE
            ones += 1
            maxLen ← MAX(maxLen, 2 * MIN(zeros, ones))
    RETURN maxLen
```

---

## 5. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) — single pass |
| **Space** | O(1) |

---

## 6. Key Takeaway

> **Count runs of 0s then 1s** — balanced substrings are always `000...111...` form. Track consecutive counts and take `2 * min(zeros, ones)` at each 1.
