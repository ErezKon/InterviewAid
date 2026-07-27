# 753. Cracking the Safe

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/cracking-the-safe](https://leetcode.com/problems/cracking-the-safe)
**Companies:** Google

---

## Problem Description

Find the shortest string that contains every possible password of length `n` using digits `0` to `k-1` as a substring. This is a **De Bruijn sequence**.

---

## Key Insight

Model as an Eulerian circuit on a De Bruijn graph: nodes are `(n-1)`-length strings, edges represent appending a digit. An Eulerian circuit visits every edge exactly once, producing the shortest superstring containing all `n`-length passwords. Use Hierholzer's algorithm.

---

## Approach

```
FUNCTION crackSafe(n, k):
    IF n == 1: RETURN "0123..."[:k]

    visited = SET()
    result = []

    FUNCTION dfs(node):
        FOR d ← 0 TO k-1:
            edge = node + str(d)
            IF edge NOT IN visited:
                visited.ADD(edge)
                dfs(edge[1:])   // next node = last (n-1) chars
                result.APPEND(str(d))

    start = "0" * (n - 1)
    dfs(start)
    result.APPEND(start)
    RETURN "".join(reversed(result))
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(k^n) — visit every edge once |
| **Space** | O(k^n) for visited set |

---

## Key Takeaway

> **De Bruijn sequence = Eulerian circuit on the De Bruijn graph. Hierholzer's algorithm finds the circuit. The shortest string containing all k^n passwords has length k^n + n - 1.**
