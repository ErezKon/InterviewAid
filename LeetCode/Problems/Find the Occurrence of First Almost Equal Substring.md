# 3303. Find the Occurrence of First Almost Equal Substring

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-the-occurrence-of-first-almost-equal-substring](https://leetcode.com/problems/find-the-occurrence-of-first-almost-equal-substring)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Z-Function / Rolling Hash — O(n + m) ✅](#3-approach-z-function--rolling-hash--on--m-)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given strings `s` and `pattern`, find the first index in `s` where a substring of length `|pattern|` differs from `pattern` in at most 1 position.

**Constraints:**
- `1 <= |s|, |pattern| <= 10⁵`

---

## 2. Key Insight

> Compute longest common prefix from the left (using Z-function on `pattern + "#" + s`) and longest common suffix from the right (Z-function on reversed strings). A window at position `i` is "almost equal" if `leftMatch[i] + rightMatch[i] >= m - 1`.

---

## 3. Approach: Z-Function / Rolling Hash — O(n + m) ✅

```text
FUNCTION minStartingIndex(s, pattern):
    SET m ← LENGTH(pattern)
    SET n ← LENGTH(s)
    // forward Z on pattern#s
    SET forward ← Z(pattern + "#" + s)
    // backward Z on reversed strings
    SET backward ← Z(reverse(pattern) + "#" + reverse(s))
    FOR i ← 0 TO n - m DO
        SET fwd ← forward[m + 1 + i]
        SET bwd ← backward[m + 1 + (n - i - m)]
        IF fwd + bwd >= m - 1 THEN RETURN i
    RETURN -1
```

---

## 4. Examples

| s | pattern | Output |
|---|---------|--------|
| "abcde" | "abfde" | 0 |
| "aaaaa" | "aaaba" | 1 |
| "xyz" | "abc" | -1 |

*Explanation*: In the first example, the substring "abcde" matches pattern with 0 mismatches, so index 0 is returned. In the second, the substring starting at index 1 differs by exactly one character, satisfying the condition.

---

## 5. Walkthrough

Consider `s = "aaaaa"`, `pattern = "aaaba"` (length 5).

1. Compute Z on `"aaaba#aaaaa"` → forward matches give longest prefix lengths for each position.
2. Compute Z on reversed strings → backward matches give longest suffix lengths.
3. For each start `i` (0‑4):
   - `i = 0`: `fwd = 3`, `bwd = 0` → total 3 < 4 → not valid.
   - `i = 1`: `fwd = 4`, `bwd = 0` → total 4 ≥ 4 → valid, return 1.

Thus the algorithm returns index 1.

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n + m) — two Z-function computations |
| **Space** | O(n + m) |

---

## 7. Follow-Up Questions

1. How would you modify the solution to allow up to `k` mismatches?
2. Can the approach be adapted for streaming input where `s` is received character by character?
3. What if the alphabet size is extremely large—does it affect the Z‑function computation?

---

## 8. Key Takeaway

> **Forward + backward Z-function** enables O(1) per window to check if at most 1 mismatch exists. A classic "allow k mismatches" pattern.
