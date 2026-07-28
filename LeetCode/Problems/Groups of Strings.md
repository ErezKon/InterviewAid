# 2157. Groups of Strings

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/groups-of-strings](https://leetcode.com/problems/groups-of-strings)
**Companies:** Lowe

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Bitmask + Union-Find — O(n · 26²) ✅](#3-approach-bitmask--union-find)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Group strings where one can be transformed into another by adding, removing, or replacing exactly one character. Find the number of groups and the size of the largest group.

---

## 2. Key Insight

> Represent each string as a bitmask of its characters (26 bits). Two strings are connected if their bitmasks differ by adding/removing one bit (Hamming distance 1) or swapping one bit off and another on.

---

## 3. Approach: Bitmask + Union-Find — O(n · 26²) ✅

```text
FUNCTION groupStrings(words):
    uf ← UnionFind(n)
    maskToIdx ← {bitmask(w): i for i, w in enumerate(words)}

    FOR i, w IN enumerate(words) DO
        mask ← bitmask(w)
        // Try removing each set bit
        FOR bit IN set bits of mask DO
            neighbor ← mask ^ (1 << bit)
            IF neighbor IN maskToIdx: uf.UNION(i, maskToIdx[neighbor])
        // Try replacing: remove one set bit, add one unset bit
        FOR bit IN set bits of mask DO
            FOR newBit IN 0..25 IF NOT set DO
                neighbor ← mask ^ (1 << bit) | (1 << newBit)
                IF neighbor IN maskToIdx: uf.UNION(i, maskToIdx[neighbor])

    RETURN [number of components, max component size]
```

---

## 4. Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `words = ["abc","abd","ab","a"]` | `[2,3]` | Groups: {"abc","abd"} and {"ab","a"}. Largest group size is 3. |
| `words = ["a","b","c","ab","ac","bc","abc"]` | `[1,7]` | All strings are connected through single‑character edits. |

---

## 5. Walkthrough

Consider the first example `words = ["abc","abd","ab","a"]`.

| Step | Action | Union‑Find State |
|------|--------|-----------------|
| 1 | Compute bitmask for each word. | `abc→111`, `abd→1011`, `ab→11`, `a→1` |
| 2 | Connect `abc` and `abd` by swapping `c`→`d`. | Union(0,1) |
| 3 | Connect `ab` and `a` by removing `b`. | Union(2,3) |
| 4 | No other single‑edit connections. | Two components remain |

Result: 2 groups, largest size 3.

---

## 6. Complexity Analysis

- **Time:** For each word we examine up to 26 set bits and for each set bit try 26 replacements → O(n·26²) ≈ O(n).
- **Space:** Union‑Find arrays plus a hash map of bitmasks → O(n).

---

## 7. Follow-Up Questions

1. How would the solution change if edits could involve adding or removing any number of characters?
2. Can the approach be adapted to handle Unicode characters beyond the English alphabet?
3. What if we need to output the actual groups, not just their counts?

---

## 8. Key Takeaway

> **Bitmask + Union-Find** — represent character sets as bitmasks, enumerate neighbors by flipping 1‑2 bits. O(n·26²) total.
