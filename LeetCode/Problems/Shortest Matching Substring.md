# 3455. Shortest Matching Substring

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/shortest-matching-substring](https://leetcode.com/problems/shortest-matching-substring)
**Companies:** Amazon

---

## Problem Description

Given a string `s` and a pattern `p` containing at most two `*` wildcards (each matching zero or more characters), find the length of the shortest substring of `s` that matches `p`.

---

## Approach

Split `p` by `*` into up to 3 literal parts. Use KMP or Z-algorithm to find all occurrences of each part. Then find the shortest window in `s` containing all parts in order.

```
FUNCTION shortestMatchingSubstring(s, p):
    parts ← split p by '*'
    // Find all occurrences of each part in s
    // Two pointers / sliding window to find shortest window
    //   covering one occurrence of each part in order
```

| Time | Space |
|------|-------|
| O(n + m) with KMP | O(n) |

---

## Key Takeaway

> Wildcard matching with bounded `*` count: split on wildcards, find literal matches, then minimize the covering window.
