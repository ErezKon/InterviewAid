# 3527. Find the Most Common Response

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-the-most-common-response](https://leetcode.com/problems/find-the-most-common-response)
**Companies:** Meta

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: HashMap Counting — O(n · m) ✅](#2-approach-hashmap-counting--on--m-)
3. [Key Takeaway](#3-key-takeaway)

---

## 1. Problem Description

Given a list of responses (each is a list of strings), find the most common response across all lists. Each response appears at most once per list. If tied, return the lexicographically smallest.

---

## 2. Approach: HashMap Counting — O(n · m) ✅

```
FUNCTION mostCommonResponse(responses):
    count ← HashMap()
    FOR list IN responses DO
        seen ← SET(list)    // deduplicate within each list
        FOR word IN seen DO
            count[word] += 1

    RETURN word with MAX count (ties: lexicographically smallest)
```

---

## 3. Key Takeaway

> Deduplicate per-list responses (at most once per list), count globally, return the most frequent.
