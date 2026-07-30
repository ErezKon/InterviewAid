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

Given a binary string, each second you can activate one `'0'` adjacent to an activated `'1'`. All initially `'1'` cells are activated. Return the **minimum** time to activate all cells.

**Constraints:**
- `1 <= s.length <= 10⁵`

---

## Examples

**Example 1:**
```
Input: s = "010"
Output: 2
Explanation:
Second 1: Activate the middle '0' (adjacent to the right '1').
Second 2: Activate the leftmost '0' (now adjacent to the newly activated '1').
Total time = 2.
```

**Example 2:**
```
Input: s = "0001"
Output: 3
Explanation:
The trailing zeros can only be activated from the right side, taking 3 seconds.
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

> **Segment gap analysis** — zero‑segments between ones activate from both sides (time = ⌈L/2⌉). Edge segments activate from one side only (time = L). Answer = max segment time.
