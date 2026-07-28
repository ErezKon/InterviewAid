# 249. Group Shifted Strings

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/group-shifted-strings](https://leetcode.com/problems/group-shifted-strings)
**Companies:** Google, Meta, Uber, Wix

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Normalize by Shift — O(n · k) ✅](#3-approach-normalize-by-shift--on--k-)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Group strings that can be shifted to one another (`"abc"` → `"bcd"` → `"xyz"`).

---

## 2. Key Insight

> Normalize each string by computing relative differences mod 26. Strings with the same difference tuple belong to the same shift group.

---

## 3. Approach: Normalize by Shift — O(n · k) ✅

```text
FUNCTION groupStrings(strings):
    SET groups ← MAP()
    FOR s IN strings:
        SET key ← TUPLE((ORD(c) - ORD(s[0])) % 26 FOR c IN s)
        IF key NOT IN groups:
            SET groups[key] ← []
        APPEND s TO groups[key]
    RETURN LIST(groups.VALUES())
```

---

## 4. Examples

| Input | Output |
|-------|--------|
| `["abc","bcd","acef","xyz","az","ba","a","z"]` | `[["abc","bcd","xyz"],["az","ba"],["acef"],["a","z"]]` |
| `["a","b","c","ab","bc","abc"]` | `[["a","b","c"],["ab","bc"],["abc"]]` |

---

## 5. Walkthrough

1. For each string, compute its shift‑signature key based on differences from the first character.
2. Group strings sharing the same key in a map.
3. After processing all strings, collect the map values as the grouped result.

---

## 6. Complexity Analysis

- **Time:** O(n · k) where n is the number of strings and k is the average length of a string.
- **Space:** O(n) for storing the groups and their keys.

---

## 7. Follow-Up Questions

- How would you modify the solution to return groups sorted by size?
- Can you adapt the algorithm to handle Unicode characters beyond 'a'‑'z'?
- What if the input list is extremely large and cannot fit into memory?

---

## Key Takeaway

> **Canonicalize** by shifting the first character to 'a' (relative differences mod 26). Same canonical form = same group.
