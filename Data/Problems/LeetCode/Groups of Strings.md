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

You are given a **0-indexed** array of strings `words`. Each string consists of **lowercase English letters** only. No letter occurs more than once in any string of `words`.

Two strings `s1` and `s2` are said to be **connected** if the set of letters of `s2` can be obtained from the set of letters of `s1` by any **one** of the following operations:

- Adding exactly one letter to the set of the letters of `s1`.
- Deleting exactly one letter from the set of the letters of `s1`.
- Replacing exactly one letter from the set of the letters of `s1` with any letter, **including** itself.

The array `words` can be divided into one or more non-intersecting **groups**. A string belongs to a group if any **one** of the following is true:

- It is connected to **at least one** other string of the group.
- It is the **only** string present in the group.

Note that the strings in `words` should be grouped in such a manner that a string belonging to a group cannot be connected to a string present in any other group. It can be proved that such an arrangement is always unique.

Return *an array* `ans` *of size* `2` *where:*

- `ans[0]` *is the **maximum number** of groups* `words` *can be divided into, and*
- `ans[1]` *is the **size of the largest** group*.

**Constraints:**
- `1 <= words.length <= 2 * 10^4`
- `1 <= words[i].length <= 26`
- `words[i]` consists of lowercase English letters only.
- No letter occurs more than once in `words[i]`.

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

```
Example 1:
  Input: words = ["a","b","ab","cde"]
  Output: [2,3]
  Explanation:
  - words[0] can be used to obtain words[1] (by replacing 'a' with 'b'), and words[2] (by adding 'b'). So words[0] is connected to words[1] and words[2].
  - words[1] can be used to obtain words[0] (by replacing 'b' with 'a'), and words[2] (by adding 'a'). So words[1] is connected to words[0] and words[2].
  - words[2] can be used to obtain words[0] (by deleting 'b'), and words[1] (by deleting 'a'). So words[2] is connected to words[0] and words[1].
  - words[3] is not connected to any string in words.
  Thus, words can be divided into 2 groups ["a","b","ab"] and ["cde"]. The size of the largest group is 3.
```
```
Example 2:
  Input: words = ["a","ab","abc"]
  Output: [1,3]
  Explanation:
  - words[0] is connected to words[1].
  - words[1] is connected to words[0] and words[2].
  - words[2] is connected to words[1].
  Since all strings are connected to each other, they should be grouped together.
  Thus, the size of the largest group is 3.
```

---

## 5. Walkthrough

Consider the first example `words = ["abc","abd","ab","a"]`.

| Step | Action | Union-Find State |
|------|--------|-----------------|
| 1 | Compute bitmask for each word. | `abc→111`, `abd→1011`, `ab→11`, `a→1` |
| 2 | Connect `abc` and `abd` by swapping `c`→`d`. | Union(0,1) |
| 3 | Connect `ab` and `a` by removing `b`. | Union(2,3) |
| 4 | No other single-edit connections. | Two components remain |

Result: 2 groups, largest size 3.

---

## 6. Complexity Analysis

- **Time:** For each word we examine up to 26 set bits and for each set bit try 26 replacements → O(n·26²) ≈ O(n).
- **Space:** Union-Find arrays plus a hash map of bitmasks → O(n).

---

## 7. Follow-Up Questions

1. How would the solution change if edits could involve adding or removing any number of characters?
2. Can the approach be adapted to handle Unicode characters beyond the English alphabet?
3. What if we need to output the actual groups, not just their counts?

---

## 8. Key Takeaway

> **Bitmask + Union-Find** — represent character sets as bitmasks, enumerate neighbors by flipping 1-2 bits. O(n·26²) total.
