# 2159. Order Two Columns Independently

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/order-two-columns-independently](https://leetcode.com/problems/order-two-columns-independently)
**Companies:** Bookingcom

---

## Problem Description
Given an `n × 2` matrix where each row contains two integers, you may reorder the rows arbitrarily and independently sort each column. Determine the minimum possible sum of absolute differences between the two columns after such operations.

## Examples
**Example 1:**
```
Input: [[1,3],[2,2],[3,1]]
Output: 2
Explanation: Sort column 1 as [1,2,3] and column 2 as [1,2,3]; sum of |col1[i]-col2[i]| = 0+0+0 = 0 (after optimal row pairing).
```
**Example 2:**
```
Input: [[5,1],[4,2],[3,3]]
Output: 4
Explanation: After sorting columns independently you get col1=[3,4,5], col2=[1,2,3]; sum = |3-1|+|4-2|+|5-3| = 2+2+2 = 6, but a better row pairing reduces it to 4.
```

## Approach
The optimal strategy is to sort each column independently and then pair the i‑th smallest element of column 1 with the i‑th smallest element of column 2. This minimizes the sum of absolute differences by the rearrangement inequality.

## Walkthrough
| Step | Sorted col1 | Sorted col2 | Pairwise diff |
|------|-------------|-------------|---------------|
| 1    | [1,2,3]     | [1,2,3]     | 0,0,0         |
| 2    | [3,4,5]     | [1,2,3]     | 2,2,2 → sum 6 (but alternative pairing can lower it) |

## Complexity Analysis
- **Time:** O(n log n) for sorting each column.
- **Space:** O(n) to store the two column arrays.

## Follow-Up Questions
1. How would the solution change if the matrix had more than two columns?
2. Can you extend the approach to minimize the maximum absolute difference instead of the sum?
3. What if each column could be sorted only in non‑decreasing order but rows cannot be reordered?

## Key Takeaway
Sorting each column independently and pairing elements by their order yields the minimal sum of absolute differences due to the rearrangement inequality.
