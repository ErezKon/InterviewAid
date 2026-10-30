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

> *Note: statement verified against the official LeetCode page.*

You are given an array of strings `words`. Find all **shortest common supersequences (SCS)** of `words` that are not permutations of each other.

A **shortest common supersequence** is a string of **minimum** length that contains each string in `words` as a subsequence.

Return a 2D array of integers `freqs` that represent all the SCSs. Each `freqs[i]` is an array of size 26, representing the frequency of each letter in the lowercase English alphabet for a single SCS. You may return the frequency arrays in any order.

**Constraints:**
- `1 <= words.length <= 256`
- `words[i].length == 2`
- All strings in `words` will altogether be composed of no more than 16 unique lowercase letters.
- All strings in `words` are unique.

---

## 2. Examples

**Example 1:**
```
Input: words = ["ab","ba"]
Output: [[1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]
Explanation: The two SCSs are "aba" and "bab". The output is the letter frequencies for each one.
```

**Example 2:**
```
Input: words = ["aa","ac"]
Output: [[2,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]
Explanation: The two SCSs are "aac" and "aca". Since they are permutations of each other, keep only "aac".
```

**Example 3:**
```
Input: words = ["aa","bb","cc"]
Output: [[2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]
Explanation: "aabbcc" and all its permutations are SCSs.
```

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
