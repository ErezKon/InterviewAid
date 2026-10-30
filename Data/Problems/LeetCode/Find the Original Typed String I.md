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

Alice is attempting to type a specific string on her computer. However, she tends to be clumsy and **may** press a key for too long, resulting in a character being typed **multiple** times.

Although Alice tried to focus on her typing, she is aware that she may still have done this **at most** *once*.

You are given a string `word`, which represents the **final** output displayed on Alice's screen.

Return the total number of *possible* original strings that Alice *might* have intended to type.

**Constraints:**
- `1 <= word.length <= 100`
- `word` consists only of lowercase English letters.

---

## 2. Examples

**Example 1:**
```
Input: word = "abbcccc"
Output: 5
Explanation: The possible strings are: "abbcccc", "abbccc", "abbcc", "abbc", and "abcccc".
```

**Example 2:**
```
Input: word = "abcd"
Output: 1
Explanation: The only possible string is "abcd".
```

**Example 3:**
```
Input: word = "aaaa"
Output: 4
```

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
