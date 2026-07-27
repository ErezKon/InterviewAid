# 2506. Count Pairs Of Similar Strings

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-pairs-of-similar-strings](https://leetcode.com/problems/count-pairs-of-similar-strings)
**Companies:** Adobe, Ibm, Oracle, Tiktok

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Two strings are **similar** if they consist of the same set of characters (ignoring frequency). Given an array of strings `words`, return the number of pairs `(i, j)` where `i < j` and `words[i]` is similar to `words[j]`.

**Constraints:**
- `1 <= words.length <= 100`
- `1 <= words[i].length <= 100`
- `words[i]` consists of lowercase English letters

---

## Examples

**Example 1:**
- **Input:** `words = ["aba", "aabb", "abcd", "bac", "aabc"]`
- **Output:** `2`
- **Explanation:** Similar pairs: ("aba","aabb") both have {a,b}; ("abcd","aabc")... wait, "abcd" has {a,b,c,d} and "aabc" has {a,b,c} — not similar. Actually ("aba","aabb") and ("bac","aabc") are the pairs.

**Example 2:**
- **Input:** `words = ["aabb", "ab", "ba"]`
- **Output:** `3`
- **Explanation:** All three have character set {a, b}, so all 3 pairs are similar.

---

## Key Insight

Two strings are similar iff they have the **same character set**. Convert each string to a `frozenset` (or bitmask of 26 bits). Group words by their character set, then count pairs within each group using `C(n, 2) = n × (n-1) / 2`.

---

## Approach

```
FUNCTION similarPairs(words):
    count = Counter(frozenset(w) for w in words)
    RETURN SUM(c * (c - 1) / 2 for c in count.values())
```

**Alternative with bitmask:**
```
FUNCTION similarPairs(words):
    masks = []
    FOR w IN words DO
        mask = 0
        FOR ch IN w DO
            mask |= (1 << (ch - 'a'))
        masks.ADD(mask)
    
    count = Counter(masks)
    RETURN SUM(c * (c - 1) / 2 for c in count.values())
```

---

## Walkthrough

**Input:** `words = ["aabb", "ab", "ba"]`

```
Character sets:
  "aabb" → {a, b} → bitmask 0b11
  "ab"   → {a, b} → bitmask 0b11
  "ba"   → {a, b} → bitmask 0b11

Groups: {0b11: 3}
Pairs: C(3, 2) = 3 × 2 / 2 = 3
```

**Result:** `3` ✅

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n × L) where L is average string length (to compute character sets) |
| **Space** | O(n) for the counter |

---

## Follow-Up Questions

**Q1: Why use a set/bitmask instead of sorting?**
A sorted string preserves duplicates ("aab" → "aab"), but we only care about the distinct character set. A set or bitmask naturally deduplicates.

**Q2: Can you use a bitmask for efficiency?**
Yes — since there are only 26 lowercase letters, a 26-bit integer encodes the character set. This makes hashing and comparison O(1).

**Q3: What if similarity also required matching character frequencies?**
Then use a frequency tuple (Counter) as the key instead of a set. This is the "anagram grouping" variant (LeetCode #49).

---

## Key Takeaway

> **When grouping strings by shared properties, convert the property to a hashable key (set, bitmask, sorted string) and count groups. Pairs within a group of size n = C(n, 2) = n(n−1)/2.**
