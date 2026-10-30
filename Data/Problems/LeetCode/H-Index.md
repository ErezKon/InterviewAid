# 274. H-Index

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/h-index](https://leetcode.com/problems/h-index)
**Companies:** Amazon, Apple, Bloomberg, Google, Linkedin, Meta, Microsoft, Nvidia

---

## Problem Description

Given an array of integers `citations` where `citations[i]` is the number of citations a researcher received for their `i^th` paper, return *the researcher's h-index*.

According to the definition of h-index on Wikipedia: The h-index is defined as the maximum value of `h` such that the given researcher has published at least `h` papers that have each been cited at least `h` times.

**Constraints:**
- `n == citations.length`
- `1 <= n <= 5000`
- `0 <= citations[i] <= 1000`

## Examples

**Example 1:**
```
Input: citations = [3,0,6,1,5]
Output: 3
Explanation: [3,0,6,1,5] means the researcher has 5 papers in total and each of them had received 3, 0, 6, 1, 5 citations respectively.
Since the researcher has 3 papers with at least 3 citations each and the remaining two with no more than 3 citations each, their h-index is 3.
```

**Example 2:**
```
Input: citations = [1,3,1]
Output: 1
```

## Approach
Two common solutions:
1. **Counting Sort (O(n))** – Create a bucket array of size `n+1` where `bucket[i]` counts papers with `i` citations (capped at `n`). Iterate from high to low to find the largest `h` where the cumulative count ≥ `h`.
2. **Sorting (O(n log n))** – Sort citations descending and find the last position where `citations[i] >= i+1`.

Below is the counting‑sort method.

```text
FUNCTION hIndex(citations):
    n ← LENGTH(citations)
    bucket ← ARRAY of size n+1 filled with 0
    FOR c IN citations:
        idx ← MIN(c, n)
        bucket[idx] ← bucket[idx] + 1
    total ← 0
    FOR h FROM n DOWNTO 0:
        total ← total + bucket[h]
        IF total ≥ h:
            RETURN h
    RETURN 0
```
The bucket caps citation counts at `n` because any value larger than `n` contributes equally to the h‑index.

## Walkthrough
| Paper citations | Bucket index (capped) |
|----------------|-----------------------|
| 3 | 3 |
| 0 | 0 |
| 6 | 5 (capped at n=5) |
| 1 | 1 |
| 5 | 5 |
Bucket after counting: `[1,1,0,1,0,2]`
Iterate h=5→0, cumulative totals: 2,2,3 → at h=3, total≥3 → return 3.

## Complexity Analysis
- **Time:** `O(n)` for counting plus `O(n)` for the reverse scan.
- **Space:** `O(n)` for the bucket array.

## Follow‑Up Questions
1. How would you adapt the algorithm for the **sorted** version of the problem (H‑Index II)?
2. Can you compute the h‑index in a streaming fashion with limited memory?
3. What changes are needed to compute the **g‑index** instead?

## Key Takeaway
Counting sort leverages the bounded nature of the h‑index (≤ n) to achieve linear time without full sorting.
