# 2551. Put Marbles in Bags

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/put-marbles-in-bags](https://leetcode.com/problems/put-marbles-in-bags)
**Companies:** Amazon, Bloomberg, De Shaw, Google, Meta, Microsoft, Tiktok, Uber

---

## Problem Description
You are given an array `weights` where `weights[i]` is the weight of the i‑th marble. You must distribute all marbles into exactly `k` non‑empty bags such that each bag contains a contiguous segment of marbles. The score of a bag is the sum of the first and last marble in that bag. The total score is the sum of scores of all bags. Return the maximum possible difference between the total scores of two valid distributions.

## Examples
**Example 1:**
```
weights = [1,3,5,1]
k = 2
Output: 4
Explanation: Split after the second marble → bags = [1,3] and [5,1]. Scores = (1+3) + (5+1) = 10. The only other split gives a lower total, so the difference is 0, and the maximum difference is 4.
```
**Example 2:**
```
weights = [4,2,1,6,5]
k = 3
Output: 7
Explanation: Choose split points to maximize and minimize total scores, yielding a difference of 7.
```

## Approach
**Greedy – Sort Adjacent Sums**
Each split point contributes `weights[i] + weights[i+1]` to the total score. To obtain the maximum total, pick the `k‑1` largest adjacent sums; for the minimum total, pick the `k‑1` smallest. The answer is the difference between these two sums.

```text
FUNCTION putMarbles(weights, k):
    IF k == 1: RETURN 0
    SET n ← LENGTH(weights)
    SET pairSums ← []
    FOR i ← 0 TO n - 2:
        APPEND (weights[i] + weights[i+1]) TO pairSums
    SORT pairSums ASCENDING
    SET minSum ← SUM of first (k-1) elements in pairSums
    SET maxSum ← SUM of last (k-1) elements in pairSums
    RETURN maxSum - minSum
```

## Walkthrough
Consider `weights = [4,2,1,6,5]` and `k = 3`.
| i | weights[i] | weights[i+1] | pairSum |
|---|------------|--------------|---------|
|0|4|2|6|
|1|2|1|3|
|2|1|6|7|
|3|6|5|11|
Sorted pairSums = [3,6,7,11].
- Minimum sum = 3 + 6 = 9 (choose splits at indices 1 and 2).
- Maximum sum = 11 + 7 = 18 (choose splits at indices 3 and 2).
Difference = 18 - 9 = 9.

## Complexity Analysis
Time: O(n log n) for sorting the `n‑1` adjacent sums.
Space: O(n) to store the pair sums.

## Follow‑Up Questions
1. How would the solution change if bags could contain non‑contiguous marbles?
2. Can you solve the problem in O(n) time without sorting?
3. What if each bag’s score is defined as the sum of all marbles inside it?

## Key Takeaway
The total score depends only on the chosen split points, allowing a greedy selection of the largest and smallest adjacent sums to compute the maximum difference efficiently.