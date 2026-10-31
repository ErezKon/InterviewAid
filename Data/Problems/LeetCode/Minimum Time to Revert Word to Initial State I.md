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

You are given a **0-indexed** string `word` and an integer `k`.

At every second, you must perform the following operations:

- Remove the first `k` characters of `word`.
- Add any `k` characters to the end of `word`.

**Note** that you do not necessarily need to add the same characters that you removed. However, you must perform **both** operations at every second.

Return *the **minimum** time greater than zero required for* `word` *to revert to its **initial** state*.

**Constraints:**
- `1 <= word.length <= 50 `
- `1 <= k <= word.length`
- `word` consists only of lowercase English letters.

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
Input: word = "abacaba", k = 3
Output: 2
Explanation: At the 1st second, we remove characters "aba" from the prefix of word, and add characters "bac" to the end of word. Thus, word becomes equal to "cababac".
At the 2nd second, we remove characters "cab" from the prefix of word, and add "aba" to the end of word. Thus, word becomes equal to "abacaba" and reverts to its initial state.
It can be shown that 2 seconds is the minimum time greater than zero required for word to revert to its initial state.
```

**Example 2:**
```
Input: word = "abacaba", k = 4
Output: 1
Explanation: At the 1st second, we remove characters "abac" from the prefix of word, and add characters "caba" to the end of word. Thus, word becomes equal to "abacaba" and reverts to its initial state.
It can be shown that 1 second is the minimum time greater than zero required for word to revert to its initial state.
```

**Example 3:**
```
Input: word = "abcbabcd", k = 2
Output: 4
Explanation: At every second, we will remove the first 2 characters of word, and add the same characters to the end of word.
After 4 seconds, word becomes equal to "abcbabcd" and reverts to its initial state.
It can be shown that 4 seconds is the minimum time greater than zero required for word to revert to its initial state.
```

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
3. What is the impact of using other string-matching algorithms like KMP instead of Z-function?

---

## 8. Key Takeaway

> **Z-function enables efficient suffix-prefix matching.** By checking `z[t*k] ≥ n - t*k` for increasing `t`, we obtain the minimum seconds in linear time.
