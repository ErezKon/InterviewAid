# 2067. Number of Equal Count Substrings

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-equal-count-substrings](https://leetcode.com/problems/number-of-equal-count-substrings)
**Companies:** Cisco

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Sliding Window per Distinct Count — O(26n)](#4-approach)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Count substrings where every character that appears has the same frequency `count`.

---

## 2. Examples

**Example 1:**
```
Input: s = "aaabbb", count = 3
Output: 2
Explanation: The substrings "aaabbb" (the whole string) and "aaabbb" (the same) each have 2 distinct characters each appearing 3 times.
```

**Example 2:**
```
Input: s = "abcabc", count = 2
Output: 4
Explanation: Substrings "abca", "bcab", "cabc", and "abcabc" all have each distinct character appearing exactly twice.
```

---

## 3. Key Insight

> For each possible number of distinct characters `d` (1..26), use a sliding window of size `d × count`. Check if exactly `d` characters appear each with frequency `count`.

---

## 4. Approach: Sliding Window per Distinct Count — O(26n) ✅

```text
FUNCTION equalCountSubstrings(s, count):
    result ← 0
    n ← LENGTH(s)
    FOR d ← 1 TO 26:
        windowLen ← d * count
        IF windowLen > n: BREAK
        freq ← ARRAY[26] OF 0
        good ← 0  // number of chars with freq == count
        FOR i ← 0 TO n-1:
            // add character s[i]
            idx ← ORD(s[i]) - ORD('a')
            freq[idx] ← freq[idx] + 1
            IF freq[idx] == count: good ← good + 1
            ELSE IF freq[idx] == count + 1: good ← good - 1
            // remove character exiting window
            IF i >= windowLen:
                outIdx ← ORD(s[i-windowLen]) - ORD('a')
                freq[outIdx] ← freq[outIdx] - 1
                IF freq[outIdx] == count: good ← good + 1
                ELSE IF freq[outIdx] == count - 1: good ← good - 1
            IF good == d: result ← result + 1
    RETURN result
```

---

## 5. Walkthrough

Consider `s = "aaabbb"` and `count = 3`.

| Step | Window Size (`d*count`) | Window Content | Frequencies | Good chars | Result increment |
|------|------------------------|----------------|------------|------------|------------------|
| 1    | d=1 → 3                | "aaa"         | a:3        | 1 (a)      | +1 (valid) |
| 2    | d=1 → 3                | "aab"         | a:2,b:1    | 0          | 0 |
| ...  | ...                    | ...            | ...        | ...        | ... |
| Final| d=2 → 6                | "aaabbb"      | a:3,b:3    | 2 (a,b)    | +1 |

Total valid windows = 2.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(26 · n) |
| **Space** | O(26) |

---

## 7. Follow-Up Questions

1. How would you modify the algorithm if `count` could vary for each character?
2. Can the solution be extended to Unicode strings with more than 26 characters?
3. What if the input string is streamed and cannot be stored entirely in memory?

---

## 8. Key Takeaway

> **Fixed window per distinct count.** Enumerate possible distinct character counts. Window size = `d × count`. Track "good" characters at exactly the target frequency.
