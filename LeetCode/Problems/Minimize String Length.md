# 2716. Minimize String Length

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/minimize-string-length](https://leetcode.com/problems/minimize-string-length)
**Companies:** Bloomberg, Google

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a string `s`, you can pick any character and remove the **closest** occurrence of the same character to its left or right (not itself). Minimize the string length.

---

## Key Insight

> Each distinct character will remain exactly once — all duplicates can be eliminated. The answer is simply the number of **distinct characters** in the string.

---

## Approach

```
FUNCTION minimizedStringLength(s):
    RETURN LEN(SET(s))
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Count distinct | **O(n)** | **O(1)** (26 chars max) |

---

## Key Takeaway

> **Duplicate elimination** — the operation removes duplicates until each character appears at most once. The answer is the count of distinct characters.

---
