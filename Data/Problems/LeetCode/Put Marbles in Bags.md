# 2551. Put Marbles in Bags

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/put-marbles-in-bags](https://leetcode.com/problems/put-marbles-in-bags)
**Companies:** Amazon, Bloomberg, De Shaw, Google, Meta, Microsoft, Tiktok, Uber

---

## Problem Description

You have `k` bags. You are given a **0-indexed** integer array `weights` where `weights[i]` is the weight of the `i`th marble. You are also given the integer `k`.

Divide the marbles into the `k` bags according to the following rules:

- No bag is empty.
- If the `i`th marble and `j`th marble are in a bag, then all marbles with an index between the `i`th and `j`th indices should also be in that same bag.
- If a bag consists of all the marbles with an index from `i` to `j` inclusively, then the cost of the bag is `weights[i] + weights[j]`.

The **score** after distributing the marbles is the sum of the costs of all the `k` bags.

Return *the **difference** between the **maximum** and **minimum** scores among marble distributions*.

**Constraints:**
- `1 <= k <= weights.length <= 10^5`
- `1 <= weights[i] <= 10^9`

## Examples

**Example 1:**
```
Input: weights = [1,3,5,1], k = 2
Output: 4
Explanation:
The distribution [1],[3,5,1] results in the minimal score of (1+1) + (3+1) = 6.
The distribution [1,3],[5,1], results in the maximal score of (1+3) + (5+1) = 10.
Thus, we return their difference 10 - 6 = 4.
```

**Example 2:**
```
Input: weights = [1, 3], k = 2
Output: 0
Explanation: The only distribution possible is [1],[3].
Since both the maximal and minimal score are the same, we return 0.
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