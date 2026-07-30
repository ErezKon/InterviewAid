# 1072. Flip Columns For Maximum Number of Equal Rows

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/flip-columns-for-maximum-number-of-equal-rows](https://leetcode.com/problems/flip-columns-for-maximum-number-of-equal-rows)
**Companies:** Amazon, Bloomberg, Google, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach](#3-approach)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given a binary matrix, you may flip any number of columns (changing all `0`s to `1`s and vice‑versa in that column). After performing any flips, determine the maximum number of rows that are all identical.

**Constraints:**
- `1 ≤ m, n ≤ 300` where `m` is the number of rows and `n` the number of columns.

---

## 2. Examples

| Matrix (rows) | Explanation |
|---------------|-------------|
| `[[0,1],[1,0]]` | Flip column 2 → `[[0,0],[1,1]]`; both rows become identical. Max = 2 |
| `[[0,0,0],[0,0,1],[1,1,0]]` | Normalize rows → patterns `{000,111}` appear twice. Max = 2 |

---

## 3. Approach

Normalize each row by XOR‑ing every element with the first element of that row. After normalization, rows that were originally identical or complementary become the same pattern. Count the frequency of each pattern; the highest frequency is the answer.

```text
FUNCTION maxEqualRowsAfterFlips(matrix):
    counter ← empty map
    FOR row IN matrix:
        // If first bit is 1, flip the whole row virtually
        key ← tuple(cell XOR row[0] FOR cell IN row)
        counter[key] ← counter.get(key, 0) + 1
    END FOR
    RETURN max(counter.values())
```

---

## 4. Walkthrough

Consider `matrix = [[0,1,0],[1,0,1],[0,1,0]]`.

| Step | Row | First Bit | Normalized Key |
|------|-----|-----------|----------------|
| 1 | `[0,1,0]` | 0 | `(0,1,0)` |
| 2 | `[1,0,1]` | 1 | `(0,1,0)` (XOR each with 1) |
| 3 | `[0,1,0]` | 0 | `(0,1,0)` |

All three rows map to the same key `(0,1,0)`. The most frequent key appears 3 times, so flipping column 2 yields three identical rows.

---

## 5. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(m·n) – one pass over the matrix |
| **Space** | O(m) – hash map storing at most `m` keys |

---

## 6. Follow-Up Questions

1. How would the solution change if you could also flip rows?
2. Can you extend the approach to handle ternary matrices (`0,1,2`)?
3. What is the effect of limiting the number of column flips?

---

## 7. Key Takeaway

> By **normalizing rows** with respect to their first element, rows that are identical or complementary collapse to the same pattern. Counting the most frequent pattern gives the maximum number of equal rows after optimal column flips.
