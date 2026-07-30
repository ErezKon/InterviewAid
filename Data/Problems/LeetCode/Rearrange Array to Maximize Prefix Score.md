# 2587. Rearrange Array to Maximize Prefix Score

**Difficulty:** 🟡 Medium

**Companies:** Amazon, Ibm, Jpmorgan
---

## Problem Description
Given an integer array `nums`, you may rearrange its elements in any order. After rearrangement, compute the prefix sums of the array. The *prefix score* is defined as the number of prefix sums that are strictly positive. Return the maximum possible prefix score achievable by any rearrangement of `nums`.

## Examples
**Example 1:**
```
Input: nums = [2, -1, -2, 3]
Output: 3
Explanation: Rearrange to [3, 2, -1, -2]. Prefix sums are [3,5,4,2]; all four are positive, so the score is 4. However, the maximum achievable score is 3 because the last element must be negative to keep the sum positive as long as possible.
```
**Example 2:**
```
Input: nums = [-1, -2, -3]
Output: 0
Explanation: No rearrangement can produce a positive prefix sum.
```

## Approach
The optimal strategy is greedy: place the largest numbers first to keep the running sum as high as possible. Sorting the array in descending order ensures each added element contributes maximally to the prefix sum. Iterate through the sorted array, maintaining a running `prefix`. Increment the score while `prefix` remains positive; stop once it becomes non‑positive.

## Pseudocode
```text
FUNCTION maxScore(nums):
    // Sort numbers from largest to smallest
    SORT nums DESCENDING
    SET prefix ← 0
    SET score ← 0
    FOR each num IN nums:
        SET prefix ← prefix + num
        IF prefix > 0:
            SET score ← score + 1
        ELSE:
            BREAK
    RETURN score
```

## Walkthrough
| Step | Sorted nums | prefix after adding | score |
|------|-------------|---------------------|-------|
| 1 | [5, 3, -2, -4] | 5 | 1 |
| 2 | [5, 3, -2, -4] | 8 | 2 |
| 3 | [5, 3, -2, -4] | 6 | 3 |
| 4 | [5, 3, -2, -4] | 2 | 4 |
The loop stops when `prefix` would become non‑positive.

## Complexity Analysis
- **Time:** O(n log n) for sorting the array.
- **Space:** O(1) extra space aside from the input array (in‑place sort).

## Follow‑Up Questions
1. How would the solution change if you could remove at most one element?
2. What if the goal is to maximize the *sum* of positive prefix sums instead of the count?
3. Can you extend the approach to handle streaming inputs where the array is not known upfront?

## Key Takeaway
Sorting the array in descending order and greedily accumulating the prefix sum yields the maximum number of positive prefixes.
