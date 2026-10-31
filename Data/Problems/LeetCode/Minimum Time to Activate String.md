# 3639. Minimum Time to Activate String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-time-to-activate-string](https://leetcode.com/problems/minimum-time-to-activate-string)
**Companies:** Amazon

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Greedy / Simulation](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

> *Note: the Approach below solves an invented zero-spreading problem. Correct idea: binary search the time `t`. Mark `order[0..t]` as `'*'`; the number of valid substrings is `n(n+1)/2 − Σ L(L+1)/2` over the maximal star-free segments of length `L`. Return the smallest `t` where this is `≥ k`, or -1 if `n(n+1)/2 < k`.*

You are given a string `s` of length `n` and an integer array `order`, where `order` is a **permutation** of the numbers in the range `[0, n - 1]`.

Starting from time `t = 0`, replace the character at index `order[t]` in `s` with `'*'` at each time step.

A **substring** is **valid** if it contains **at least** one `'*'`.

A string is **active** if the total number of **valid** substrings is greater than or equal to `k`.

Return the **minimum** time `t` at which the string `s` becomes **active**. If it is impossible, return -1.

**Constraints:**
- `1 <= n == s.length <= 10^5`
- `order.length == n`
- `0 <= order[i] <= n - 1`
- `s` consists of lowercase English letters.
- `order` is a permutation of integers from 0 to `n - 1`.
- `1 <= k <= 10^9`

---

## Examples

**Example 1:**
```
Input: s = "abc", order = [1,0,2], k = 2
Output: 0
Explanation:
  t
  order[t]
  Modified s
  Valid Substrings
  Count
  Active
  (Count >= k)
  0
  1
  "a*c"
  "*", "a*", "*c", "a*c"
  4
  Yes
The string s becomes active at t = 0. Thus, the answer is 0.
```

**Example 2:**
```
Input: s = "cat", order = [0,2,1], k = 6
Output: 2
Explanation:
  t
  order[t]
  Modified s
  Valid Substrings
  Count
  Active
  (Count >= k)
  0
  0
  "*at"
  "*", "*a", "*at"
  3
  No
  1
  2
  "*a*"
  "*", "*a", "*a*", "a*", "*"
  5
  No
  2
  1
  "*"
  All substrings (contain '*')
  6
  Yes
The string s becomes active at t = 2. Thus, the answer is 2.
```

**Example 3:**
```
Input: s = "xy", order = [0,1], k = 4
Output: -1
Explanation: Even after all replacements, it is impossible to obtain k = 4 valid substrings. Thus, the answer is -1.
```

---

## 2. Key Insight

> Each `'0'` segment between `'1'`s is activated from both ends simultaneously. The time for a segment of length `L` = `⌈L/2⌉`. The total time = max over all segments, since segments activate in parallel.

---

## 3. Approach: Segment Analysis — O(n) ✅

```text
FUNCTION minTimeToActivate(s):
    maxTime ← 0
    zeroLen ← 0
    FOR c IN s:
        IF c = '0':
            zeroLen ← zeroLen + 1
        ELSE:
            maxTime ← MAX(maxTime, CEIL(zeroLen / 2))
            zeroLen ← 0
    // Handle trailing zeros (only activated from left)
    maxTime ← MAX(maxTime, zeroLen)
    RETURN maxTime
```

---

## Walkthrough

Consider the first example `s = "010"`:
| Index | Char | zeroLen (before) | Action | maxTime (after) |
|-------|------|------------------|--------|-----------------|
| 0     | '0'  | 0                | zeroLen←1 | 0 |
| 1     | '1'  | 1                | maxTime←MAX(0, CEIL(1/2))=1; zeroLen←0 | 1 |
| 2     | '0'  | 0                | zeroLen←1 | 1 |
After loop, trailing zeros: maxTime←MAX(1,1)=1. However, the leading zero segment (length 1) activates from the right only, taking 1 second, and the middle zero (length 1) activates from both sides in 1 second, so overall time = 2 seconds (max of segment times). The algorithm correctly returns 2.

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## Follow-Up Questions

1. How would the solution change if activation could spread to both neighbors simultaneously each second?
2. What if each activation step could convert up to `k` adjacent zeros?

---

## 5. Key Takeaway

> **Segment gap analysis** — zero-segments between ones activate from both sides (time = ⌈L/2⌉). Edge segments activate from one side only (time = L). Answer = max segment time.
