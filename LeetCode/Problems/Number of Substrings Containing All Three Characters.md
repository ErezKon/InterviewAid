# 1358. Number of Substrings Containing All Three Characters

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-substrings-containing-all-three-characters](https://leetcode.com/problems/number-of-substrings-containing-all-three-characters)
**Companies:** Amazon, Bloomberg, De Shaw, Google, Meta, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Sliding Window — O(n)](#3-approach)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Count substrings of `s` (containing only 'a', 'b', 'c') that have at least one of each character.

---

## 2. Key Insight

> Sliding window: when the window contains all three, every extension to the right also works → add `n - right` valid substrings, then shrink from left.

---

## 3. Approach: Sliding Window — O(n) ✅

```text
FUNCTION numberOfSubstrings(s):
    count ← {'a': 0, 'b': 0, 'c': 0}
    left ← 0; result ← 0; n ← LENGTH(s)

    FOR right ← 0 TO n - 1:
        count[s[right]] ← count[s[right]] + 1
        WHILE count['a'] > 0 AND count['b'] > 0 AND count['c'] > 0:
            result ← result + (n - right)
            count[s[left]] ← count[s[left]] - 1
            left ← left + 1

    RETURN result
```

---

## 4. Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `"abcabc"` | `10` | All substrings that contain at least one of each letter. |
| `"aaacb"` | `3` | Valid substrings: `"aacb"`, `"acb"`, `"aaacb"`. |

---

## 5. Walkthrough

Consider `s = "abc"` (n = 3).

| Step | right | left | window | counts | result |
|------|-------|------|--------|--------|--------|
| 1 | 0 (`a`) | 0 | `a` | a=1,b=0,c=0 | 0 |
| 2 | 1 (`b`) | 0 | `ab` | a=1,b=1,c=0 | 0 |
| 3 | 2 (`c`) | 0 | `abc` | a=1,b=1,c=1 | add 3‑2 = 1 → result=1; shrink left → `bc` (a=0) |
| 4 | (end) | 1 | `bc` | a=0,b=1,c=1 | loop ends |

Result = 1 (only substring `"abc"`). For longer strings each time the window is valid we add `n‑right` substrings.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## 7. Follow-Up Questions

* How would you adapt the solution for an arbitrary set of required characters?
* Can you compute the number of substrings containing **exactly** one of each character?
* What if the string contains other letters beyond the required set?

---

## 8. Key Takeaway

> **"At least" → count extensions.** When window is valid, all right‑extensions are also valid. Add `n - right` and shrink left.
