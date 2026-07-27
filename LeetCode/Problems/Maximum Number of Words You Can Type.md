# 1935. Maximum Number of Words You Can Type

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/maximum-number-of-words-you-can-type](https://leetcode.com/problems/maximum-number-of-words-you-can-type)
**Companies:** Amazon, Google, Microsoft, Quora

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a string `text` (space-separated words) and a string `brokenLetters`, return the number of words that can be fully typed using only non-broken keys.

**Constraints:**
- `1 <= text.length <= 10^4`
- `0 <= brokenLetters.length <= 26`

---

## Examples

**Example 1:**
```
Input:  text = "hello world", brokenLetters = "ad"
Output: 1
Explanation: "hello" has no broken letters. "world" has 'd'.
```

---

## Key Insight

> Put broken letters in a set, then check each word — if no character is broken, it's typable.

---

## Approach

```
FUNCTION canBeTypedWords(text, brokenLetters)
    broken ← SET(brokenLetters)
    RETURN count of words in text.split() where no char is in broken
END FUNCTION
```

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(n)** — scan all characters |
| Space  | **O(1)** — broken set ≤ 26 |

---

## Key Takeaway

> **Set membership check** — simple string processing: check each word against the broken letter set.
