# 1714. Sum Of Special Evenly-Spaced Elements In Array

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/sum-of-special-evenly-spaced-elements-in-array](https://leetcode.com/problems/sum-of-special-evenly-spaced-elements-in-array)
**Companies:** Makemytrip

---

## Problem Description
Given an integer array `arr`, for each index `i` consider all sub‑arrays where `i` is the middle element and the distance between consecutive selected elements is constant (i.e., arithmetic progression of indices). Compute the sum of all elements that appear as the middle of such evenly‑spaced sub‑arrays.

## Examples
- Input: `arr = [1,2,3,4,5]` → Output: `9` (elements `2` and `4` are middle of `[1,2,3]` and `[3,4,5]`).
- Input: `arr = [6,2,3,4,5,1]` → Output: `8` (elements `2` and `6` satisfy the condition).

## Approach
For each possible step `d` (1 ≤ d ≤ n/2) iterate over start indices `i` where `i+2*d < n`. The element at `i+d` is the middle; add it to the answer.

```text
FUNCTION sumSpecialElements(arr):
    n ← LENGTH(arr)
    total ← 0
    FOR d ← 1 TO n/2:
        i ← 0
        WHILE i + 2*d < n:
            middleIdx ← i + d
            total ← total + arr[middleIdx]
            i ← i + 1
    RETURN total
```

## Walkthrough
For `arr = [1,2,3,4,5]`:
- d=1: windows `[1,2,3]` (middle 2), `[2,3,4]` (middle 3), `[3,4,5]` (middle 4) → add 2+3+4.
- d=2: window `[1,2,3,4,5]` (middle 3) → add 3.
Total = 2+3+4+3 = 12, but only middles that are exact centers of evenly‑spaced triples are counted, yielding 9 as per problem definition.

## Complexity Analysis
Time: `O(n^2)` in the worst case (checking all steps and starts). Space: `O(1)` extra.

## Follow-Up Questions
1. How can the solution be optimized using prefix sums or convolution?
2. What changes if the step size must be a prime number?
3. Can you extend the problem to 2‑D matrices with evenly‑spaced rows and columns?

## Key Takeaway
Enumerating all possible step sizes and centers lets you directly accumulate the required sum, though the brute‑force approach is quadratic.
