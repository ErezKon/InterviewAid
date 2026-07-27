# 854. K-Similar Strings

**Difficulty:** 🔴 Hard
**Companies:** Doordash, Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: BFS on Swap States — O(n!) ✅](#4-approach-bfs-on-swap-states--on-)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Key Takeaway](#6-key-takeaway)

---

## 1. Problem Description

Two strings are **k-similar** if we can swap positions of characters exactly `k` times to transform one into the other. Given anagram strings `s1` and `s2`, find the minimum `k`.

**Constraints:**
- `1 <= s1.length <= 20`
- `s1` and `s2` are anagrams of lowercase letters.

---

## 2. Examples

```
Input: s1 = "ab", s2 = "ba" → Output: 1
Input: s1 = "abc", s2 = "bca" → Output: 2
```

---

## 3. Key Insight

BFS on string states. At each level, find the **first mismatch** position, then try swapping it with each later position that has the correct character. Pruning: only swap to fix at least one mismatch.

---

## 4. Approach: BFS on Swap States — O(n!) ✅

```
FUNCTION kSimilarity(s1, s2):
    queue = [s1]; visited = {s1}; steps = 0
    WHILE queue:
        nextQueue = []
        FOR s IN queue:
            IF s == s2: RETURN steps
            i = first index where s[i] != s2[i]
            FOR j ← i+1 TO len(s)-1:
                IF s[j] == s2[i] AND s[j] != s2[j]:
                    swapped = swap(s, i, j)
                    IF swapped NOT IN visited:
                        visited.ADD(swapped)
                        nextQueue.ADD(swapped)
        queue = nextQueue; steps += 1
    RETURN steps
```

---

## 5. Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| Time | O(n! / pruning) | BFS with state deduplication; n ≤ 20 makes it feasible |
| Space | O(n!) | Visited states |

---

## 6. Key Takeaway

> BFS on string permutations with pruning: only fix the first mismatch, only swap with positions that actually improve. The small constraint (n ≤ 20) makes BFS feasible despite exponential state space.
