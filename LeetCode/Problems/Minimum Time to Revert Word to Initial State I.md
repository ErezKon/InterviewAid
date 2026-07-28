# 3029. Minimum Time to Revert Word to Initial State I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-time-to-revert-word-to-initial-state-i](https://leetcode.com/problems/minimum-time-to-revert-word-to-initial-state-i)
**Companies:** Sprinklr

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Z-function / KMP — O(n)](#3-approach)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Each second, remove the first `k` characters and append any `k` characters. Return the **minimum** seconds to return the word to its original state.

**Constraints:**
- `1 <= word.length <= 10⁶`
- `1 <= k <= word.length`

---

## 2. Key Insight

> After `t` operations, the first `n - t*k` characters of the result must match `word[t*k:]`. So we need the smallest `t` where `word[t*k:]` is a prefix of `word` (the appended part can be chosen freely). Use **Z-function**: `z[i]` = length of longest substring starting at `i` matching a prefix of `word`.

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
word = "abcabc", k = 3
```
After one operation we can remove "abc" and append "abc" again, restoring the original word. Minimum seconds = **1**.

**Example 2:**
```
word = "abcd", k = 2
```
We need two operations: remove "ab" (append any two chars), then remove the new first two characters which can be chosen to match the original prefix. Minimum seconds = **2**.

---

## 5. Walkthrough

| Step | Removed | Remaining | Condition Checked |
|------|---------|-----------|-------------------|
| t=1 | first 3 chars (`"abc"`) | `"abc"` | `z[3] = 3 ≥ 3` → matches prefix, stop |

The algorithm finds `t = 1` as the smallest satisfying `z[t*k] ≥ n - t*k`.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) — Z-function computation and linear scan |
| **Space** | O(n) for the Z-array |

---

## 7. Follow-Up Questions

1. How would the solution change if the appended characters must be the same as the removed ones?
2. Can the approach be adapted for a variable `k` per operation?
3. What is the impact of using other string‑matching algorithms like KMP instead of Z‑function?

---

## 8. Key Takeaway

> **Z-function enables efficient suffix‑prefix matching.** By checking `z[t*k] ≥ n - t*k` for increasing `t`, we obtain the minimum seconds in linear time.
