# 2867. Count Valid Paths in a Tree

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-valid-paths-in-a-tree](https://leetcode.com/problems/count-valid-paths-in-a-tree)
**Companies:** Gameskraft

---

## Problem Description

Given a tree with `n` nodes labeled 1 to n, count paths (any start/end) that contain **exactly one** prime-numbered node.

---

## Key Insight

Use Sieve of Eratosthenes to identify primes. For each prime node `p`, consider its adjacent subtrees of non-prime nodes. Union-Find groups non-prime connected components. A valid path either starts/ends at `p` (passing through one non-prime component) or passes through `p` connecting two non-prime components.

For prime node `p` with adjacent non-prime component sizes `s1, s2, ...`:
- Paths with `p` as endpoint: `sum(si)`
- Paths through `p`: `sum(si × cumulative_sum_before_i)` for cross-component pairs
- Path of just `p` itself: `1` (if we count single-node paths)

---

## Approach

```
FUNCTION countPaths(n, edges):
    isPrime = sieve(n)
    adj = build adjacency list

    // Union-Find for non-prime components
    uf = UnionFind(n+1)
    FOR [u, v] IN edges:
        IF NOT isPrime[u] AND NOT isPrime[v]:
            uf.union(u, v)

    result = 0
    FOR p ← 1 TO n WHERE isPrime[p]:
        sizes = [uf.size(neighbor) for neighbor of p if NOT isPrime[neighbor]]
        // Paths ending at p
        total = SUM(sizes)
        result += total  // paths from non-prime to p
        // Paths through p (cross two components)
        cumulative = 0
        FOR s IN sizes:
            result += s * cumulative
            cumulative += s

    RETURN result
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) with sieve + Union-Find |
| **Space** | O(n) |

---

## Key Takeaway

> **Exactly-one-prime paths in a tree: group non-prime nodes into components, then for each prime node combine adjacent component sizes. Paths either end at the prime or cross through it connecting two non-prime components.**
