# 3435. Frequencies of Shortest Supersequences

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/frequencies-of-shortest-supersequences](https://leetcode.com/problems/frequencies-of-shortest-supersequences)
**Companies:** Phonepe

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Bitmask Enumeration + Verification ✅](#4-approach-bitmask-enumeration--verification-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given an array of 2-character strings, find the shortest supersequences that contain all strings as subsequences. Return the character frequency arrays of all such shortest supersequences.

---

## 2. Examples

| words | Output | Explanation |
|-------|--------|-------------|
| `["ab","bc","ca"]` | `[[1,1,1]]` | The shortest supersequence is `"abc"` (or its rotations). Frequencies: a=1,b=1,c=1. |
| `["aa","bb","ab"]` | `[[2,2]]` | Shortest supersequence `"aabb"` (or `"bbaa"`). Frequencies: a=2,b=2. |

---

## 3. Key Insight

> Since strings are length 2, the problem reduces to a graph where each string `ab` creates an edge a→b. The shortest supersequence relates to finding an Euler‑path‑like structure. Enumerate possible character sets using bitmasks.

---

## 4. Approach: Bitmask Enumeration + Verification ✅

```text
FUNCTION supersequences(words):
    // Build adjacency and indegree for characters
    adj ← MAP from char TO SET of chars
    indeg ← MAP from char TO INT
    FOR w IN words:
        a ← w[0]; b ← w[1]
        IF b NOT IN adj[a]:
            ADD b TO adj[a]
            indeg[b] ← indeg.get(b,0) + 1
        IF a NOT IN indeg: indeg[a] ← indeg.get(a,0)
    // Enumerate subsets of characters that could appear twice
    bestLen ← INF
    results ← []
    FOR mask FROM 0 TO (1 << 26) - 1:
        // Build candidate supersequence using topological order
        seq ← TOPOLOGICAL_SORT(adj, indeg, mask)
        IF seq COVERS ALL words:
            freq ← COUNT_CHARACTERS(seq)
            IF LENGTH(seq) < bestLen:
                bestLen ← LENGTH(seq)
                results ← [freq]
            ELSE IF LENGTH(seq) == bestLen:
                APPEND freq TO results
    RETURN results
```

---

## 5. Walkthrough

**Example:** `words = ["ab","bc","ca"]`

1. Build graph: a→b, b→c, c→a. All indegrees = 1.
2. The graph forms a cycle, so any ordering that respects edges must include each character once.
3. Enumerate masks – the minimal mask (no duplicated characters) yields sequence `abc`.
4. Verify that `abc` contains each word as subsequence.
5. Frequency array = `[1,1,1]` for a,b,c.

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(2^C · (C + E)) where C ≤ 26 (characters) and E = number of words. Feasible because C is small. |
| **Space** | O(C + E) for graph structures and recursion stack. |

---

## 7. Follow-Up Questions

1. How would the solution change if strings could be of length up to 3?
2. Can you design an algorithm that runs in polynomial time for arbitrary string lengths?
3. How would you adapt the approach to output the actual supersequences, not just frequency arrays?

---

## 8. Key Takeaway

> With only 26 possible characters and length‑2 strings, the problem is tractable via bitmask enumeration over which characters appear multiple times, combined with a topological‑sort verification.
