# 1072. Flip Columns For Maximum Number of Equal Rows

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/flip-columns-for-maximum-number-of-equal-rows](https://leetcode.com/problems/flip-columns-for-maximum-number-of-equal-rows)
**Companies:** Amazon, Bloomberg, Google, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Row Normalization — O(m · n) ✅](#3-approach-row-normalization--om--n-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given a binary matrix, flip any columns. Return the maximum number of rows that can be made identical.

**Constraints:**
- `1 <= m, n <= 300`

---

## 2. Key Insight

> Two rows can become equal after the same column flips iff they are identical or complementary. Normalize each row by XORing with its first element — identical and complementary rows map to the same key.

---

## 3. Approach: Row Normalization — O(m · n) ✅

```
FUNCTION maxEqualRowsAfterFlips(matrix):
    count = Counter()
    FOR row IN matrix:
        // Normalize: if first element is 1, flip entire row
        key = tuple(r ^ row[0] for r in row)
        count[key] += 1
    RETURN MAX(count.values())
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(m · n) |
| **Space** | O(m · n) — hash map keys |

---

## 5. Key Takeaway

> **Normalize rows** by XORing with the first bit. Rows that are identical or complementary collapse to the same key. Count the most frequent pattern.
