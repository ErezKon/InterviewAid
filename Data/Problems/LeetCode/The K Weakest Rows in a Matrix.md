# 1337. The K Weakest Rows in a Matrix

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/the-k-weakest-rows-in-a-matrix](https://leetcode.com/problems/the-k-weakest-rows-in-a-matrix)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description
Given a binary matrix `mat` of size `m x n` where each row is sorted in non‑decreasing order (all 1's come before 0's), the *strength* of a row is the number of 1's it contains. Return the indices of the `k` weakest rows in the matrix ordered from weakest to strongest. If two rows have the same strength, the row with the smaller index is considered weaker.

## Examples
**Example 1:**
```
mat = [[1,1,0,0,0],
       [1,1,1,1,0],
       [1,0,0,0,0],
       [1,1,0,0,0],
       [1,1,1,1,1]]
k = 3
Output: [2,0,3]
Explanation: Row strengths are [2,4,1,2,5]; the three weakest are rows 2 (strength 1), 0 (strength 2), and 3 (strength 2, larger index than 0).
```
**Example 2:**
```
mat = [[1,0,0,0],
       [1,1,1,1],
       [1,0,0,0],
       [1,0,0,0]]
k = 2
Output: [0,2]
Explanation: Strengths are [1,4,1,1]; rows 0,2,3 tie with strength 1, but 0 and 2 have the smallest indices.
```

## Approach
1. For each row, count the number of 1's (its strength). Because rows are sorted, the count can be obtained with binary search for the first 0.
2. Store pairs `(strength, index)` for all rows.
3. Sort the pairs by strength then by index.
4. Return the first `k` indices.

## Walkthrough
| Row Index | Row | Strength (count of 1's) |
|-----------|-----|--------------------------|
| 0 | [1,1,0,0,0] | 2 |
| 1 | [1,1,1,1,0] | 4 |
| 2 | [1,0,0,0,0] | 1 |
| 3 | [1,1,0,0,0] | 2 |
| 4 | [1,1,1,1,1] | 5 |
After sorting by (strength, index): (1,2), (2,0), (2,3), (4,1), (5,4). First 3 indices → [2,0,3].

## Complexity Analysis
- Time: O(m log n) for binary searches + O(m log m) for sorting → O(m log n + m log m).
- Space: O(m) to store the strength‑index pairs.

## Follow-Up Questions
1. How would you solve the problem in O(m + n log k) using a min‑heap of size `k`?
2. Can you modify the algorithm to handle rows that are not sorted?
3. What if the matrix is streamed row by row and you cannot store all rows at once?

## Key Takeaway
Counting per‑row strengths with binary search and sorting by (strength, index) yields a simple and efficient solution.
