# 3455. Shortest Matching Substring

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/shortest-matching-substring](https://leetcode.com/problems/shortest-matching-substring)
**Companies:** Amazon
---

## Problem Description

You are given a string `s` and a pattern string `p`, where `p` contains **exactly two** `'*'` characters.

The `'*'` in `p` matches any sequence of zero or more characters.

Return the length of the **shortest** substring in `s` that matches `p`. If there is no such substring, return -1.

**Note:** The empty substring is considered valid.

**Constraints:**
- `1 <= s.length <= 10^5`
- `2 <= p.length <= 10^5`
- `s` contains only lowercase English letters.
- `p` contains only lowercase English letters and exactly two `'*'`.

---

## Approach

```text
FUNCTION shortestMatchingSubstring(s, p):
    // Split pattern by '*', up to three literal parts
    parts ← split p by '*'
    // For each part, find all start indices in s using KMP or Z-algorithm
    occurrences ← list of index lists for each part
    // Use two‑pointer / sliding window to locate the minimal window covering parts in order
    minLen ← infinity
    FOR each start index i in occurrences[0]:
        pos ← i + length(parts[0])
        FOR partIdx FROM 1 TO length(parts)-1:
            // Find the first occurrence of parts[partIdx] at or after pos
            j ← first index in occurrences[partIdx] ≥ pos
            IF j does not exist: BREAK out of inner loop
            pos ← j + length(parts[partIdx])
        IF all parts matched:
            windowLen ← pos - i
            minLen ← MIN(minLen, windowLen)
    RETURN minLen IF minLen ≠ infinity ELSE -1
```

---

## Examples

**Example 1:**
```
Input: s = "abaacbaecebce", p = "ba*c*ce"
Output: 8
Explanation: The shortest matching substring of p in s is "baecebce".
```

**Example 2:**
```
Input: s = "baccbaadbc", p = "cc*baa*adb"
Output: -1
Explanation: There is no matching substring in s.
```

**Example 3:**
```
Input: s = "a", p = "**"
Output: 0
Explanation: The empty substring is the shortest matching substring.
```

**Example 4:**
```
Input: s = "madlogic", p = "*adlogi*"
Output: 6
Explanation: The shortest matching substring of p in s is "adlogi".
```

---

## Walkthrough

Consider `s = "abcdeabc"`, `p = "a*e"`.

1. Split pattern → parts = ["a", "e"].
2. Find occurrences of "a" → indices [0, 5]; occurrences of "e" → index [4].
3. Start with first "a" at 0, look for an "e" at or after position 1 → found at 4.
4. Window length = 4 - 0 + 1 = 5, update `minLen`.
5. Next start "a" at 5, no "e" after it → discard.
6. Minimum length = 5.

---

## Complexity Analysis

- **Time:** `O(|s| + |p|)` for building KMP tables for each part plus linear scans for the sliding‑window step.
- **Space:** `O(|s|)` to store occurrence lists (or `O(1)` if processed on the fly).

---

## Follow‑Up Questions

- How would you extend the solution to support more than two `*` wildcards?
- Can the algorithm be adapted to return the actual substring, not just its length?
- What changes are needed if `*` can also match the empty string?

---

## Key Takeaway

> By splitting the pattern on `*` and locating each literal part in order, the problem reduces to a minimal‑window search over pre‑computed occurrence positions.
