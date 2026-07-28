# 2945. Find Maximum Non-decreasing Array Length

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-maximum-non-decreasing-array-length](https://leetcode.com/problems/find-maximum-non-decreasing-array-length)
**Companies:** Amazon, Google, Medianet, Tiktok

---

## Problem Description
Given an integer array `nums`, you may delete any number of elements (possibly zero). After deletions, the remaining elements must form a **non‑decreasing** sequence. Return the maximum possible length of such a sequence.

## Examples
**Example 1**
```
Input: nums = [5,3,4,8,6,7]
Output: 5
Explanation: Delete the element `3` to obtain [5,4,8,6,7] → after further deletions of `4` and `6` we get [5,8,7] which is not non‑decreasing. The optimal non‑decreasing subsequence is [5,6,7] of length 3, but by removing `5` we can keep [3,4,6,7] of length 4. The longest achievable length is 5 (e.g., keep [3,4,6,7] and one of the 5s).
```
**Example 2**
```
Input: nums = [1,2,3,4]
Output: 4
Explanation: The array is already non‑decreasing; keep all elements.
```

## Approach
The problem is equivalent to finding the length of the **Longest Non‑decreasing Subsequence (LNDS)**. A classic DP runs in O(n²). To achieve O(n log n) we maintain a monotone queue (or binary‑searchable list) of the smallest possible tail value for each subsequence length.

### Pseudocode
```text
FUNCTION maxNonDecreasingLength(nums):
    SET tails ← empty list  // tails[i] = smallest possible tail of a non‑decreasing subsequence of length i+1
    FOR x IN nums:
        // Find the first index i where tails[i] > x (strictly greater) using binary search
        SET i ← LOWER_BOUND(tails, x+1)  // first position with value > x
        IF i == LENGTH(tails):
            APPEND x TO tails
        ELSE:
            SET tails[i] ← x
    RETURN LENGTH(tails)
```

## Walkthrough
For `nums = [5,3,4,8,6,7]`:
| step | x | tails after step |
|------|---|------------------|
| 1 | 5 | [5]
| 2 | 3 | [3] (replace 5)
| 3 | 4 | [3,4]
| 4 | 8 | [3,4,8]
| 5 | 6 | [3,4,6] (replace 8)
| 6 | 7 | [3,4,6,7]
Result length = 4.

## Complexity Analysis
- **Time:** O(n log n) – each element triggers a binary search on `tails`.
- **Space:** O(n) in the worst case for `tails` (actually O(L) where L is the LNDS length).

## Follow‑Up Questions
1. How would you modify the algorithm to return the actual subsequence, not just its length?
2. Can the same technique be applied to the strictly increasing case?
3. What if deletions have a cost and you want to minimize total cost while achieving a non‑decreasing sequence?

## Key Takeaway
Transforming the problem into a longest non‑decreasing subsequence and using a binary‑search‑maintained tail array yields an O(n log n) solution.
