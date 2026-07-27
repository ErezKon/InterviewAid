# 2351. First Letter to Appear Twice

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/first-letter-to-appear-twice](https://leetcode.com/problems/first-letter-to-appear-twice)
**Companies:** Apple, Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: Set — O(n) ✅](#2-approach-set--on-)
3. [Key Takeaway](#3-key-takeaway)

---

## 1. Problem Description

Given a string `s`, return the first letter that appears twice.

**Constraints:**
- `2 <= s.length <= 100`
- `s` consists of lowercase English letters

---

## 2. Approach: Set — O(n) ✅

```
FUNCTION repeatedCharacter(s):
    seen ← SET()
    FOR c IN s DO
        IF c IN seen THEN RETURN c
        seen.ADD(c)
```

---

## 3. Key Takeaway

> Track seen characters in a set. The first duplicate is the answer. O(n) time, O(1) space (26 letters).
