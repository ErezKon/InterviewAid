# 3008. Find Beautiful Indices in the Given Array II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-beautiful-indices-in-the-given-array-ii](https://leetcode.com/problems/find-beautiful-indices-in-the-given-array-ii)
**Companies:** Google, Palantir, Phonepe

---

## Problem Description

Same as Part I but with larger constraints. Find indices where pattern `a` occurs, paired with a nearby occurrence of pattern `b` within distance `k`.

---

## Examples

**Example 1:**
```
Input: s = "abcabcabc", a = "abc", b = "bc", k = 2
Output: [0, 3, 6]
Explanation: Each occurrence of "abc" at indices 0,3,6 has a "bc" within distance 2.
```

**Example 2:**
```
Input: s = "aaaaa", a = "aa", b = "a", k = 1
Output: [0,1,2,3]
Explanation: Every "aa" is adjacent to an "a" within distance 1.
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