# 854. K-Similar Strings

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/k-similar-strings](https://leetcode.com/problems/k-similar-strings)
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

Strings `s1` and `s2` are `k`**-similar** (for some non-negative integer `k`) if we can swap the positions of two letters in `s1` exactly `k` times so that the resulting string equals `s2`.

Given two anagrams `s1` and `s2`, return the smallest `k` for which `s1` and `s2` are `k`**-similar**.

**Constraints:**
- `1 <= s1.length <= 20`
- `s2.length == s1.length`
- `s1` and `s2` contain only lowercase letters from the set `{'a', 'b', 'c', 'd', 'e', 'f'}`.
- `s2` is an anagram of `s1`.

---

## 2. Examples

**Example 1:**
```
Input: s1 = "ab", s2 = "ba"
Output: 1
Explanation: The two string are 1-similar because we can use one swap to change s1 to s2: "ab" --> "ba".
```

**Example 2:**
```
Input: s1 = "abc", s2 = "bca"
Output: 2
Explanation: The two strings are 2-similar because we can use two swaps to change s1 to s2: "abc" --> "bac" --> "bca".
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
