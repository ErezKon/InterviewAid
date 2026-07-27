# 2942. Find Words Containing Character

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-words-containing-character](https://leetcode.com/problems/find-words-containing-character)
**Companies:** Amazon, Bloomberg, Deliveroo, Google, Meta, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: Linear Scan — O(n · L) ✅](#2-approach-linear-scan--on--l-)
3. [Key Takeaway](#3-key-takeaway)

---

## 1. Problem Description

Given an array of strings `words` and a character `x`, return all indices of words that contain `x`.

**Constraints:**
- `1 <= words.length <= 50`

---

## 2. Approach: Linear Scan — O(n · L) ✅

```
FUNCTION findWordsContaining(words, x):
    RETURN [i for i, w in enumerate(words) if x in w]
```

---

## 3. Key Takeaway

> Simple membership check per word. O(n · L) where L = average word length.
