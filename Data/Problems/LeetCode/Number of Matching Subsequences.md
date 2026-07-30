# 792. Number of Matching Subsequences

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-matching-subsequences](https://leetcode.com/problems/number-of-matching-subsequences)
**Companies:** Amazon, Blend, Bloomberg, Google, Meta, Spinny, Uber, Visa

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Bucket Pointers — O(n + Σ|words|)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Count how many strings in `words` are subsequences of `s`.

---

## 2. Key Insight

> Instead of checking each word against `s` separately, process `s` once. Bucket word iterators by their next needed character. When a character in `s` matches, advance those iterators.

---

## 3. Approach: Bucket Pointers — O(n + Σ|words|) ✅

```text
FUNCTION numMatchingSubseq(s, words):
    // Bucket words by the character they are currently waiting for
    buckets ← MAP from char TO LIST of iterators
    FOR word IN words:
        IF word IS NOT EMPTY:
            firstChar ← word[0]
            buckets[firstChar].ADD(ITERATOR(word))

    count ← 0
    FOR ch IN s:
        waiting ← buckets[ch]
        buckets[ch] ← []
        FOR it IN waiting:
            // Advance iterator past the matched character
            NEXT(it)  // discard current char
            nextChar ← PEEK(it)  // look at next needed char, or NONE
            IF nextChar IS NONE:
                count ← count + 1
            ELSE:
                buckets[nextChar].ADD(it)
    RETURN count
```

---

## Examples

1. **Input:** `s = "abcde"`, `words = ["a","bb","acd","ace"]`
   **Output:** `3`
   **Explanation:** "a", "acd" and "ace" are subsequences of `s`.
2. **Input:** `s = "dsahjpjaw"`, `words = ["ahj","ja","ahjw"]`
   **Output:** `2`
   **Explanation:** "ahj" and "ja" are subsequences; "ahjw" is not because `w` appears after the end of `s`.

---

## Walkthrough

Consider the first example.
| Step | Character `ch` | Waiting Buckets (before) | Actions | Count |
|------|----------------|--------------------------|---------|-------|
| 0    | –              | a:["a"], b:["bb"], a:["acd"], a:["ace"] | Initialize buckets | 0 |
| 1    | `a`            | a:["a","acd","ace"] | Advance all three iterators. `"a"` finishes → count=1. `"acd"` now waits for `c`. `"ace"` now waits for `c`. | 1 |
| 2    | `b`            | b:["bb"] | Advance iterator for "bb" to wait for `b`. | 1 |
| 3    | `c`            | c:["acd","ace"] | Advance both; now waiting for `d` and `e` respectively. | 1 |
| 4    | `d`            | d:["acd"] | "acd" finishes → count=2. | 2 |
| 5    | `e`            | e:["ace"] | "ace" finishes → count=3. | 3 |

The algorithm processes `s` once and updates buckets accordingly, yielding the final count of 3.

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n + Σ word lengths) |
| **Space** | O(Σ word lengths) |

---

## 5. Key Takeaway

> **Bucket iterators by next needed character.** Process `s` once, advancing all waiting words simultaneously. Avoids O(n × m) brute force. Elegant event-driven approach.
