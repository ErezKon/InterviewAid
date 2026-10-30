# 2606. Find the Substring With Maximum Cost

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-the-substring-with-maximum-cost](https://leetcode.com/problems/find-the-substring-with-maximum-cost)
**Companies:** Amazon, Josh Technology

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Kadane's Algorithm — O(n) ✅](#3-approach-kadanes-algorithm--on-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Examples](#5-examples)
6. [Walkthrough](#6-walkthrough)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

You are given a string `s`, a string `chars` of **distinct** characters and an integer array `vals` of the same length as `chars`.

The **cost of the substring **is the sum of the values of each character in the substring. The cost of an empty string is considered `0`.

The **value of the character **is defined in the following way:

- If the character is not in the string `chars`, then its value is its corresponding position **(1-indexed)** in the alphabet.

- For example, the value of `'a'` is `1`, the value of `'b'` is `2`, and so on. The value of `'z'` is `26`.

- Otherwise, assuming `i` is the index where the character occurs in the string `chars`, then its value is `vals[i]`.

Return *the maximum cost among all substrings of the string* `s`.

**Constraints:**
- `1 <= s.length <= 10^5`
- `s` consist of lowercase English letters.
- `1 <= chars.length <= 26`
- `chars` consist of **distinct** lowercase English letters.
- `vals.length == chars.length`
- `-1000 <= vals[i] <= 1000`

---

## 2. Key Insight

> Map each character to its value, then apply Kadane's algorithm to find the maximum subarray sum.

---

## 3. Approach: Kadane's Algorithm — O(n) ✅

```text
FUNCTION maximumCostSubstring(s, chars, vals):
    // Build value mapping
    value ← default: c → ord(c) - ord('a') + 1
    FOR i, c IN enumerate(chars):
        value[c] ← vals[i]

    maxCost ← 0; current ← 0
    FOR c IN s DO
        current ← MAX(0, current + value[c])
        maxCost ← MAX(maxCost, current)

    RETURN maxCost
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## 5. Examples

**Example 1:**
```
Input: s = "adaa", chars = "d", vals = [-1000]
Output: 2
Explanation: The value of the characters "a" and "d" is 1 and -1000 respectively.
The substring with the maximum cost is "aa" and its cost is 1 + 1 = 2.
It can be proven that 2 is the maximum cost.
```

**Example 2:**
```
Input: s = "abc", chars = "abc", vals = [-1,-1,-1]
Output: 0
Explanation: The value of the characters "a", "b" and "c" is -1, -1, and -1 respectively.
The substring with the maximum cost is the empty substring "" and its cost is 0.
It can be proven that 0 is the maximum cost.
```

---

## 6. Walkthrough

| Step | Index | Char | Value | Current Sum | Max Cost |
|------|-------|------|-------|-------------|----------|
| 1 | 0 | 'z' | 26 | 26 | 26 |
| 2 | 1 | 'z' | 26 | 52 | 52 |

The algorithm accumulates the sum and resets to 0 when negative, yielding 52 as maximum.

---

## 7. Follow-Up Questions

- How would you modify the solution if substrings must be of length at least `k`?
- Can you extend this to 2‑D grids where you need the maximum‑cost sub‑matrix?
- What if the cost function is non‑linear, e.g., product of values?

---

## 8. Key Takeaway

> Map characters to values, then apply **Kadane's algorithm** for maximum subarray sum. The minimum cost is 0 (empty substring).