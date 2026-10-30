# 3008. Find Beautiful Indices in the Given Array II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-beautiful-indices-in-the-given-array-ii](https://leetcode.com/problems/find-beautiful-indices-in-the-given-array-ii)
**Companies:** Google, Palantir, Phonepe

---

## Problem Description

You are given a **0-indexed** string `s`, a string `a`, a string `b`, and an integer `k`.

An index `i` is **beautiful** if:

- `0 <= i <= s.length - a.length`
- `s[i..(i + a.length - 1)] == a`
- There exists an index `j` such that:
  - `0 <= j <= s.length - b.length`
  - `s[j..(j + b.length - 1)] == b`
  - `|j - i| <= k`

Return *the array that contains beautiful indices in **sorted order from smallest to largest***.

**Constraints:**

- `1 <= k <= s.length <= 5 * 10^5`
- `1 <= a.length, b.length <= 5 * 10^5`
- `s`, `a`, and `b` contain only lowercase English letters.

---

## Examples

```
Example 1:
  Input: s = "isawsquirrelnearmysquirrelhouseohmy", a = "my", b = "squirrel", k = 15
  Output: [16,33]
  Explanation: There are 2 beautiful indices: [16,33].
  - The index 16 is beautiful as s[16..17] == "my" and there exists an index 4 with s[4..11] == "squirrel" and |16 - 4| <= 15.
  - The index 33 is beautiful as s[33..34] == "my" and there exists an index 18 with s[18..25] == "squirrel" and |33 - 18| <= 15.
  Thus we return [16,33] as the result.
```

```
Example 2:
  Input: s = "abcd", a = "a", b = "a", k = 4
  Output: [0]
  Explanation: There is 1 beautiful index: [0].
  - The index 0 is beautiful as s[0..0] == "a" and there exists an index 0 with s[0..0] == "a" and |0 - 0| <= 4.
  Thus we return [0] as the result.
```

---

## Approach: KMP + Two Pointers — O(n) ✅

```text
FUNCTION beautifulIndices(s, a, b, k):
    // Find all start positions of pattern a using KMP
    posA ← KMP_findAll(s, a)
    // Find all start positions of pattern b using KMP
    posB ← KMP_findAll(s, b)

    result ← []
    j ← 0
    FOR i IN posA:
        // Move pointer j to the first b position not left of i-k
        WHILE j < LENGTH(posB) AND posB[j] < i - k:
            j ← j + 1
        // Check if current b is within distance k
        IF j < LENGTH(posB) AND ABS(posB[j] - i) ≤ k:
            APPEND i TO result
    RETURN result
```

---

## Walkthrough

| Step | i (posA) | j (posB) | Action |
|------|----------|----------|--------|
| 1 | 0 | 0 | `posB[0]=1` is within `k=2` of `i=0` → add 0 |
| 2 | 3 | 0 | `posB[0]=1` < `3-2`, increment j → j=1 (`posB[1]=4`), within distance → add 3 |
| 3 | 6 | 1 | `posB[1]=4` < `6-2`, increment j → j=2 (`posB[2]=7`), within distance → add 6 |

The algorithm scans both lists once, guaranteeing linear time.

---

## Complexity Analysis

- **Time:** O(n + m₁ + m₂) where n is length of `s`, m₁/m₂ are lengths of patterns `a` and `b` (KMP preprocessing) plus linear scan of position lists.
- **Space:** O(p₁ + p₂) for storing positions of `a` and `b`.

---

## Follow-Up Questions

1. How would you modify the solution if overlapping occurrences of `a` and `b` are not allowed?
2. Can the approach be extended to handle more than two patterns with pairwise distance constraints?

---

## Key Takeaway

> **KMP for O(n) pattern matching (necessary for large inputs), then two pointers for proximity check. Same logic as Part I but with efficient string matching.**