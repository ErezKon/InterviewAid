# 1471. The k Strongest Values in an Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/the-k-strongest-values-in-an-array](https://leetcode.com/problems/the-k-strongest-values-in-an-array)
**Companies:** Google

---

## Problem Description
Given an integer array `arr` and an integer `k`, define the strength of an element `x` as the absolute difference between `x` and the median of `arr`. The median is the element at index `⌊n/2⌋` after sorting `arr` in non‑decreasing order (0‑based). Return a list of the `k` strongest values in `arr`. If two values have the same strength, the larger value is considered stronger. The result can be returned in any order.

## Examples
**Example 1:**
```
arr = [1,2,3,4,5]
k = 2
Median = 3
Strengths: 1→2, 2→1, 3→0, 4→1, 5→2
Output = [5,1]
```
Both 5 and 1 have the highest strength of 2.

**Example 2:**
```
arr = [6,7,11,12,13,14]
k = 3
Sorted = [6,7,11,12,13,14], median = arr[3] = 12
Strengths: 6→6, 7→5, 11→1, 12→0, 13→1, 14→2
Output = [6,14,7]
```
The three strongest values are 6, 14, and 7.

## Approach
1. Sort `arr`.
2. Compute the median element at index `⌊n/2⌋`.
3. Use two pointers, one at the start (`left`) and one at the end (`right`). At each step compare the strength of `arr[left]` and `arr[right]`. Append the stronger element to the result and move the corresponding pointer inward. Repeat until `k` elements are selected.

```text
FUNCTION getStrongest(arr, k):
    SORT arr ASCENDING
    n ← LENGTH(arr)
    median ← arr[ n DIV 2 ]
    left ← 0
    right ← n - 1
    result ← LIST()
    WHILE LENGTH(result) < k:
        leftStrength ← ABS(arr[left] - median)
        rightStrength ← ABS(arr[right] - median)
        IF rightStrength > leftStrength OR (rightStrength = leftStrength AND arr[right] > arr[left]):
            APPEND result, arr[right]
            SET right ← right - 1
        ELSE:
            APPEND result, arr[left]
            SET left ← left + 1
    RETURN result
```
The two‑pointer selection ensures the strongest elements are chosen without sorting by strength.

## Walkthrough
| Step | left | right | chosen | result |
|------|------|-------|--------|--------|
| 1 | 0 (1) | 4 (5) | rightStrength=2 > leftStrength=2? tie → larger value 5 | [5] |
| 2 | 0 (1) | 3 (4) | leftStrength=2 > rightStrength=1 → choose left 1 | [5,1] |
| … | … | … | continue until k=2 |

## Complexity Analysis
- **Time:** O(n log n) for sorting; the two‑pointer scan is O(k) ≤ O(n).
- **Space:** O(1) extra space besides the output list (in‑place sort).

## Follow‑Up Questions
1. How would you modify the algorithm to return the `k` weakest values instead?
2. Can you achieve O(n) time without full sorting, e.g., using a quick‑select to find the median and a heap for the strongest elements?
3. How would the solution change if the strength definition used a different distance metric (e.g., squared difference)?

## Key Takeaway
Sorting to find the median and then using a two‑pointer greedy selection yields the `k` strongest values efficiently.
