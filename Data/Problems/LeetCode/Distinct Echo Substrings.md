# 1316. Distinct Echo Substrings

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/distinct-echo-substrings](https://leetcode.com/problems/distinct-echo-substrings)
**Companies:** Google

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Rolling Hash](#approach-rolling-hash)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Return the number of **distinct non-empty** substrings of `text` that are **echo substrings** — substrings that can be written as the concatenation of some string with itself (i.e., `a + a` for some string `a`).

**Constraints:**
- `1 <= text.length <= 2000`

---

## Examples

**Example 1:**
```
Input: "abcabcabc"
Output: 3
Explanation: "abcabc" = "abc"+"abc", "bcabca" = "bca"+"bca", "cabcab" = "cab"+"cab"
```

**Example 2:**
```
Input: "leetcodeleetcode"
Output: 2
Explanation: "ee" = "e"+"e", "leetcodeleetcode" = "leetcode"+"leetcode"
```

---

## Key Insight

> An echo substring has **even length 2k** and its first half equals its second half. For each even length `2k` and each starting position `i`, check if `text[i..i+k-1] == text[i+k..i+2k-1]`. Use **rolling hash** to compare substrings in O(1) and a set to count distinct ones.

---

## Approach: Rolling Hash ✅

```
FUNCTION distinctEchoSubstrings(text):
    n ← length(text)
    seen ← set()

    FOR k ← 1 TO n/2 DO                   // half-length
        // Compare text[i..i+k-1] with text[i+k..i+2k-1]
        // Use rolling hash for O(1) comparison
        FOR i ← 0 TO n - 2k DO
            IF text[i..i+k-1] = text[i+k..i+2k-1] THEN
                seen.ADD(text[i..i+2k-1])   // or its hash

    RETURN len(seen)
END FUNCTION
```

**Optimized with rolling hash:** precompute hash arrays, compare in O(1), store hashes in set.

For a brute-force but accepted approach (n ≤ 2000):
```
FUNCTION distinctEchoSubstrings(text):
    n ← length(text)
    seen ← set()

    FOR k ← 1 TO n/2 DO
        matches ← 0
        FOR i ← 0 TO n - 2k DO
            // Incremental comparison
            IF text[i + k - 1 + k] ... // character-by-character or hash
            // Check if first half == second half
            IF text[i:i+k] == text[i+k:i+2k] THEN
                seen.ADD(text[i:i+2k])

    RETURN len(seen)
END FUNCTION
```

---

## Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| **Time** | O(n²) | With rolling hash: O(n²) substring checks in O(1) each |
| **Space** | O(n²) | Set of distinct echo substrings (worst case) |

---

## Follow-Up Questions

**Q1: Why use rolling hash instead of direct string comparison?**
> Direct comparison is O(k) per check, giving O(n³) total. Rolling hash gives O(1) per check after O(n) precomputation, reducing to O(n²).

**Q2: Could Z-algorithm or KMP help?**
> For each starting position, you could use Z-array to find self-matching prefixes. But rolling hash is simpler to implement for this problem.

**Q3: How to handle hash collisions?**
> Use double hashing (two different bases/mods) to reduce collision probability to near zero.

---

## Key Takeaway

> **Echo substrings = substrings where first half equals second half. Enumerate all even lengths, use rolling hash for O(1) equality checks, and a set for distinctness — achieving O(n²) overall.**
