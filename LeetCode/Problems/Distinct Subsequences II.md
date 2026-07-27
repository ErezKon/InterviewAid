# 940. Distinct Subsequences II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/distinct-subsequences-ii](https://leetcode.com/problems/distinct-subsequences-ii)
**Companies:** Amazon, Google

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: DP with Last Occurrence Tracking](#approach-dp-with-last-occurrence-tracking)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a string `s`, return the number of **distinct non-empty subsequences** of `s`. Return the answer modulo `10^9 + 7`.

**Constraints:**
- `1 <= s.length <= 2000`
- `s` consists of lowercase English letters.

---

## Examples

**Example 1:**
```
Input: s = "abc"
Output: 7
Explanation: 7 distinct subsequences: "a", "b", "c", "ab", "ac", "bc", "abc"
```

**Example 2:**
```
Input: s = "aba"
Output: 6
Explanation: "a", "b", "ab", "ba", "aa", "aba" (6 distinct)
  Note: "a" appears twice but counts once.
```

---

## Key Insight

> Let `dp[i]` = number of distinct subsequences using `s[0..i]` (including empty). When we add character `s[i]`, it doubles the count (append `s[i]` to every existing subsequence, or not). But we **overcount** subsequences that end with the same character — subtract the count from the **last time** `s[i]` appeared.

Formula: `dp[i] = 2 * dp[i-1] - dp[lastOccurrence[s[i]] - 1]`

---

## Approach: DP with Last Occurrence Tracking ✅

```
FUNCTION distinctSubseqII(s):
    MOD ← 10^9 + 7
    n ← length(s)
    dp ← array of size n+1
    dp[0] ← 1    // empty subsequence

    last ← array of -1, size 26    // last index where each char appeared

    FOR i ← 1 TO n DO
        c ← s[i-1] - 'a'
        dp[i] ← (2 * dp[i-1]) MOD MOD

        IF last[c] ≥ 0 THEN
            dp[i] ← (dp[i] - dp[last[c]]) MOD MOD

        last[c] ← i - 1    // store as dp index

    // Subtract 1 for empty subsequence
    RETURN (dp[n] - 1 + MOD) MOD MOD
END FUNCTION
```

---

## Walkthrough

```
s = "aba"
```

| i | char | dp[i] = 2×dp[i-1] | -dp[last] | dp[i] | last |
|---|------|-------------------|-----------|-------|------|
| 0 | —    | —                 | —         | 1     | all -1 |
| 1 | 'a'  | 2×1=2            | 0 (first) | 2     | a=0  |
| 2 | 'b'  | 2×2=4            | 0 (first) | 4     | b=1  |
| 3 | 'a'  | 2×4=8            | -dp[0]=-1 | 7     | a=2  |

Answer = 7 - 1 (empty) = **6** ✅

---

## Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| **Time** | O(n) | Single pass through string |
| **Space** | O(n) | DP array (can optimize to O(1) with rolling variable) |

---

## Follow-Up Questions

**Q1: Why subtract dp[lastOccurrence]?**
> When char `c` appears again at position `i`, appending `c` to all subsequences creates duplicates of sequences already created when `c` last appeared. The count of those duplicates is exactly `dp[lastOccurrence[c] - 1]`.

**Q2: How does this differ from "Distinct Subsequences" (LC 115)?**
> LC 115 counts subsequences of `s` that equal a target `t` (2D DP). This problem counts all distinct subsequences of `s` itself (1D DP with deduplication).

**Q3: Can you optimize to O(1) space?**
> Yes — keep only the running total and `last[26]` storing the dp value at each character's last occurrence.

---

## Key Takeaway

> **Counting distinct subsequences: each new character doubles the count (append or don't), but subtract the overcounted duplicates from the last occurrence of that character. This inclusion-exclusion gives O(n) time.**
