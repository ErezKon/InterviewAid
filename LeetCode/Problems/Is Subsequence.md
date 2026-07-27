# 392. Is Subsequence

**Difficulty:** 🟢 Easy
**Acceptance:** 51.0%
**LeetCode:** [https://leetcode.com/problems/is-subsequence](https://leetcode.com/problems/is-subsequence)
**Companies:** Adobe, Amazon, Bloomberg, Fractal Analytics, Goldman Sachs, Google, Infosys, Meta, Microsoft, Pinterest, Qualcomm, Tinkoff, Wix, Yandex, Zoho

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Two Pointers — O(n) ✅](#4-approach-two-pointers--on-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given strings `s` and `t`, return `true` if `s` is a **subsequence** of `t` — i.e., `s` can be obtained by deleting some (or no) characters from `t` without changing the order.

**Constraints:**
- `0 <= s.length <= 100`
- `0 <= t.length <= 10⁴`
- Both consist of lowercase English letters.

---

## 2. Examples

```
Input: s = "abc", t = "ahbgdc" → true
Input: s = "axc", t = "ahbgdc" → false
```

---

## 3. Key Insight

Greedily match characters of `s` left-to-right in `t`. Each time a character in `t` matches the current character in `s`, advance the `s` pointer. If `s` is fully consumed, it's a subsequence.

---

## 4. Approach: Two Pointers — O(n) ✅

```
FUNCTION isSubsequence(s, t):
    i = 0    // pointer for s

    FOR char IN t:
        IF i < len(s) AND char == s[i]:
            i += 1

    RETURN i == len(s)
```

---

## 5. Walkthrough

```
s = "abc", t = "ahbgdc"
```

| t char | s[i] | Match? | i |
|--------|------|--------|---|
| a | a | ✅ | 1 |
| h | b | No | 1 |
| b | b | ✅ | 2 |
| g | c | No | 2 |
| d | c | No | 2 |
| c | c | ✅ | 3 |

`i == 3 == len(s)` → **true** ✅

---

## 6. Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| Time | O(n) | n = len(t), single pass |
| Space | O(1) | Just a pointer |

---

## 7. Follow-Up Questions

### 7.1 Many s queries against the same t?

Preprocess `t`: build a map of `char → sorted list of indices`. For each query, binary search for the next valid index for each character. O(|s| · log |t|) per query after O(|t|) preprocessing.

### 7.2 What if we need the number of distinct subsequences?

That's a different problem (**LeetCode #115**), solved with DP.

### 7.3 Can we check if s is a subsequence of t recursively?

Yes, but the iterative two-pointer approach is cleaner and uses O(1) space vs O(n) stack.

---

## 8. Key Takeaway

> Greedy scan through `t` with a pointer into `s`. Each match advances the `s` pointer. If all of `s` is consumed, it's a subsequence. The follow-up (many queries) upgrades to binary search on precomputed index lists.
