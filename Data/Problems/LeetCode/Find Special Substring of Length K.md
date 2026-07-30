# 3456. Find Special Substring of Length K

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-special-substring-of-length-k](https://leetcode.com/problems/find-special-substring-of-length-k)
**Companies:** Amazon

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Run-Length Scan — O(n) ✅](#4-approach-run-length-scan--on-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given a string `s` and an integer `k`, determine if there exists a **special substring** of length exactly `k` — a substring consisting of a single repeated character whose run length is exactly `k` (the character does not extend beyond the substring boundaries).

Return `true` if such a substring exists, `false` otherwise.

**Constraints:**
- `1 <= s.length <= 100`
- `1 <= k <= s.length`

---

## 2. Examples

```
Example 1:
  Input:  s = "aaabaaa", k = 3
  Output: true
  Reason: "aaa" at positions 0-2 is a run of exactly 3 'a's (followed by 'b').
          Also "aaa" at positions 4-6.

Example 2:
  Input:  s = "abc", k = 1
  Output: true
  Reason: Each character is a run of length 1.

Example 3:
  Input:  s = "aaaa", k = 3
  Output: false
  Reason: The only run of 'a' has length 4, not exactly 3.
```

---

## 3. Key Insight

> Find all **maximal runs** of identical characters. A special substring of length `k` exists iff some run has length **exactly** `k`.

---

## 4. Approach: Run-Length Scan — O(n) ✅

```
FUNCTION hasSpecialSubstring(s, k):
    i ← 0
    WHILE i < LENGTH(s) DO
        j ← i
        WHILE j < LENGTH(s) AND s[j] == s[i] DO
            j ← j + 1
        IF j - i == k THEN
            RETURN true
        i ← j

    RETURN false
```

---

## 5. Walkthrough

```
s = "aaabaaa", k = 3

i=0: run of 'a' from 0 to 2, length=3. 3 == k → RETURN true ✅
```

```
s = "aaaa", k = 3

i=0: run of 'a' from 0 to 3, length=4. 4 ≠ 3 → continue
i=4: end of string

RETURN false ✅
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) — single pass |
| **Space** | O(1) |

---

## 7. Follow-Up Questions

### 7.1 What if we want runs of length ≥ k instead of exactly k?

Change the condition to `j - i >= k`.

### 7.2 What if we want to count how many special substrings exist?

Count runs whose length equals `k` instead of returning early.

### 7.3 How does this relate to run-length encoding?

This is essentially checking if any group in the run-length encoding has count exactly `k`.

---

## 8. Key Takeaway

> **Run-length grouping** in O(n) identifies maximal runs of identical characters. Checking for a specific run length is then a simple comparison.
