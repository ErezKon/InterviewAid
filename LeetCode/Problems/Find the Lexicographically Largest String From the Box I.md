# 3403. Find the Lexicographically Largest String From the Box I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-the-lexicographically-largest-string-from-the-box-i](https://leetcode.com/problems/find-the-lexicographically-largest-string-from-the-box-i)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Greedy Split — O(n) ✅](#3-approach-greedy-split--on-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given a string `word` and integer `numFriends`, split the string into `numFriends` non-empty contiguous substrings. Return the lexicographically largest possible substring that any friend receives.

**Constraints:**
- `1 <= word.length <= 5 × 10³`
- `1 <= numFriends <= word.length`

---

## 2. Key Insight

> If `numFriends == 1`, the answer is the entire string. Otherwise, the other `numFriends - 1` friends can each take 1 character, leaving a substring of length `n - numFriends + 1`. Try every starting position for this long substring and return the lexicographic maximum.

---

## 3. Approach: Greedy Split — O(n) ✅

```
FUNCTION answerString(word, numFriends):
    IF numFriends == 1 THEN RETURN word
    n ← LENGTH(word)
    maxLen ← n - numFriends + 1
    best ← ""
    FOR i ← 0 TO n - 1 DO
        candidate ← word[i : min(i + maxLen, n)]
        IF candidate > best THEN
            best ← candidate
    RETURN best
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n · maxLen) — compare substrings |
| **Space** | O(maxLen) — candidate string |

---

## 5. Key Takeaway

> The largest substring one friend can get has length `n - numFriends + 1`. The others take 1 character each. Try all starting positions for the maximum-length substring and pick the lexicographic max.
