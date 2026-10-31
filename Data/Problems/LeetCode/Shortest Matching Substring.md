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
    // Split pattern by '*' into exactly three literal parts (any may be empty)
    parts ← split p by '*'
    // For each part, find all start indices in s using KMP or Z-algorithm
    // (an empty part "occurs" at every index 0..|s|)
    occurrences ← sorted index lists for each part
    // Greedy: for a fixed start i, taking the earliest later occurrence of each
    // following part is optimal. pos only grows with i, so pointers never move back.
    ptr[1] ← 0; ptr[2] ← 0
    minLen ← infinity
    FOR each start index i in occurrences[0]:
        pos ← i + length(parts[0])
        FOR k FROM 1 TO 2:
            // Advance to the first occurrence of parts[k] at or after pos
            WHILE ptr[k] < LENGTH(occurrences[k]) AND occurrences[k][ptr[k]] < pos:
                ptr[k] ← ptr[k] + 1
            IF ptr[k] = LENGTH(occurrences[k]): RETURN minLen IF minLen ≠ infinity ELSE -1
            pos ← occurrences[k][ptr[k]] + length(parts[k])
        minLen ← MIN(minLen, pos - i)
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

Example 1: `s = "abaacbaecebce"`, `p = "ba*c*ce"`.

1. parts = ["ba", "c", "ce"].
2. Occurrences: "ba" → [1, 5]; "c" → [4, 8, 11]; "ce" → [8, 11].

| start i | pos after "ba" | first "c" ≥ pos | pos | first "ce" ≥ pos | end | length |
|---------|----------------|-----------------|-----|------------------|-----|--------|
| 1 | 3 | 4 | 5 | 8 | 10 | 9 |
| 5 | 7 | 8 | 9 | 11 | 13 | 8 |

3. Minimum length = 8 ("baecebce"), the expected output.

Example 4 (`p = "*adlogi*"`): parts = ["", "adlogi", ""]; "adlogi" occurs at 1, giving length 6. Empty parts match everywhere, which also makes Example 3 return 0.

---

## Complexity Analysis

- **Time:** `O(|s| + |p|)` for building KMP tables for each part plus linear scans for the sliding-window step.
- **Space:** `O(|s|)` to store occurrence lists (or `O(1)` if processed on the fly).

---

## Follow-Up Questions

- How would you extend the solution to support more than two `*` wildcards?
- Can the algorithm be adapted to return the actual substring, not just its length?
- What changes are needed if `*` must match **at least one** character?

---

## Key Takeaway

> By splitting the pattern on `*` and locating each literal part in order, the problem reduces to a minimal-window search over pre-computed occurrence positions.
