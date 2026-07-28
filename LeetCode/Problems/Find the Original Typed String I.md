# 3330. Find the Original Typed String I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-the-original-typed-string-i](https://leetcode.com/problems/find-the-original-typed-string-i)
**Companies:** Amazon, Bloomberg, Google, Lowe, Meta, Microsoft, Tcs

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach](#3-approach)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

A malfunctioning keyboard may repeat a key. Given the typed `word`, count how many possible original strings could have produced it. Each consecutive group of same chars could have 1 to group-length original characters.

**Constraints:**
- `1 <= word.length <= 100`

---

## 2. Examples

| word | Output |
|------|--------|
| "abb" | 2 |
| "aabb" | 3 |
| "abc" | 1 |

*Explanation*: For "abb", the group `b` of length 2 yields two possibilities: original "ab" or "abb".

---

## 3. Approach

```text
FUNCTION possibleStringCount(word):
    SET count ← 1
    FOR i ← 1 TO LENGTH(word) - 1 DO
        IF word[i] = word[i-1] THEN
            SET count ← count + 1
    RETURN count
```

The algorithm scans the string once, incrementing the count whenever a character repeats the previous one.

---

## 4. Walkthrough

Consider `word = "aabb"`.

1. Initialize `count = 1`.
2. `i = 1`: `word[1] = 'a'` equals `word[0] = 'a'` → `count = 2`.
3. `i = 2`: `word[2] = 'b'` differs from `word[1] = 'a'` → `count` unchanged.
4. `i = 3`: `word[3] = 'b'` equals `word[2] = 'b'` → `count = 3`.
5. End of loop, return `3`.

Thus there are three possible original strings: "ab", "aab", "abb".

---

## 5. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) — single pass through the string |
| **Space** | O(1) |

---

## 6. Follow-Up Questions

1. How would the solution change if the keyboard could repeat a key up to `k` times?
2. Can you extend the approach to return all possible original strings instead of just the count?
3. What if the input string length could be up to 10⁵—does the O(n) solution still hold?

---

## 7. Key Takeaway

> Each consecutive duplicate adds exactly one possible original string. Result = 1 + number of positions where `word[i] == word[i-1]`.
