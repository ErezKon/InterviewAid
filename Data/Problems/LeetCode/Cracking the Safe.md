# 753. Cracking the Safe

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/cracking-the-safe](https://leetcode.com/problems/cracking-the-safe)
**Companies:** Google

---

## Problem Description

Find the shortest string that contains every possible password of length `n` using digits `0` to `k-1` as a substring. This is a **De Bruijn sequence**.

---

## Examples

**Example 1:**
```
Input: n = 2, k = 2
Output: "00110"
Explanation: The string "00110" contains all possible 2‑digit passwords {"00","01","11","10"} exactly once as substrings.
```

**Example 2:**
```
Input: n = 1, k = 2
Output: "01"
Explanation: All 1‑digit passwords {"0","1"} appear.
```

---

## Approach

```
FUNCTION crackSafe(n, k):
    IF n == 1: RETURN "".JOIN([STR(i) FOR i IN RANGE(k)])
    visited ← SET()
    result ← []

    FUNCTION dfs(node):
        FOR d ← 0 TO k-1:
            edge ← node + STR(d)
            IF edge NOT IN visited:
                visited.ADD(edge)
                dfs(edge[1:])   // next node = last (n-1) chars
                result.APPEND(STR(d))

    start ← "0" * (n-1)
    dfs(start)
    result.APPEND(start)
    RETURN "".JOIN(REVERSED(result))
```

---

## Walkthrough

| Step | Current node | Edge taken | Action |
|------|--------------|------------|--------|
| 1 | "00" (start) | 0 → edge "000" | Mark visited, recurse to "00" |
| 2 | "00" | 1 → edge "001" | Mark visited, recurse to "01" |
| 3 | "01" | 0 → edge "010" | Mark visited, recurse to "10" |
| 4 | "10" | 0 → edge "100" | Mark visited, recurse to "00" (already visited) |
| 5 | backtrack, append "0" to result |
| … | continue until all 2^n edges visited |
| Final | result list reversed + start = "00110" |

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(kⁿ) – each edge of the De Bruijn graph visited once |
| **Space** | O(kⁿ) – visited set and recursion stack |

---

## Follow-Up Questions

1. How would you adapt the algorithm to generate a De Bruijn sequence for an alphabet of letters instead of digits?
2. Can the solution be implemented iteratively using an explicit stack instead of recursion?
3. What changes are needed if the sequence must start with a specific prefix?

---

## Key Takeaway

> **De Bruijn sequence = Eulerian circuit on the De Bruijn graph.** Hierholzer’s algorithm traverses every edge exactly once, yielding the shortest string that contains all possible passwords.
