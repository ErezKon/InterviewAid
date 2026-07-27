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

```
FUNCTION numMatchingSubseq(s, words):
    // Bucket words by their current needed character
    buckets = defaultdict(list)
    FOR word IN words:
        buckets[word[0]].ADD(iter(word))

    count = 0
    FOR char IN s:
        waiting = buckets[char]
        buckets[char] = []
        FOR it IN waiting:
            next_char = next(it, None)    // advance past current match
            next_char = next(it, None)    // peek at next needed char
            IF next_char is None:
                count += 1
            ELSE:
                buckets[next_char].ADD(it)

    RETURN count
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n + Σ word lengths) |
| **Space** | O(Σ word lengths) |

---

## 5. Key Takeaway

> **Bucket iterators by next needed character.** Process `s` once, advancing all waiting words simultaneously. Avoids O(n × m) brute force. Elegant event-driven approach.
