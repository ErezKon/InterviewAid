# 3029. Minimum Time to Revert Word to Initial State I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-time-to-revert-word-to-initial-state-i](https://leetcode.com/problems/minimum-time-to-revert-word-to-initial-state-i)
**Companies:** Sprinklr

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Z-function / KMP — O(n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

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

```
FUNCTION minimumTimeToRevert(word, k):
    n = len(word)
    z = Z_function(word)

    FOR t ← 1 TO CEIL(n / k):
        pos = t * k
        IF pos >= n: RETURN t  // entire word removed
        IF z[pos] >= n - pos: RETURN t  // suffix matches prefix

    RETURN CEIL(n / k)  // worst case: remove everything
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) — Z-function |
| **Space** | O(n) |

---

## 5. Key Takeaway

> **Z-function for periodic suffix-prefix matching.** Check if `word[t*k:]` is a prefix of `word` for each candidate `t`. Z-function computes this efficiently in O(n).
