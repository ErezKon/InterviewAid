# 354. Russian Doll Envelopes

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/russian-doll-envelopes](https://leetcode.com/problems/russian-doll-envelopes)
**Companies:** Amazon, Argo Ai, Atlassian, Bloomberg, Goldman Sachs, Google, Intuit, Medianet, Meta, Microsoft, Verily

---

## Problem Description

You are given a 2D array of integers `envelopes` where `envelopes[i] = [w_i, h_i]` represents the width and the height of an envelope.

One envelope can fit into another if and only if both the width and height of one envelope are greater than the other envelope's width and height.

Return *the maximum number of envelopes you can Russian doll (i.e., put one inside the other)*.

**Note:** You cannot rotate an envelope.

**Constraints:**
- `1 <= envelopes.length <= 10^5`
- `envelopes[i].length == 2`
- `1 <= w_i, h_i <= 10^5`

---

## Key Insight

> Sort envelopes by width ascending and height **descending** (to prevent same-width stacking). Then the problem reduces to finding the Longest Increasing Subsequence (LIS) of the heights.

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

**Example 1:**
```
Input: envelopes = [[5,4],[6,4],[6,7],[2,3]]
Output: 3
Explanation: The maximum number of envelopes you can Russian doll is 3 ([2,3] => [5,4] => [6,7]).
```

**Example 2:**
```
Input: envelopes = [[1,1],[1,1],[1,1]]
Output: 1
```

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
Result length `3`, matching Example 1.

Example 2 `[[1,1],[1,1],[1,1]]`: heights `[1,1,1]`; the first `1` gives `tails = [1]`, each later `1` replaces position 0 → length `1`.

---

## Complexity Analysis

- **Time:** O(n log n) – sorting plus binary search for each height.
- **Space:** O(n) – storing sorted envelopes and `tails` array.

---

## Follow-Up Questions

1. How would the solution change if envelopes could be rotated?
2. Can you adapt the algorithm to also output the actual nesting sequence?
3. What if the input size is extremely large and does not fit in memory?

---

## Key Takeaway

Sorting by width and height descending transforms the nesting problem into a classic LIS on heights, enabling an efficient O(n log n) solution.
