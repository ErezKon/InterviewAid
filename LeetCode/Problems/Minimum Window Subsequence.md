# 727. Minimum Window Subsequence

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-window-subsequence](https://leetcode.com/problems/minimum-window-subsequence)
**Companies:** Airbnb, Ebay, Google, Meta, Salesforce

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Two Pointers (Forward + Backward) — O(m·n)](#4-approach-two-pointers-forward--backward--omn)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given strings `s1` and `s2`, find the **minimum-length** substring of `s1` that contains `s2` as a **subsequence**. Return `""` if no such window exists.

**Constraints:**
- `1 <= s1.length <= 2 × 10⁴`
- `1 <= s2.length <= 100`

---

## 2. Examples

```
Example 1:
  Input: s1 = "abcdebdde", s2 = "bde"
  Output: "bcde"
  Explanation: "bcde" is the shortest substring where "bde" appears as a subsequence.
```

---

## 3. Key Insight

> **Forward pass** finds a window ending as early as possible. **Backward pass** shrinks it from the right to minimize length. Then advance past the start and repeat.

---

## 4. Approach: Two Pointers (Forward + Backward) — O(m·n) ✅

```
FUNCTION minWindow(s1, s2):
    minLen = infinity
    result = ""
    i = 0

    WHILE i < len(s1):
        // Forward: find end of window containing s2 as subsequence
        j = 0
        start = i
        WHILE i < len(s1):
            IF s1[i] == s2[j]:
                j += 1
                IF j == len(s2): BREAK
            i += 1

        IF j < len(s2): BREAK

        // Backward: minimize window from the end
        end = i
        j = len(s2) - 1
        WHILE j >= 0:
            IF s1[i] == s2[j]:
                j -= 1
            i -= 1
        i += 1

        IF end - i + 1 < minLen:
            minLen = end - i + 1
            result = s1[i..end]

        i += 1

    RETURN result
```

---

## 5. Walkthrough

```
s1 = "abcdebdde", s2 = "bde"

Forward from i=0: match b(1),d(3),e(4) → end=4
Backward from 4: e(4),d(3),b(1) → start=1
Window = "bcde" (len 4)

Forward from i=2: match b? no... d(3),e(4)... continue scanning
...best window = "bcde" ✅
```

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(m · n) — worst case each character scanned n times |
| **Space** | O(1) |

---

## 7. Key Takeaway

> **Forward-backward two-pointer** — forward finds any valid window, backward minimizes it. This avoids DP's O(mn) space while achieving the same time complexity.
