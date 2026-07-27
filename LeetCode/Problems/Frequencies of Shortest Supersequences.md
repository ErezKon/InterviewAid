# 3435. Frequencies of Shortest Supersequences

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/frequencies-of-shortest-supersequences](https://leetcode.com/problems/frequencies-of-shortest-supersequences)
**Companies:** Phonepe

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Bitmask Enumeration + Verification ✅](#3-approach-bitmask-enumeration--verification-)
4. [Key Takeaway](#4-key-takeaway)

---

## 1. Problem Description

Given an array of 2-character strings, find the shortest supersequences that contain all strings as subsequences. Return the character frequency arrays of all such shortest supersequences.

---

## 2. Key Insight

> Since strings are length 2, the problem reduces to a graph where each string `ab` creates an edge a→b. The shortest supersequence relates to finding an Euler-path-like structure. Enumerate possible character sets using bitmasks.

---

## 3. Approach: Bitmask Enumeration + Verification ✅

```
FUNCTION supersequences(words):
    // Build character dependency graph from 2-char strings
    // Enumerate bitmasks of characters to double
    // For each valid mask, check if it covers all constraints
    // Track minimum length and collect all solutions with that length
    // Return frequency arrays
```

---

## 4. Key Takeaway

> With only 26 possible characters and length-2 strings, the problem is tractable via bitmask enumeration over which characters appear multiple times.
