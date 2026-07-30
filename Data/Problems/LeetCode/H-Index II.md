# 275. H-Index II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/h-index-ii](https://leetcode.com/problems/h-index-ii)
**Companies:** Meta

---

## Problem Description
Given a sorted array `citations` (in non‑decreasing order) of length `n`, where `citations[i]` is the number of citations of the `i`‑th paper, compute the researcher's **h‑index**. The h‑index is the maximum `h` such that the researcher has at least `h` papers with `≥ h` citations.

## Examples
**Example 1:**
```
Input: citations = [0,1,3,5,6]
Output: 3
Explanation: There are 3 papers with at least 3 citations.
```
**Example 2:**
```
Input: citations = [1,2,100]
Output: 2
Explanation: The researcher has 2 papers with at least 2 citations.
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
