# 3107. Minimum Operations to Make Median of Array Equal to K

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-operations-to-make-median-of-array-equal-to-k](https://leetcode.com/problems/minimum-operations-to-make-median-of-array-equal-to-k)
**Companies:** Ibm

---

## Problem Description
Given an integer array `nums` and an integer `k`, you may increase or decrease any element by 1 in one operation. Find the minimum number of operations required so that the median of the array becomes exactly `k`.

## Examples
- **Input:** `nums = [1,2,3,4,5], k = 3` → **Output:** `0` – median is already 3.
- **Input:** `nums = [1,1,1,1], k = 5` → **Output:** `8` – increase the two middle elements from 1 to 5 (4 + 4).
- **Input:** `nums = [6,5,4,3,2,1], k = 4` → **Output:** `2` – after sorting `[1,2,3,4,5,6]`, adjust the two middle values (3 and 4) to 4.

## Approach
Sort the array to locate the median index (`mid = n/2`). For each element, if its index is ≤ mid and value > k, decrement it to k; if index ≥ mid and value < k, increment it to k. Sum the absolute differences; this yields the minimal operations because moving any element farther from k would only increase the total.

## Walkthrough
| Sorted nums | Median index | Target adjustments |
|-------------|--------------|--------------------|
|[1,1,1,1]    |1 (second)    |Increase positions 1 and 2 from 1 to 5 → 4 + 4 = 8 |
|[1,2,3,4,5] |2 (third)     |No change needed → 0 |
|[1,2,3,4,5,6]|2 (third)    |Increase index 2 from 3 to 4 (1), decrease index 3 from 4 to 4 (0) → total 1 |

## Complexity Analysis
- **Time:** O(n log n) for sorting.
- **Space:** O(1) extra space if sorting in‑place, otherwise O(n).

## Follow-Up Questions
1. How would the solution differ if only increment operations were allowed?
2. What if the array size is extremely large and cannot be fully sorted in memory?
3. Extend to make the median fall within a range `[L, R]` instead of a single value.

## Key Takeaway
Sorting isolates the median; then only elements on the wrong side of `k` need to be moved, and the sum of their absolute differences gives the minimal operation count.
