# 3303. Find the Occurrence of First Almost Equal Substring

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-the-occurrence-of-first-almost-equal-substring](https://leetcode.com/problems/find-the-occurrence-of-first-almost-equal-substring)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Z-Function / Rolling Hash — O(n + m) ✅](#3-approach-z-function--rolling-hash--on--m-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

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

```
FUNCTION minStartingIndex(s, pattern):
    m ← LENGTH(pattern); n ← LENGTH(s)

    // Compute forward matches: Z-function on pattern + "#" + s
    forward ← Z(pattern + "#" + s)
    // forward[m+1+i] = longest prefix of pattern matching s[i..]

    // Compute backward matches: Z-function on reversed(pattern) + "#" + reversed(s)
    backward ← Z(reverse(pattern) + "#" + reverse(s))

    FOR i ← 0 TO n - m DO
        fwd ← forward[m + 1 + i]
        bwd ← backward[m + 1 + (n - i - m)]
        IF fwd + bwd >= m - 1 THEN RETURN i

    RETURN -1
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n + m) — two Z-function computations |
| **Space** | O(n + m) |

---

## 5. Key Takeaway

> **Forward + backward Z-function** enables O(1) per window to check if at most 1 mismatch exists. A classic "allow k mismatches" pattern.
