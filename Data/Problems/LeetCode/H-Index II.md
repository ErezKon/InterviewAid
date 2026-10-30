# 275. H-Index II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/h-index-ii](https://leetcode.com/problems/h-index-ii)
**Companies:** Meta

---

## Problem Description

Given an array of integers `citations` where `citations[i]` is the number of citations a researcher received for their `i^th` paper and `citations` is sorted in **non-descending order**, return *the researcher's h-index*.

According to the definition of h-index on Wikipedia: The h-index is defined as the maximum value of `h` such that the given researcher has published at least `h` papers that have each been cited at least `h` times.

You must write an algorithm that runs in logarithmic time.

**Constraints:**
- `n == citations.length`
- `1 <= n <= 10^5`
- `0 <= citations[i] <= 1000`
- `citations` is sorted in **ascending order**.

## Examples

**Example 1:**
```
Input: citations = [0,1,3,5,6]
Output: 3
Explanation: [0,1,3,5,6] means the researcher has 5 papers in total and each of them had received 0, 1, 3, 5, 6 citations respectively.
Since the researcher has 3 papers with at least 3 citations each and the remaining two with no more than 3 citations each, their h-index is 3.
```

**Example 2:**
```
Input: citations = [1,2,100]
Output: 2
```

## Approach
Because the array is sorted, we can binary search for the smallest index `i` such that `citations[i] >= n - i`. The h‑index will then be `n - i`.

```text
FUNCTION hIndex(citations):
    n ← LENGTH(citations)
    left ← 0
    right ← n - 1
    WHILE left ≤ right:
        mid ← (left + right) // 2
        IF citations[mid] >= n - mid:
            right ← mid - 1
        ELSE:
            left ← mid + 1
    RETURN n - left
```
The loop ends with `left` pointing to the first position satisfying the condition, or `n` if none do.

## Walkthrough
| left | right | mid | citations[mid] | n-mid | Comparison | Action |
|------|-------|-----|----------------|------|------------|--------|
| 0    | 4     | 2   | 3              | 5-2=3 | >= | right ← 1 |
| 0    | 1     | 0   | 0              | 5-0=5 | <  | left ← 1 |
| 1    | 1     | 1   | 1              | 5-1=4 | <  | left ← 2 |
Loop ends, left=2 → h‑index = 5‑2 = 3.

## Complexity Analysis
- **Time:** `O(log n)` due to binary search.
- **Space:** `O(1)` auxiliary space.

## Follow‑Up Questions
1. How would you compute the h‑index if the citations array were unsorted?
2. Can you extend the method to return the h‑index for a stream of citations?
3. What if you need to find the **g‑index** instead?

## Key Takeaway
Binary search exploits the monotonic relationship between index and citation count in a sorted list to locate the h‑index efficiently.
