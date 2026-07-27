
# 76. Minimum Window Substring

**Difficulty:** 🔴 Hard
**Acceptance:** 47.5%
**LeetCode:** [https://leetcode.com/problems/minimum-window-substring](https://leetcode.com/problems/minimum-window-substring)
**Companies:** Adobe, Airbnb, Amazon, Apolloio, Apple, Bloomberg, Cisco, Dp World, Goldman Sachs, Google, Harness, Ibm, Infosys, Linkedin, Lyft, Makemytrip, Meesho, Meta, Microsoft, Moloco, Oracle, Qualtrics, Salesforce, Sap, Snapchat, Snowflake, Sofi, Swiggy, Thoughtspot, Tiktok, Uber, Walmart Labs, Yandex, Zeta, Zoho, Zopsmart

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Solution: Sliding Window — O(m + n) ✅](#4-solution-sliding-window--om--n-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)

---

## 1. Problem Description

Given two strings `s` and `t`, return the **minimum window substring** of `s` such that every character in `t` (including duplicates) is included in the window.

If there is no such substring, return the empty string `""`.

---

## 2. Examples

```
Example 1:
  Input:  s = "ADOBECODEBANC", t = "ABC"
  Output: "BANC"

Example 2:
  Input:  s = "a", t = "a"
  Output: "a"

Example 3:
  Input:  s = "a", t = "aa"
  Output: ""
  Reason: t has two 'a's but s has only one.
```

---

## 3. Key Insight

Use a **sliding window** with two pointers:
1. **Expand** `right` to include more characters until the window contains all characters of `t`.
2. **Shrink** `left` to find the minimum valid window.
3. Track character frequencies to determine when the window is valid.

The key optimization: maintain a `formed` counter that tracks how many **unique characters** in `t` have their required frequency met in the current window.

---

## 4. Solution: Sliding Window — O(m + n) ✅

```
FUNCTION minWindow(s, t):
    IF LENGTH(s) < LENGTH(t): RETURN ""

    // Count required character frequencies
    need = frequency map of t
    have = {}                           // window character frequencies
    needCount = SIZE(need)              // unique chars needed
    haveCount = 0                       // unique chars fully satisfied

    left = 0
    minLen = INFINITY
    minStart = 0

    FOR right ← 0 TO LENGTH(s) - 1:
        char = s[right]

        // Add to window
        have[char] = have.GET(char, 0) + 1

        // Check if this char's requirement is now fully met
        IF char IN need AND have[char] == need[char]:
            haveCount += 1

        // Try to shrink the window
        WHILE haveCount == needCount:

            // Update minimum
            windowLen = right - left + 1
            IF windowLen < minLen:
                minLen = windowLen
                minStart = left

            // Remove left character
            leftChar = s[left]
            have[leftChar] -= 1

            IF leftChar IN need AND have[leftChar] < need[leftChar]:
                haveCount -= 1

            left += 1

    RETURN s[minStart .. minStart + minLen - 1] IF minLen != INFINITY ELSE ""
```

---

## 5. Walkthrough

```
s = "ADOBECODEBANC", t = "ABC"
need = {A:1, B:1, C:1}, needCount = 3

right=0 'A': have={A:1}, haveCount=1 (A met)
right=1 'D': have={A:1,D:1}
right=2 'O': have={...,O:1}
right=3 'B': have={...,B:1}, haveCount=2 (B met)
right=4 'E': have={...,E:1}
right=5 'C': have={...,C:1}, haveCount=3 (C met) → VALID WINDOW

  Shrink:
  window = "ADOBEC" [0..5] len=6 → minLen=6, minStart=0
  remove 'A': have={A:0}, haveCount=2 → stop shrinking, left=1

right=6 'O': ...
right=7 'D': ...
right=8 'E': ...
right=9 'B': have={...,B:1}
right=10 'A': have={...,A:1}, haveCount=3 → VALID WINDOW

  Shrink:
  window = "DOBECODEBA" [1..10] len=10 → not better
  remove 'D': still valid (D not needed)
  window = "OBECODEBA" [2..10] len=9 → not better
  remove 'O': still valid
  ... keep shrinking ...
  window = "CODEBA" [5..10] len=6 → not better
  remove 'C': have={C:0}, haveCount=2 → stop, left=6

right=11 'N': ...
right=12 'C': have={...,C:1}, haveCount=3 → VALID WINDOW

  Shrink:
  window = "ODEBANC" [6..12] len=7 → not better
  remove 'O': still valid → left=7
  window = "DEBANC" [7..12] len=6 → not better
  remove 'D': still valid → left=8
  window = "EBANC" [8..12] len=5 → not better
  remove 'E': still valid → left=9
  window = "BANC" [9..12] len=4 → minLen=4, minStart=9 ★
  remove 'B': have={B:0}, haveCount=2 → stop, left=10

Result: s[9..12] = "BANC" ✅
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(m + n) where m = |s|, n = |t| — each char visited at most twice |
| **Space** | O(n) for frequency maps (bounded by alphabet size) |

---

## 7. Follow-Up Questions

### 7.1 Find All Anagrams in a String (LeetCode #438)

Fixed window size = `len(t)`. Use same frequency comparison:

```
FUNCTION findAnagrams(s, t):
    // Sliding window of size len(t)
    // Slide one character at a time
    // Check if window frequencies match t frequencies
```

### 7.2 Substring with Concatenation of All Words (LeetCode #30)

Window of size `words_count × word_length`. Slide by word-length steps.

### 7.3 Smallest Window Containing All Characters

Same problem for lowercase letters only — the constraint simplifies to a 26-element array.

### 7.4 What if we want the count of minimum windows (not the window itself)?

After finding the minimum length, do another pass to count all windows of that exact length.

### 7.5 Can the O(m+n) claim be proven more carefully?

Yes. Each character in `s` is added (by `right`) at most once and removed (by `left`) at most once. So the inner `while` loop across all iterations does at most `m` total work. Combined with the outer `for` loop's `m` iterations: total = `2m + n` = O(m + n).

---

## Sliding Window Pattern Summary

| Variant | Window Size | Condition | Problem |
|---------|-------------|-----------|---------|
| **Fixed** | Constant k | Sum/avg/match | Max sum subarray of size k |
| **Variable (shrink)** | Dynamic | Meet constraint | Min window substring |
| **Variable (expand)** | Dynamic | Within budget | Longest substring w/o repeats |

### Template for Variable Sliding Window

```
left = 0
FOR right ← 0 TO n - 1:
    // 1. Expand: add s[right] to window state

    // 2. Shrink: while window violates constraint
    WHILE window is invalid:
        // remove s[left] from window state
        left += 1

    // 3. Update answer
```

---

## Key Takeaway

> Minimum Window Substring is the **hardest standard sliding window** problem. The key optimization is the `haveCount == needCount` check — comparing a single integer instead of full frequency maps at each step. This transforms what could be O(m·n) into O(m+n). Master this template and you can solve nearly any sliding window problem.
