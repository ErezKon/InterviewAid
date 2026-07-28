# 3403. Find the Lexicographically Largest String From the Box I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-the-lexicographically-largest-string-from-the-box-i](https://leetcode.com/problems/find-the-lexicographically-largest-string-from-the-box-i)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Greedy Split — O(n) ✅](#3-approach-greedy-split--on-)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given a string `word` and integer `numFriends`, split the string into `numFriends` non‑empty contiguous substrings. Return the lexicographically largest possible substring that any friend receives.

**Constraints:**
- `1 <= word.length <= 5 × 10³`
- `1 <= numFriends <= word.length`

---

## 2. Key Insight

> If `numFriends == 1`, the answer is the entire string. Otherwise, the other `numFriends - 1` friends can each take 1 character, leaving a substring of length `n - numFriends + 1`. Try every starting position for this long substring and return the lexicographic maximum.

---

## 3. Approach: Greedy Split — O(n) ✅

```text
FUNCTION answerString(word, numFriends):
    IF numFriends == 1 THEN
        RETURN word
    n ← LENGTH(word)
    maxLen ← n - numFriends + 1
    best ← ""
    FOR i ← 0 TO n - maxLen DO
        candidate ← SUBSTRING(word, i, i + maxLen)
        IF candidate > best THEN
            best ← candidate
    RETURN best
```

---

## 4. Examples

| word | numFriends | Output |
|------|------------|--------|
| "abcde" | 2 | "bcd" |
| "zzabc" | 3 | "zz" |
| "a" | 1 | "a" |

*Explanation:* For the first example, the longest possible substring length is `5‑2+1 = 4`. The lexicographically largest 4‑character substring is "bcde", but each friend must receive at least one character, so the best substring a friend can get is the 3‑character "bcd".

---

## 5. Walkthrough

Consider `word = "zzabc"`, `numFriends = 3`:

1. `n = 5`, `maxLen = 5‑3+1 = 3`.
2. Enumerate substrings of length 3:
   - i=0 → "zza"
   - i=1 → "zab"
   - i=2 → "abc"
3. Lexicographic order: "zza" > "zab" > "abc".
4. Return "zza" as the largest substring a friend can receive.

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) — single pass over the string |
| **Space** | O(1) — only a few variables |

---

## 7. Follow-Up Questions

1. How would the solution change if friends could receive substrings of varying lengths?
2. What if the goal were to maximize the **sum** of ASCII values of the chosen substring?
3. Can you solve the problem using a sliding‑window technique?

---

## 8. Key Takeaway

> The largest substring a friend can obtain has length `n - numFriends + 1`. Scan all possible start positions of that length and pick the lexicographically maximum.
