# 2157. Groups of Strings

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/groups-of-strings](https://leetcode.com/problems/groups-of-strings)
**Companies:** Lowe

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Bitmask + Union-Find — O(n · 26²) ✅](#3-approach-bitmask--union-find)
4. [Key Takeaway](#4-key-takeaway)

---

## 1. Problem Description

Group strings where one can be transformed into another by adding, removing, or replacing exactly one character. Find the number of groups and the size of the largest group.

---

## 2. Key Insight

> Represent each string as a bitmask of its characters (26 bits). Two strings are connected if their bitmasks differ by adding/removing one bit (Hamming distance 1) or swapping one bit off and another on.

---

## 3. Approach: Bitmask + Union-Find — O(n · 26²) ✅

```
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

## 4. Key Takeaway

> **Bitmask + Union-Find** — represent character sets as bitmasks, enumerate neighbors by flipping 1-2 bits. O(n · 26²) total.
