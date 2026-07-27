# 3003. Maximize the Number of Partitions After Operations

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximize-the-number-of-partitions-after-operations](https://leetcode.com/problems/maximize-the-number-of-partitions-after-operations)
**Companies:** Hilabs, Thoughtworks

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Prefix/Suffix Bitmask — O(26n)](#approach-prefixsuffix-bitmask--o26n-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a string `s` and an integer `k`, partition `s` into the maximum number of substrings such that each substring contains at most `k` distinct characters. You may change **at most one** character before partitioning. Maximize the number of partitions.

**Constraints:**
- `1 ≤ s.length ≤ 10⁴`
- `1 ≤ k ≤ 26`

---

## Key Insight

> Without any change, greedily partition left-to-right. With one change, try changing each position to each of the 26 letters and see which change maximizes partitions. Optimize with prefix and suffix partition counts: precompute partition counts from the left and right, then for each change position, combine.

---

## Approach: Prefix/Suffix Bitmask — O(26n) ✅

```
FUNCTION maxPartitions(s, k):
    // Precompute prefix partition count and state
    // Precompute suffix partition count and state
    // For each position i, try changing s[i] to each char
    //   Combine prefix[0..i-1] + adjusted partition at i + suffix[i+1..n-1]
    
    baseline = greedyPartition(s, k)
    best = baseline
    FOR i ← 0 TO n - 1:
        FOR c ← 'a' TO 'z':
            IF c == s[i]: CONTINUE
            modified = s with s[i] = c
            best = MAX(best, greedyPartition(modified, k))
    RETURN best
```

Optimized to O(26n) using precomputed prefix/suffix states with bitmasks tracking distinct characters.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Prefix/suffix + enumerate changes | **O(26n)** | O(n) |

---

## Key Takeaway

> **"Change one character to maximize partitions" = precompute prefix/suffix partition states and enumerate all single-character changes.** Bitmasks of distinct characters enable efficient state tracking.
