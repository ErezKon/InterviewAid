# 3006. Find Beautiful Indices in the Given Array I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-beautiful-indices-in-the-given-array-i](https://leetcode.com/problems/find-beautiful-indices-in-the-given-array-i)
**Companies:** Bloomberg, Google, Microsoft, Palantir, Samsara

---

## Problem Description

Given a string `s` and two pattern strings `a` and `b`, find all starting indices `i` where `a` occurs in `s` and there exists a starting index `j` where `b` occurs in `s` such that `|i - j| ≤ k`. Return the list of such `i` in ascending order.

---

## Examples

| s | a | b | k | Output |
|---|---|---|---|--------|
| "abcabc" | "ab" | "bc" | 1 | [0,3] |
| "aaaaa" | "aa" | "aaa" | 0 | [] |
| "ababa" | "ab" | "ba" | 2 | [0,2] |

*Explanation*: In the first example, `a` occurs at 0 and 3, `b` occurs at 1 and 4; each `a` has a `b` within distance 1.

---

## Approach: String Matching + Two Pointers — O(n) ✅

```text
FUNCTION beautifulIndices(s, a, b, k):
    posA ← []
    FOR i FROM 0 TO LENGTH(s) - LENGTH(a):
        IF s[i:i+LENGTH(a)] == a:
            posA.APPEND(i)
    posB ← []
    FOR i FROM 0 TO LENGTH(s) - LENGTH(b):
        IF s[i:i+LENGTH(b)] == b:
            posB.APPEND(i)
    result ← []
    j ← 0
    FOR i IN posA:
        WHILE j < LENGTH(posB) AND posB[j] < i - k:
            j ← j + 1
        IF j < LENGTH(posB) AND ABS(posB[j] - i) ≤ k:
            result.APPEND(i)
    RETURN result
```

First collect all occurrence positions of `a` and `b`. Then walk through `posA` while advancing a pointer in `posB` to maintain the closest feasible `b`.

---

## Walkthrough

**Example 1** – `s="abcabc"`, `a="ab"`, `b="bc"`, `k=1`
1. `posA = [0,3]` ("ab" at indices 0 and 3).
2. `posB = [1,4]` ("bc" at indices 1 and 4).
3. Iterate `i=0`: advance `j` while `posB[j] < -1` → none. `posB[0]=1`, `|1-0|=1 ≤ k`, add `0`.
4. Iterate `i=3`: advance `j` while `posB[j] < 2` → `j` moves to 1 (`posB[1]=4`). `|4-3|=1 ≤ k`, add `3`.
5. Result `[0,3]`.

---

## Complexity Analysis

- **Time:** O(n + m) where *n* is length of `s` and *m* is total length of patterns (scanning for occurrences). The two‑pointer merge is linear in the number of occurrences.
- **Space:** O(p + q) for storing positions of `a` (`p`) and `b` (`q`).

---

## Follow-Up Questions

- How would you modify the solution to handle overlapping occurrences?
- Can you achieve O(n) time without storing all positions, using a sliding window?
- What changes are needed if `k` is very large (e.g., larger than `|s|`)?

---

## Key Takeaway

> **Collect occurrence indices for both patterns and use a two‑pointer scan to efficiently check the distance constraint.**