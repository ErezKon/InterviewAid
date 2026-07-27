# 354. Russian Doll Envelopes

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/russian-doll-envelopes](https://leetcode.com/problems/russian-doll-envelopes)
**Companies:** Amazon, Argo Ai, Atlassian, Bloomberg, Goldman Sachs, Google, Intuit, Medianet, Meta, Microsoft, Verily

---

## Problem Description

Given 2D envelopes `[width, height]`, find the maximum number you can nest (Russian doll style) where both dimensions of the inner envelope are strictly smaller.

---

## Key Insight

> Sort by width ascending, height **descending** (to prevent same-width stacking). Then find the **Longest Increasing Subsequence (LIS)** on heights — this gives the max nesting depth.

---

## Approach: Sort + LIS — O(n log n) ✅

```
FUNCTION maxEnvelopes(envelopes):
    // Sort by width asc, then height desc (to avoid same-width stacking)
    SORT envelopes by (width ASC, height DESC)

    // LIS on heights (patience sorting)
    tails = []
    FOR [w, h] IN envelopes:
        pos = bisect_left(tails, h)
        IF pos == len(tails):
            tails.ADD(h)
        ELSE:
            tails[pos] = h

    RETURN len(tails)
```

Sorting height descending for same width ensures we don't pick two envelopes with the same width.
