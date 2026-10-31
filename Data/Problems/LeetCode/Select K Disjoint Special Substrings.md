# 3458. Select K Disjoint Special Substrings

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/select-k-disjoint-special-substrings](https://leetcode.com/problems/select-k-disjoint-special-substrings)
**Companies:** Amazon

---

## Problem Description

Given a string `s` of length `n` and an integer `k`, determine whether it is possible to select `k` disjoint **special substrings**.

A **special substring** is a substring where:

- Any character present inside the substring should not appear outside it in the string.
- The substring is not the entire string `s`.

**Note** that all `k` substrings must be disjoint, meaning they cannot overlap.

Return `true` if it is possible to select `k` such disjoint special substrings; otherwise, return `false`.

**Constraints:**

- `2 <= n == s.length <= 5 * 10^4`
- `0 <= k <= 26`
- `s` consists only of lowercase English letters.

---

## Key Insight

> Any minimal special substring starts at the first occurrence of some character `c`. Start from `[first[c], last[c]]` and expand the end to cover the full span of every character inside; if some character inside occurs **before** the start, no special substring can start there. This yields at most 26 candidate intervals (excluding the whole string). The answer is whether the maximum number of disjoint candidates (classic interval scheduling) is ≥ k.

---

## Approach

```text
FUNCTION maxDisjointSubstrings(s, k):
    n ← len(s)
    // Record first and last index of each character
    first, last ← maps of char → index
    FOR i ← 0 TO n-1:
        c ← s[i]
        IF c NOT IN first: first[c] ← i
        last[c] ← i

    // Build one candidate interval per distinct character
    intervals ← []
    FOR each char c IN first:
        start ← first[c]
        end ← last[c]
        j ← start
        valid ← true
        WHILE j ≤ end:
            IF first[s[j]] < start:          // char also appears to the left
                valid ← false; BREAK
            end ← MAX(end, last[s[j]])
            j ← j + 1
        IF valid AND NOT (start == 0 AND end == n-1):   // cannot be entire string
            intervals.APPEND((start, end))

    // Greedy interval scheduling to count non-overlapping intervals
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

```
Example 1:
  Input: s = "abcdbaefab", k = 2
  Output: true
  Explanation:
  - We can select two disjoint special substrings: "cd" and "ef".
  - "cd" contains the characters 'c' and 'd', which do not appear elsewhere in s.
  - "ef" contains the characters 'e' and 'f', which do not appear elsewhere in s.
```

```
Example 2:
  Input: s = "cdefdc", k = 3
  Output: false
  Explanation: There can be at most 2 disjoint special substrings: "e" and "f". Since k = 3, the output is false.
```

```
Example 3:
  Input: s = "abeabe", k = 0
  Output: true
```

---

## Walkthrough

Example 2: `s = "cdefdc"`, `k = 3`. Spans: c [0,5], d [1,4], e [2,2], f [3,3].

| Char | Start | Expansion | Result |
|------|-------|-----------|--------|
| c | 0 | end = 5, covers whole string | rejected (entire string) |
| d | 1 | scan s[1..4] = d,e,f,d; all first ≥ 1, end stays 4 | (1,4) |
| e | 2 | single char | (2,2) |
| f | 3 | single char | (3,3) |

Sorted by end: (2,2), (3,3), (1,4).
- (2,2): 2 > -1 → count = 1, prevEnd = 2
- (3,3): 3 > 2 → count = 2, prevEnd = 3
- (1,4): 1 ≤ 3 → skip

count = 2 < k = 3 → return **false**, as expected.

Example 1 (`"abcdbaefab"`, k = 2): `a` expands to [0,9] (whole string, rejected); `b` starts at 1 but contains `a` (first 0) → invalid; `c`, `d`, `e`, `f` give (2,2), (3,3), (6,6), (7,7) → count = 4 ≥ 2 → **true**. Example 3 has k = 0 → **true** trivially.

---

## Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| Time   | O(26 · n) — at most 26 interval expansions of O(n) each; sorting ≤ 26 intervals is O(1) |
| Space  | O(1) — first/last maps and interval list hold at most 26 entries |

---

## Follow-Up Questions

1. How would you modify the algorithm to return the actual substrings instead of just a boolean?
2. Can the approach be extended to handle overlapping special substrings with a maximum count objective?
3. What changes are needed if the string contains Unicode characters with multi-byte representations?

---

## Key Takeaway

> "Special substrings" are identified by expanding character spans to closed intervals, then the problem reduces to classic interval scheduling to select the maximum number of disjoint intervals.
