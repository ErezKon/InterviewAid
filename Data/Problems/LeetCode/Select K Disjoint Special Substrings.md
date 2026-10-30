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
