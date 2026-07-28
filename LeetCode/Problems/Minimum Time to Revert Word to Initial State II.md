# 3031. Minimum Time to Revert Word to Initial State II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-time-to-revert-word-to-initial-state-ii](https://leetcode.com/problems/minimum-time-to-revert-word-to-initial-state-ii)
**Companies:** Sprinklr

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Z-function — O(n)](#3-approach)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Same as Part I but with larger constraints. Each second, remove the first `k` characters and append any `k` characters. Return the **minimum** seconds to return the word to its original state.

**Constraints:**
- `1 <= word.length <= 10⁶`
- `1 <= k <= word.length`

---

## 2. Key Insight

> Same approach as Part I — use Z-function. After `t` steps, `word[t*k:]` must be a prefix of `word`. The Z-function handles the large constraint efficiently in O(n).

---

## 3. Approach: Z-function — O(n) ✅

```text
FUNCTION minimumTimeToRevert(word, k):
    n ← LENGTH(word)
    z ← Z_FUNCTION(word)
    maxT ← CEIL(n / k)
    FOR t ← 1 TO maxT:
        pos ← t * k
        IF pos ≥ n:
            RETURN t  // whole word removed
        IF z[pos] ≥ n - pos:
            RETURN t  // suffix matches prefix
    RETURN maxT
```

---

## 4. Examples

**Example 1:**
```
word = "ababab", k = 2
```
After one operation we can remove "ab" and append "ab" again, restoring the original word. Minimum seconds = **1**.

**Example 2:**
```
word = "abcdabcd", k = 4
```
Two operations are needed: first remove "abcd", then the next "abcd" can be matched. Minimum seconds = **2**.

---

## 5. Walkthrough

| t | pos = t*k | Condition | Result |
|---|----------|-----------|--------|
| 1 | 2 | `z[2] = 6 ≥ 6` → true | return 1 |

The algorithm checks `z[t*k] ≥ n - t*k` and finds `t = 1` satisfies the condition, yielding the minimal seconds.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) — Z-function computation and linear scan |
| **Space** | O(n) for the Z-array |

---

## 7. Follow-Up Questions

1. How would the solution differ if the appended characters must be a permutation of the removed ones?
2. Can we extend the method to handle multiple possible `k` values per operation?
3. What alternative string‑matching techniques could replace the Z-function?

---

## 8. Key Takeaway

> **Z-function enables efficient suffix‑prefix matching.** By checking `z[t*k] ≥ n - t*k` for increasing `t`, we obtain the minimum seconds in linear time.
