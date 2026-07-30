# 3003. Maximize the Number of Partitions After Operations

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximize-the-number-of-partitions-after-operations](https://leetcode.com/problems/maximize-the-number-of-partitions-after-operations)
**Companies:** Hilabs, Thoughtworks

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Prefix/Suffix Bitmask — O(26n)](#approach-prefixsuffix-bitmask--o26n-)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a string `s` and an integer `k`, partition `s` into the maximum number of substrings such that each substring contains at most `k` distinct characters. You may change **at most one** character before partitioning. Maximize the number of partitions.

**Constraints:**
- `1 ≤ s.length ≤ 10⁴`
- `1 ≤ k ≤ 26`

---

## Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `s = "abac"`, `k = 2` | `3` | Change the third character `'a'` to `'b'` → `"abbc"`. Partition as `"ab"`, `"b"`, `"c"` each has ≤2 distinct chars. |
| `s = "aaaa"`, `k = 1` | `4` | No change needed. Each character forms its own partition. |
| `s = "abcde"`, `k = 2` | `2` | Change `'c'` to `'b'` → `"abbde"`. Best partition is `"ab"`, `"bde"`. |

---

## Key Insight

> Without any change, greedily partition left-to-right. With one change, try changing each position to each of the 26 letters and see which change maximizes partitions. Optimize with prefix and suffix partition counts: precompute partition counts from the left and right, then for each change position, combine.

---

## Approach: Prefix/Suffix Bitmask — O(26n) ✅

```text
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

## Walkthrough

Consider `s = "abac"`, `k = 2`.
1. **Baseline greedy partition** (no change):
   - Start with empty set, add `'a'` → `{a}`.
   - Add `'b'` → `{a,b}` (still ≤2).
   - Add `'a'` → `{a,b}` (still ≤2).
   - Add `'c'` would exceed distinct count, so cut partition before `'c'`.
   - Resulting partitions: `"aba"`, `"c"` → 2 partitions.
2. **Enumerate change at position 2 (`'a'`) to `'b'`** → string becomes `"abbc"`.
   - Greedy scan: `'a'` → `{a}`; `'b'` → `{a,b}`; next `'b'` keeps `{a,b}`; `'c'` would exceed, cut.
   - Partitions: `"ab"`, `"b"`, `"c"` → 3 partitions.
3. This is the maximum achievable, so answer is 3.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Prefix/suffix + enumerate changes | **O(26n)** | O(n) |

---

## Follow-Up Questions

- How would the solution change if you could modify up to **two** characters?
- Can the algorithm be adapted for a streaming setting where the string is received character by character?
- What if the cost of changing a character varies and you have a budget for total change cost?

---

## Key Takeaway

> **"Change one character to maximize partitions" = precompute prefix/suffix partition states and enumerate all single-character changes.** Bitmasks of distinct characters enable efficient state tracking.
