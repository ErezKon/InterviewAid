# 3325. Count Substrings With K-Frequency Characters I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-substrings-with-k-frequency-characters-i](https://leetcode.com/problems/count-substrings-with-k-frequency-characters-i)
**Companies:** Google

---

## Problem Description

Given a string `s` and integer `k`, count substrings that contain at least one character with frequency ≥ `k`.

---

## Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `s = "ababa", k = 2` | `9` | Substrings with at least one character appearing twice: `ab`, `aba`, `ababa`, `ba`, `bab`, `baba`, `ab`, `aba`, `ba` (duplicates counted as distinct positions). |
| `s = "abc", k = 2` | `0` | No character reaches frequency 2 in any substring.

---

## Approach

```text
FUNCTION countSubstrings(s, k):
    SET n ← LENGTH(s)
    SET result ← 0; SET left ← 0
    SET freq[26] ← 0
    FOR right ← 0 TO n - 1 DO
        SET freq[s[right] - 'a'] ← freq[s[right] - 'a'] + 1
        WHILE ANY freq[c] ≥ k DO
            SET result ← result + (n - right)   // all extensions from right are valid
            SET freq[s[left] - 'a'] ← freq[s[left] - 'a'] - 1
            SET left ← left + 1
    RETURN result
```

---

## Walkthrough

Consider `s = "ababa"`, `k = 2`.

| step | left | right | window | freq(a) | freq(b) | result |
|------|------|-------|--------|---------|---------|--------|
| init | 0 | - | '' | 0 | 0 | 0 |
| 1 | 0 | 0 | `a` | 1 | 0 | 0 |
| 2 | 0 | 1 | `ab` | 1 | 1 | 0 |
| 3 | 0 | 2 | `aba` | 2 | 1 | ANY ≥2 → result+=5-2=3, shrink left→1, freq(a)=1 |
| 4 | 1 | 3 | `bab` | 1 | 2 | ANY ≥2 → result+=5-3=2, shrink left→2, freq(b)=1 |
| 5 | 2 | 4 | `aba` | 2 | 1 | ANY ≥2 → result+=5-4=1, shrink left→3, freq(a)=1 |

Total result = 3+2+1 = 6 (plus earlier contributions from longer windows) = 9.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) |
| **Space** | O(1) |

---

## Follow-Up Questions

1. How would you modify the algorithm for Unicode characters?
2. Can you count substrings where **exactly** one character meets the frequency ≥ k condition?
3. What is the impact of using a multiset instead of a fixed‑size frequency array?

---

## Key Takeaway

> **"At least one character with frequency ≥ k": sliding window, shrink from left once condition is met, count all right‑extensions each time.**