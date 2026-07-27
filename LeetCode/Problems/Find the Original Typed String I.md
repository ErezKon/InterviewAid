# 3330. Find the Original Typed String I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-the-original-typed-string-i](https://leetcode.com/problems/find-the-original-typed-string-i)
**Companies:** Amazon, Bloomberg, Google, Lowe, Meta, Microsoft, Tcs

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Count Consecutive Duplicates — O(n) ✅](#3-approach-count-consecutive-duplicates--on-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

A malfunctioning keyboard may repeat a key. Given the typed `word`, count how many possible original strings could have produced it. Each consecutive group of same chars could have 1 to group-length original characters.

**Constraints:**
- `1 <= word.length <= 100`

---

## 2. Key Insight

> Each consecutive group of length `L` contributes `L` possibilities (original had 1, 2, ..., or L of that char). Total = product of all group lengths. But simpler: each duplicate char adds one possibility, so result = 1 + count of consecutive duplicates.

---

## 3. Approach: Count Consecutive Duplicates — O(n) ✅

```
FUNCTION possibleStringCount(word):
    count = 1
    FOR i ← 1 TO len(word) - 1:
        IF word[i] == word[i-1]:
            count += 1
    RETURN count
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## 5. Key Takeaway

> Each consecutive duplicate adds exactly one possible original string. Result = 1 + number of positions where `word[i] == word[i-1]`.
