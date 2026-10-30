# 2587. Rearrange Array to Maximize Prefix Score

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/rearrange-array-to-maximize-prefix-score](https://leetcode.com/problems/rearrange-array-to-maximize-prefix-score)

**Companies:** Amazon, Ibm, Jpmorgan
---

## Problem Description
You are given a **0-indexed** integer array `nums`. You can rearrange the elements of `nums` to **any order** (including the given order).

Let `prefix` be the array containing the prefix sums of `nums` after rearranging it. In other words, `prefix[i]` is the sum of the elements from `0` to `i` in `nums` after rearranging it. The **score** of `nums` is the number of positive integers in the array `prefix`.

Return *the maximum score you can achieve*.

**Constraints:**

- `1 <= nums.length <= 10⁵`
- `-10⁶ <= nums[i] <= 10⁶`

## Examples

```
Example 1:
  Input: nums = [2,-1,0,1,-3,3,-3]
  Output: 6
  Explanation: We can rearrange the array into nums = [2,3,1,-1,-3,0,-3].
    prefix = [2,5,6,5,2,2,-1], so the score is 6.
    It can be shown that 6 is the maximum score we can obtain.
```

```
Example 2:
  Input: nums = [-2,-3,0]
  Output: 0
  Explanation: Any rearrangement of the array will result in a score of 0.
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
