# 354. Russian Doll Envelopes

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/russian-doll-envelopes](https://leetcode.com/problems/russian-doll-envelopes)
**Companies:** Amazon, Argo Ai, Atlassian, Bloomberg, Goldman Sachs, Google, Intuit, Medianet, Meta, Microsoft, Verily

---

## Problem Description

Given a list of envelopes where each envelope is represented as `[width, height]`, determine the maximum number of envelopes you can Russian‑doll (nest) such that each envelope in the sequence is strictly smaller in both width and height than the previous one.

---

## Key Insight

> Sort envelopes by width ascending and height **descending** (to prevent same‑width stacking). Then the problem reduces to finding the Longest Increasing Subsequence (LIS) of the heights.

---

## Approach: Sort + LIS — O(n log n)

```
FUNCTION maxEnvelopes(envelopes):
    // 1. Sort by width ASC, height DESC for equal widths
    SORT envelopes BY (width ASC, height DESC)

    // 2. Extract heights
    heights ← [h FOR (_, h) IN envelopes]

    // 3. Compute LIS on heights using patience sorting
    tails ← []
    FOR h IN heights:
        // find leftmost position to replace
        pos ← lower_bound(tails, h)
        IF pos == LENGTH(tails):
            APPEND h TO tails
        ELSE:
            tails[pos] ← h
    RETURN LENGTH(tails)
```

---

## Examples

| Envelopes | Expected Output |
|-----------|-----------------|
| `[[5,4],[6,4],[6,7],[2,3]]` | `3` |
| `[[1,1],[1,1],[1,1]]` | `1` |
| `[[4,5],[4,6],[6,7],[2,3],[1,1]]` | `4` |

---

## Walkthrough

Take `[[5,4],[6,4],[6,7],[2,3]]`:

1. **Sort** → `[[2,3],[5,4],[6,7],[6,4]]` (height descending for width 6).
2. **Heights** → `[3,4,7,4]`.
3. **LIS** steps:
   - `tails = [3]`
   - `4` > `3` → `tails = [3,4]`
   - `7` > `4` → `tails = [3,4,7]`
   - `4` replaces position 1 → `tails = [3,4,7]` (unchanged length).
Result length `3`.

---

## Complexity Analysis

- **Time:** O(n log n) – sorting plus binary search for each height.
- **Space:** O(n) – storing sorted envelopes and `tails` array.

---

## Follow‑Up Questions

1. How would the solution change if envelopes could be rotated?
2. Can you adapt the algorithm to also output the actual nesting sequence?
3. What if the input size is extremely large and does not fit in memory?

---

## Key Takeaway

Sorting by width and height descending transforms the nesting problem into a classic LIS on heights, enabling an efficient O(n log n) solution.
