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

You are given a **0-indexed** string `s` consisting of only lowercase English letters, and an integer `count`. A **substring** of `s` is said to be an **equal count substring** if, for each **unique** letter in the substring, it appears exactly `count` times in the substring.

Return *the number of **equal count substrings** in* `s`.

A **substring** is a contiguous non-empty sequence of characters within a string.

**Constraints:**

- `1 <= s.length <= 3 * 10^4`
- `1 <= count <= 3 * 10^4`
- `s` consists only of lowercase English letters.

---

## 2. Examples

```
Example 1:
  Input: s = "aaabcbbcc", count = 3
  Output: 3
  Explanation:
  The substring that starts at index 0 and ends at index 2 is "aaa".
  The letter 'a' in the substring appears exactly 3 times.
  The substring that starts at index 3 and ends at index 8 is "bcbbcc".
  The letters 'b' and 'c' in the substring appear exactly 3 times.
  The substring that starts at index 0 and ends at index 8 is "aaabcbbcc".
  The letters 'a', 'b', and 'c' in the substring appear exactly 3 times.
```

```
Example 2:
  Input: s = "abcd", count = 2
  Output: 0
  Explanation:
  The number of times each letter appears in s is less than count.
  Therefore, no substrings in s are equal count substrings, so return 0.
```

```
Example 3:
  Input: s = "a", count = 5
  Output: 0
  Explanation:
  The number of times each letter appears in s is less than count.
  Therefore, no substrings in s are equal count substrings, so return 0.
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
