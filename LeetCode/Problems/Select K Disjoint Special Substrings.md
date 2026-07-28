# 3458. Select K Disjoint Special Substrings

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/select-k-disjoint-special-substrings](https://leetcode.com/problems/select-k-disjoint-special-substrings)
**Companies:** Amazon

---

## Problem Description

Given a string `s` and integer `k`, determine if you can select `k` **disjoint special substrings**. A substring is "special" if it contains all occurrences of every character that appears in it (i.e., no character appears both inside and outside the substring).

---

## Key Insight

> For each character, its "special span" is the range `[first_occurrence, last_occurrence]`. A valid special substring must include the full span of every character it contains. Expand intervals greedily, then find the maximum number of non-overlapping valid intervals ≥ k.

---

## Approach

```text
FUNCTION maxDisjointSubstrings(s, k):
    // Record first and last index of each character
    first, last ← maps of char → index
    FOR i ← 0 TO len(s)-1:
        c ← s[i]
        IF c NOT IN first: first[c] ← i
        last[c] ← i

    intervals ← []
    i ← 0
    WHILE i < len(s):
        start ← i
        end ← last[s[i]]
        j ← i
        // Expand interval until it covers all characters inside
        WHILE j ≤ end:
            c ← s[j]
            end ← MAX(end, last[c])
            j ← j + 1
        intervals.APPEND((start, end))
        i ← end + 1

    // Greedy interval scheduling to count non‑overlapping intervals
    SORT intervals BY end ASC
    count ← 0
    prevEnd ← -1
    FOR (sIdx, eIdx) IN intervals:
        IF sIdx > prevEnd:
            count ← count + 1
            prevEnd ← eIdx
    RETURN count >= k
```

---

## Examples

**Example 1:**
```
s = "ababa", k = 2
Output: true
Explanation: The special substrings are "aba" (covers all 'a' and 'b') and the remaining "ba" cannot be selected, but we can choose "aba" and the trailing "a" as two disjoint special substrings.
```

**Example 2:**
```
s = "abc", k = 2
Output: false
Explanation: Each character forms its own special substring, but they overlap, so we cannot select two disjoint ones.
```

---

## Walkthrough

| Step | Current Index | Interval Start | Interval End | Action |
|------|----------------|----------------|--------------|--------|
| 1 | 0 | 0 | 4 | Expand to include all 'a' and 'b' → interval (0,4) |
| 2 | 5 | - | - | No more characters; intervals = [(0,4)] |
| 3 | Greedy selection sorts intervals (only one) → count = 1, which is < k=2 → return false |

---

## Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| Time   | O(n log n) — scanning to build intervals O(n), sorting intervals O(m log m) where m ≤ n |
| Space  | O(n) — maps for first/last positions and interval list |

---

## Follow-Up Questions

1. How would you modify the algorithm to return the actual substrings instead of just a boolean?
2. Can the approach be extended to handle overlapping special substrings with a maximum count objective?
3. What changes are needed if the string contains Unicode characters with multi‑byte representations?

---

## Key Takeaway

> "Special substrings" are identified by expanding character spans to closed intervals, then the problem reduces to classic interval scheduling to select the maximum number of disjoint intervals.
