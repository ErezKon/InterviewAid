# 3031. Minimum Time to Revert Word to Initial State II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-time-to-revert-word-to-initial-state-ii](https://leetcode.com/problems/minimum-time-to-revert-word-to-initial-state-ii)
**Companies:** Sprinklr

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Z-function — O(n)](#3-approach-z-function--on)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

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

```
FUNCTION minimumTimeToRevert(word, k):
    n = len(word)
    z = Z_function(word)

    FOR t ← 1 TO CEIL(n / k):
        pos = t * k
        IF pos >= n: RETURN t
        IF z[pos] >= n - pos: RETURN t

    RETURN CEIL(n / k)
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(n) |

---

## 5. Key Takeaway

> **Z-function scales to large n.** Same logic as Part I — check suffix-prefix matches at multiples of `k`. Z-function is O(n), handling n up to 10⁶ efficiently.
